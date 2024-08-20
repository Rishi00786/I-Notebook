const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

//  Route 1 Adding user notes using AuthToken : POST "/api/notes/addnotes".

router.post('/addnotes', fetchuser, [
    body('title', 'Title must be of at least 3* Characters').isLength({ min: 3 }),
    body('description', 'Description must be of at least 10* Characters').isLength({ min: 10 }),
],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Making a json of title , description , tag and user details
            const notes = new Notes({
                title , description , tag , user: req.user.id
            })
            // Saving in DataBase
            const SavedNote = await notes.save()
            res.json(SavedNote)
        } catch (error) {
            console.error(error.message)
            res.status(400).json({ error: "Internal Server Error" })
        }
    })

    //  Route 2 Acessing user notes : Get "/api/notes/getnotes".
    //  Using AuthToken in header
    router.get('/getnotes',fetchuser , async(req,res)=>{
        try {
            // selecting all notes except the date
            const notes = await Notes.find({user:req.user.id}).select("-date")
            res.json(notes)
        } catch (error) {
            console.error(error.message)
            res.status(400).send({error:"Internal Server Error"})
        }
    })

    //  Route 3 Updating Existing notes of User : put "/api/notes/updatenotes/:id".
    // typing id of notes after tenotes/8786754352scvbn
    router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
        const {title,description,tag} = req.body;
        try{
        const New_Note = {}
        if(title){New_Note.title = title}
        if(description){New_Note.description = description}
        if(tag){New_Note.tag = tag}

        // Finding already existing notes from databse by using id
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if (!note.user || note.user.toString() !== req.user.id) {
            return res.status(401).send("Accessing others Notes is Prohibited")
        }
        // For updating this Function
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: New_Note }, { new: true })
        res.json({ note });
        }catch(error){
            console.error(error.message)
            res.status(400).send({error:"Internal Server Error"})
        }
    })

    //  Route 4 Dleting Existing notes of User : DELETE "/api/notes/deletenote/:id".

    router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

        try{
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if (!note.user || note.user.toString() !== req.user.id) {
            return res.status(401).send("Accessing others Notes is Prohibited")
        }
        // For Deletion
        note = await Notes.findByIdAndDelete( req.params.id)
        res.json({note} ,{Success:"This Note Has been Deleted"})
        }catch(error){
            console.error(error.message)
            res.status(400).send({error:"Internal Server Error"})
        }
    })


module.exports = router