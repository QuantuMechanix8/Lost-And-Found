async function signup() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Perform validation and other actions here
    if (password != confirmPassword) {
        alert("Password does not match confirmation password");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
    } else if (re.test(email) == false) {
        alert("Enter a valid email address");
    } else if (checkUserExists(username) == true) {
        alert("Username already taken");
    } else {
        // create new user in database
        // give user confirmation of created account (send email)
        // redirect to index page

        let salt = createSalt();
        let hashedPassword = await hashPassword(password, salt);
        createNewUser(username, hashedPassword, email, salt);
        // sendConfirmationEmail(email);
        alert("Account created successfully.\nRedirecting to login.");
        window.location.href = "../authenticate/auth.html";
    }
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

function createNewUser(username, passwordHash, email, salt) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", "createNewUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
            } else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send("username=" + username + "&passwordHash=" + passwordHash + "&email=" + email + "&salt=" + salt);
}

async function checkUserExists(username) {
    await jQuery.ajax({
        url: 'checkUserExists.php',
        method: 'POST',
        data: { username: username },
        success: function (response) {
            if (response == true) {
                return true;
            } else if (response == false) {
                return false;
            }
        }
    });
}


function returnToFrontPage() {
    window.location.href = "../front-page/views/front_page.html";
}