import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { createBook, getBook, getAllBook, updateBook, deleteBook } from '../controllers/bookController.js';
import upload from '../middleware/multer.js'


const router = express.Router();

router.post('/books' ,[authMiddleware ,upload.single('coverImage')], createBook);
router.get('/books/:id' , getBook);
router.get('/books' , getAllBook); 
router.put('/books/:id' ,[authMiddleware ,upload.single('coverImage')] , updateBook);
router.delete('/books/:id',authMiddleware , deleteBook);

export default router
