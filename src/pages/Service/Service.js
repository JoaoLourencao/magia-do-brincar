import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/apis'
import {BASE_URL_API} from "@env"

const Service = ({navigation}) =>  {
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            let services = (await api.get('/services')).data
            setServices(services.data)
            setLoading(false)
        }
       getServices();
    }, []);

    const goDetail = (id) => {
        navigation.navigate('DetailService', {
            idService: id
        })
    }

    const Item = ({ service, image, id }) => {
        return (
            <TouchableOpacity>
                <View style={styles.item}>
                    {image && <Image source={{uri: `${BASE_URL_API}/${image}`}} style={{width: 75, height: 75, borderRadius: 5}}/>}
                    {!image && <Image source={require(`../../assets/img/logo.png`)} style={{resizeMode: 'contain', width: 75, height: 75, borderRadius: 5}}/>}
                    <Text style={styles.title} numberOfLines={1}>{service}</Text>
                    <Ionicons name="arrow-forward" size={26} color="#514a78" style={styles.iconArrow} />
                </View>
            </TouchableOpacity>            
    )};

    const renderItem = ({ item }) => {
        return (
            <Item 
                service={item.service}
                image={item.image}
                id={item.id}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient useAngle={true} angle={130} locations={[0.4,0.7,1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>  
                <Text style={styles.servicesText}>Serviços</Text>      
                {
                    loading ? 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size='large' color='#211F20' />
                        </View>
                    : 
                        <FlatList
                            data={services}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                }
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Service;
