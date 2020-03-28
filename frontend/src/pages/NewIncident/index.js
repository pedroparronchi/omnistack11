import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './style.css';

import api from '../.././services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('incidents', {
            title,
            description,
            value
        }, {
            headers: {
                "Authorization": ongId
            }
        }).then(resp => {
            alert("Caso cadastrado com sucesso");
            history.push('/profile');
        }).catch((error) => alert("Erro ao cadastrar Caso"));
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontar um herói para resolver isso.</p>


                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a home
                    </Link>

                </section>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Título do caso" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea type="email" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="Valor em reais" value={value} onChange={(e) => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}
