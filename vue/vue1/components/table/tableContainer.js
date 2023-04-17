// import Button from '../button/button.js'

export default {
    name: 'TableContainer',
    // components: {
    //   Button
    // },
    template: `
    <div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
            <th v-for="column in columns" :key="column.id">{{ column.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
            <td v-for="column in columns" :key="column.id">{{ row[column.field] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    `,
    data() {
        return {

        }
    },
    props: {
        columns: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        }

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
