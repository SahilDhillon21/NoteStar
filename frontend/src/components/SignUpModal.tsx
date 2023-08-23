import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesAPI from "../network/notes_api";
import { Button, Modal } from "react-bootstrap";
import TextInputField from './form/TextInputField';
import styleUtils from '../styles/utils.module.css'

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSucessfull: (user: User) => void


}

const SignUpModal = ({ onDismiss, onSignUpSucessfull }: SignUpModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NotesAPI.SignUpCredentials>();

    async function onSubmit(credentials: NotesAPI.SignUpCredentials) {
        try {

            const newUser = await NotesAPI.signUp(credentials);
            onSignUpSucessfull(newUser);

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    return (

        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
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
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='Email'
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
                    />
                    <TextInputField
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='Password'
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />

                    <Button
                    type='submit'
                    disabled={isSubmitting}
                    className={styleUtils.width100}
                    >
                        Sign up
                    </Button>

                </Form>

            </Modal.Body>

        </Modal>

    );
}

export default SignUpModal;
