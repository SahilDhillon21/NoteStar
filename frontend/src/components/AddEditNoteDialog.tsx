import React from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { Note } from '../models/note'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesAPI from '../network/notes_api'
import TextInputField from './form/TextInputField'

interface AddEditNoteDialogProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void
}

export default function AddEditNoteDialog({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || ""
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesAPI.updateNote(noteToEdit._id, input)
      } else {
        noteResponse = await NotesAPI.createNote(input);
      }
      onNoteSaved(noteResponse);

    } catch (error) {
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>


      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? "Edit note" : "Add new note"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)} >

          <TextInputField
            name="title"
            label="Title"
            type="Text"
            placeholder="This note's title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField 
            name="text"
            label="text"
            as = "textarea"
            rows={5}
            placeholder="Note's content"
            register={register}
          />

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className='btn-success' type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save note
        </Button>
      </Modal.Footer>

    </Modal>
  )
}
