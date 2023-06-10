const Sequelize = require('sequelize')
require('./models/init-models.js')
var db = {}

const sequelize = new Sequelize('link', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
    operatorsAliases: false,
})

let models = [
    require('./models/users.js'),
    require('./models/pages.js'),
    require('./models/styles')
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})
console.log(db)
// Apply associations


Object.keys(db).forEach(key => {
        if (db[key] && db[key].associate) {
            db[key].associate(db);
        }
    });

console.log(db.users.associate)
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports=db;
