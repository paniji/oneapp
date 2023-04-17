// import Button from '../button/button.js'

export default {
    name: 'JsonEditor',
    // components: {
    //   Button
    // },
    template: `
    <div>
        <textarea class="textarea" placeholder='{ "glossary": 1 }' rows="10" v-model="jsonData"></textarea>
    </div>
    `,
    data() {
        return {
            jsonData: {}
        }
      },
    watch: {
        jsonData: {
          handler(newVal) {
            try {
              this.jsonData = JSON.stringify(jsonlint.parse(newVal), null, 2);
              //print(this.jsonData)
            } catch (e) {
              console.error(e);
            }
          },
          immediate: true
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
