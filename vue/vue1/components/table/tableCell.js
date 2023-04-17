// import Button from '../button/button.js'

export default {
    name: 'TableCell',
    // components: {
    //   Button
    // },
    template: `
    <td>
        <component :is="component" :data="data"></component>
    </td>
    `,
    props: {
        component: {
            type: Object,
            required: true
        }
    },

    data: {
        type: [String, Number, Boolean, Object, Array],
        required: true
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
