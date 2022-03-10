import React, {useState, useEffect} from 'react';
import { View, Text, Image, Linking } from 'react-native';
import {styles} from './styles';
import LogoImg from '../../assets/img/logo.png';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Contact = () => {
    const [contact, setContact] = useState(''); 

    useEffect(() => {
        async function getContact(){
            const getContacts = await firestore().collection('contact').get();
            setContact(getContacts.docs[0].data());
        };
        getContact();
    }, []);

    const onWhatsapp = () =>  {
        Linking.openURL(`whatsapp://send?phone=${contact.whatsapp_number}`);
    }

    const onFacebook = () => {
        Linking.openURL(`fb://page/${contact.facebook}`);
    }

    const onInstagram = () => {
        Linking.openURL(`http://instagram.com/_u/${contact.instagram}`);
    }

    const onSite = () => {
        Linking.openURL(contact.site);
    }

    return (
        <View style={styles.container}>
            <Image
                style={{
                    marginTop: '5%',
                    width: 150,
                    height: 150,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                }}
                source={LogoImg}
            />
            <View style={styles.cardInfos}>
                <View style={styles.viewRowInfo}>
                    <Ionicons onPress={() => {}} name="locate" size={26} color="black" />
                    <Text style={styles.textInfos}>{contact.address_road}</Text>
                </View>
                <View style={styles.viewRowInfo}>
                    <Ionicons onPress={() => {}} name="navigate" size={26} color="black" />
                    <Text style={styles.textInfos}>{contact.address_district}</Text>
                </View>
                <View style={styles.viewRowInfo}>
                    <Ionicons onPress={() => {}} name="map" size={26} color="black" />
                    <Text style={styles.textInfos}>{contact.address_city}</Text>
                </View>
                <View style={styles.viewRowInfo}>
                    <Ionicons onPress={() => {}} name="time" size={26} color="black" />
                    <Text style={styles.textInfos}>{contact.times}</Text>
                </View>
            </View>
            <View style={styles.viewSocials}>
                <View style={styles.logoSocial}>
                    <Ionicons onPress={() => onWhatsapp()} name="logo-whatsapp" size={26} color="white" />
                </View>
                <View style={styles.logoSocial}>
                    <Ionicons onPress={() => onInstagram()} name="logo-instagram" size={26} color="white" />
                </View>
                <View style={styles.logoSocial}>
                    <Ionicons onPress={() => onFacebook()} name="logo-facebook" size={26} color="white" />
                </View>
                <View style={styles.logoSocial}>
                    <Ionicons onPress={() => onSite()} name="globe" size={26} color="white" />
                </View>
            </View>
        </View>
    )
}

export default Contact;
