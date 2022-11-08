const router = require('express').Router();
const Note = require('../models/notes');
const jwt = require('jsonwebtoken');

const {notesValidation} = require('../validation');

router.post('/add', async (req, res)=>{

	const note = new Note({
		title : req.body.title,
		description : req.body.description
	});

	try{
		// Save in the Database
		const Savednote = await note.save();
		res.send({ note : note._id });

	}
	catch(error){
		res.status(400).send(error);
	}


});

module.exports = router;

