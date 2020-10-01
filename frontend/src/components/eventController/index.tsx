import React, { useEffect, useState} from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import api from '../../services/api';

import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

import './styles.css';

interface IFormEvent {
    title: string;
    description: string;
    eventStartTime: Date;
    eventEndTime: Date;
    visibility: string;
    userId: string | null;
}

interface EventControllerProps{
    title: string;
    description: string;
    eventStartTime: Date;
    eventEndTime: Date;
    visibility: string;
    eventId?: string;
}

const EventController: React.FC<EventControllerProps> = ({title, description, eventStartTime, eventEndTime, visibility, eventId}) => { 
    const { register, errors, handleSubmit } = useForm<IFormEvent>();
    const onSubmit = (data: IFormEvent) => sendEvent(data);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const history = useHistory();

    const [eventVisibility, setEventVisibility] = useState(visibility);
    const [startEventDate, setStartEventDate] = useState<Date | any | null>(eventStartTime);
    const [endEventDate, setEndEventDate] = useState<Date | any | null>(eventEndTime);
  
    useEffect(() => {
        if(userId === null){
            history.push('./login');
            alert("Faça seu Login primeiro!");
        }
    }, []);

    function sendEvent(data: IFormEvent){
        if(userId !== null){
            data = {...data, eventStartTime: startEventDate, eventEndTime: endEventDate, visibility: eventVisibility, userId: userId};
        
            if(eventId){
                updateEvent(data);
            }else{
                postEvent(data);
            }
        }
    }

    async function postEvent(data: IFormEvent){
        try{
            await api.post('events', data, {
                headers:{
                authorization: `Bearer ${token}`,
            }});

            alert('Evento Criado com sucesso!');
            history.push('/myevents');
        
        }catch(err){
            alert('Falha ao criar Evento, tente novamente');
        }
     }

     async function updateEvent(data: IFormEvent){
        try{
            await api.put(`events/${eventId}`, data, {
                headers:{
                authorization: `Bearer ${token}`,
                userId: userId,
            }});

            alert('Evento Atualizado com sucesso!');
            history.push('/myevents');
        
        }catch(err){
            alert('Falha ao Editar Evento, tente novamente');
        }
     }

    function handleVisbilityChange(){
        eventVisibility === 'private' ? setEventVisibility('public') : setEventVisibility('private')
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle">
                <Form.Label>Nome do Evento:</Form.Label>
                <Form.Control type="text" name="title" value={title}ref={register({ required: true})}/>
                {errors.title && (<p className="error">Insira o titulo de seu Evento</p>)}
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control 
                as="textarea" 
                name="description" 
                value={description}
                ref={register({ required: true, maxLength: 140 })} 
                />
                {errors.description?.type === "required" && (
                    <p className="error">Preencha o campo!</p>
                )}
                {errors.description?.type === "maxLength" && (
                    <p className="error">Ops, sua descrição é muito grande :(</p>
                )}
            </Form.Group>
            <Form.Group controlId="formEventStart">
            <Form.Label>Início do evento:</Form.Label>
            <br/>
                <DatePicker
                    className="datePicker"
                    selected={startEventDate}
                    onChange={date => setStartEventDate(date)}
                    showTimeSelect
                    dateFormat="d, MMMM yyyy h:mm aa"
                />
            </Form.Group>
            <Form.Group controlId="formEventEnd">
            <Form.Label>Término do evento:</Form.Label>
            <br/>
            <DatePicker
                    className="datePicker"
                    selected={endEventDate}
                    onChange={date => setEndEventDate(date)}
                    showTimeSelect
                    dateFormat="d, MMMM yyyy h:mm aa"
                />
            </Form.Group>
            <Form.Group controlId="formVisibility">
                <Form.Check type="checkbox" label="Seu evento será público?" onChange={handleVisbilityChange} />
                <Form.Text className="text-muted">
                    Por padrão seu evento será privado, se desejar que outras pessoas possam ver seu evento, marque a opção!
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                {eventId && <span>Atualizar evento</span>}
                {!eventId && <span>Criar evento</span>}
            </Button>
        </Form>
    );
}

export default EventController;