
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
    <div id='button-left-alignment'>
    <div v-if=!isOn>
    <a class="button" href="#popup2">Log In</a>
    <a class="button" href="#popup1">Sign Up</a>
    </div>
    <div v-else>
    <p>email: {{ userInfo.email }}</p>
    <button v-if="isOn" @click="logOut">Log Out</button>
    <button v-if="isOn">Shopping Cart</button>
    </div>
    </div>
    </div>
    `,
  methods: {
    logOut: function () {
      users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        if (
          users.some(function (user) {
            return user.on === true;
          })
        ) {
          //takes an index of the user of users array and changes the state value to logged in
          var index = users.findIndex(obj => obj.on === true);
          users[index].on = false;
          localStorage.setItem("users", JSON.stringify(users));
          window.location.href = "/index.html";
          return;
        }
      }
    }
  },
  computed: {
    isOn: function () {
      users = JSON.parse(localStorage.getItem("users"))
      if (users) {
        if (users.some(function (user) { return user.on === true })) {return true;}
      } else 
      return false;
    },
    userInfo: function () {
      users = JSON.parse(localStorage.getItem("users"));
      var index = users.findIndex(obj => obj.on === true);
      return users[index];
    }
  }
}
);

//Header Instance
var headerApp = new Vue({
  el: "#header-template"
});

//Filter Instance
var filterApp = new Vue({
  el: "#filter",
  data: {
    courses: courses,
    selectedTopic: [],
    selectedPrice: []
  },
  computed: {
    topics: function () {
      // return an array of all the topics
      return [...new Set(this.courses.map(x => x.topic))];
    },
    prices: function () {
      return [...new Set(this.courses.map(x => x.price))];
    }
  }
});

//Course Instance
var courseApp = new Vue({
  el: "#course-loop",
  data: {
    courses: courses,
    search: '',
    selected: 'A - Z'
  },
  methods: {
    reset: function () {
      filterApp.selectedTopic = [];
      filterApp.selectedPrice = [];
      this.search = '';
      this.selected = ''
    }
  },
  computed: {
    //filters when clicked on the filter
    filteredCourses: function () {
      var topics = filterApp.selectedTopic,
        prices = filterApp.selectedPrice.map(Number);
      return this.courses.filter(function (course) {
        var topicMatch = false,
          priceMatch = false;
        if (topics.length > 0) {
          if (topics.includes(course.topic)) {
            topicMatch = true;
          }
        } else {
          topicMatch = true;
        }
        if (prices.length > 0) {
          if (prices.includes(course.price)) {
            priceMatch = true;
          }
        } else {
          priceMatch = true;
        }
        return topicMatch && priceMatch;
      });
    },
    //filters when searching for a topic
    filteredList: function () {
      return this.filteredCourses.filter(course => {
        return course.topic.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    //sorts through the search and filter that are above
    sortedArray: function() {
      //ascending order
      function asc(a, b) {
        if (a.topic < b.topic)
          return -1;
        if (a.topic > b.topic)
          return 1;
        return 0;
      }

      ascOrder = this.filteredList.sort(asc);

      // low-high price order
      function lhp(c, d) {
        if (c.price < d.price)
          return -1;
        if (c.price > d.price)
          return 1;
        return 0;
      }

      switch(this.selected) {
        case 'Z - A': return ascOrder.reverse(); 
        case 'Low - High': return this.filteredList.sort(lhp);
        case 'High - Low': return this.filteredList.sort(lhp).reverse();
        default: return ascOrder;
      }
    }
  }
});

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