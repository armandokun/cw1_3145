  //Sign up Instance
  var signupApp = new Vue({
    el: "#signup",
    data: {
      userType: "user",
      email: "",
      password: "",
      on: false
    },
    methods: {
      onSubmit: function () {
        // check if the email already exists
        var users = "";
        var newEmail = this.email;
        if (localStorage.getItem("users")) {
          // 'users' is an array of objects
          users = JSON.parse(localStorage.getItem("users"));
        }
        if (users) {
          if (users.some(function (user) { return user.email === newEmail; })) {
            alert("Email already exists!");
            return;
          }
          users.push({ type: this.userType, email: newEmail, password: this.password, on: this.on });
          localStorage.setItem("users", JSON.stringify(users));
        } else {
          users = [{ type: this.userType, email: newEmail, password: this.password, on: this.on }];
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }
  });
  
  //Log In Instance
  var logInApp = new Vue({
    el: "#login",
    data: {
      email: "",
      password: "",
      on: Boolean
    },
    methods: {
      onSubmit: function () {
        // check if the email already exists
        var users = "";
        var existingEmail = this.email;
        var existingPassword = this.password;
        if (localStorage.getItem("users")) {
          // 'users' is an array of objects
          users = JSON.parse(localStorage.getItem("users"));
        }
        if (users) {
          if (
            users.some(function (user) {
              return user.email === existingEmail && user.password === existingPassword;
            })
          ) {
            //takes an index of the user of users array and changes the state value to logged in
            var index = users.findIndex(obj => obj.email === existingEmail && obj.password === existingPassword);
            users[index].on = true;
            localStorage.setItem("users", JSON.stringify(users));
            return;
          } else
            alert("The email or password is incorrect");
        }
      }
    }
  });