//filter, header and course

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

//Course Component
Vue.component('course-post', {
    props: ['course-template'],
    template: `
    <div class="course-post">     
    <h3>{{ post.title }}</h3>     
    <button>       
    Enlarge text     
    </button>     
    <div v-html="post.content"></div>   
    </div> 
    `
})

new Vue({
    el: '#header-template',
    data: function () {
        return {
            logo: 'Finder'
        }
    }
})