import Sidebar from './sidebar/sidebar.js'
import Navbar from './navbar/navbar.js'

export default {
    name: 'LandingPage',
    components: {
        Navbar,
        Sidebar
    },
    template: `
    <Navbar/>
    <Sidebar/>
    `,
    data() {
        return {}
    },
    props: {

    },
    methods: {
        setActive(index) {
            this.activeIndex = index
        }
    },
    mounted() {
        console.log('Sidebar component mounted.')
    },
    styles: `
    <style>

  </style>
  `
};
