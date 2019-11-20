import React, {useState, useContext} from "react";
import {Form, Input, Button, ErrorMessage} from '../components/common';
import {FirebaseContext} from '../components/Firebase';

const Register = () => {
    const {firebase} = useContext(FirebaseContext);
    const [errorMassege, setErrorMessege] = useState('');
    
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    
    const handleInputChange = e => {
        e.persist();
        setErrorMessege('');
        setFormValue(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(formValue.password === formValue.confirmPassword) {
            firebase.reqister({
                email: formValue.email,
                password: formValue.password,
                username: formValue.username
            }).catch(error => {
                console.log(error);
                if(error.code === 'auth/email-already-in-use') {
                    setErrorMessege('Неверный email');
                } else if (error.code ==='auth/weak-password') {
                    setErrorMessege('Пароль должен быть не менее 6 символов');
                } else {
                    setErrorMessege(error.message);
                }
              });
        }else{
            setErrorMessege('Пароли не совпадают')
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleInputChange} value={formValue.username} placeholder="username" type="text" required name="username"></Input>
            <Input onChange={handleInputChange} value={formValue.email} placeholder="email" type="email" required name="email"></Input>
            <Input onChange={handleInputChange} value={formValue.password} placeholder="Пароль" type="password" required minLenght={6} name="password"></Input>
            <Input onChange={handleInputChange} value={formValue.confirmPassword} placeholder="Подтвердить пароль" type="password" required minLenght={6} name="confirmPassword"></Input>
            {!!errorMassege &&
                <ErrorMessage>
                {errorMassege}
              </ErrorMessage>
              }
            <Button type="submit" block>Зарегистрироваться</Button>
        </Form>
    )
}

export default Register;
