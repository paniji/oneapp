import JsonEditor from '../model/jsonEditor.js'

export default {
    name: 'TreeView',
    components: {
      JsonEditor
    },
    template: `
        <ul class="treeview">
        <li v-for="(item, index) in items" :key="index">
        <div @click="toggle(item)">
            {{ item.label }}
            <span v-if="item.children && !item.isExpanded">[+]</span>
            <span v-if="item.children && item.isExpanded">[-]</span>
        </div>
        <tree-view v-if="item.children && item.isExpanded" :items="item.children" />
        </li>
        </ul>

        <JsonEditor></JsonEditor>
    `,
    props: {
        items: {
          type: Array,
          required: true
        }
      },
    data() {
        return {
          expandedItems: []
        }
    },
    methods: {
        toggle(item) {
          if (item.children) {
            item.isExpanded = !item.isExpanded;
            if (item.isExpanded) {
              this.expandedItems.push(item);
            } else {
              const index = this.expandedItems.indexOf(item);
              if (index > -1) {
                this.expandedItems.splice(index, 1);
              }
            }
          }
        }
    },
    mounted() {
        this.items.forEach(item => {
          if (item.children) {
            item.isExpanded = this.expandedItems.includes(item);
          }
        })
    },
    styles: `
    <style>

  </style>
  `
};
