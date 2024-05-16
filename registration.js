// registration.js

// Wait for the DOM to fully load before executing any code
document.addEventListener('DOMContentLoaded', function() {
    // Event listener to the registration form
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collect form data
        const formData = new FormData(this);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        // Register user with Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .then((userCredential) => {
                // Send email verification
                userCredential.user.sendEmailVerification()
                    .then(() => {
                        alert('Registration successful. Verification email sent.');
                        window.location.href = 'dashboard.html'; // Redirect to dashboard
                    })
                    .catch((error) => {
                        console.error('Error sending verification email:', error);
                        alert('An error occurred while sending verification email.');
                    });
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Registration failed. Please try again later.');
            });
    });
});

