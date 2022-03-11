import React, {useState,useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-community/async-storage";

import {useAuth} from '../../contexts/auth';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../components/Loading';


const Profile = ({}) => {
    const {user, signOutApp} = useAuth();
    const [disableInputs, setDisableInputs] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [firstAccess, setFirstAccess] = useState(true);
    const [isLoading, setIsLoading] = useState(false);   

    useEffect(() => { 
        setIsLoading(true);

        getProfile().then(function (profile) {
            profile = JSON.parse(profile);
            console.log("prefil", profile)
            const people = profile.people;
            console.log(people, "aaaaaaaaaaaa")
            console.log(people[0].name, "bbbbbb")

            const completeName = people[0].name + ' ' + people[0].last_name;
            console.log(completeName, "bbbbbbbbbbbb")

            setName(completeName);
            setIsLoading(false);
        });
    }, []);

    async function getProfile(){
        let profile =  await AsyncStorage.getItem('@MagiaDoBrincar:user');

        return profile;
    };

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
                <Text style={styles.profileText}>Perfil</Text>      
                <ScrollView>
                {isLoading ? (
                    <View style={styles.loadLogin}>
                        <Loading isLoading={isLoading} />
                    </View>
                ) : (
                    <View style={styles.viewProfile}>
                        <View style={styles.gridInfo}>
                            <View style={styles.infoItem}>
                                <Text style={styles.textInfo}>Acesso</Text>
                            </View>
                            <View style={styles.viewInputs}>
                                 <TextInput
                                    label="Nome"
                                    mode="flat"
                                    value={name}
                                    style={disableInputs ? styles.textInputDisabled : styles.textInput}
                                    type="text"
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
                )}                    
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    ) 
}

export default Profile;
