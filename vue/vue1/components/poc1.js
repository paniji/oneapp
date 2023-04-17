// import Button from '../button/button.js'

export default {
    name: 'Table',
    // components: {
    //   Button
    // },
    template: `
    <div>Hello from table<div/>
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
            ]
        }
    },
    // props: {
    //     items: {
    //         type: Array,
    //         required: true
    //     }
    // },
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
