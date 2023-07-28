const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-book' , 'root' , 'Tarathakur@21' , {
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize