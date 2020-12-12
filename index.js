const express = require('express');
const config = require('config');
const courses = require('./routes/courses')
const home = require('./routes/home')
const log = require(`./middleware/logger`)
const app = express();

app.use(express.json());
app.use(log);
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/api/courses' , courses);
app.use('/' , home)
console.log(`name: ${config.get('name')}`);
console.log(`host: ${config.get('host.meil')}`);




const port = process.env.PROT || 3000;
app.listen(port, () => console.log(`connection to listener ${port}....`))