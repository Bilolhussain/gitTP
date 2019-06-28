// var express = require("express"),
//     app = express(),
//     bodyParser = require("body-parser"),
//     mongoose = require("mongoose");
    
// mongoose.connect("mongodb://localhost/travelpak",{useNewUrlParser: true});

// app.use(bodyParser.urlencoded({extended:false}));
// app.set("view engine", "ejs");

// var ptrekSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });

// var Ptrek = mongoose.model('Ptrek', ptrekSchema);

// Ptrek.create({
//     name: "Dody", 
//     image: "https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg",
//     description: "I am a naughty naughty naughty dog!"
// }, function(err, ptrek){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("newly created treksite");
//         console.log(ptrek);
//     }
// })

// // var index = [
// //         {name: "Snowy", image:"https://www.petmd.com/index/default/files/Acute-Dog-Diarrhea-47066074.jpg"},
// //         {name: "Dody", image:"https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"},
// //         {name: "Boris", image:"http://santansun.com/wp-content/uploads/2018/11/5b7fdeab1900001d035028dc.jpeg"},
// //         {name: "Snowy", image:"https://www.petmd.com/index/default/files/Acute-Dog-Diarrhea-47066074.jpg"},
// //         {name: "Dody", image:"https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"},
// //         {name: "Boris", image:"http://santansun.com/wp-content/uploads/2018/11/5b7fdeab1900001d035028dc.jpeg"},
// //         {name: "Snowy", image:"https://www.petmd.com/index/default/files/Acute-Dog-Diarrhea-47066074.jpg"},
// //         {name: "Dody", image:"https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"},
// //         {name: "Boris", image:"http://santansun.com/wp-content/uploads/2018/11/5b7fdeab1900001d035028dc.jpeg"}
// //         ];

// app.get("/", function(req, res) {
//     res.render("landing");
// });

// //INDEX - shows all treks
// app.get("/ptreks", function(req, res){
//     //Get all treks from DB
//     Ptrek.find({}, function(err, allPtreks){
//         if(err){
//             console.log(err)
//         }else
//         res.render("index", {ptreks:allPtreks})
//     });
// });

// //CREATE - add new treks to DB
// app.post("/ptreks", function(req, res){ 
//     //get data from form to add to index array
//     var name = req.body.name;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var newPtrek = {name: name, image: image, description: desc}
//     //Create a new trek and save to database
//     Ptrek.create(newPtrek, function(err, newlyCreated){
//         if(err){
//             console.log(err)
//         }else{
//             //redirect back to treks page: default is to do it as a get request
//             res.redirect("/ptreks");
//         }
//     })});
    
// app.get("/ptreks/new", function(req, res){
//     res.render("new.ejs");
// });

// // SHOW - shows more info about one trek
// app.get("/ptreks/:id", function(req, res){
//     //find the trek with provided ID
//     Ptrek.findById(req.params.id, function(err, foundTrek){
//         if(err){
//             console.log(err);
//         } else {
//             //render show template with that trek
//             res.render("show", {ptrek: foundTrek});
//         }
//     });
// });

// app.listen(process.env.PORT, process.env.IP, function (){
//     console.log("petadopt server is running");
// });

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/travelpak",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var ptrekSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Ptrek = mongoose.model("Ptrek", ptrekSchema);

Ptrek.create(
     {
         name: "Granite Hill", 
         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
         description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
         
     },
     function(err, campground){
      if(err){
          console.log(err);
      } else {
          console.log("NEWLY CREATED CAMPGROUND: ");
          console.log(campground);
      }
    });

    
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/ptreks", function(req, res){
    // Get all campgrounds from DB
    Ptrek.find({}, function(err, alltreks){
       if(err){
           console.log(err);
       } else {
          res.render("index",{ptreks:alltreks});
       }
    });
});

//CREATE - add new campground to DB
app.post("/ptreks", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPtrek = {name: name, image: image, description: desc}
    // Create a new trek and save to DB
    Ptrek.create(newPtrek, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to treks page
            res.redirect("/ptreks");
        }
    });
});

//NEW - show form to create new campground
app.get("/ptreks/new", function(req, res){
   res.render("new.ejs"); 
});

// SHOW - shows more info about one campground
app.get("/ptreks/:id", function(req, res){
    //find the campground with provided ID
    Ptrek.findById(req.params.id, function(err, foundtrek){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {ptrek: foundtrek});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The TravelPak Server Has Started!");
});
