const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const User = require('./User');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// change public url everytime you start instance
// add 27017 port in inbound rules
let mongoUrlDocker = "mongodb://admin:password@18.220.28.193:27017";

mongoose.connect(
	mongoUrlDocker,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
  }
).then(() => console.log("connected to db"))
.catch(err=>console.log(err))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.post('/update-profile', async function (req, res) {
  try {
    let userObj = req.body;
    const data = await User.updateOne({ userid: 1 }, { $set: { name: userObj.name, email: userObj.email, interests: userObj.interests } });

    console.log(data);
    res.send(userObj);

  } catch (error) {
    res.send({ name: 'Error Name', email: 'Default Email', interests: 'Default Interests' })
  }
});

app.get('/get-profile',async function (req, res) {  
  try {
    const data = await User.findOne({ userid: 1 });
    console.log(data)
    res.status(200).send(data ? data : { name: 'Default Name', email: 'Default Email', interests: 'Default Interests' });
  
  } catch (error) {
    res.send( { name: 'Error Name', email: 'Default Email', interests: 'Default Interests' })
  }
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
