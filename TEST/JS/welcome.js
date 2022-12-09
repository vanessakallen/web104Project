// Firebase Configs
const firebaseConfig = {
    apiKey: "AIzaSyCZE8vI9UKFaNFfqIBEbODZqitTmuKwfCs",
    authDomain: "web104-e1aec.firebaseapp.com",
    projectId: "web104-e1aec",
    storageBucket: "web104-e1aec.appspot.com",
    messagingSenderId: "684617826216",
    appId: "1:684617826216:web:9599c5f896075de9a6e79d",
    measurementId: "G-TSRGY5DN8N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();



// CREATE ACCOUNT FUNCTION
function createAccount() {
    // Assigning variables to input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    fullName = document.getElementById('fullName').value;


    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            let user = auth.currentUser;

            // Add this user to Firebase Database
            let databaseRef = database.ref();

            // Create User data
            let userData = {
                email: email,
                fullName: fullName,
                lastLogin: Date.now()
            }

            // Push to Firebase Database
            databaseRef.child('users/' + user.uid).set(userData)

            // Completed!
            alert('User successfully created!');
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            // is this a JS library????
            let errorCode = error.code;
            let errorMessage = error.message;

            alert(errorMessage);
        })
}




// LOGIN FUNCTION
function loginUser() {
    // assigning variables
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validateEmail(email) == false || validatePassword(password) == false) {
        alert('Email or Password is not correct :(')
        return
        // Don't continue running the code
    }


    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // assign user variable
            let user = auth.currentUser;

            // adding this user to Firebase database
            let databaseRef = database.ref();

            // Create User data
            let userData = {
                lastLogin: Date.now()
            }

            // Push to Firebase Database
            databaseRef.child('users/' + user.uid).update(userData);

            // Completed!
            alert('Successfully logged in!');

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            let errorCode = error.code;
            let errorMessage = error.message;

            alert(errorMessage);
        })
}

//   VALIDATE
// Validate Functions
function validateEmail(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is okay
        return true
    } else {
        // Email is not okay
        return false
    }
}

function validatePassword(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validateField(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


// Continue If Signed In Function
function isUserLoggedIn(callback) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            callback(user);
        } else {
            callback(false);
        }
    });
};

function continueToIndex() {
    isUserLoggedIn(function (incomingUser) {
        if (incomingUser) {
            console.log("user is logged in, now redirect");
            window.location.href = "https://web01.scwebsrv.com/WEB%20104/FP-Files/index.html";
        } else {
            alert("Must log in before continuing")
            console.log("user is not logged in");
        }
    })
};


// Sign Out
function signOut() {

    firebase.auth().signOut().then(user => {

        alert("Successfully signed out!")
        console.log("User signed out")
    })

}