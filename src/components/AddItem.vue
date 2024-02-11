<template>
    <div class="d-flex">
        <el-input class="ms-1 me-1" v-model="inputName" placeholder="Name" />
        <el-input class="ms-1 me-1 " v-model="inputLink" placeholder="Link" />
        <el-input class="ms-1 me-1 " v-model="inputPreview" placeholder="Preview Image" />
        <select class="form-select ms-1 me-1" v-model="inputSource">
            <option disabled selected>Source</option>
            <option v-for="(item,index) in sources" :key="index" :value="item">{{ item }}</option>
        </select>
        <el-button type="primary" class="m-1" @click="addItem">Add</el-button>
    </div>
</template>
<script>
export default {
    name: "AddItem",
    data(){
        return {
            inputName: "",
            inputLink: "",
            inputPreview: "",
            inputSource: "Source",
            sources:["Magalu","Kabum","Amazon","Steam"]
        }
    },
    emits: ["add"],
    methods: {
        addItem(){

            this.$emit("add", {
                name: this.inputName,
                source: this.inputSource,
                link: this.inputLink,
                preview: this.inputPreview
            })
            this.inputName = "";
            this.inputLink = "";
            this.inputPreview = "";
        }
    }
}
</script>
<style></style>