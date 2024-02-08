function SubmitPlace() {
    var button = document.querySelector("button");
    button.textContent = "Submitting...";
    setTimeout(function() {button.textContent = "Submit";}, 500);
}