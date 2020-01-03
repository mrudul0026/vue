const express = require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const msgschema=require('./models')
const app=express();
const Msg= msgschema;




app.use(bodyparser.json());
app.use(cors());
const server=app.listen(8034);
const io=require('socket.io')(server);
mongoose.connect("mongodb+srv://mrudul:mrudul2020@cluster0-cv9fr.mongodb.net/test?retryWrites=true&w=majority");
io.on('connection',(socket)=>{
  console.log(socket.id);
  socket.on('themessage',(data)=>{
    io.emit('message',data);
  });
  socket.on('typing',(data)=>{
    console.log('reached here');
    socket.broadcast.emit('broadcast',data);
    });
  socket.on('nottyping',(data)=>{
    socket.broadcast.emit('broadcast',data);
    });
});










    app.get('/msg', async (req, res) => {try{
           const msg=await Msg.find({});
           res.send(msg);

         }        
    
         
        catch{err=>{
          console.log(err);
        };
      }
    }
    );
             
       
      
  
    app.post('/msg', async (req, res) => {
      const msg= new Msg(req.body)
      try {
        
        await msg.save();
        res.send(msg);
      }
      catch {
        err => {
          console.log(err);
        };
      }
    });



