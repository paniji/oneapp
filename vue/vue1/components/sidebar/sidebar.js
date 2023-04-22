import Tabs from '../tabs/tab.js'
import TreeView from '../treeview/treeview.js' 
import Button from '../button/button.js' 

export default {
    name: 'Sidebar',
    components: {
        Tabs,
        TreeView,
        Button
    },
    template: `
    <div>
    <nav class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
      <ul>
        <li v-for="(item, index) in items" :key="index" class="sidebar__item" :class="{ 'is-active': activeIndex === index }" @click="setActive(index)">
          <span v-if="!isCollapsed">{{ item.title }}</span>
          <i v-else class="fas" :class="item.icon"></i>
        </li>
      </ul>
    </nav>
    <main class="content">
      <h1>{{ items[activeIndex].title }}</h1>
      <p>{{ items[activeIndex].content }}</p>
      <TreeView v-if="items[activeIndex].tree" :items="items[activeIndex].tree"></TreeView>
      <Tabs v-if="items[activeIndex].tabs" :tabs="items[activeIndex].tabs"></Tabs>
      <Button btnClass="button is-primary" label="test"></Button>
    </main>
    </div>
    `,
    data() {
        return {
            isCollapsed: false,
            activeIndex: 0,
            items: [
                {
                    title: 'Organization',
                    content: 'This is the content for the Organization page.',
                    icon: 'fa-tachometer-alt',
                    tree: [
                        {
                          label: 'Item 1',
                          children: [
                            {
                              label: 'Item 1.1'
                            },
                            {
                              label: 'Item 1.2',
                              children: [
                                {
                                  label: 'Item 1.2.1'
                                },
                                {
                                  label: 'Item 1.2.2'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Item 2',
                          children: [
                            {
                              label: 'Item 2.1'
                            },
                            {
                              label: 'Item 2.2'
                            }
                          ]
                        }
                      ]
                },
                {
                    title: 'Dashboard',
                    content: 'This is the content for the Dashboard page.',
                    icon: 'fa-tachometer-alt',
                    tabs: [
                        {
                            title: 'Dash 1',
                            content: {
                                columns: [
                                    { id: 1, title: 'Dash1', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },

                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'aaaaa', age: 30, email: 'aaan@example.com' },
                                    { id: 2, name: 'bbbbb', age: 25, email: 'bbb@example.com' },

                                    // add as many rows as you need
                                ]
                            }
                        },
                        {
                            title: 'Dash 2',
                            content: {
                                columns: [
                                    { id: 1, title: 'dash2', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },
                                    { id: 3, title: 'Email', field: 'email' },
                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
                                    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                                    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
                                    // add as many rows as you need
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'Orders',
                    content: 'This is the content for the Orders page.',
                    icon: 'fa-shopping-cart',
                    tabs: [
                        {
                            title: 'Ord 1',
                            content: {
                                columns: [
                                    { id: 1, title: 'Name', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },
                                    { id: 3, title: 'Email', field: 'email' },
                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
                                    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                                    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
                                    // add as many rows as you need
                                ]
                            }
                        },
                        {
                            title: 'Ord 2',
                            content: {
                                columns: [
                                    { id: 1, title: 'Name', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },
                                    { id: 3, title: 'Email', field: 'email' },
                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
                                    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                                    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
                                    // add as many rows as you need
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'Products',
                    content: 'This is the content for the Products page.',
                    icon: 'fa-box',
                    tabs: [
                        {
                            title: 'Prod 1',
                            content: {
                                columns: [
                                    { id: 1, title: 'Name', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },
                                    { id: 3, title: 'Email', field: 'email' },
                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
                                    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                                    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
                                    // add as many rows as you need
                                ]
                            }
                        },
                        {
                            title: 'Prod 2',
                            content: {
                                columns: [
                                    { id: 1, title: 'Name', field: 'name' },
                                    { id: 2, title: 'Age', field: 'age' },
                                    { id: 3, title: 'Email', field: 'email' },
                                    // add as many columns as you need
                                ],
                                rows: [
                                    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
                                    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                                    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
                                    // add as many rows as you need
                                ]
                            }
                        }
                    ]
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
    },
    styles: `
    <style>
    .sidebar {
      height: 100vh;
      width: 200px;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fafafa;
      box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
    }

    .sidebar.is-collapsed {
      width: 60px;
    }

    .sidebar__item {
      padding: 10px;
      transition: all 0.3s ease-in-out;
    }

    .sidebar__item:hover {
      background-color: #e6e6e6;
    }

    .sidebar__item.is-active {
      background-color: #e6e6e6;
    }

    .content {
      margin-left: 200px;
      padding: 20px;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 60px;
      }

      .sidebar.is-collapsed .sidebar__item span {
        display: none;
      }

      .sidebar.is-collapsed .sidebar__item i {
        font-size: 24px;
        margin-left: 18px;
      }

      .content {
        margin-left: 60px;
      }
    }
  </style>
  `
};
