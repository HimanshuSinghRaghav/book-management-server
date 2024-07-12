import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import sequelize from './config/db.js'
import bookRoutes from './routes/bookRoutes.js'
import swaggerDocs from './docs/swagger.js'
dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors())
sequelize.sync().then(()=>{
    console.log('database and tables created!')
})

app.get('/' , (req , res)=>{
    res.send(`server is running \n view api docs on http://localhost:8000/api/docs`)
})
swaggerDocs(app , PORT)
app.use('/uploads' , express.static('uploads'))
app.use('/api/auth' , authRoutes);
app.use('/api' , bookRoutes);
app.listen(PORT , (()=>{
    
    console.log(`server is running on http://localhost:${PORT}`)
}))