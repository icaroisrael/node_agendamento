const db = require('../config/db')
const Usuario = db.sequelize.define('usuario', {
    cpf:{
        type: db.Sequelize.INTEGER(11),       
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: db.Sequelize.STRING(20),
        allowNull: false,
    },
    sobreNome:{
        type: db.Sequelize.STRING(30),
        allowNull: false,
    },
    email:{
        type: db.Sequelize.STRING(100),
        allowNull: false,
    },
    senha:{
        type: db.Sequelize.STRING(6),
        defaultValue: "123456",
        allowNull: false        
    },
    permissao:{
        type:db.Sequelize.SMALLINT(1),
        defaultValue:0
    }
}) 
//Usuario.sync({force:true})
module.exports = Usuario;