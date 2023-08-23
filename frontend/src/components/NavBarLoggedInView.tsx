import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesAPI from '../network/notes_api';

interface NavBarLoggedInViewProps{
    user: User,
    onLogOutSuccessfull: () => void

}

const NavBarLoggedInView = ({user, onLogOutSuccessfull} : NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesAPI.logOut();

            onLogOutSuccessfull();

        } catch (error) {
            console.log(error);
            alert(error);   
        }
    }

    return (
        <>
        
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>

            <Button onClick={logout}>
                Logout
            </Button>

        </>
    );  
}

export default NavBarLoggedInView;