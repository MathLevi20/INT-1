
const express = require('express')
const app = express()

class Postagem {
    constructor(id, text, likes) {
        this.id = id; this.text = text; this.likes = likes;
    }
    get return() {
        return this.retornar()
    }
    retornar() {
        return this.id, this.text, this.likes;
    }
}

const postagem = new Postagem(4123, "Olá Mundo", 100);

app.get('/', (req, res) => {
    res.send("Hello world!")
})
const port = 3000
app.listen(port, () => {
    console.log(`Aplicação escutando na porta ${port}`)
})
app.post('/', function (req, res) {
    res.send(postagem);
});
app.put('/user', function (req, res) {
    res.send('Método PUT executado em /user');
});
app.delete('/user', function (req, res) {
    res.send('Método DELETE executado em /user');
});
app.use(express.static('public'));
app.use(function (req, res, next) {
    res.status(404).send('Não encontrado');
});
