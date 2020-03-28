import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/ongs', {
                name,
                email,
                whatsapp,
                city,
                uf
            });
            
            localStorage.setItem('ongId', response.data.id);
            alert(`Cadastro realizado com sucesso, seu ID: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, preenche os campos e tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>


                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Tenho cadastro
                    </Link>

                </section>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome da ONG" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail"  value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Whatsapp"  value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="UF" value={uf} maxLength="2" style={{ width: 80 }} onChange={(e) => setUf(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}
