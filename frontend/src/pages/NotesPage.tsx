import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import { User } from "../models/user";

interface NotesPageProps {
    loggedInUser: User | null
}

export default function NotesPage({ loggedInUser }: NotesPageProps) {
    return (
        <Container className='mt-4'>

            <>
                {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
            </>

        </Container>
    )
}
