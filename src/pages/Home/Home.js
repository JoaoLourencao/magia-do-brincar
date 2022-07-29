import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Agendamento from '../../assets/img/calendario.jpg';
import Duvidas from '../../assets/img/duvidas.jpg';
import Servicos from '../../assets/img/servicos.jpg';
import { styles } from './styles';

const Home = ({navigation}) => {
    
    const goAllServices = () => {
        navigation.navigate('Serviços');
    };

    const goProfile = () => {
        navigation.navigate('Perfil');
    };

    const goCalendar = () => {
        navigation.navigate('Carrinho');
    };

    const goDetail = (id) => {
        navigation.navigate('DetailService', {
            idService: id
        })
    };
    
    const goDoubt = () => {
        navigation.navigate('Doubt')
    };

    const goListSchedules = () => {
        navigation.navigate('ListShedules');
    };

    return (
        
        <SafeAreaView style={styles.container}>
            <LinearGradient useAngle={true} angle={130} locations={[0.4,0.7,1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>        
                <ScrollView>
                    <ImageBackground source={Agendamento} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 8, opacity: 0.4, backgroundColor: 'black'}}>
                        <Text style={styles.textName}>Agendamento</Text>
                        <View style={styles.viewArrow}>
                            <Button
                                mode="contained"
                                onPress={goCalendar}
                                style={styles.button}
                                labelStyle={styles.buttonLabel}
                            >
                                Saiba mais
                            </Button>
                            
                        </View>
                    </ImageBackground>
                    <ImageBackground source={Servicos} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 8, opacity: 0.5, backgroundColor: 'black'}}>
                        <Text style={styles.textName}>Serviços</Text>
                        <View style={styles.viewArrow}>
                            <Button
                                mode="contained"
                                onPress={goAllServices}
                                style={styles.button}
                                labelStyle={styles.buttonLabel}
                            >
                                Saiba mais
                            </Button>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={Duvidas} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 8, opacity: 0.5, backgroundColor: 'black'}}>
                        <Text style={styles.textName}>Dúvidas</Text>
                        <View style={styles.viewArrow}>
                            <Button
                                mode="contained"
                                onPress={goDoubt}
                                style={styles.button}
                                labelStyle={styles.buttonLabel}
                            >
                                Saiba mais
                            </Button>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={Duvidas} resizeMode="cover" style={styles.card} imageStyle={{ borderRadius: 8, opacity: 0.5, backgroundColor: 'black'}}>
                        <Text style={styles.textName}>Dúvidas</Text>
                        <View style={styles.viewArrow}>
                            <Button
                                mode="contained"
                                onPress={goListSchedules}
                                style={styles.button}
                                labelStyle={styles.buttonLabel}
                            >
                                Saiba mais
                            </Button>
                        </View>
                    </ImageBackground>
                    <TouchableOpacity
                        style={styles.buttonMore}
                        onPress={goProfile}
                        activeOpacity={0.75}
                    >                    
                        <Text style={styles.textButtonMore}>Meus Dados</Text>
                    </TouchableOpacity>                    
                </ScrollView>
            </LinearGradient>        
        </SafeAreaView>
        
    )};

export default Home;