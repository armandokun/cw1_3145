//filter, header and course

//array for training
var courses = [
  { topic: "math", location: "hendon", price: 100 },
  { topic: "math", location: "colindale", price: 80 },
  { topic: "math", location: "brent cross", price: 90 },
  { topic: "math", location: "golders green", price: 120 },
  { topic: "english", location: "hendon", price: 110 },
  { topic: "english", location: "colindale", price: 90 },
  { topic: "english", location: "brent cross", price: 90 },
  { topic: "english", location: "golders green", price: 130 },
  { topic: "piano", location: "hendon", price: 120 },
  { topic: "piano", location: "golders green", price: 140 }
];

//Header Component
Vue.component("page-header", {
  template: `
    <div class="page-header-template">
    <img src="./img/header-logo.png" alt='Logo in the Header' id="headerLogo">
    <input placeholder="Search" type="text">
    <div id='button-left-alignment'>
    <a class="button" href="#popup2">Log In</a>
    <a class="button" href="#popup1">Sign In</a>
    <button>Shopping Cart</button>
    </div>
    </div>
    `
});

//Header Instance
new Vue({
  el: "#header-template"
});

//Filter Instance
var filterApp = new Vue({
  el: "#filter",
  data: {
    courses: courses,
    selectedTopic: [],
    selectedLocation: []
  },
  computed: {
    topics: function() {
      // return an array of all the topics
      return [...new Set(this.courses.map(x => x.topic))];
    },
    locations: function() {
      return [...new Set(this.courses.map(x => x.location))];
    }
  }
});

//Course Instance
var courseApp = new Vue({
  el: "#course-loop",
  data: {
    courses: courses
  },
  methods: {
    reset: function() {
      filterApp.selectedTopic = [];
      filterApp.selectedLocation = [];
    }
  },
  computed: {
    filteredCourses: function() {
      var topics = filterApp.selectedTopic,
        locations = filterApp.selectedLocation;
      return this.courses.filter(function(course) {
        var topicMatch = false,
          locationMatch = false;
        if (topics.length > 0) {
          if (topics.includes(course.topic)) {
            topicMatch = true;
          }
        } else {
          topicMatch = true;
        }
        if (locations.length > 0) {
          if (locations.includes(course.location)) {
            locationMatch = true;
          }
        } else {
          locationMatch = true;
        }
        return topicMatch && locationMatch;
      });
    }
  }
});

//Sign up Instance
var signupApp = new Vue({
  el: "#signup",
  data: {
    email: "",
    password: ""
  },
  methods: {
    onSubmit: function() {
      // check if the email already exists
      var users = "";
      var newEmail = this.email;
      if (localStorage.getItem("users")) {
        // 'users' is an array of objects
        users = JSON.parse(localStorage.getItem("users"));
      }
      if (users) {
        if (
          users.some(function(user) {
            return user.email === newEmail;
          })
        ) {
          alert("Email already exists!");
          return;
        }
        users.push({ email: newEmail, password: this.password });
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        users = [{ email: newEmail, password: this.password }];
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
    password: ""
  },
  methods: {
    onSubmit: function() {
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
          users.some(function(user) {
            return user.email === existingEmail && user.password === existingPassword;
          })
        ) {
          alert("Congrats!");
          return;
        }
        alert("The email or password is incorrect");
      }
    }
  }
});
