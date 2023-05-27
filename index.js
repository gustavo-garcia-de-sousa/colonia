const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./db");

app.use(cors());
app.use(express.json());

app.listen(8080, () => {
    console.log('Rodando na porta 8080');
});

//definindo rotas 

//rota para buscar TODOS os usuários(método Sequilize)
app.get("/users", (req, res) => {
    db.user.findAll().then((users) => {
        res.json(users);
    });
});

app.get("/roles", (req, res) => {
    db.role.findAll().then((roles) => {
        res.json(roles);
    });
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;

    db.user.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user) {

            const response = user.toJSON();

            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    roles[i] = roles[i].name
                }

                response['roles'] = roles;

                res.json(response)
            });
        }
    });
});

app.post("/users", (req, res) => {
    const { username, email, password } = req.body;

    console.log("Criando usuário:", username, email, password);

    db.user
        .create({
            username: username,
            email: email,
            password: password
        })
        .then((user) => {
            res.status(201).json(user.toJSON());
        })
});
















