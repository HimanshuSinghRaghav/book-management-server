import Book from '../models/bookModel.js'
import path from 'path'
import fs from 'fs'
import { createBookSchema } from '../validators/bookValidator.js';

const createBook = async(req , res)=>{
   const { error } = createBookSchema.validate(req.body);
   if (error) return res.status(400).send({ message: error.details[0].message });

    const {title, author, genre} = req.body;
    const coverImage = req.file ? `${req.protocol}://${req.get('host')}/${req.file.path}`: null;
    if(!title || !author || !genre || !coverImage) return res.status(400).send({message:'Please provide all required fields'});

    try{
        
        await Book.create({title, author, genre, coverImage});
        res.sendStatus(201);
    }catch(error){
        console.log(error)
        res.status(500).send({message:'book creation failed!' , error})
    }
}

const getBook = async(req , res)=>{
    const {id} = req.params;
    try{
        const book = await Book.findByPk(id);
        const booksWithCoverImages ={
            id:book.id,
            title:book.title,
            author:book.author,
            genre:book.genre,
            coverImage:`${req.protocol}://${req.get('host')}/${book.coverImage}`
        }
        res.status(200).send(booksWithCoverImages)
    }catch(error){
        res.status(500).send({message:'book not found!'})
    }
}

const getAllBook = async(req , res)=>{
    try{
        const books = await Book.findAll();
        const booksWithCoverImages = books.map((book)=>({
            id:book.id,
            title:book.title,
            author:book.author,
            genre:book.genre,
            coverImage:`${req.protocol}://${req.get('host')}/${book.coverImage}`
        }))
        res.status(200).send(booksWithCoverImages)
    }catch(error){
        res.status(500).send({message:'book not found!'})
    }
}

const updateBook = async(req , res)=>{
    const {id} = req.params;
    const {title, author, genre} = req.body;
    const coverImage = req.file ? req.file.path : null;

    try{
        const book = await Book.findByPk(id);
        if(!book) return res.status(404).send({message:'book not found!'});
        if(coverImage && book.coverImage){
            fs.unlink(path.join(path.resolve(), '..' , book.coverImage) , err=>{
                if(err){console.log(err)}
            })
        }
        console.log(coverImage)
        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.coverImage = coverImage || book.coverImage;

        const a = await book.save();
        console.log(a)
        const updatedBook = {
            id:book.id,
            title:book.title,
            author:book.author,
            genre:book.genre,
            coverImage:`${req.protocol}://${req.get('host')}/${book.coverImage}`
        }

        res.status(200).send(updatedBook)
    }catch(error){
        console.log(error)
        res.status(500).send({message:'book update failed!' , error})
    }
}

const deleteBook = async(req , res)=>{
    const {id} = req.params;
    try{
        const book = await Book.findByPk(id);
        if(!book) return res.status(404).send({message:'book not found!'});
        if(book.coverImage){
            fs.unlink(path.join(path.resolve(), '..' , book.coverImage) , err=>{
                if(err){console.log(err)}
            })
        }
        await book.destroy();
        res.sendStatus(204)
    }catch(error){
        res.status(500).send({message:'book not found'})
    }
}
export {createBook , getBook , getAllBook , updateBook , deleteBook}