import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Catalog = ({navigation}) =>  {
    const [services, setServices] = useState(null);
    const [sizeServices, setSizeServices] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getServices() {
            let arrayServices = [];
            firestore()
                .collection('services').get()
                .then(querySnapshot => {
                        setSizeServices(querySnapshot.size);
                        querySnapshot.forEach(documentSnapshot => {
                            arrayServices.push({id: documentSnapshot.id, ...documentSnapshot.data()});
                        });
                        setServices(arrayServices);
                        setLoading(false);
                });
        };
       getServices();
    }, []);

    const goDetail = (id) => {
        navigation.navigate('DetailService', {
            idService: id
        })
    }

    const Item = ({ name, img, id }) => {
        return (
            <View style={styles.item}>
                <Image source={{uri: img}}
                    style={{width: 100, height: 100}} />
                <Text style={styles.title} numberOfLines={1}>{name}</Text>

                <Ionicons onPress={() => goDetail(id)} name="arrow-forward" size={26} color="black" style={styles.iconArrow} />
            </View>
    )};

    const renderItem = ({ item }) => {
        return (
            <Item 
                name={item.name}
                img={item.img}
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

export default Catalog;
