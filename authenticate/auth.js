// input username & password -> send username to server & return user salt 
// -> hash password with salt -> check if password hashes match 

async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform login validation and other actions here

    // Get the salt for the user
    try {
        let user_salt = await get_salt(username);
        console.log(`${username} salt is ${user_salt}`);
        let validLogin = await verifyPassword(username, password, user_salt);
        console.log(`Valid login: ${validLogin}`);
    } catch (error) {
        console.error(error);
        alert("Username not found, please try again");
        return;
    }

}

/* 
Hashes the password and salt using SHA-256
*/
async function hashPassword(password, salt) {
    const msgBuffer = new TextEncoder().encode(password + salt);
    // Should we use argon2id instead of SHA-256 - more secure (good for write up)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    return hashHex;
}


/*
    Finds the salt for the user by calling get_salt.php on the server and passing the username as parameter
    
    server then finds salt for the user and returns it to the client
*/
async function get_salt(username) {
    const response = await fetch('get_salt.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}`,
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error("Error occurred: " + response.status + " " + text);
    }

    //const text = response.text();
    console.log(text);
    return text;
}

async function verifyPassword(username, password, salt) {
    const passwordHash = await hashPassword(password, salt);
    //console.log(`Password hash: ${passwordHash}`)
    const response = await fetch('verify_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}, passwordHash=${passwordHash}`,
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error("Error occurred: " + response.status + " " + text);
    }

    //const text = response.text();
    console.log(text);
    return text;
    // Compare hash with hash in database
    // If they match, the password is correct
}
