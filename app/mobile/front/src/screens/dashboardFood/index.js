import {
    StyleSheet, Text, View, StatusBar, SafeAreaView,
    ScrollView, Image, TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Food from '../../component/Food';

import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../api';


export default function DashboardFood(props) {
    
    const { name } = props.route?.params || {};
    const route = useRoute();
    const initialConfirmedFoods = route.params?.confirmedFoods || {};

    const [foodsDay, setFoodsDay] = useState([]);

    const [confirmedFoods, setConfirmedFoods] = useState(initialConfirmedFoods);

    const navigation = useNavigation();

    //função para consultar e exibir os itens 
    const fecthFoodsDay = () => {
        api.get('/tablefoodday')
            .then(response => {
                setFoodsDay(response.data)
            })
            .catch(error => {
                console.error("erro ao obter itens do banco de dados", error)
            })
    }

    useEffect(() => {
        fecthFoodsDay()
    }, [])



    //metodo utilizado para salvar o alimento no banco de dados quando clicado
    const saveFood = async (index) => {
        try {
            const response = await api.post('/postitemfooduser', {
                name,
                food: foodsDay[index].food

            })
            setConfirmedFoods((prevState) => ({
                ...prevState,
                [foodsDay[index].food]: true,
            }));

            console.log('Seleção salva com sucesso do almoço:', response.data)

        } catch (error) {

            console.error('erro ao salvar a seleção do almoço:', error)

        }
    };

    //função para veirficar se tem item no dashboard cafe, caso nao tenha ele desabilita a função
    const tableCoffeExist = () => {
        api.get('/tablecoffeday')
            .then(response => {
                const coffesDay = response.data;
                if (coffesDay != 0) {
                    navigation.navigate('DashboardCoffee', { name, confirmedFoods })
                } else {
                    alert('não há opções para o café da manhã!')
                }
            }
            )
    }

    return (

        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor="#DA251C" barStyle='light-content' />

            <ScrollView style={styles.view}>

                <Animatable.View delay={500} animation='fadeInLeft' style={styles.box_title}>

                    <Text style={styles.title}>Almoço</Text>
                    <Image source={require('../../../../assets/icon_food.png')}
                    />

                </Animatable.View>

                <Animatable.View delay={500} animation='fadeInUp' style={styles.boxContent}>

                    {foodsDay.map((food, index) => (
                        <Food
                            key={food.id}
                            titleFood={food.food}
                            saveFood={() => saveFood(index)}
                            name={name}
                            confirmed={confirmedFoods[food.food] || false} // Passar a prop confirmed
                            setConfirmed={(value) => {
                                setConfirmedFoods((prevState) => ({
                                    ...prevState,
                                    [food.food]: value,
                                }));
                            }}
                        />
                    ))}

                </Animatable.View>

                <Animatable.View style={styles.boxOption} delay={1000} animation='fadeInUp'>

                    <TouchableOpacity style={styles.buttonBack} onPress={tableCoffeExist}>
                        <Image source={require('../../../../assets/setaLeft.png')} /><Text style={styles.textOption}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContinue} onPress={() => navigation.navigate('Exit', { name })}>
                        <Text style={styles.textOption}>Finalizar</Text><Image source={require('../../../../assets/icon_finalizar.png')} />
                    </TouchableOpacity>

                </Animatable.View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#DA251C',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    box_title: {
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#FFFFFF',
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
    boxOption: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row'
    },
    buttonContinue: {
        backgroundColor: 'green',
        width: '45%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 5
    },
    buttonBack: {
        backgroundColor: 'orange',
        width: '45%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 5
    },
    textOption: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: 'bold'
    }
})