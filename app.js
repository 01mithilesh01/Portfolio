const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// connectiong mongoose node and mongoDB via mongoose.
mongoose.connect('mongodb://localhost:27017/portfolioDB', {useNewUrlParser: true, useUnifiedTopology: true });

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


app.post("/", function(request, response){
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
});




app.listen(8000, function(){
    console.log("Server running on port 8000");
});
