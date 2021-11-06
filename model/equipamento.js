const db = require('../config/db')
const Equipamento = db.sequelize.define('equipamento', {
    codigo:{
        type: db.Sequelize.SMALLINT(2),       
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao:{
        type: db.Sequelize.STRING(50),
        allowNull: false,
    }
}) 
//Equipamento.sync({force:true})
module.exports = Equipamento;