export default {
    name: 'Navbar',
    template: `

    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          </a>
      
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>
      
            <a class="navbar-item">
              Documentation
            </a>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
      
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
      
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">

                <a class="button is-primary">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

    `,
    data() {
        return {
            isCollapsed: false,
            activeIndex: 0,
            items: [
                {
                    title: 'Dashboard',
                    content: 'This is the content for the Dashboard page.',
                    icon: 'fa-tachometer-alt'
                },
                {
                    title: 'Orders',
                    content: 'This is the content for the Orders page.',
                    icon: 'fa-shopping-cart'
                },
                {
                    title: 'Products',
                    content: 'This is the content for the Products page.',
                    icon: 'fa-box'
                },
            ]
        }
    },
    // props: {
    //     items: {
    //         type: Array,
    //         required: true
    //     },
    //     isCollapsed: {
    //         type: Boolean,
    //         default: false
    //     },
    //     activeIndex: {
    //         type: Number,
    //         default: 0
    //     }
    // },
    methods: {
        setActive(index) {
            this.activeIndex = index
        }
    },
    mounted() {
        console.log('Sidebar component mounted.')
    }
};
