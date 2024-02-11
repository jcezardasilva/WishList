<template>
  <div class="container bg-secondary shadow rounded p-5">
    <h3 class="mb-5 text-center w-100">Wish List</h3>
    <h5 class="mt-3">Add New</h5>
    <AddItem @add="addItem"/>
    <h3 class="mt-4">My Items</h3>
    <div class="d-flex">
        <div class="mb-3">
          <label for="formFile" class="input-file form-label text-decoration-underline">Import JSON</label>
          <input class="form-control" type="file" id="formFile" hidden accept="application/JSON" @change="uploadFile">
        </div>
      <DownloadMenu class="text-primary ms-1 me-1 "
        @on-json="onDownload('json')"
        @on-csv="onDownload('csv')"
        @on-xlsx="onDownload('xlsx')"
        @on-close="showDownloadMenu=false"
        />  
    </div>
    
    <div class="d-flex flex-wrap mt-3">
        <div v-for="(item, index) in wishes" class="card p-3 w-50" :key="index">
            <div class="d-flex justify-content-between">
              <h3>{{ item.source }}</h3>
              <button class="btn btn-outline text-danger" @click="removeItem(index)">X</button>
            </div>
            <img :src="item.preview" width="300"/>
            <div class="d-block p-3">
              <p>{{ item.name }}</p>
              <a :href="item.link">{{ item.link }}</a>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import AddItem from "./components/AddItem.vue";
import DownloadMenu from "./components/DownloadMenu.vue";
import {downloadFile} from "./core/fileService.js";
export default {
  name:"MainApplication",
  components: {
    AddItem,
    DownloadMenu
  },
  data(){
    return {
      wishes: [],
      showDownloadMenu:true
    }
  },
  mounted(){
    this.loadWishes();
  },
  methods: {
    loadWishes(){
      this.wishes = JSON.parse(localStorage.getItem("items")||"[]");
    },
    addItem(data){
      this.wishes.push(data);
      localStorage.setItem("items",JSON.stringify(this.wishes));
    },
    removeItem(index){
      this.wishes.splice(index,1);
      localStorage.setItem("items",JSON.stringify(this.wishes));
    },
    onDownload(format){
        let items = this.wishes;
        if(format==="xlsx"){
            items = items.map(item=>{
                const keys = Object.keys(item);
                for(const key of keys){
                    if(typeof item[key] === 'object' || Array.isArray(item[key])){
                        item[key] = JSON.stringify(item[key]);
                    }
                }
                return item;
            })
        }
        downloadFile(items,format);
    },
    uploadFile(event){
      const file = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt)=>{
            localStorage.setItem("items",evt.target.result);
            this.loadWishes();
        }
        reader.onerror = (evt)=>{
            console.error("error reading file");
        }
      }
    }
  }
}
</script>
<style scoped>
.input-file {
  cursor: pointer;
}
</style>
