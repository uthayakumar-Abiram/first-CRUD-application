// express is frame work here we require expiress for  routes
const express = require('express');

const router = express.Router()
// require the controllers
const Model = require('../model/model');
// get all data from the database
module.exports = router;

// //Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

//Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

//Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })
// //Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send(req.params.id)
// })
// 
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Update by ID Method
//The keyword async before a function makes the function return a promise
router.patch('/update/:id', async (req, res) => {
    try {
     // The req.params property is an object containing properties mapped to the named route “parameters”. 
        // For example,  if you have the route /student/:id,
        //  then the “id” property is available as req.params.id. 
        // This object defaults to {}. 
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
//The await keyword makes the function pause the execution and wait for a resolved promise before it continues:
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        // The req.params property is an object containing properties mapped to the named route “parameters”. 
        // For example,  if you have the route /student/:id,
        //  then the “id” property is available as req.params.id. 
        // This object defaults to {}. 
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})