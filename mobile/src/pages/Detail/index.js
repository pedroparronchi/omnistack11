import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons';
import style from './style';

import logoImg from '../../assets/logo.png';


export default function Detail({route, navigation}) {
  
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, 
        estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" 
        com o valor de R$ ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    const sendEmail = () => {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body:message
        })
    }

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
    
    // useEffect(() => {
    //     setIncident()
    // }, [])

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" color="#E82041" size={28}></Feather>
                </TouchableOpacity>
            </View>

            <View style={style.incident}>

                <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso!</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendEmail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
