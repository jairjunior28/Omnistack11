const express = require ('express');
const cors = require('cors'); //5.2K (gzipped: 2.1K)
const {errors} =require('celebrate');
const routes = require ('./routes');


const app= express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());


module.exports = app;

//app.listen(3333);

