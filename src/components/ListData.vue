<template>
  <div class="mydev">
    <h1>{{ msg }}</h1>
    
    <div class="right-dev">
      <input type="text" v-model="searchInput" placeholder="Search..." />
      &nbsp;&nbsp;
      <button type="button" @click="renderFavPage" >
        View Favourite Data
      </button>
      <!-- <router-link :to="{ path: '/fav_data/index'}"><span>View Favourite Data</span></router-link> -->
    </div>
    <div>
      
      <table>
        <thead>
          <tr>
            <th>
              <span>Avatar</span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <span>First Name</span>
            </th>
            <th>
              <span>Last Name</span>
            </th>
            <th>
              <span>Id</span>
            </th>
            <th>
              <span>Add To Favourite</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tdata in filteredList" :key="tdata.id">
            <td>
              <img :src="tdata.avatar" width="50" height="50"/>
            </td>
            <td>{{tdata.email}}</td>
            <td>{{tdata.first_name}}</td>
            <td>{{tdata.last_name}}</td>
            <td>{{tdata.id}}</td>
            <td>
              <input type="checkbox" :checked="tdata.fav == true ? 'checked' : ''" :value="tdata.id"  @change="addFav($event,tdata)" >
            </td>
          </tr>
        </tbody>
      </table>
      <span>{{entriesData}} </span>
      <button type="button" @click="previouspage" >
        Previous
      </button>
      <button type="button" @click="nextpage" >
        Next
      </button>
      <span> Rows per page </span>
      <select v-model='limitCount' @change="getData">
          <option label="3" value="3">3</option>
          <option label="5" value="5">5</option>
          <option label="10" value="10">10</option>
          <option label="20" value="20">20</option>
      </select>
    </div>
     <FavouriteData v-show="favPageShow"></FavouriteData>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import FavouriteData from '../view/FavouriteData.vue';
export default {
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["taskDataGetter","favDataGetter"]),
    filteredList: function() {
      
      var data =  this.taskData.filter(
          (element) =>
            element.email.includes(this.searchInput) ||
            element.first_name.includes(this.searchInput) ||
            element.last_name.includes(this.searchInput) 
        );
        return data;
    }

  },
  components: {
    FavouriteData,
  },

  watch: {
    taskDataGetter() {
      this.taskDetails = this.taskDataGetter;
      this.taskData = this.taskDetails.data;
      var start;
      if (this.currentpage == 1) {
        start = 1;
      } else {
        start = this.limitCount * (this.currentpage - 1);
      }
      var end;
      if (this.limitCount * this.currentpage > this.taskDetails.total) {
        end = this.taskDetails.total;
      } else {
        end = this.limitCount * this.currentpage;
      }
      this.entriesData =
        start + "-" + end + " of " + this.taskDetails.total + " entries";      
    },

    favDataGetter() {
      this.favData = this.favDataGetter;
      var index;
      for(var i = 0; i < this.favData.length; i++){
        index = this.taskData.findIndex(d => 
            d.id == this.favData[i].id
        );
        
        if(index != -1){
            this.taskData[index]['fav'] = true;
        }
      }
    },
    deep: true,
  },
  data() {
    return {
      taskDetails : [],
      taskData : [],
      favPageShow : false,
      searchInput : "",
      currentpage: 1,
      limitCount: 6,
      entriesData: "",
      favData:[]
    };
  },
  mounted() {
    this.getData();
  },
  // beforeDestroy(){
  //   this.$store.dispatch("clearState");
  // },
  methods: {
    getData() {
      var postData = {
        page : this.currentpage,
        countPerPage : this.limitCount
      }
        this.$store.dispatch("fetchData",postData).then(
        (response) => {
          this.taskData = response.data;
        },
        (error) => {
          
          console.log(error);
        }
      );
      
    },
    addFav(e,tdata){
      var postData = {
        data : tdata,
        checked : e.target.checked
      }
      this.$store.dispatch("addFavourite", postData)
    },
    renderFavPage(){
      this.favPageShow = true;
    },
    previouspage() {
      if (this.currentpage > 1) {
        this.currentpage--;
      }
      this.getData()
    },
    nextpage() {
      if (this.currentpage < this.taskDetails.total_pages) {
        this.currentpage++;
      }
      this.getData()
    },
  }

}
</script>

<style scoped>
table {
  width: 100%;
}
.mydev {
  margin: 20px 20px 20px 20px;
}
th {
  text-align: left;
}
.right-dev {
	margin: 0px 0px 10px 0px;
}
</style>
