import React, {ButtonHTMLAttributes, useEffect, useState} from 'react';

import { useHistory } from 'react-router-dom';

import Header from '../../components/header';
import api from '../../services/api';

import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

import './styles.css';

const Home = () => { 
    const [personalEvents, setPersonalEvents] = useState([]);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        if(userId === null){
            history.push('./login');
            alert("Faça seu Login primeiro!");
        }
    }, []);

    const [startDate, setStartDate] = useState<Date | any | null>(new Date());

    return (
        <Form>
            <Form.Group controlId="formTitle">
                <Form.Label>Nome do Evento:</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group controlId="formEventStart">
            <Form.Label>Início do evento:</Form.Label>
            <br/>
                <DatePicker
                    className="datePicker"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showTimeSelect
                    dateFormat="d, MMMM yyyy h:mm aa"
                />
            </Form.Group>
            <Form.Group controlId="formEventEnd">
            <Form.Label>Término do evento:</Form.Label>
            <br/>
                <DatePicker
                    className="datePicker"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showTimeSelect
                    dateFormat="d, MMMM yyyy h:mm aa"
                />
            </Form.Group>
            <Form.Group controlId="formVisibility">
                <Form.Check type="checkbox" label="Seu evento será público?" />
                <Form.Text className="text-muted">
                    Por padrão seu evento será privado, se desejar que outras pessoas possam ver seu evento, marque a opção!
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Criar evento
            </Button>
        </Form>
    );
}

export default Home;