const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "testdb",
  dialect: "mysql",
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//mostrando a tabela do banco de dados para o sequilize
db.user = sequelize.define("users", {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

db.role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
});

//definindo relacionamentos entre as tabelas

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

module.exports = db;
