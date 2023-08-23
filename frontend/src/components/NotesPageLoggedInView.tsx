import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Note as NoteModel } from '../models/note';
import * as NotesAPI from '../network/notes_api';
import AddEditNoteDialog from './AddEditNoteDialog';
import LoginModal from './LoginModal';
import Note from './Note';
import SignUpModal from './SignUpModal';
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";

export default function NotesPageLoggedInView() {

    const [notes, setNotes] = useState<NoteModel[]>([]);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    const [notesLoading, setNotesLoading] = useState(true);

    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    useEffect(() => {

        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesAPI.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
            }
        };

        loadNotes();

    }, []);

    async function deleteNote(note: NoteModel) {
        try {
            await NotesAPI.deleteNote(note._id);
            setNotes(notes.filter(
                exisitingNote => exisitingNote._id !== note._id
            ))
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const noteGrid =
        <Row xs={1} md={2} lg={3} className='g-4 '>

            {notes.map(note => (
                <Col>
                    <Note onNoteClicked={setNoteToEdit}
                        note={note} key={note._id} className={styles.note} onDeleteNoteClicked={deleteNote} />
                </Col>
            ))}

        </Row>

    return (
        <div>
            <>

                <Row>
                    <Col xs={12} md={12} lg={12} className='text-center'>
                        <Button className={`my-3`} onClick={() => setShowAddNoteDialog(true)}>
                            <div className={styleUtils.flexCenter}>
                                <FaPlus />
                                Create new note
                            </div>
                        </Button>
                    </Col>
                </Row>

                {notesLoading &&

                    <Row>
                        <Col xs={12} md={12} lg={12} className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </Col>
                    </Row>

                }

                {showNotesLoadingError && <p>Failed to fetch notes. Please refresh and try again.</p>}

                {!notesLoading && !showNotesLoadingError &&
                    <>
                        {
                            notes.length > 0 ? noteGrid : <p>You haven't created any notes yet.</p>
                        }
                    </>
                }

                {showAddNoteDialog &&
                    <AddEditNoteDialog onDismiss={() => setShowAddNoteDialog(false)} onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);

                    }} />
                }

                {noteToEdit &&
                    <AddEditNoteDialog
                        noteToEdit={noteToEdit}
                        onDismiss={() => setNoteToEdit(null)}
                        onNoteSaved={(updatedNote) => {
                            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                            setNoteToEdit(null);
                        }}

                    />
                }

                {false &&
                    <SignUpModal
                        onDismiss={() => { }}
                        onSignUpSucessfull={() => { }}
                    />
                }

                {false &&
                    <LoginModal
                        onDismiss={() => { }}
                        onLoginSucessfull={() => { }}
                    />
                }

            </>

        </div>
    )
}
