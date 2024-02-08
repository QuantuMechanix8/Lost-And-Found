function SubmitPlace() {
    var button = document.querySelector("button");
    button.textContent = "Submitting...";
    setTimeout(function() {button.textContent = "Submit";}, 500);

    const PLACE_NAME = document.getElementById("place_name").value;
    const LOCATION = document.getElementById("location").value;
    const PLACE_DESCRIPTION = document.getElementById("place_description").value;

    // Check if any of the fields are empty
    if (PLACE_NAME.trim() === "" || LOCATION.trim() === "" || PLACE_DESCRIPTION.trim() === "") {
        // Display an error message
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Please fill all fields";
        errorMessage.style.display = "block";

        // Hide the error message after 10 seconds
        setTimeout(function() {
            errorMessage.textContent = ""; // Clear the message
            errorMessage.style.display = "none";
        }, 10000);

        return; // Stop further execution
    }
    //The below accesses the database by calling the store_place.php script

    xhr = new XMLHttpRequest();

    xhr.open("POST", "store_place.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //This checks that request was successful and alerts if it was
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response_text = xhr.responseText;
                document.getElementById("responseContainer").innerHTML = response_text;
            } else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };

    xhr.send("place_name=" + PLACE_NAME + "&location=" + LOCATION + "&place_description=" + PLACE_DESCRIPTION);
}