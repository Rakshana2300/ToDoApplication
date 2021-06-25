const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.set('view engine','ejs');

mongoose.connect("mongodb+srv://rakshana2303:rd@MONGO2300@todolistcluster.cvarr.mongodb.net/todoListDB", {useNewUrlParser : true});

//mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemSchema = {
    name : String
};

const Item = mongoose.model("item", itemSchema);



app.get("/",function(req,res){
    var options = {weekday: 'long', day:'numeric',month:'long'};
    var today = new Date().toLocaleDateString('en-US',options);
    Item.find({},function(err,listItems){
        res.render("list",{day:today,items:listItems});
    }); 
    
});

app.get("/", function(req, res) {
 
    ItemModel.find({}, (err, itemsList) => {
   
      if(itemsList.length === 0){
        ItemModel.insertMany(defaultItems, (err) => { (err) ? console.log(err) : console.log("Succesfully saved defaults items to DB.") });
        itemsList = defaultItems;
      }
   
      res.render("list", {listTitle: "Today", newListItems: itemsList});
   
    });
   
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
/*
app.listen(7000,function(){

});*/


app.listen(process.env.PORT,function(){
    console.log("Listening");
});