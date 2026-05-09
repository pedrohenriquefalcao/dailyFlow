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


//LOGIN
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

// CADASTRO
app.post('/cadastro', async (req, res) => {



    try {

        const { nome, email, telefone,  senha, confirmarsenha} = req.body;
        
        
        
        if (!nome || !sobrenome || !email || !password) {
            return res.status(400).json({ message: " Todos os campos são obrigatórios!" })
        }

        if(senha != confirmarsenha){
            return res.status(400).json({error:"As senhas não coincidem"})
        }

        const {rows} = await pool.query('SELECT * FROM  users WHERE email =$1', [email])
        if (rows.length > 0){
            return res.status(400).json({error: "E-mail já cadastrado"})
        }

        

        const queryText = 'Insert INTO users (nome, sobrenome, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
        const values = [nome, sobrenome, email, password]

        const { rows } = await pool.query(queryText, values)

        res.status(201).json({
            message: 'Olá ${nome}, sua conta foi criada com sucesso!',
            user: rows[0]
        })
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ message: "Este e-mail já está em uso." })
        }

        console.error(err)
        res.status(500).json({ message: "Erro ao salvar no banco de dados." })
    }




})


// CRIAR TAREFAS NO TO-DO 
app.post('/tarefas', async (req, res) => {


    try {

        const { categoria, titulo, prioridade, data_entrega } = req.body
        const sql = `
            INSERT INTO tarefas(categora, titulo, prioridade, data_entrega)
            VALUES ($1, $2, $3, $4) RETURNING *`

        const values = [
            categoria || 'todos',
            titulo,
            prioridade || 'baixa',
            data_entrega || null,

        ]

        const { rows } = await pool.query(sql, values)
        res.status(201).json(rows[0])

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao salvar no PostgreSQL" })
    }
})

//LISTAR TAREFAS NO TO-DO LIST
app.get('/tarefas', async (req, res) => {
    try {
        const { status, prioridade } = req.query

        let query = 'SELECT * FROM tarefas WHERE 1=1'
        let values = []


        if (status === 'pendentes') {
            query += 'AND concluida = false'
        } else if (status === 'concluida') {
            query += 'AND concluida = true'
        }

        if (prioridade) {
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

//ALTERNAR CONCLUSÃO(Marca/ Desmarca o checkbox)
app.patch('/tarefas/:id/toggle', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('UPDATE tarefas SET concluida = NOT concluida WHERE id = $1', [id])
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar status." })
    }
})

// CRIAR NOVA ANOTAÇÃO
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

//LISTAR ANOTAÇÕES
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


//LISTAR  EVENTOS POR MÊS/DATA
app.get('/evento', async (req, res) => {
    try {
        const { data } = req.query

        let query = 'SELECT * FROM eventos_calendario'
        let params = []

        if (data) {
            query += 'WHERE data_evento = $1'
            params.push(data)
        }

        query += 'ORDER BY horario ASC'

        const { rows } = await pool.query(query, params)
        res.json(rows)



    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar eventos do calendário' })

    }
})

//CRIAR NOVO REGISTRO
app.post('eventos', async (req, res) => {

    try {
        const { titulo, data, horario, local } = req.body

        const sql = ` 
            INSERT INTO eventos_calendario(titulo, data_evento, horario,local)
            VALUES($1, $2, $3, $4) RETURNING *`

        const {rows} = await pool.query(sql, [titulo, data, horario, local])
        res.status(201).json(rows[0])
    } catch(err){
        console.error(err)
        res.status(500).json({erro:'Erro ao agendar evento'})

    }
})

app.get('/eventos/dia/:data', async (req,res) =>{
    try{
        const{data} = req.params
        const {rows} = await pool.query(
            'SELECT * FROM eventos_calendario WHERE data_evento = $1 ORDER BY horario ',
            [data]
        )
        res.json(rows)


    }catch(err){
        res.status(500).json({erro: 'Erro ao carregar agenda do dia '})

    }
})




app.listen(3000, () => {
    console.log("Meu servidor tá rodando")
})

