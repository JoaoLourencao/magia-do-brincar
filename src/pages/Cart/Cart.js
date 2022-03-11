import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text, FlatList, Image, ScrollView } from 'react-native'
import {useCart} from '../../contexts/cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../contexts/auth';

const Cart = ({navigation}) => {
    const {cart, removeItem, totalValue, cleanCart} = useCart();
    const {user} = useAuth();

    const goServices = () => {
        navigation.navigate('Serviços');
    }

    const saveCart = () => {
        cart.forEach(element => {
            firestore().collection(`${user.uid}_purchase`)
                .add({
                    idService: element.id,
                    nameService: element.name,
                    silicone: element.silicone,
                    cheirinho: element.cheirinho,
                    dateService: element.date,
                    total: totalValue
                })
                .then(() => {
                    cleanCart();
                    navigation.navigate('Avaliação');
                })
        });
    };


    const Item = ({ name, img, price, silicone, cheirinho, date, index }) => {
        return (
            <View>
                <View style={styles.item}>
                    <Image source={{uri: img}} style={{width: 100, height: 120, borderRadius: 6}} />
                    <View>
                        <Text style={styles.title} numberOfLines={1}>{name}</Text>
                        <Text style={styles.price}>R$ {price}</Text>
                        <Text style={styles.title}>Passar silicone: {silicone}</Text>
                        <Text style={styles.title}>Passar Cheirinho: {cheirinho}</Text>
                        <Text style={styles.date} numberOfLines={1}>Data: {date}</Text>
                    </View>
                    <Ionicons onPress={() => removeItem(index)} name="close" size={25} color="red" style={styles.iconClose} />
                </View>
                
            </View>
    )};

    const renderItem = ({ item, index }) => {
        return (
            <Item 
                price={item.price}
                name={item.name}
                img={item.img}
                silicone={item.silicone}
                cheirinho={item.cheirinho}
                date={item.date}
                index={index}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                cart.length === 0 ?
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>Carrinho Vazio</Text>
                        <Button
                            mode="contained"
                            onPress={() => goServices()}
                            style={styles.buttonServices}
                            labelStyle={styles.buttonLabelServices}
                        >
                            Ver todos os serviços
                        </Button>
                    </View>
                :
                <View>
                    <ScrollView>
                        <FlatList
                            data={cart}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                        <Button
                            mode="contained"
                            onPress={() => saveCart()}
                            style={styles.buttonFinish}
                            labelStyle={styles.buttonLabelFinish}
                        >
                            Finalizar compra - R$ {totalValue}
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => goServices()}
                            style={styles.buttonContinue}
                            labelStyle={styles.buttonLabelContinue}
                        >
                            Continuar comprando
                        </Button>
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    )
}

export default Cart
