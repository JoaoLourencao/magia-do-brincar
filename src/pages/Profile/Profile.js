import React, {useState,useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import {useAuth} from '../../contexts/auth';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({}) => {
    const {user, signOutApp} = useAuth();
    const [nameImg, setNameImg] = useState(user.email.substr(0, 2).toUpperCase());
    const [disableInputs, setDisableInputs] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [firstAccess, setFirstAccess] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [doc, setDoc] = useState('');
    useEffect(() => {
        async function getProfile(){
            const profile = await firestore().collection(`${user.uid}_profile`).get();
            if(profile.docs.length > 0) {
                setName(profile.docs[0].data().name);
                setPhone(profile.docs[0].data().phone);
                setDoc(profile.docs[0].ref._documentPath._parts[1]);
                setFirstAccess(false);
            }
        };
        getProfile();
    }, []);


    const handleLogout = () => {
        signOutApp();
    }

    const enableInputs = () => {
        setDisableInputs(true);
    }

    const saveData = () => {
        if(firstAccess){
            setLoadingButton(true);
            firestore().collection(`${user.uid}_profile`)
                .add({
                    name: name,
                    phone: phone
                })
                .then(() => {
                    setDisableInputs(true);
                    setFirstAccess(false);
                    setLoadingButton(false);
                }).catch((error) => {
                    console.log(error);
                })
        } else{
            setLoadingButton(true);
            firestore().collection(`${user.uid}_profile`).doc(doc)
                .update({
                    name: name,
                    phone: phone
                })
                .then(() => {       
                    console.log(this);             
                    setDisableInputs(false);
                    setLoadingButton(false);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient useAngle={true} angle={300} locations={[0.4,0.7,1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>
                <ScrollView>
                    <View style={styles.viewProfile}>
                        <View style={styles.gridInfo}>
                            <View style={styles.infoItem}>
                                <Text style={styles.textInfo}>{user.email}</Text>
                                <Icon name="envelope" size={15} color="#fff" style={styles.iconInfo} />
                            </View>
                            <View style={styles.viewInputs}>
                                <Ionicons name="person" size={20} color="#fff" style={styles.iconInputs} />
                                 <TextInput
                                    label="Nome"
                                    mode="flat"
                                    value={name}
                                    style={disableInputs ? styles.textInputDisabled : styles.textInput}
                                    type="email"
                                    editable={disableInputs}
                                    placeholderTextColor="steelblue"
                                    theme={{
                                        colors: {
                                            primary: '#fff',
                                            placeholder: '#fff',
                                            text: '#fff'
                                        }
                                    }}
                                    onChangeText={(txt) => setName(txt)}
                                />
                            </View>
                            <View style={styles.viewInputs}>
                                <Ionicons name="call" size={20} color="#fff" style={styles.iconInputs} />
                                <TextInput
                                    value={phone}
                                    label="Telefone"
                                    mode="flat"
                                    style={disableInputs ? styles.textInputDisabled : styles.textInput}
                                    type="email"
                                    editable={disableInputs}
                                    placeholderTextColor="steelblue"
                                    theme={{
                                        colors: {
                                            primary: '#fff',
                                            placeholder: '#fff',
                                            text: '#fff'
                                        }
                                    }}
                                    onChangeText={(txt) => setPhone(txt)}
                                />
                            </View>
                            
                        </View>
                        {
                            !disableInputs ?                               
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => enableInputs()}
                                    activeOpacity={0.75}
                                    icon={() => <Ionicons name="create" size={18} color={'#211F20'} />}
                                >                    
                                    <Text style={styles.textButtonMore}>Editar</Text>
                                </TouchableOpacity> 
                            :                               
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => saveData()}
                                    activeOpacity={0.75}
                                    icon={() => <Ionicons name="save" size={18} color={'#211F20'} />}
                                >                    
                                    <Text style={styles.textButtonMore}>Salvar</Text>
                                </TouchableOpacity> 
                        }

                        <TouchableOpacity
                            style={styles.buttonExit}
                            onPress={() => handleLogout()}
                            activeOpacity={0.75}
                            icon={() => <Icon name="arrow-circle-right" size={15} color={'#FFF'} />}

                        >                    
                            <Text style={styles.textButtonExit}>Sair</Text>
                        </TouchableOpacity>                        
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Profile;
