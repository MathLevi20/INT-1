const express = require('express')
const app = express()
//response as Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config do Firestone
var admin = require("firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/posts-get', async (request, response) => {
    postsDoc = await db.collection("posts").get();
    const posts = []
    postsDoc.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
    response.status(200).json(posts);
})

app.post('/posts', async (request, response) => {
    var timestamp = new Date().getTime();
    var date = new Date(timestamp).toLocaleDateString("pt-BR")
    var time = new Date(timestamp).toLocaleTimeString("pt-BR")
    const { text, likes } = request.body
    const post = { text, likes }
    const result = await db.collection('posts').add({ post, date, time, timestamp });
    response.status(201).json({ id: result.id, ...result });
})

app.post("/delete", async (request, response) => {
    const id = request.body.id;
    await db.collection('posts').doc(id).delete();
    response.status(201).send({ msg: "Deleted", post })
});
app.post("/update", async (request, response) => {
    const { text, likes } = request.body
    const id = request.body.id;
    const post = { text, likes }
    const result = await db.collection('posts').doc(id).update({ post });
    response.status(201).send({ msg: "Update", post })
});

app.get('/posts/', async (request, response) => {
    id = request.query.id
    const post = await db.collection('posts').doc(id).get();
    response.status(201).send({ msg: "get", ...post.data() })
})
app.get('/posts-get-dec', async (request, response) => {
    postsDoc = await db.collection("posts")
        .orderBy("timestamp", "desc").get();
    const posts = []
    postsDoc.forEach(doc => posts.push({ id: doc.id, ...doc.data() }))
    response.status(200).json(posts);
})
app.get('/posts-list/', async (request, response) => {
    page = request.query.page
    const first = db.collection("posts")
        .orderBy("timestamp")
        .limit(1);
    const snapshot = await first.get();
    const last = snapshot.docs[snapshot.docs.length - 1];
    const next = db.collection("posts")
        .orderBy("timestamp")
        .startAfter(last.data())
        .limit(1);

    response.status(200).send(next);
})



app.use(express.static('public'))

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3000, () => {
    console.log('Servidor rodando')
})