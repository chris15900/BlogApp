const { Client } = require ('pg');
const client = new Client({
    user:'postgres',
    host:'localhost',
    database:'test',
    password:'root',
    port: 5432,
})


async function check(){
    await client.connect()
    // const res = await client.query('SELECT * from blogs')
    // console.log(res.rows[0])
    // await client.end()
}

check();
module.exports = client;
