const express = require('express');
const app = express()
const port = 3000

class Post {
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
class Microblog extends Post {
    constructor(postagens, indice) {
        super(postagens, indice)
        this.postagens = [];
        this.indice = indice;
    }
    consultarIndice(numero) {
        var indice = -1;
        for (var i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].id == numero) {
                indice = i;
                break;
            }
        }
        return this.indice;
    }


    retrieve(numero) {
        exist = this.consultarIndice(numero);
        if (exist == -1) {
            return "Não Existe"
        }
        return this.postagens[numero];
    };

    delete(numero) {
        var indice = this.consultarIndice(numero);
        if (indice != -1) {
            for (var i = indice; i < this.postagens.length; i++) {
                this.postagens[i] = this.postagens[i + 1];
            }
            return this.postagens.pop();
        }
    };

    update(post) {
        post.id = parseInt(post.id);
        var encontrou = this.consultarIndice(post.id);
        if (encontrou != -1) {
            return this.postagens[encontrou].alterar(post.text);
        }
        else {
            return console.log("Não Existe");
        }
    };
    create(post) {
        this.postagens.push(post);
    };

    retrieveAll(post) {
        return this.post;
    };

};

var microblog = new Microblog();
microblog.create(0, "javaScript", 10);
microblog.create(1, "Python", 5);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/posts', (request, response) => {
    response.send(microblog.retrieveAll())
})

app.get('/posts/:id', function (request, response) {
    id = request.params.id;
    response.json(microblog.retrieve(id));
})

app.delete('/posts/:id', (request, response) => {
    id = request.params.id;
    microblog.delete(id);
    response.status(204).send();
})

app.post('/posts/create', function (req, res) {
    console.log(req.body);
    microblog.create(new Post(parseInt(req.body.id), req.body.text, 0));
    res.status(201).send('Criado');
});

app.put('/posts/:id', function (request, response) {
    id = parseInt(request.params.id);
    microblog.update(request.body)
    console.log(id)
    return response.status(200).send('Altarar')
});

app.patch('/posts/:id', function (req, res) {
    id = parseInt(req.params.id);
    if (microblog.consultarIndice(id) != -1) {
        microblog.update(req.body);
        microblog.updatelike(req.body);
        res.status(200).send('Alterar');
    } else {
        res.status(404).send('Erro')
    }
})
app.use(function (req, res, next) {
    res.status(404).send('Erro 404')
});

app.patch('/posts/:id/like', function (req, res) {
    id = parseInt(req.params.id);
    if (microblog.consultarIndice(id) != -1) {
        microblog.curtir_post(new Post(id));
        res.status(200).send('Liked');
    }
    res.status(404).send('Erro 404')

})

app.listen(port, () => {
    console.log(`Porta:${port}`)
})