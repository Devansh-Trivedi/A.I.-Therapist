// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCyHJvGiGFy_HtVOIUsIyfGANM9gHYFqB4",
    authDomain: "shikan-a-i-therapist.firebaseapp.com",
    projectId: "shikan-a-i-therapist",
    storageBucket: "shikan-a-i-therapist.appspot.com",
    messagingSenderId: "998604005557",
    appId: "1:998604005557:web:0f66e992212880a9121efc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if( email != "" && password != "")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email,password);

          result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("errorCode: " + errorCode);
            console.log("errorMessage: " + errorMessage);

            window.alert("Error Message: " + errorMessage);

          });
      }
      else
      {
         window.alert("Please fill all the  fields");

      }
  });

  // $("#btn-logout").click(function(){
  //   firebase.auth().signOut();
  // });


$("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();

    if(email != "" && password != "" && cPassword != "")
    {
      if(password == cPassword)
      {
        var result = firebase.auth().createUserWithEmailAndPassword(email,password);
        result.catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log("ErrorCode " + errorcode);
          console.log("Error Message " + errormessage);

          window.alert(errorMessage);

        });
      }

      else{
        window.alert("Password and Confrim Password do not match !!");
      }

    }
    else{
      window.alert("Please Fill all the fields: ");
    }

});
$("#btn-resetPassword").click(function(){
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "")
    {
      var result = firebase.auth().sendPasswordResetEmail(email).then(function(){
        window.alert("Email has been send to you,Please check and verify");
      })
      .catch(function(error){
        var errorCode = error.code;
          var errorMessage = error.message;

          console.log("ErrorCode " + errorcode);
          console.log("Error Message " + errormessage);

          window.alert(errorMessage);

      });
    }
    else{
      window.alert("Please enter your Email first !!");
    }
});

$("#btn-update").click(function(){
  var fname  = $("#firstname").val();
  var sname  = $("#secondname").val();
  var country  = $("#country").val();
  var phone  = $("#phone").val();
  var gender  = $("#gender").val();
  var address  = $("#address").val();

  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);
  
  if(fname != "" && sname != "" && country != "" && phone != "" && gender != "" && address != "")
  {
    var userData=
    {
        "firstname":fname,
        "secondname":sname,
        "country":country,
        "phone":phone,
        "gender":gender,
        "address":address,
    };

    usersRef.set(userData,function(error){
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("ErrorCode " + errorcode);
        console.log("Error Message " + errormessage);

        window.alert(errorMessage);
      }
      else{
          window.alert("Congrulations " + fname + ", you have successfully registered :)");
          window.location.href="MainPage.html";
      }
    });
  }
  else
  {
    window.alert("Please fill all the fields.");
  }

  

});
