const express = require('express')
const port = 3000
const {DB} = require('./db')
const app = express()

app.get('/', async (req,res) => {
    try {
        const results = await DB.exec('SELECT * FROM people')
        
        let html = '<h1>Full Cylcle</h1>'
        html += "<ul>"
        for (let index=0; index < results.length; index++) {
            html += `<li>${results[index].name}</li>`
        }
        html += "</ul>"

        res.send(html)
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({success: false, message: 'erro interno'})
    }
})

app.listen(port, () => {
    console.log('rodando na porta ' + port)    

    DB.exec('CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id))')
   
    DB.exec(`INSERT INTO people(name) values('Ana'), ('Paulo'), ('Antonio'), ('Maria')`)
    
})
