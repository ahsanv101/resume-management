const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const users = require("./routes/api/users");
const app = express();
const cors = require('cors');
let Resume = require("./models/Resume");
app.use(router);
app.use(express.static(path.join(__dirname, "./client/public")));
app.use(cors());
const resumeRoutes=express.Router();



// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  })
);
app.use(bodyParser.json({
  limit: "50mb",
  extended: false

}));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes for user related API calls
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

//For uploading all user related data.

app.use('/resume', resumeRoutes);

//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
filename: function(req, file, callback) {
callback(null, Date.now() + file.originalname);
}
});


const upload = multer({ storage: storage});

const cloudinary = require("cloudinary");
cloudinary.config({
cloud_name: "dx6uj99o5", 
api_key: require("./config/keys").CLOUDINARY_API, 
api_secret: require("./config/keys").CLOUDINARY_SECRET 
});



resumeRoutes.route('/').get(function(req, res) {
  Resume.find(function(err, todos) {
      if (err) {
          console.log(err);
      } else {
          res.json(todos);
      }
  });
});


resumeRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Resume.findById(id, function(err, resume) {
      res.json(resume);
  });
});


resumeRoutes.route('/add').post(upload.single("image"), (req, res) => {
  console.log(req.file);
  cloudinary.v2.uploader.upload(req.file.path, function(err,result){
    if(err){
      req.json(err.message);
    }
    req.body.image = result.secure_url;
    req.body.imageId = result.public_id;

    let resume = new Resume(req.body);
    resume.save()
        .then(resume => {
            res.status(200).json({'resume': 'resume added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding resume failed');
        });

  })
 
});


resumeRoutes.route('/delete/:id').delete(function(req, res) {
  let id = req.params.id;
  Resume.findById(id, function(err, resume) {
    if (!resume){
      res.status(404).send("data is not found");
    }
    else{
      resume.deleteOne();
    }
   

  });
});


resumeRoutes.route('/update/:id').post(function(req, res) {
  Resume.findById(req.params.id, function(err, resume) {
      if (!resume)
          res.status(404).send("data is not found");
      else
          resume.name = req.body.name;
          resume.age = req.body.age;
          resume.gender = req.body.gender;
          resume.dob = req.body.dob;

          resume.save().then(resume => {
              res.json('Resume updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});



  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });