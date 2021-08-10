
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// connectiong mongoose node and mongoDB via mongoose.
mongoose.connect('mongodb+srv://mithileshpatil:aXJFhEvcm0JihmA7@cluster0.kodko.mongodb.net/portfolioDB', {useNewUrlParser: true, useUnifiedTopology: true });
const contactSchema = {
    name : String,
    email : String,
    phoneno : Number,
    message : String
};

const Contact = mongoose.model("Contact", contactSchema);


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.get('/saved',(req,res) => res.send("data saved"));

app.post("/posting", function(request, response){
    console.log("get the data...");
    const nameP = request.body.name;
    const emailP = request.body.email;
    const phonenoP = request.body.phoneno;
    const messageP = request.body.message;

    const contact = new Contact({
        name : nameP,
        email : emailP,
        phoneno : phonenoP,
        message : messageP
    });
    contact.save();
    console.log("save the data succesfully");
    
    response.redirect('/');
});


let port = process.env.PORT;
if(port == null || port == "")
{
    port=8000;
}
app.listen(port, function(){
    console.log("Server running on port 8000");
});



// aXJFhEvcm0JihmA7
