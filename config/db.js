const Sequelize = require('sequelize')
const sequelize = new Sequelize('js_agendamento', 'js_agendamento', 'R*e@x.bnQ#442h', {
    dialect: 'mysql',
    host: 'js_agendamento.mysql.dbaas.com.br',
    port: 3306
})
module.exports = {
    Sequelize,
    sequelize
}