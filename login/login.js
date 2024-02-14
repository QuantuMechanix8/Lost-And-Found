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
        let userID = createNewUserID();
        let salt = createSalt();
        let passwordHash = hashPassword(password, salt);
        createNewUser(username, passwordHash, email, userID, salt);
    }

    // Example of printing the values entered
    console.log("Username: " + username);
    console.log("Email ID: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
}

function createNewUserID() {
    // Return Sam's code
    return 3;
}

function createSalt() {
    return Math.random().toString(36).substring(2, 7);
}

async function hashPassword(password, salt) {
    const msgBuffer = new TextEncoder().encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    return hashHex;
}

function createNewUser(username, passwordHash, email, userID, salt) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "createNewUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
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
    xhr.send("username=" + username + "&passwordHash=" + passwordHash + "&email=" + email + "&userID=" + userID + "&salt=" + salt);
}