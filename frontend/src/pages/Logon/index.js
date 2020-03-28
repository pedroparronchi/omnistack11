import React, { useState, useEffect, useCallback  } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    const getOng = useCallback((idSubmit) => {
        api.post('sessions', {
            id: idSubmit
        })
        .then((resp) => {
            localStorage.setItem("ongId", idSubmit);
            localStorage.setItem("ongName", resp.data.name);
            history.push('/profile');
        })
        .catch((error) => alert(error.response.data.error));
    }, [history])

    const handleSubmit = (e) => {
        e.preventDefault();
        getOng(id);
    }

    useEffect(() => {
        
        const validLoggedIn = async () => {
            const storageId = localStorage.getItem('ongId');
            if (storageId) {
                getOng(storageId)
            }
        }
        validLoggedIn();
    }, [getOng])

    return (
        <div className="logon-container">
            <section className="form">

                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleSubmit}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
