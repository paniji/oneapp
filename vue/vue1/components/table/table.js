import TableContainer    from './tableContainer.js'

export default {
    name: 'Table',
    components: {
        TableContainer
      },
    template: `
 
        <TableContainer :columns="columns" :rows="rows"/>
        
    `,
    data() {
        return {
            // columns: [
            //     { id: 1, title: 'Name', field: 'name' },
            //     { id: 2, title: 'Age', field: 'age' },
            //     { id: 3, title: 'Email', field: 'email' },
            //     // add as many columns as you need
            //   ],
            //   rows: [
            //     { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
            //     { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
            //     { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
            //     // add as many rows as you need
            //   ]
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
