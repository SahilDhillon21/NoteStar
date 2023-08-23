import express from "express";
import * as NotesController from "../controllers/notes"

const router = express.Router();


// Setting an endpoint for an http get request
router.get("/", NotesController.getNotes );

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNotes);

router.patch("/:noteId", NotesController.updateNotes);

router.delete("/:noteId",NotesController.deleteNote)

export default router;