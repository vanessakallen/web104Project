// FIREBASE STUFF
const firebaseConfig = {
    apiKey: "AIzaSyCZE8vI9UKFaNFfqIBEbODZqitTmuKwfCs",
    authDomain: "web104-e1aec.firebaseapp.com",
    projectId: "web104-e1aec",
    storageBucket: "web104-e1aec.appspot.com",
    messagingSenderId: "684617826216",
    appId: "1:684617826216:web:9599c5f896075de9a6e79d",
    measurementId: "G-TSRGY5DN8N"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("createReviewButton").addEventListener("click", function (event) {
    console.log(event);
    event.preventDefault();
    createReview();
})


// Redirect to welcome if user signs out
firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
        } else {
            // send back to welcome.html
            window.location.href ="https://web01.scwebsrv.com/WEB%20104/FP-Files/welcome.html"

        }
    });



let allFirebaseReviews = ""

function createReview() {
    let newReview = {
        Genre: document.getElementById("Genre").value,
        Type: (document.getElementById("Type").value).split(","),
        ReviewContent: (document.getElementById("ReviewContent").value).split(","),
        Title: document.getElementById("Title").value,
        Author: document.getElementById("Author").value,
        Rating: document.getElementById("Rating").value
    }
    db.collection("Review").doc().set(newReview).then(() => {
        console.log("Written successfully!");
        readReview()
    }).catch((err) => {
        console.err("err writing document: ", err);
    });
}


function readReview() {

    document.getElementById("buttonList").innerHTML = ""

    getAllFromFirebase("Review", function (results) {
        console.log(results.docs[1].data())
        allFirebaseReviews = results.docs;
        results.docs.forEach((doc, index) => {
            console.log(doc.data());
            let ReviewButton = document.createElement("button");
            let ReviewButtonLoc = document.getElementById("buttonList");
            ReviewButton.classList.add('btn');
            ReviewButton.innerText = doc.data().Title;
            ReviewButton.setAttribute("data-id", index);
            ReviewButtonLoc.appendChild(ReviewButton);
            ReviewButton.addEventListener("click", viewthisReview);
        });
    })

}

function viewthisReview(event) {
    console.log(event.target);
    let thisButtonsId = event.target.getAttribute("data-id");
    console.log(thisButtonsId);
    allFirebaseReviews.forEach((doc, index) => {

        if (index == thisButtonsId) {
            console.log(doc.data());
            // let printReview = document.createElement("div")
            buildThisReview(doc.data(), thisButtonsId);

        }
    })

}



function buildThisReview(doc, index) {
    let constructor = ""
    // container1
    constructor += '<div class="cont1">';

    // card body
    constructor += '<div class="card-body">';

    // title
    constructor += '<h3 class="title-text">' + doc.Title + '</h3>';

    // type, genre
    constructor += '<div class="type-genre-container">';

    constructor += '<b class="type-text"> Type: ' + doc.Type + '</b></br>';

    constructor += '<b class="genre-text"> Genre: ' + doc.Genre + '</b></br>';

    // END of type, genre, author
    constructor += '</div>';

    // author
    constructor += '<b class="author-text"> Author: ' + doc.Author + '</b></br>';

    // review content
    constructor += '<p class="review-text"><b>Review:</b><br> ' + doc.ReviewContent + '</p>';

    constructor += '<h3 class="cont4">';

    // rating
    constructor += '<div class="rating-text"><b>Rating</b>: ' + doc.Rating + '/5' + '</div>';

    // END divs
    constructor += '</div>';
    constructor += '</div>';
    constructor += '</div>';

    document.getElementById("viewReview").innerHTML = constructor;
}




function getAllFromFirebase(incomingCollection, callback) {
    let docs = db.collection(incomingCollection);
    docs.get().then((success) => {
        callback(success);
    }).catch((err) => {
        console.log(err)

    });
}

readReview();