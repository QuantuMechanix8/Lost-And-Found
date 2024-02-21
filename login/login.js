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
        // generate user ID, create new user in database, give user confirmation of created account, redirect to index page TODO
        let salt = createSalt();

        // This code is commented out for testing storeData function.
        //let passwordHash = hashPassword(password, salt);
        //let hashedPassword = hashPassword(password, salt);
        //createNewUser(username, hashedPassword, email, salt);

        storeData(username, password, email, salt);
    }

    // Example of printing the values entered
    console.log("User Name: " + username);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
}

function createSalt() {
    return Math.random().toString(36).substring(2, 7);
}

async function hashPassword(password, salt) {
    var msgBuffer = new TextEncoder().encode(password + salt);
    var hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    var hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
    return hashHex;
}

async function createNewUser(username, passwordHash, email, salt) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "createNewUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                //document.getElementById("responseContainer").innerHTML = response_text;
            }
            else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send("username=" + username + "&passwordHash=" + passwordHash + "&email=" + email + "&salt=" + salt);
}

// this does not work yet but im trying to do what chat gpt thinks I should try... Use createNewUser function to send to database.
// note the database entry file currently uses a temporary placeholder salt, 'salt' to see if hashing algo is working as expcted.
async function storeData(username, password, email, salt) {
    try {
        var hashedPassword = await hashPassword(passowrd, salt);
        await createNewUser(username, hashedPassowrd, email, salt);
        return "user created";
    } catch (error) {
        return "error creating user";
    }
}