const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

// Query params => meusite.com/users?nome=rodolfo$age=28 // Filtros
//Route params => /users/2 //Buscar, Deletar ou Atualizar algo especifico
// Request Body => {"name":"Rodolfo", "age":}

//Get - Leitura - Buscar informação no back end
//Post - Criação - Criar informação no back end
//Put - Atualizar informação no back end 
// Delete - Deleção
//Patch - Atualização parcial

//JSON - Javascript object notation//padrão de envio de dados entre back end e front end 

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "meubanco",
    password: "1234",
    port: 5432,
})

app.get('/usuario', function (req, res) {
    res.send("users")
})


//login
app.post('/login', async (req, res) => {

    const { email, senha } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1 AND senha =$2",
            [email, senha]
        )

        if (result.rows.length > 0) {
            res.status(200).json({ sucesso: true })
        } else {
            res.status(401).json({ sucesso: false })
        }
    } catch (err) {
        res.status(500).send(err.message);

    }
})


app.post('/register'), async (req, res) => {
    const { nome, sobrenome, email, password } = req.body;


    try {
        if (!nome || !sobrenome || !email || !password) {
            return res.status(400).json({ message: " Todos os campos são obrigatórios!" })
        }

        const queryText = 'Insert INTO users (nome, sobrenome, emial, password) VALUES ($1, $2, $3, $4) RETURNING *'
        const values = [nome, sobrenome, email, password]

        const newUser = await pool.query(queryText, values)

        res.status(201).json({
            message: 'Olá ${nome}, sua conta foi criada com sucesso!',
            user: newUser.row[0]
        })
    } catch (err) {
        if (errsode === '23505') {
            return res.status(400).json({ message: "Este e-mail já está em uso." })
        }

        console.error(err)
        res.status(500).json({ message: "Erro ao salvar no banco de dados." })
    }




}




app.listen(3000, () => {
    console.log("Meu servidor tá rodando")
})

