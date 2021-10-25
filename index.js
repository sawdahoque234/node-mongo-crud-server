const express=require('express')
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId=require('mongodb').ObjectId
app.use(cors())
app.use(express.json())

const port = 5000;
//user:mydbuser
//pass:Eg3ts5FN8iTgS44K

const uri = "mongodb+srv://mydbuser:Eg3ts5FN8iTgS44K@cluster0.eoyrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("webdevelopment").collection("webdeveloper");
  //get api
  app.get('/users',(req,res)=> {
    collection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
    
  })

  //post api
  app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    collection.insertOne(newUser)
      .then(result => {
      res.send(result)
    })
  })
  //update
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    collection.findOne(query)
    .then(result => {
    res.json(result)
    })
    
  })
  //UPDATE API OR PUT
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true }
    const updateDoc = {
      $set: {
        name: updateUser.name,
        email:updateUser.email
      },
    }
  collection.updateOne(filter, updateDoc, options)
  .then(result => {
    res.json(result)
    })
    console.log(id)

    
  })

  //delete operation

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    collection.deleteOne(query)
    .then(result => {
    res.json(result)
    })
    
  })
});

app.get('/', (req, res) => {
    res.send('hellow sawda')
})
app.listen(port, () => {
    console.log('mongo is running',port)
})