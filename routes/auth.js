const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

  // Lt Validat Usr Input....  
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  //Check if user doesn't exist...
  const email_exists = await User.findOne({email: req.body.email});
  if(email_exists) return res.status(400).send('User Already exists...');

  //Hash the Password.... Creat a SALT....
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try{
    // Save in the Database
     const savedUser = await user.save();
     res.send({user:user._id});   // Sending User ID..
     //res.send(savedUser);
  }catch(error){
    //console.log(error);
    res.status(400).send(error);
  }
	//res.send('Register');
});

//LOGIN Function Here..........

router.post('/login', async (req, res) => {
  // validate user input..
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if email registered....
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('email not found...');

  // Check if valid password....
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('wrong password...');

  // Create and Assign JWT Token..........
  const token = jwt.sign({ _id : user._id}, process.env.SECRET);
  res.header('auth-token', token).send(token);

  res.send('Successfully Logged In...');

});

module.exports = router;