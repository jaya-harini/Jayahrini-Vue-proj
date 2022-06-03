<template>
  <div class="mydev">
    <h1>Favourite Data </h1>
    <div>
      <input type="text" v-model="searchInput" placeholder="Search..." />
      
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tdata,ind) in favdata1" :key="ind">
            <td>
              <img :src="tdata.avatar" width="50" height="50"/>
            </td>
            <td>{{tdata.email}}</td>
            <td>{{tdata.first_name}}</td>
            <td>{{tdata.last_name}}</td>
            <td>{{tdata.id}}</td>
          </tr>
        </tbody>
      </table>
      <div>Favorite Count {{this.favData.length}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  
  computed: {
    ...mapGetters(["taskDataGetter", "favDataGetter"]),
    favdata1: function () {
      var data =  this.favData.filter(
          (element) =>
            element.email.includes(this.searchInput) ||
            element.first_name.includes(this.searchInput) ||
            element.last_name.includes(this.searchInput) 
        );
      return data;
    },
  },
  mounted(){

  },
  watch: {
    taskDataGetter() {
      this.taskData = this.taskDataGetter.data;
    },
    favDataGetter() {
      this.favData = this.favDataGetter;
    },
    deep: true,
  },
  data() {
    return {
      taskData : [],
      favData : [],
      searchInput : ""
    };
  },
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
</style>