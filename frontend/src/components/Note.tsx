import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formateDate";
import { MdDelete } from "react-icons/md"

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string
}

const Note = ({ note, onNoteClicked,onDeleteNoteClicked, className  }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedAt: string;
    if(updatedAt > createdAt){
        createdUpdatedAt = "Updated: "+ formatDate(updatedAt);
    }else{
        createdUpdatedAt = "Created: "+ formatDate(updatedAt);
    }

    return (
        <Card className={`${styles.noteCard} ${className}`} onClick={() => onNoteClicked(note)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {title}
                    <MdDelete
                    className="text-muted ms-auto"
                    onClick={(e) => {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedAt}
            </Card.Footer>
        </Card>
    )

}

export default Note;
