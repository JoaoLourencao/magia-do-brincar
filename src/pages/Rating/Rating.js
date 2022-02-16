import React from 'react'
import { View, Text } from 'react-native'
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';

const Rating = ({navigation}) => {
    const {user} = useAuth();


    const ratingOk = () => {
        firestore().collection(`${user.uid}_rating`)
            .add({
                rating: 'good'
            })
            .then(() => {
                navigation.navigate('Carrinho');
            })
    };


    const ratingNegative = () => {
        firestore().collection(`${user.uid}_rating`)
            .add({
                rating: 'bad'
            })
            .then(() => {
                navigation.navigate('Carrinho');
            })
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.viewFinish}>
                <Ionicons name="checkmark-circle" size={120} color="green" style={styles.iconDone} />
                <Text style={styles.title}>Dados enviados com sucesso!</Text>
                <View style={styles.viewRow}>
                    <Ionicons onPress={() => ratingOk()} name="thumbs-up" size={60} color="green" style={styles.iconOk} />
                    <Ionicons onPress={() => ratingNegative()} name="thumbs-down" size={60} color="red" style={styles.iconNegative} />
                </View>
                <Text style={styles.rating}>Avalie seu uso dentro do aplicativo !</Text>
            </View>
        </View>
    )
}

export default Rating
