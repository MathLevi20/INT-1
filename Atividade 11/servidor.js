const express = require('express')
const app = express()
//response as Json
const cors = require("cors")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config do Firestone
var admin = require("firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/get', async (request, response) => {
    postsDoc = await db.collection("posts").orderBy("timestamp", 'desc').get();
    const posts = []
    postsDoc.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
    response.status(200).json(posts);
})

app.post('/posts', async (request, response) => {
    var timestamp = new Date().getTime();
    var date = new Date(timestamp).toLocaleDateString("pt-BR")
    var time = new Date(timestamp).toLocaleTimeString("pt-BR")
    const { text, likes } = request.body
    const result = await db.collection('posts').add({ text, likes , date, time, timestamp });
    response.status(201).json({ id: result.id, ...result });
})

app.use(express.static('public'))

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3001, () => {
    console.log('Servidor rodando')
})