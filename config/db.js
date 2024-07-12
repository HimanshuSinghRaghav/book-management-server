import {Sequelize} from 'sequelize'
import { db } from './db.config.js';

console.log(process.env , db)
const sequelize = new Sequelize(db.name ,db.user, db.password , {
    host: db.host,
    dialect:db.dialect
}); 

export default sequelize;