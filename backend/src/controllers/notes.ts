import { RequestHandler } from "express";
import NoteModel from "../models/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler =  async (req, res, next) => {
    const authenticatedUser = req.session.userId;



    try {
        const notes = await NoteModel.find({userId:authenticatedUser}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }

}

export const getNote: RequestHandler = async (req,res,next) => {
    const noteId = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note ID");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface CreateNoteBody{
    title?: string,
    text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) =>{
    const title = req.body.title;
    const text = req.body.text;

    try {
        if(!title){
            throw createHttpError(400,"Note must have a title!")
        }
        const newNote = await NoteModel.create({
            userId: req.session.userId,
            title: title, 
            text: text});
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParams{
    noteId : string,
}

interface UpdateNoteBody{
    title? : string,
    text? : string,
}

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req,res,next) =>{
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note ID");
        }

        if(!newTitle){
            throw createHttpError(400,"Please pass the updated title!");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Such a note does not exist!")
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
}


// If we need type checking for one then we must provide all four, or none at all.
// By default, we know that params in url are strings so no need for an interface for that, however for updating we will 
// must receive string types only. here not needed since only note id is passed through url params.
export const deleteNote: RequestHandler = async (req,res,next) => {
    const noteId = req.params.noteId;

    try {

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note ID");
        }


        const note = await NoteModel.findById(noteId).exec()

        if(!note){
            throw createHttpError(404,"This note doesn't exist!")
        }

        await note.deleteOne();

        res.sendStatus(204);

    } catch (error) {
        next(error)
    }
}