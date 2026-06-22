/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_authenticate() {
  // authenticate with Google
}

function fb_error() {
  // Don't forget your error handling!
}

function writeForm() {
  ///Writes and updates data for DtB into firebase
  firebase.database().ref('/users/' + GLOBAL_user.uid).update(
    {
      Email: GLOBAL_user.email,
      Pfp: GLOBAL_user.photoURL,
      DisplayName: GLOBAL_user.displayName,
      DodgetheBallsScore: score,
    }
  )
  writeHighScoreForm(score);
  document.getElementById("DodgeScore").innerHTML = "Your last Score was: " + score;
}


async function writeHighScoreForm(_score) {
  ///Writes high scores for DtB!

  const DtBHSpath = '/users/' + GLOBAL_user.uid + '/DodgetheBallsHighScore';
  console.log("Reading from path:", DtBHSpath);
  ///checks if the path exists
  try {
    const snapshot = await firebase.database().ref(DtBHSpath).once('value');
    ///if it exists, check if new score is higher than the old one
    if (snapshot.exists()) {
      const currentDtBHighScore = snapshot.val();
      if (_score > currentDtBHighScore) {
        await firebase.database().ref('/users/' + GLOBAL_user.uid).update(
          {
            DodgetheBallsHighScore: _score,
          }
        );
        console.log(_score);
        ScoreReset();
      }
    }
    ///if path does not exist, create it and set the first high score
    else {
      await firebase.database().ref('/users/' + GLOBAL_user.uid).update(
        {
          DodgetheBallsHighScore: _score,
        }
      );
      console.log(_score);
      ScoreReset();
    }
  }

  catch (error) {
    console.log("WARNING CODE ERROR DETECTED");
    console.log(error);
  };

}

async function writeHighScoreFormGDash(_score) {
  ///Writes high scores for GDash!
  const GDashHSpath = firebase.database().ref('/users/' + GLOBAL_user.uid + '/GDashHighScore');
  ///checks if the path exists
  try {
    const snapshot2 = firebase.database().get(GDashHSpath);
    ///if it exists, check if new score is higher than the old one
    if (snapshot2.exists()) {
      const currentGDashHighScore = snapshot2.val();
      if (_score > currentGDashHighScore) {
        firebase.database().ref('/users/' + GLOBAL_user.uid).update(
          {
            GDashHighScore: _score,
          }
        )
      }
    }
    ///if path does not exist, create it and set the first high score
    else {
      firebase.database().ref('/users/' + GLOBAL_user.uid).update(
        {
          GDashHighScore: _score,
        }
      )
    }
  }


  catch (error) {
    console.log("WARNING CODE ERROR DETECTED");
  };
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
  writeHighScoreFormGDash(score);
  document.getElementById("GDashScoreText").innerHTML = "Your last Score was: " + score;
}

function writeFormStartUp() {
  ///Writes and updates data on login to show a user has logged in even if they never played a game
  firebase.database().ref('/users/' + GLOBAL_user.uid).update(
    {
      Email: GLOBAL_user.email,
      Pfp: GLOBAL_user.photoURL,
      DisplayName: GLOBAL_user.displayName,
    }
  )
}

function writeUserAge() {
  ///Writes and updates data when submitting the form for age and username
  const UserAge = document.getElementById("FormAge").value;
  const UserName = document.getElementById("name").value;
  firebase.database().ref('/users/' + GLOBAL_user.uid).update(
    {
      Age: UserAge,
      Username: UserName,
    }
  )
  ShowButtons();
}

function showform() {
  document.getElementById("shipForm").hidden = false;
  document.getElementById("submit").hidden = false;
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


function fb_popuplogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  ///creates a google login popup
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details as global value
    console.log("User has logged in.");
  });
}


function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_HandleLogin);
  document.getElementById("Logout").style.display = "block";
  document.getElementById("Login").style.display = "none";
  showform();
}

function fb_HandleLogin(_user) {
  ///detects if a user is already logged in or not
  if (_user) {
    console.log("User is logged in.");
    GLOBAL_user = _user; //save the user details as global value
    writeFormStartUp();
    document.getElementById("formbox").hidden = false;
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

