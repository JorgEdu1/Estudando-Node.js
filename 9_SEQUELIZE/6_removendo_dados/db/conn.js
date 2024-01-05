const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize','root','',{
    host: 'localhost',
    dialect: 'mysql'
    }); 

// try{
//     sequelize.authenticate();
//     console.log('Conexão com o banco de dados realizada com sucesso!');
// }catch(err){
//     console.log(err);
// }

module.exports = sequelize;