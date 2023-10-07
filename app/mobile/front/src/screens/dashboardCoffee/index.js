import {
    StyleSheet, Text, View, StatusBar, SafeAreaView,
    ScrollView, Image, TouchableOpacity, BackHandler
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Coffee from '../../component/Coffee';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import api from '../../api';



export default function DashboardCoffee(props) {
    const [coffesDay, setCoffesDay] = useState([]);
    const { name, confirmedFoods } = props.route.params || {};

    const navigation = useNavigation();

    //função para consultar e exibir os itens 
    const fecthCoffesDay = () => {
        api.get('/tablecoffeday')
            .then(response => {
                setCoffesDay(response.data)
            })
            .catch(error => {
                console.error("erro ao obter itens do banco de dados", error)
            })
    }

    useEffect(() => {
        fecthCoffesDay()

    }, [])

    //metodo utilizado para salvar o alimento no banco de dados quando clicado
    const saveCoffee = async (index) => {
        try {
            const response = await api.post('/postitemcoffeuser', {
                name,
                coffe: coffesDay[index].coffe,
            })
            console.log('seleção salva com sucesso do café:', response.data)
        } catch (error) {
            console.error('erro ao salvar a seleção do café:', error)
        }
    };


    //utilizado para remover a ação de voltar a tela, ele desabilita o botao
    useEffect(() => {
        const handleBackPress = () => {
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    }, []);


    //verificação para caso nao tenha item no almoço, já finalizar o projeto.
    const tableFoodExist = () => {
        api.get('/tablefoodday')
            .then(response => {
                const foodsDay = response.data;
                if (foodsDay != 0) {
                    navigation.navigate('DashboardFood', { name, confirmedFoods })
                } else {
                    navigation.navigate('Exit', { name })
                }
            }
            )
    }


    return (

        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor="#DA251C" barStyle='light-content' />

            <ScrollView style={styles.view}>

                <Animatable.View delay={500} animation='fadeInLeft' style={styles.box_title}>

                    <Text style={styles.nameUser}>Olá {name}, escolha:</Text>
                    <Text style={styles.title}>Café da manhã<Image source={require('../../../../assets/icon_coffee.png')}
                    /></Text>

                </Animatable.View>

                <Animatable.View delay={500} animation='fadeInUp' style={styles.boxContent}>

                    {coffesDay.map((coffe, index) => (
                        <Coffee key={coffe.id} titleCoffee={coffe.coffe} saveCoffee={() => saveCoffee(index)} name={name} />
                    ))}

                </Animatable.View>

                <Animatable.View style={styles.boxContinue} delay={1000} animation='fadeInLeft' >

                    <TouchableOpacity style={styles.buttonContinue} onPress={tableFoodExist}>
                        <Text style={styles.textContinue}>Seguir</Text><Image source={require('../../../../assets/setaRight.png')} />
                    </TouchableOpacity>

                </Animatable.View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#DA251C',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    nameUser: {
        color: 'white',
        fontSize: 25,
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    box_title: {
        height: 130,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    boxContent: {
        flex: 1,
        gap: 15,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 30,
        paddingBottom: 30,
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    boxContinue: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContinue: {
        backgroundColor: 'green',
        width: '90%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 15
    },
    textContinue: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: 'bold'
    },
})