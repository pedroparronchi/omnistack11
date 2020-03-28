import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const [list, setList] = useState([]);
    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                "Authorization": ongId
            }
        }).then((resp) => {
            setList(resp.data);
        }).catch((error) => {
            alert(error.response.data.error);
        })
    }, [ongId]);

    const removeItem = (item) => {
        api.delete(`incidents/${item.id}`, {
            headers: {
                "Authorization": ongId
            }
        }).then(() => {
            setList(list.filter(listItem => listItem.id !== item.id))
            alert("Excluído com sucesso");
        }).catch(error => {
            alert(error.response.data.error)
        })
    }
    
    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, APAD</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {list.map(item => (
                    <li key={item.id}>
                        <strong>CASO:</strong>
                        <p>{item.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{item.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</p>

                        <button onClick={() => removeItem(item)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
