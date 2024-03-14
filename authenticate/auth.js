// input username & password -> send username to server & return user salt 
// -> hash password with salt -> check if password hashes match 

async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Get the salt for the user
    try {
        var user_salt = await get_salt(username);
        console.log(`${username} salt is ${user_salt}`);
    } catch (error) {
        console.error(error);
        alert("Username not found, please try again");
        return;
    }

    // Verify the password matches the hash in the database
    try {
        var validLogin = await verifyPassword(username, password, user_salt);
    } catch (error) {
        console.error(error);
        alert("Server error occurred while verifying password");
        return;
    }

    // If the login is valid, redirect to the home page
    if (validLogin) {
        alert("Login successful");
        window.location.href = "../home-page/home_page.php"; // redirect to front page until main page is merged to same branch
        console.log("updated");
    } else {
        alert("Invalid username or password");
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
    console.log("response: " + text);
    if (!response.ok) {
        throw new Error("Error occurred: " + response.status + " " + text);
    }

    //const text = response.text();
    console.log(text);
    return text;
}

async function verifyPassword(username, password, salt) {
    const passwordHash = await hashPassword(password, salt);

    // Send the username and password hash to the server to check if they match
    const match = await fetch('verify_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&passwordHash=${passwordHash}`,
    });

    const match_text = (await match.text()).toLowerCase();
    console.log("matching passwords: " + match_text);

    return match_text;
    // Compare hash with hash in database
    // If they match, the password is correct
}

// If the user presses enter, call the login function
function enterKey(event) {
    if (event.key === "Enter") {
        login();
    }
}

function returnToFrontPage() {
    window.location.href = "../front-page/front_page.html";
}