import MainMap from '../views/MainMap.vue'
import About from '../views/About.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import AddPost from '../views/AddPost.vue'
import Gallery from '../views/Gallery.vue'

const routes = [{
        path: '/',
        name: 'MainMap',
        component: MainMap
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/addPost',
        name: 'AddPost',
        component: AddPost
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery
    }
]

export default routes