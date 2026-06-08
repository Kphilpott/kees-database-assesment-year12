


var GLOBAL_user;
var authenticationListener;

function ShowButtons() {
document.getElementById("Games").hidden = false;
document.getElementById("Loginbuttonbox").hidden = true;
document.getElementById("Logintext").innerHTML = "Thank you for logging in!";

}


function fb_popuplogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details as global value
    console.log("User has logged in.");
  });
}


function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_HandleLogin);
  document.getElementById("Logout").style.display = "block";
  document.getElementById("Login").style.display = "none";
}

function fb_silentLogin() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_HandleLogin);
}


function fb_HandleLogin(_user) {
  if (_user) {
    console.log("User is logged in.");
    GLOBAL_user = _user; //save the user details as global value
    console.log(GLOBAL_user);
    
  } else {
    console.log("User is NOT logged in, starting the popup process.");
    fb_popuplogin();
  }
}

function fb_logout() {
  authenticationListener();
  firebase.auth().signOut();
  document.getElementById("Logout").style.display = "none";
  document.getElementById("Login").style.display = "block";
}

