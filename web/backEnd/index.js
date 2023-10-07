const express = require("express");
const app = express();

const cors = require('cors')

app.use(cors());
app.use(express.json());

const loginRouter = require('./src/modules/login'); // importando rota do modulo login 

//registro ao banco de dados em suas devidas tabelas no usuario master, que vai do confirmar para a tabela do dia
const coffeRegisterMasterRouter = require('./src/modules/master/registerTable/coffe')//registro tabela cafe
const foodRegisterMasterRouter = require('./src/modules/master/registerTable/food')//registro tabela almoço

//tabela exibida aos usuarios 
const tableCoffeDayRouter = require('./src/modules/master/tableDay/coffeDay/index')//consulta tabela café
const tableFoodDayRouter = require('./src/modules/master/tableDay/foodDay/index')//consulta tabela almoço 

//delete tabela do dia tanto que exibe aos alunos como remove do usuario master
const deleteTableCoffeRouter = require('./src/modules/master/deleteTableDay/deleteCoffe')//cafe
const deleteTableFoodRouter = require('./src/modules/master/deleteTableDay/deleteFood')//almoço


//post dos itens votado na tabela de resultados e também remove
const postItemTableCoffeUser = require('./src/modules/dashboardCoffe/postTableUser')//post cafe
const deleteItemTableCoffeUser = require('./src/modules/dashboardCoffe/deleteTableUser')//delete item cafe

const postItemTableFoodUser = require('./src/modules/dashboardFood/postTableUser')//post almoço
const deleteItemTableFoodUser = require('./src/modules/dashboardFood/deleteTableUser')//delete item almoço

//consulta no banco de dados do usuario para pegar quantidade votada
const resultsTableCoffeUserRouter = require('./src/modules/master/resultTableUser/resultsCoffeUser') //cafe
const resultsTablefoodUserRouter = require('./src/modules/master/resultTableUser/resultsFoodUser') //almoço

//delete do banco de daos as votações realizadas pelos os usuarios
const deleteResultsCoffeUserRouter = require('./src/modules/master/deleteResultsTableUser/deleteResultsCoffe')//cafe
const deleteResultsFoodUserRouter = require('./src/modules/master/deleteResultsTableUser/deleteResultsFood')//almoço



// login

app.use('/login', loginRouter)


 //dashboard do usuario master

app.use('/tablecoffe', coffeRegisterMasterRouter)//registro tabela cafe
app.use('/tablefood', foodRegisterMasterRouter)//registro tabela almoço

app.use('/tablecoffeday', tableCoffeDayRouter)//consulta tabela café da manha 
app.use('/tablefoodday', tableFoodDayRouter)////consulta tabela almoço 


app.use('/deletetablecoffe', deleteTableCoffeRouter)//delete tabela do café da manha
app.use('/deletetablefood', deleteTableFoodRouter)//delete tabela do almoço


app.use('/resultstablecoffeuser', resultsTableCoffeUserRouter )//pegar quantidade votada na tabela do usuario do cafe
app.use('/resultstablefooduser', resultsTablefoodUserRouter )//pegar quantidade votada na tabela do usuario do almoço

app.use('/deleteresultscoffeuser', deleteResultsCoffeUserRouter)
app.use('/deleteresultsfooduser', deleteResultsFoodUserRouter)


//dashboard do cafe

app.use('/postitemcoffeuser', postItemTableCoffeUser)
app.use('/deleteitemcoffeuser', deleteItemTableCoffeUser)


//dashboard do almoço
app.use('/postitemfooduser', postItemTableFoodUser)
app.use('/deleteitemfooduser', deleteItemTableFoodUser)


const db = require('./src/dataBase/index');


app.use((err, req, res, next) => {
    console.error('Erro ao conectar com o banco de dados:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
});



app.listen(3001, () => (
    console.log("rodando servidor")
))

