import React, {useState,useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import {useAuth} from '../../contexts/auth';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Profile = ({}) => {
    const {user, signOutApp} = useAuth();
    const [nameImg, setNameImg] = useState(user.email.substr(0, 2).toUpperCase());
    const [disableInputs, setDisableInputs] = useState(false);
    const [name, setName] = useState('Nome');
    const [phone, setPhone] = useState('Telefone');
    const [address, setAddress] = useState('Endereço');
    const [carModel, setCarModel] = useState('Modelo do veiculo');
    const [carAge, setCarAge] = useState('Ano do veiculo');
    const [carColor, setCarColor] = useState('Cor do veiculo');
    const [firstAccess, setFirstAccess] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [doc, setDoc] = useState('');
    useEffect(() => {
        async function getProfile(){
            const profile = await firestore().collection(`${user.uid}_profile`).get();
            if(profile.docs.length > 0) {
                setName(profile.docs[0].data().name);
                setAddress(profile.docs[0].data().address);
                setPhone(profile.docs[0].data().phone);
                setCarAge(profile.docs[0].data().carAge);
                setCarModel(profile.docs[0].data().carModel);
                setCarColor(profile.docs[0].data().carColor);
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
                    phone: phone,
                    address: address,
                    carModel: carModel,
                    carColor: carColor,
                    carAge: carAge
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
                    phone: phone,
                    address: address,
                    carModel: carModel,
                    carColor: carColor,
                    carAge: carAge
                })
                .then(() => {
                    setDisableInputs(true);
                    setLoadingButton(false);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.viewProfile}>
                    <View style={styles.logoProfile}>
                        <Text style={styles.textImgProfile}>{nameImg}</Text>
                    </View>
                    <View style={styles.gridInfo}>
                        <View style={styles.infoItem}>
                            <Text style={styles.textInfo}>{user.email}</Text>
                            <Icon name="envelope" size={15} color="#211F20" style={styles.iconInfo} />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="person" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={name}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setName(txt)}
                            />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="map" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={address}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setAddress(txt)}
                            />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="call" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={phone}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setPhone(txt)}
                            />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="car" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={carModel}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setCarModel(txt)}
                            />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="color-fill" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={carColor}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setCarColor(txt)}
                            />
                        </View>
                        <View style={styles.viewInputs}>
                            <Ionicons name="ribbon" size={20} color="#211F20" style={styles.iconInputs} />
                            <TextInput
                                value={carAge}
                                style={styles.textInput}
                                type="email"
                                editable={disableInputs}
                                onChangeText={(txt) => setCarAge(txt)}
                            />
                        </View>
                    </View>
                    {
                        !disableInputs ? 
                            <Button
                                mode="contained"
                                onPress={() => enableInputs()}
                                style={styles.buttonEdit}
                                labelStyle={styles.buttonEditLabel}
                                icon={() => <Ionicons name="create" size={18} color={'#211F20'} />}
                            >
                                Editar informações
                            </Button>
                        :
                            <Button
                                mode="contained"
                                loading={loadingButton}
                                onPress={() => saveData()}
                                style={styles.buttonEdit}
                                labelStyle={styles.buttonEditLabel}
                                icon={() => <Ionicons name="save" size={18} color={'#211F20'} />}
                            >
                                Salvar
                            </Button>
                    }
                    <Button
                        mode="contained"
                        onPress={() => handleLogout()}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        icon={() => <Icon name="arrow-circle-right" size={15} color={'#FFF'} />}
                    >
                        Sair
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;
