import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import api from '../../api';

export default function Coffee(props) {

    const { name, titleCoffee } = props;

    const [confirmed, setConfirmed] = useState(false);

    const handleButtonClick = async () => {

        if (confirmed) {
            setConfirmed(false);
            try {
                await api.delete(`/deleteitemcoffeuser?name=${name}&coffe=${titleCoffee}`);
                console.log('Seleção removida com sucesso do café', name + titleCoffee);
            } catch (error) {
                console.error('Erro ao remover a seleção do café:', error);
            }
        } else {
            setConfirmed(true);
            props.saveCoffee(props.titleCoffee);
        }
    }

    return (
        <Animatable.View delay={1000} animation='flipInX' style={styles.box}>

            <View style={styles.boxInput}>

                <Text style={styles.title}>{props.titleCoffee}</Text>
                <TouchableOpacity style={[styles.button, confirmed && styles.buttonConfirmed]} onPress={handleButtonClick}>
                    <Text style={styles.confirm}>{confirmed ? 'Confirmado' : 'Confirmar'}</Text>
                </TouchableOpacity>

            </View>

        </Animatable.View>

    );
}


const styles = StyleSheet.create({
    box: {
        minHeight: 150,
        width: '95%',
        borderWidth: 3,
        borderRadius: 40,
        borderColor: '#D3D3D3',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxInput: {
        height: '90%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        color: '#000',
        fontSize: 21,
        width: '50%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DA251C',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonConfirmed: {
        backgroundColor: 'green'
    },
    confirm: {
        color: '#FFFFFF',
        fontSize: 15
    }


})