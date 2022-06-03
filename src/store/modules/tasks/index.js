import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
    taskData:[],
    favouriteData:[],
};
const mutations = {
    TASK_DATA(state, data) {
        var index;
          for(var i = 0; i < state.favouriteData.length; i++){
            index = data.data.findIndex(d => 
                d.id == state.favouriteData[i].id
            );
            
            if(index != -1){
                data.data[index]['fav'] = true;
            }
          }
        state.taskData = data;
    },
    ADD_FAVOURITE_DATA(state, data) {
        var index;
        if(data.checked == true){
            index = state.favouriteData.findIndex(d => 
                d.id == data.data.id
            );
            
            if(index != -1){
                state.favouriteData.splice(index,1);
            }
            state.favouriteData.push(data.data);
            
        } else {
            index = state.favouriteData.findIndex(d => 
                d.id == data.data.id
            );
            
            if(index != -1){
                state.favouriteData.splice(index,1);
            }
        }
        
    },
    CLEAR_STATE(){
        state.taskData = [];
        state.favouriteData = [];
    }
};
const actions = {
    clearState({
        commit,
    }) {
    commit('CLEAR_STATE')
    },
    fetchData(
        {commit}, postData
    ) {
        return new Promise((resolve) => {
            let loader = Vue.$loading.show({
                canCancel: false,
            });
            axios
                .get("https://reqres.in/api/users?page="+postData.page+"&per_page="+postData.countPerPage+"&delay=1")
                .then(response => {
                    loader.hide();
                    commit('TASK_DATA', response.data);
                    resolve(response.data);

                })
                .catch(error => console.log(error));
        });
    },
    addFavourite({commit},postData){
        commit('ADD_FAVOURITE_DATA', postData);
    }
};

const getters = {
    taskDataGetter: state => {
        return state.taskData;
    },
    favDataGetter: state => {
        return state.favouriteData;
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}