const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createPool(config)


const namesList = ["James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Christopher","Charles","Daniel","Matthew","Anthony","Mark","Donald","Steven","Andrew","Paul","Joshua","Kenneth","Kevin","Brian","George","Timothy","Ronald","Jason","Edward","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Gregory","Alexander","Patrick","Frank","Raymond","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Adam","Nathan","Henry","Zachary","Douglas","Peter","Kyle","Noah","Ethan","Jeremy","Walter","Christian","Keith","Roger","Terry","Austin","Sean","Gerald","Carl","Harold","Dylan","Arthur","Lawrence","Jordan","Jesse","Bryan","Billy","Bruce","Gabriel","Joe","Logan","Alan","Juan","Albert","Willie","Elijah","Wayne","Randy","Vincent","Mason","Roy","Ralph","Bobby","Russell","Bradley","Philip","Eugene"]
let names = [];

app.get('/', async (req,res) => {
    const randomName = getRandomName();
    
    await saveName(randomName);
    names = await getNames();

    const template = createTemplate(names);
        
    res.send(template)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

const saveName = async (name) => {
    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
}

const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * 100)
    return namesList[randomIndex]
}

const getNames = () => {
    const sql = "select * from people"

    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, result) => {
            if (err) return reject(err); 
            return resolve(result);
        })

    })
}

const createTemplate = (names) => {
    const header = "<h1>Full Cycle</h1>";
    let list = '';

    names.forEach(name => list += `<li>${name.name}</li>`);

    template = header + `<ul>${list}</u>`

    return template;
}
