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



//login
app.post('/login', async (req, res) => {


    try {
        const { email, senha } = req.body;
        const { rows } = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1 AND senha =$2",
            [email, senha]
        )

        if (rows.length > 0) {
            res.status(200).json({ sucesso: true, usuario: rows[0] })
        } else {
            res.status(401).json({ sucesso: false, message: "Email ou senha incorretas" })
        }
    } catch (err) {
        res.status(500).send(err.message);

    }
})

// Cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, sobrenome, email, password } = req.body;


    try {
        if (!nome || !sobrenome || !email || !password) {
            return res.status(400).json({ message: " Todos os campos são obrigatórios!" })
        }

        const queryText = 'Insert INTO users (nome, sobrenome, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
        const values = [nome, sobrenome, email, password]

        const { rows } = await pool.query(queryText, values)

        res.status(201).json({
            message: 'Olá ${nome}, sua conta foi criada com sucesso!',
            user: newUser.rows[0]
        })
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ message: "Este e-mail já está em uso." })
        }

        console.error(err)
        res.status(500).json({ message: "Erro ao salvar no banco de dados." })
    }




})


app.post('/api/tarefas', async (req, res) => {


    try {

        const { categoria, titulo, prioridade, data_entrega, horario, local_evento } = req.body
        const sql = `
            INSERT INTO tarefas(categora, titulo, prioridade, data_entrega, horario, local_evento)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

        const values = [
            categoria || 'todos',
            titulo,
            prioridade || 'baixa',
            data_entrega || null,
            horario || null,
            local_evento || null
        ]

        const { rows } = await pool.query(sql, values)
        res.status(201).json(rows[0])

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao salvar no PostgreSQL" })
    }
})


app.get('api/tarefas', async (req, res) => {
    try {
        const { categoria, status, prioridade } = req.query

        let query = 'SELECT * FROM tarefas WHERE 1=1'
        let values = []

        if (categoria) {
            values.push(categoria)
            query += `AND categoria = $${values.length}`
        }

        if (status === 'pendentes') {
            query += 'AND concluida = false'
        } else if (status === 'concluida') {
            query += 'AND concluida = true'
        }

        if (prioridade && prioridade != 'Prioridade') {
            values.push(prioridade)
            query += `AND prioridade = $${values.length}`
        }

        query += 'ORDER BY data_criacao DESC'


        const { rows } = await pool.query(query, values)
        res.json(rows)

    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar tarefas no banco." })
    }


})

app.patch('/api/tarefas/:id/toggle', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('UPDATE tarefas SET concluida = NOT concluida WHERE id = $1', [id])
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar status." })
    }
})

// Criar nova anotação
app.post('/anotacoes', async (req, res) => {
    try {
        const { categoria, titulo, resumo, cor } = req.body
        const { rows } = await pool.query(
            "INSERT INTO anotacoes(categoria, titulo, resumo,cor) VALUES ($1, $2, $3, $4) RETURNING *",
            [categoria, titulo, resumo, cor]
        )
        res.json(rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Erro ao salvar anotações")
    }
})

app.get('/anotacoes', async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM anotacoes ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/anotacoes/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query("SELECT * FROM anotacoes WHERE id = $1", [id])
        if (rows.length === 0) {
            return res.status(404).json("Anotação não encontrada");
        }
        res.json(anotacao.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})




app.listen(3000, () => {
    console.log("Meu servidor tá rodando")
})

