
import Table from '../table/table.js'

export default {
    name: 'Tab',
    components: {
        Table
    },
    template: `
    <div>
    <div class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'is-active': activeTab === index }"
            @click="activeTab = index">
          <a>{{ tab.title }}</a>
        </li>
      </ul>
    </div>
    <div class="custom-content" 
            v-for="(tab, index) in tabs" 
            :key="index" 
            v-show="activeTab === index">
    
        <Table :rows="tab.content.rows" :columns="tab.content.columns"></Table>
    </div>

  </div>
    `,
    data() {
        return {
            activeTab: 0,
            // tabs: [
            //     { title: 'Tab 1', content: 'Tab 1 Content' },
            //     { title: 'Tab 2', content: 'Tab 2 Content' },
            //     { title: 'Tab 3', content: 'Tab 3 Content' },
            //     { title: 'Tab 4', content: 'Tab 4 Content' }
            // ]
        }
    },
    props: ['tabs'],
    methods: {
        // setActive(index) {
        //     this.activeIndex = index
        // }
    },
    mounted() {
        // console.log('Sidebar component mounted.')
    },
    styles: `
    <style>

  </style>
  `
};

// :href="'#tab' + index"
//          :id="'#tab' + index"

{/* <div class="custom-content">
<p>{{ tabs[activeTab].content }}</p>
</main>
</div> */}