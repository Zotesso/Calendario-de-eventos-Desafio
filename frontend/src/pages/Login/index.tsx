import React from 'react';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/header';
import './styles.css';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import Footer from '../../components/footer';

interface IFormLogin {
    username: string;
    password: string;
}

const Login = () => { 
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<IFormLogin>();
    const onSubmit = (data: IFormLogin) => sendLogin(data);
    
    async function sendLogin(data: IFormLogin){
        try{
            const response = await api.post('login', data);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.userId);
            
            history.push('/myevents');
        }catch(err){
            alert('Falha no Login, tente novamente');
        }
    }

    return (
        <>
    <header>
        <Header />
    </header>
    <main>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Text className="text-muted">
            Não tem uma conta?
            <Link to="/register">
                Se regristre clicando aqui!
            </Link> 
        </Form.Text>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" ref={register({ required: true, maxLength: 20 })}/>
                {errors.username?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
                {errors.username?.type === "maxLength" && (
                    <p className="error">Username grande demais.</p>
                )}
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" name="password" ref={register({ required: true, minLength: 6})}/>
                {errors.password?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
            </Form.Group>
            <Button variant="success" type="submit">
                Entrar
            </Button>
        </Form>
    </main>
        <footer>
          <Footer />
        </footer>
    </>
    );
}

export default Login;