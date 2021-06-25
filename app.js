const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.set('view engine','ejs');

mongoose.connect("mongodb+srv://rakshana2303:rd@MONGO2300@todolistcluster.cvarr.mongodb.net/todoListDB", {useNewUrlParser : true});

const itemSchema = {
    name : String
};

const Item = mongoose.model("item", itemSchema);



app.get("/",function(req,res){
    var options = {weekday: 'long', day:'numeric',month:'long'};
    var today = new Date().toLocaleDateString('en-US',options);
    Item.find({},function(err,listItems){
        if(listItems.length === 0){
            res.redirect("/");
        }
        
        else{
            res.render("list",{day:today,items:listItems});
        }
    })
    
});

app.post("/",function(req,res){
    const item=req.body.work;
    const newItem = new Item({
        name:item
    });
    newItem.save();
    res.redirect('/');
});


app.post("/delete",function(req,res){
    const index=req.body.done;
    Item.findByIdAndRemove(index,function(err){
        if(!err){
            res.redirect('/');
        }
    });
    
});
/*app.get("/delete", function(req,res){
    res.render("list",{removeItems:removeList});
})*/

app.listen(process.env.PORT,function(){
    console.log("Listening");
});