import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import style from './style';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

export default function Incidents() {

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const navigationToDetail = (incident) => {
        navigation.navigate('Detail', { incident });
    }

    const loadIncidents = async () => {
        /**
         * Se está carregando, não tentar novamente
         */
        if (loading) {
            return;
        }

        /**
         * Não buscar informação se já tenho todas
         */
        if (total > 0 && Incidents.lenght === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        })

        setList([...list, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}></Image>
                <Text style={style.headerText}>Total de
                    <Text style={style.headerTextBold}> {total} casos</Text> .
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
                data={list}
                style={style.incidentList}
                keyExtractor={item => String(item.id)}
                // showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{item.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{item.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>

                        <Text style={style.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(item.value)}
                        </Text>

                        <TouchableOpacity
                            style={style.detailsButton}
                            onPress={() => navigationToDetail(item)}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={17} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />


        </View>
    )


}
