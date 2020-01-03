<template>
  <div id="app">
    <button id="id" @click="pickuser">choose name</button>
    <br>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Global chat" />
    <msgbox :send="send" :user="user" :broadcast="broadcast" />
    <ul v-if="messages.length>0">
      <div  v-for="(message,index) in inbox" :key="index" class="msg">
        <li  :class="{'user':userf===message.user}" >{{ message.text }} </li>
        <br>
      </div>
      
    </ul>
    <div id="feedback"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import msgbox from './components/msgbox.vue'
import axios from 'axios'
import io from 'socket.io-client'



export default {
 
  name: 'app',
  components: {
    HelloWorld,
    msgbox,
    
  },
  data(){
    return{
    messages:[],
    user:"",
    socket:io('localhost:8034'),
    flag:1,
    firstempty:true,
    }
  },
 computed:{
   inbox(){
     return this.messages;
   },
   userf(){
     return this.user
   }
   
 },

  
 mounted(){
   axios.get("http://localhost:8034/msg")
        .then((res)=>{{
         console.log(res);
          this.messages=res.data;
        }
          
        })
        .catch(err=>{console.log(err)})
    this.socket.on('message',(data)=>{
      if(data.user!=this.user)
      document.getElementById(data.user).parentNode.removeChild(document.getElementById(data.user));
      this.messages.push(data);
    });
    this.socket.on('broadcast',(data)=>{
      if(document.getElementById(data)!=null){
        document.getElementById(data).parentNode.removeChild(document.getElementById(data));
       
        
      }
      else{
        
        var feedback=document.getElementById('feedback');
        feedback.innerHTML+="<p id='"+data+"'>"+data+" is typing.....</p>";
      }
      
      console.log('working');
    });
      },
 
    
       
  methods:{
   
    broadcast(y,t){
     
     if(t.length==1&&this.flag==1)
     { console.log('typing emit');
        this.socket.emit('typing',y);this.flag=0;this.firstempty=true;}
     else if(t.length==0&&this.firstempty)
     {console.log('nottyping emit');
        this.socket.emit('nottyping',y);
       this.firstempty= !this.firstempty; this.flag=1;}
   },
   send(x,y){
     this.socket.emit('themessage',{
       "user": y,
       "text": x,});
     axios.post("http://localhost:8034/msg",{
       "user": y,
       "text": x,
      
    } )
    .then((res)=>{
      console.log(res.data);

     })
     .catch()

  },
  pickuser(){
   this.user= prompt("Give your username")
  }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.user{ text-align: right;
 list-style-type: none;
 background-color:rgb(196, 209, 14);
 
   max-width:50%;
   min-width:0;
   
   padding:2px;
   margin:3px;
   border-top-left-radius: 10px;border-top-right-radius: 0%; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;
   border:1px solid #050505;
   float:  right;
   clear: right;
   text-emphasis: weight;
   

}
li{
  padding: 5px;
  text-align: left;
 list-style-type: none;
 background-color:aquamarine;
 
   max-width:50%;
   min-width:0;
   
   padding:2px;
   margin:3px;
   border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;
   border:1px solid #050505;
   float:  left;
   clear: left;
   text-emphasis: weight;
   
   

}
.msg{padding: 10px;

}


</style>
