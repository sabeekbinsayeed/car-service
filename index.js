const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ab6t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("geniusCar").collection("Services");

        const orderCollection = client.db("geniusCar").collection("orders");

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        //orders get koro

        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });


        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });


        app.post('/service', async (req, res) => {

            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send({ result: "sucess" })
            console.log(`A document was inserted with the _id: ${result.insertedId}`);


            // npm install react-router-dom@6
            // const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            // res.send(user)

        })

        app.post('/orders', async (req, res) => {

            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send({ result: "sucess" })
            console.log(`A document was inserted with the _id: ${result.insertedId}`);


            // npm install react-router-dom@6
            // const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            // res.send(user)

        })

        // delete a user
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Alhamdulillah, it is working new one')
})

app.listen(port, () => {
    console.log('listen hosce')
})
