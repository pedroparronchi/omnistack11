import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import style from './style';

import logoImg from '../../assets/logo.png';

export default class Incidents extends Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Image source={logoImg}></Image>
                    <Text style={style.headerText}>Total de
                        <Text style={style.headerTextBold}> 0 casos</Text> .
                    </Text>
                </View>

                <Text style={style.title}>Bem-vindo!</Text>
                <Text style={style.description}>Escolha um dos casos abaixo e salve o dia</Text>
                
            </View>
        )
    }
}
