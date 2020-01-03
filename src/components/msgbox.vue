<template>
<div>
    <input type="text" v-model="smgs" placeholder="say something..." @keyup="broadcast(user,smgs)" >
    <button @click="send(smgs,user)">Submit</button><button @click="clear()">X</button>
    <p>//////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</p>
</div>   
</template>
<script>
export default {
    name:'msgbox',
    data(){
        return{
            smgs:"",
            
            
        }
    },
   
       

    props:{
        user:String,
       
        send: Function,
        broadcast:Function,
        
    },
    methods:{
        clear(){
            this.smgs="";
            
        }
    }
    
}
</script>
<style  scoped>

</style>