const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/',async (req, res) => {
      const tasklist = await loadTasksCollection();
      res.send(await tasklist.find({}).toArray());
});

// Add Post
router.post ('/',async (req,res) =>{
      const mytask = await loadTasksCollection();
      await mytask.insertOne({
            task: req.body.task,
            createAt: new Date()
      });
      res.status(201).send();
});
// Delete Post
router.delete('/:id', async (req,res) =>{
      const mytask = await loadTasksCollection();
      await mytask.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
      res.status(200).send();
});

async function loadTasksCollection(){
      const client = await mongodb.MongoClient.connect('mongodb+srv://Sovanndy:1234@sovanndy.51jml.mongodb.net/Sovanndy?retryWrites=true&w=majority',{
            useNewUrlParser: true
      });
      
      return client.db('my_tasklist').collection('mytasks')
}
module.exports = router;