import React from 'react';
import {View, SafeAreaView, ScrollView, ImageBackground, Text} from 'react-native';
import { Button } from 'react-native-paper';
import {styles} from './styles';
import Car_1 from '../../assets/img/car1.jpeg';
import Car_2 from '../../assets/img/car2.jpg';
import Car_3 from '../../assets/img/car3.jpg';

const Home = ({navigation}) => {
    
    const goAllServices = () => {
        navigation.navigate('Catálogo');
    };


    const goDetail = (id) => {
        navigation.navigate('DetailService', {
            idService: id
        })
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ImageBackground source={Car_1} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 6, opacity: 0.7, backgroundColor: 'black'}}>
                    <Text style={styles.textName}>Lavação</Text>
                    <View style={styles.viewArrow}>
                        <Button
                            mode="contained"
                            onPress={() => goDetail('zqk5EEr8kN4SHRwWvxKY')}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            Saiba mais
                        </Button>
                        
                    </View>
                </ImageBackground>
                <ImageBackground source={Car_2} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 6, opacity: 0.7, backgroundColor: 'black'}}>
                    <Text style={styles.textName}>Vitrificação</Text>
                    <View style={styles.viewArrow}>
                        <Button
                            mode="contained"
                            onPress={() => goDetail('Qpqq3IzqZxbTtSaAHVrN')}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            Saiba mais
                        </Button>
                    </View>
                </ImageBackground>
                <ImageBackground source={Car_3} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 6, opacity: 0.7, backgroundColor: 'black'}}>
                    <Text style={styles.textName}>Polimento</Text>
                    <View style={styles.viewArrow}>
                        <Button
                            mode="contained"
                            onPress={() => goDetail('eQfTctd27mMAaoHuSKxa')}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            Saiba mais
                        </Button>
                    </View>
                </ImageBackground>
                <Button
                    mode="contained"
                    onPress={() => goAllServices()}
                    style={styles.buttonMore}
                    labelStyle={styles.buttonLabelMore}
                >
                    Conheça todos os serviços
                </Button>
            </ScrollView>
        </SafeAreaView>
    )};

export default Home;