import { Button, Navbar } from "react-bootstrap";
import * as NotesAPI from '../network/notes_api';

interface NavBarLoggedOutViewProps{
    onSignUpClicked: () => void,
    onLoginClicked: () => void

}

const NavBarLoggedOutView = ({onSignUpClicked, onLoginClicked} : NavBarLoggedOutViewProps) => {

    return (
        <>
            <Button onClick={onSignUpClicked}>
                Sign up
            </Button>
        
            <Button onClick={onLoginClicked}>
                Log in
            </Button>

        </>
    );  
}

export default NavBarLoggedOutView;