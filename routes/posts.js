const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) =>{
 res.json({
 	posts:{
 		title : 'My FIrst Post',
 		description : 'This is my post you should not access...'
 	}
 });
});


module.exports = router; 