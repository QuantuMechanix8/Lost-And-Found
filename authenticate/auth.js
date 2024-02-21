function login() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Perform login validation and other actions here
    if (password != confirmPassword) {
        alert("Password does not match confirmation password");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long")
    } else {
        // generate user ID, create new user in database, give user confirmation of created account, redirect to index
        let salt = createSalt();
        let passwordHash = hashPassword(password, salt);
        createNewUser(username, passwordHash, email, salt);
    }

    // Example of printing the values entered
    console.log("Username: " + username);
    console.log("Email ID: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
}

/* creates random (base64) string for the salt */
function createSalt() {
    return Math.random().toString(36).substring(2, 7);

    // below attenot to make this more cryptographically secure , but couldn't get it to work
    /*const SALT_LENGTH = 5;
    let neededBytes = Math.ceil(SALT_LENGTH * 3 / 4); // Base64 uses 4 characters for every 3 bytes
    let randStr = crypto.randomBytes(neededBytes).toString("base64");
    return randStr.substring(0, SALT_LENGTH);*/


}

async function hashPassword(password, salt) {
    const msgBuffer = new TextEncoder().encode(password + salt);
    // Should we use argon2id instead of SHA-256 - more secure (good for write up)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    return hashHex;
}

function createNewUser(username, passwordHash, email, salt) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "create_new_user.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                document.getElementById("responseContainer").innerHTML = response_text;
            }
            else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send("username=" + username + "&passwordHash=" + passwordHash + "&email=" + email + "&salt=" + salt);
}