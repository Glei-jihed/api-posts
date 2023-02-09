const express = require('express');
const mongodb  = require('mongodb');
const router =  express.Router();
require('dotenv').config()
// Get:
router.get('/',async (req,res)=>{
   const posts = await loadPostsCollection();
   res.send(await posts.find({}).toArray()); //all posts
});

//post:
router.post('/',async (req,res)=>{
    const posts = await loadPostsCollection();
    try{ await posts.insertOne({
        text: req.body,
        date: new Date()
    
    
    
    });
    res.status('201').send('post created with success ! ');
    } catch(e){
        res.status('400').send(e);
    }
   


})


//Delete:
router.delete('/:id',async (req,res)=>{
    const posts = await loadPostsCollection();
    try {
        await posts.deleteOne({
            _id : new mongodb.ObjectId(req.params._id)
            

        });
        res.status('201').send('post deleted with success !!')

    }catch(e){
        res.status('404').send('post not founded !!!!')
    }
})


async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://student:student123@azure.cbqgfrj.mongodb.net/?retryWrites=true&w=majority");
    console.log('you are connected to your data base !!!');
    return client.db('vue_express').collection('posts');
}

module.exports = router;