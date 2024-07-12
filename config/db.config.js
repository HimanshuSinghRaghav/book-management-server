import dotenv from 'dotenv';
dotenv.config()

export const db = {
    name:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    dialect:'mysql'
}