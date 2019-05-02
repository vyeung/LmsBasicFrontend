function checkCredentials() {
  var usernameInput = document.getElementById("adminUsername").value;
  var passwordInput = document.getElementById("adminPassword").value;

  var jsonString = localStorage.getItem("users");
  var jsonObj = JSON.parse(jsonString);

  var flag = 0;
  for(var i=0; i<jsonObj.admins.length; i++) {
    if(jsonObj.admins[i].userName===usernameInput && jsonObj.admins[i].password===passwordInput) {
      flag = 1;
      break;
    }
  }

  if(flag === 0) {
    alert("Invalid Credentials! Try Again.");
  }
  else {
    window.location.href = "adminDash.html";
  }
}