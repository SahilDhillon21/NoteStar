import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LogInCredentials } from "../network/notes_api";
import * as NotesAPI from "../network/notes_api";
import { Form, Modal, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from '../styles/utils.module.css';

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSucessfull: (user: User) => void,

}

const LoginModal = ({ onDismiss, onLoginSucessfull }: LoginModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LogInCredentials>();

    async function onSubmit(credentials: LogInCredentials) {
        try {
            const user = await NotesAPI.logIn(credentials);
            onLoginSucessfull(user);
        } catch (error) {
            alert(error);
        }
    }

    return (

        <Modal show onHide={onDismiss}>
            <Modal.Header>
                <Modal.Title>
                    Log in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name='username'
                        label='Username'
                        type='text'
                        placeholder='Username'
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />

                    <TextInputField
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='Password'
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password} />

                    <Button
                        type='submit'
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;
