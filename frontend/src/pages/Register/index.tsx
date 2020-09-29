import React from 'react';
import  Form  from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';

import Header from '../../components/header';
import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface IFormRegister {
    name: string;
    username: string;
    password: string;
}

const Home = () => { 
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<IFormRegister>();
    const onSubmit = (data: IFormRegister) => sendRegister(data);
    
  async function sendRegister(data: IFormRegister){
        try{
        await api.post('users',data);
            alert(`Sua conta foi Cadastrada com sucesso!`);
            history.push('/');
        }catch (err){
            alert("Erro no Cadastro, tente novamente");
        }
    }

    return (
        <>
    <header>
        <Header />
    </header>
    <main>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName">
                <Form.Label>Nos conte seu nome!</Form.Label>
                <Form.Control type="text" name="name" ref={register({ required: true, maxLength: 20,  pattern: /^[A-Za-z]+$/i })}/>
                {errors.name?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
                {errors.name?.type === "maxLength" && (
                    <p className="error">Nome muito longo :(</p>
                )}
                {errors.name?.type === "pattern" && (
                    <p className="error">O nome deve conter apenas caracteres</p>
                )}
            </Form.Group>
            <Form.Group controlId="formUsername">
                <Form.Label>Escolha seu Username</Form.Label>
                <Form.Control type="text" name="username" ref={register({ required: true, maxLength: 20 })}/>
                {errors.username?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
                {errors.username?.type === "maxLength" && (
                    <p className="error">Nome muito longo :(</p>
                )}
                <Form.Text className="text-muted">
                Seu Username será utilizado ao logar!
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Insira sua senha</Form.Label>
                <Form.Control type="password" name="password" ref={register({ required: true, minLength: 6})}/>
                {errors.password?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
                {errors.password?.type === "minLength" && (
                    <p className="error">Senha muito fraca!</p>
                )}
            </Form.Group>
            <Button variant="dark" type="submit">
                Cadastrar-se
            </Button>
        </Form>
    </main>
    </>
    );
}

export default Home;