/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_authenticate(){
    // authenticate with Google
}

function fb_error(){
    // Don't forget your error handling!
}

function writeForm(){
///Writes and updates data for DtB into firebase


    firebase.database().ref('/users/' + GLOBAL_user.uid).update(
      {
        Email: GLOBAL_user.email,
        Pfp: GLOBAL_user.photoURL,
        DisplayName: GLOBAL_user.displayName,
		    DodgetheBallsScore: score,

      }
    )
    document.getElementById("DodgeScore").innerHTML = "Version 1.6.3.  Your last Score was: " + score;
}

function writeFormGDash() {
///Writes and updates data for GDash into firebase
    firebase.database().ref('/users/' + GLOBAL_user.uid).update(
      {
        Email: GLOBAL_user.email,
        Pfp: GLOBAL_user.photoURL,
        DisplayName: GLOBAL_user.displayName,
		    GDashScore: score,
      }
    )
    document.getElementById("GDashScoreText").innerHTML = "Your last Score was: " + score;
}
////FIX THIS!!!!!
function writeFormStartUp() {
///Writes and updates data on login to show a user has logged in even if they never played a game
const UserName = document.getElementById("name").value;
  console.log(UserName);
  const Age = document.getElementById("FormAge").value;
  console.log(Age);
    firebase.database().ref('/users/' + GLOBAL_user.uid).update(
      {
        Email: GLOBAL_user.email,
        Pfp: GLOBAL_user.photoURL,
        DisplayName: GLOBAL_user.displayName,
        Username: UserName,
        Age: Age,
      }
    )
  document.getElementById("NameAnnounce").innerHTML = "   " + UserName;
  document.getElementById("pfpImg").src = GLOBAL_user.photoURL;
}

function AccountCreation() {
  document.getElementById("shipForm").hidden = false;
  document.getElementById("age").hidden = false;
}

function fb_write() {
    console.log("Writing Online.");


   writeForm();
}

function fb_writeGdash() {
    console.log("Writing Online.");


   writeFormGDash();
}


var GLOBAL_user;
var authenticationListener;

function ShowButtons() {
document.getElementById("Loginbuttonbox").hidden = true;
document.getElementById("Logintext").innerHTML = "Thank you for logging in!";
document.getElementById("Games").hidden = false;

}

function fb_popuplogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
///creates a google login popup
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details as global value
    console.log("User has logged in.");
        ShowButtons();
  });
}


function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_HandleLogin);
  document.getElementById("Login").style.display = "none";
  ShowButtons()
}

function fb_HandleLogin(_user) {
///detects if a user is already logged in or not
  if (_user) {
    console.log("User is logged in.");
    GLOBAL_user = _user; //save the user details as global value
    writeFormStartUp();
    ShowButtons();
  } else {
    console.log("User is NOT logged in, starting the popup process.");
    fb_popuplogin();
  }
}

function fb_logout() {
  //logs the user out
  authenticationListener();
  firebase.auth().signOut();
  document.getElementById("Logout").style.display = "none";
  document.getElementById("Login").style.display = "block";
}

