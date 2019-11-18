//filter, header and course

//array for training
var courses = [
    { 'topic': 'math', 'location': 'hendon', 'price': 100 },
    { 'topic': 'math', 'location': 'colindale', 'price': 80 },
    { 'topic': 'math', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'math', 'location': 'golders green', 'price': 120 },
    { 'topic': 'english', 'location': 'hendon', 'price': 110 },
    { 'topic': 'english', 'location': 'colindale', 'price': 90 },
    { 'topic': 'english', 'location': 'brent cross', 'price': 90 },
    { 'topic': 'english', 'location': 'golders green', 'price': 130 },
    { 'topic': 'piano', 'location': 'hendon', 'price': 120 },
    { 'topic': 'piano', 'location': 'golders green', 'price': 140 }
]

//Header Component
Vue.component('page-header', {
    template: `
    <div class="page-header-template">
    <img src="./img/header-logo.png" alt='Logo in the Header' id="headerLogo">
    <input placeholder="Search" type="text">
    <div id='button-left-alignment'>
        <button>Log In</button>
        <button>Sign In</button>
        <button>Shopping Cart</button>
    </div>
    </div>
    `
})

//Header Instance
new Vue({
    el: '#header-template'
})




var filterApp = new Vue({
    el: '#filter',
    data: {
        courses: courses,
        selectedTopic: [],
        selectedLocation: [],
    },
    computed: {
        topics: function () { // return an array of all the topics
            return [...new Set(this.courses.map(x => x.topic))]
        },
        locations: function () {
            return [...new Set(this.courses.map(x => x.location))]
        }
    }
})

var courseApp = new Vue({
    el: '#course-loop',
    data: {
            courses: courses
    },
    template: `
    <div id="courseList">
    <button v-on:click='reset'>Reset</button>
    <h1>Course list</h1>
    <div v-for="course in filteredCourses" class="course">
        <li v-for='(value, name) in course'>{{name}}: {{value}}</li>
    </div>
    </div>
    `,
    methods: {
        reset: function () {
            this.selectedTopic = [];
            this.selectedLocation = [];
        }
    },
    computed: {
        filteredCourses: function () {
            var topics = this.selectedTopic, locations = this.selectedLocation;
            return this.courses.filter(function (course) {
                var topicMatch = false, locationMatch = false;
                if (topics.length > 0) {
                    if (topics.includes(course.topic)) {
                        topicMatch = true;
                    }
                }
                else {
                    topicMatch = true;
                }
                if (locations.length > 0) {
                    if (locations.includes(course.location)) {
                        locationMatch = true;
                    }
                }
                else {
                    locationMatch = true;
                }
                return topicMatch && locationMatch
            })
        }
    }
})
