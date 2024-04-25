<template>
  <NavBar />
    <div >
      <!-- Search Bar -->
      <div class="input-group mb-3" >
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="searchTerm"
        />
        <div class="search button" >
          <button class="btn btn-outline-secondary" type="button" @click="clearSearch">Clear</button>
        </div>
        
      </div>
      <v-container>
        <div class="row">
          <div class="col-md-3 col-sm-3 col-xs-12">
            <Card>
              <template #title>Filters</template>
              <Divider />
              <template #content>
                <Tree 
                  v-model:selectionKeys="selectedKeys" 
                  :value="items" 
                  selection-mode="checkbox"
                  @node-select="onNodeToggle"
                  @node-unselect="onNodeToggle"
                  ></Tree>
              </template>
  
            </Card>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12">
  
            <Divider />
  
            <div class="row text-center">
              <div class="col-md-3 col-sm-6 col-xs-12 card-hover" :key="activity['Activity ID']" v-for="activity in filteredActivities">

                  <Card 
                    class="mx-auto d-flex flex-column"
                    color="grey lighten-4"
                    max-width="600"

                    @click="accessPage(activity)"
                    style="width: 100%; max-width: 300px; height: 450px; margin-bottom: 10px; margin-top: 10px;"
                  >
                    <template #header>
                      <img class="w-100"
                      alt="activity image"
                      :src= "getImage(activity['Activity ID'])" />
                    </template>
                    
                    <template #title>{{activity.Type}} </template>
                    <template #subtitle>{{activity['Location']}} </template>
                    <template #content>
                      <p class="m-0">
                        {{activity.Description}}
                      </p>
                    </template>
                    <template #footer>
                      Price: ${{activity.Cost}}
                    </template>
                  </Card>

              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
    <Footer />
</template>
  
<style>
    .v-card--reveal {
      align-items: center;
      bottom: 0;
      justify-content: center;
      opacity: .8;
      position: absolute;
      width: 100%;
    }
</style>

<script>
  import Card from 'primevue/card';
  import Divider from 'primevue/divider';
  import firebaseTools from '../firebase.js';
  import { collection, getDocs } from 'firebase/firestore';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  const db = firebaseTools.db;

  export default {
    async mounted() {
      await this.retrieveData();
    },

    components: {
      NavBar,
      Card,
      Footer
    },

    methods:{
      getImage(id) {
          return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
      },
      
      // get data of activites from database
      async retrieveData() {
        const activityCollection = collection(db, 'activities');
        try {
          const querySnapshot = await getDocs(activityCollection);
          const allActivities = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Split the Tags string into an array of tags
            data.Tags = data.Tags.split(',').map(tag => tag.trim());
            return data;
          });
          this.activities = allActivities;
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error, e.g., show a message to the user or retry fetching data
        }
      },


      onNodeToggle(event) {
        const node = event;
        switch (node.key.charAt(0)) {
          case '1':
            if (node.label === 'Interests' && !this.selectedTags.includes('Interests')) {
              // If 'Interests' is selected, select all children
              this.selectedTags.push('Interests');
              this.selectedTags = this.selectedTags.concat(this.items[0].children.filter(child => !this.selectedTags.includes(child.label)).map(child => child.label));
            } else if (node.label === 'Interests' && this.selectedTags.includes('Interests')) {
              // If 'Interests' is deselected, deselect all children
              this.selectedTags = [];
            } else {
              // If a child node is selected, add or remove it from selectedTags
              if (this.selectedTags.includes(node.label)) {
                // Node is already selected, so remove it from selectedTags
                this.selectedTags = this.selectedTags.filter(tag => tag !== node.label);
                if (this.selectedTags.includes('Interests')) {
                  // If 'Interests' is selected, deselect it
                  this.selectedTags = this.selectedTags.filter(tag => tag !== 'Interests');
                }
              } else {
                // Node is not selected, so add it to selectedTags
                this.selectedTags.push(node.label);
                if (this.selectedTags.length === this.items[0].children.length) {
                  // If all children are selected, select 'Interests'
                  this.selectedTags.push('Interests');
                }
              }
            }
            console.log('Selected Tags:', this.selectedTags);
            break;
          case '2':
            if (node.label === 'Price' && !this.selectedPriceRange.includes('Price')) {
              // If 'Price' is selected, select all children
              this.selectedPriceRange.push('Price');
              this.selectedPriceRange = this.selectedPriceRange.concat(this.items[1].children.filter(child => !this.selectedPriceRange.includes(child.label)).map(child => child.label));
            } else if (node.label === 'Price' && this.selectedPriceRange.includes('Price')) {
              // If 'Price' is deselected, deselect all children
              this.selectedPriceRange = [];
            } else {
              // If a child node is selected, add or remove it from selectedPriceRange
              if (this.selectedPriceRange.includes(node.label)) {
                // Node is already selected, so remove it from selectedPriceRange
                this.selectedPriceRange = this.selectedPriceRange.filter(range => range !== node.label);
                if (this.selectedPriceRange.includes('Price')) {
                  // If 'Price' is selected, deselect it
                  this.selectedPriceRange = this.selectedPriceRange.filter(range => range !== 'Price');
                }
              } else {
                // Node is not selected, so add it to selectedPriceRange
                this.selectedPriceRange.push(node.label);
                if (this.selectedPriceRange.length === this.items[1].children.length) {
                  // If all children are selected, select 'Price'
                  this.selectedPriceRange.push('Price');
                }
              }
            }
            console.log('Selected Price Range:', this.selectedPriceRange);
            break;
          case '3':
            if (node.label === 'Area' && !this.selectedArea.includes('Area')) {
              // If 'Area' is selected, select all children
              this.selectedArea.push('Area');
              this.selectedArea = this.selectedArea.concat(this.items[2].children.filter(child => !this.selectedArea.includes(child.label)).map(child => child.label));
            } else if (node.label === 'Area' && this.selectedArea.includes('Area')) {
              // If 'Area' is deselected, deselect all children
              this.selectedArea = [];
            } else {
              // If a child node is selected, add or remove it from selectedArea
              if (this.selectedArea.includes(node.label)) {
                // Node is already selected, so remove it from selectedArea
                this.selectedArea = this.selectedArea.filter(area => area !== node.label);
                if (this.selectedArea.includes('Area')) {
                  // If 'Area' is selected, deselect it
                  this.selectedArea = this.selectedArea.filter(area => area !== 'Area');
                }
              } else {
                // Node is not selected, so add it to selectedArea
                this.selectedArea.push(node.label);
                if (this.selectedArea.length === this.items[2].children.length) {
                  // If all children are selected, select 'Area'
                  this.selectedArea.push('Area');
                }
              }
            }
            console.log('Selected Area:', this.selectedArea);
            break;
          
        }
      },

      // to access page upon clicking the activity
      accessPage(activity) {
        console.log("Directed to the activity page");
        this.$router.push({ 
          name: 'Activity Page', 
          query: {
            id: activity["Activity ID"]
          } 
        })
      },

      // performSearch() {
      //   if (this.searchTerm.trim() === '') {
      //     // If search term is empty, show all activities
      //     this.filteredActivities = this.activities;
      //   } else {
      //     // Filter activities based on search term
      //     const searchTermLower = this.searchTerm.toLowerCase();
      //     // Filter activities based on partial match or full match of search term with activity description
      //     this.filteredActivities = this.activities.filter(activity =>
      //       activity.Location.toLowerCase().includes(searchTermLower)
      //     );
      //   }
      // },

      clearSearch() {
        this.searchTerm = '';
      },
    },

    data: () => ({
      searchTerm: '',
      selectedKeys: [],
      selectedTags: [],
      selectedPriceRange: [],
      selectedArea: [],
      select:'Popularity',
      options: [
          'Default',
          'Popularity',
          'Relevance',
          'Price: Low to High',
          'Price: High to Low',
      ],
      page:1,
      activities: null,
      items: [
        {
          key: '1',
          label: 'Interests',
          children: [
            { key: '1-1', label: 'Nature' },
            { key: '1-2', label: 'Guided Tour' },
            { key: '1-3', label: 'Cooking' },
            { key: '1-4', label: 'Cultural' },
            { key: '1-5', label: 'Fitness' },
            { key: '1-6', label: 'Wellness' },
            { key: '1-7', label: 'Art' },
            { key: '1-8', label: 'Workshop' },
            { key: '1-9', label: 'History' },
            { key: '1-10', label: 'Wildlife' },
            { key: '1-11', label: 'Entertainment' },
            { key: '1-12', label: 'Social' },
            { key: '1-13', label: 'Sightseeing' },
            { key: '1-14', label: 'Dance' },
            { key: '1-15', label: 'Food' },
            { key: '1-16', label: 'Music' },
            { key: '1-17', label: 'Water Sports' },
            { key: '1-18', label: 'Culture' },
          ],
        },

        {
          key: '2',
          label: 'Price',
          children: [
            { key: '2-1', label: 'Free' },
            { key: '2-2', label: '$1 - $20' },
            { key: '2-3', label: '$21 - $40' },
            { key: '2-4', label: '$41 - $60' },
            { key: '2-5', label: '$61 - $80' },
            { key: '2-6', label: '$80+' },
          ],
        },

        {
          key: '3',
          label: 'Area',
          children: [
            { key: '3-1', label: 'Central' },
            { key: '3-2', label: 'East' },
            { key: '3-3', label: 'North' },
            { key: '3-4', label: 'North-East' },
            { key: '3-5', label: 'West' },
          ],
        },

      ],
      }),
    
    computed: {
  filteredActivities() {
    console.log('Search Term:', this.searchTerm);
    if (!this.searchTerm && this.selectedTags.length === 0 && this.selectedPriceRange.length === 0 && this.selectedArea.length === 0) {
      return this.activities;
    }

    let filteredByTags = this.activities; // Initialize the variable outside the conditionals
    let filteredByPrice = this.activities;
    let filteredByArea = this.activities;
    let filteredBySearch = this.activities;

    // Log selected tags
    // console.log('Selected Tags:', this.selectedKeys);
    if (this.selectedTags.length !== 0) {
      filteredByTags = this.activities.filter(activity => {
        // Check if the activity's tags contain all the selectedTags
        const containsAllTags = this.selectedTags.some(tag => activity.Tags.includes(tag));
        // console.log(`Activity ${activity["Activity ID"]} contains all tags: ${containsAllTags}`);
        return containsAllTags;
      });
    } else {
      filteredByTags = this.activities;
    }

    // Log activities filtered by tags
    // console.log('Activities filtered by tags:', filteredByTags);
    if (this.selectedPriceRange.length !== 0) {
      filteredByPrice = filteredByTags.filter(activity => {
        // Check if the activity's price is within the selected price range
        return this.selectedPriceRange.some(range => {
          const cost = parseInt(activity.Cost);
          switch (range) {
            case 'Free':
              return cost === 0;
            case '$1 - $20':
              return cost >= 1 && cost <= 20;
            case '$21 - $40':
              return cost >= 21 && cost <= 40;
            case '$41 - $60':
              return cost >= 41 && cost <= 60;
            case '$61 - $80':
              return cost >= 61 && cost <= 80;
            case '$80+':
              return cost >= 81;
            default:
              return false;
          }
        });
      });
    } else {
      filteredByPrice = filteredByTags;
    }

    if (this.selectedArea.length !== 0) {
      filteredByArea = filteredByPrice.filter(activity => {
        // Check if the activity's area is within the selected area
        return this.selectedArea.some(area => {
          return activity.Area.includes(area);
        });
      });
    } else {
      filteredByArea = filteredByPrice;
    }

    if (this.searchTerm.trim() !== '') {
      filteredBySearch = filteredByArea.filter(activity => {
        // Check if the activity's description contains the search term
        return activity.Type.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    } else {
      filteredBySearch = filteredByArea;
    }
    // Log activities filtered by search term
    // console.log('Activities filtered by search term:', filteredBySearch);

    return filteredBySearch;
  },
},


  }
      
</script>

<style>
.card-hover:hover {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  cursor: pointer;
}
</style>
  