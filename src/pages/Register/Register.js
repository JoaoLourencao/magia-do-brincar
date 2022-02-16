import React, {useState} from 'react'
import { View, Text, Image } from 'react-native'
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';
import LogoImg from '../../assets/img/logo_off_background.png';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusError, setstatusError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorPassLimit, setErrorPassLimit] = useState(false);



    const onLogin = () => {
        navigation.navigate('Login');
    };

    const onRegister = async () => {
        if(email === '' || password === '') {
            setstatusError(true);
        }
        
        if(password !== '' && password.length <= 6) {
            setErrorPassLimit(true);
        } else{
            setLoading(true);
            try {
                const dataUser = await auth().createUserWithEmailAndPassword(email, password);
                navigation.navigate('Login');
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        


    };

    return (
        <View style={styles.container}>
            <View style={styles.viewRegister}>
                <Icon onPress={() => onLogin()} style={styles.iconCancel} name="times-circle" size={25} />
                <Text style={styles.textRegister}>Cadastre-se</Text>
                <View style={styles.line} />

                <View>
                    <Image
                        style={{
                            marginTop: '2%',
                            width: 100,
                            height: 80,
                            alignSelf: 'center',
                            resizeMode: 'contain',
                        }}
                        source={LogoImg}
                    />
                </View>

                <View style={styles.viewInputs}>
                    <TextInput
                        label="E-mail"
                        mode="outlined"
                        value={email}
                        error={statusError}
                        style={styles.textInput}
                        type="email"
                        theme={{
                            colors: {
                            primary: '#211F20',
                            },
                        }}
                        onChangeText={(txt) => setEmail(txt)}
                    />
                    <TextInput
                        label="Senha"
                        mode="outlined"
                        value={password}
                        error={statusError}
                        onChangeText={(txt) => setPassword(txt)}
                        style={styles.textInput}
                        secureTextEntry
                        theme={{
                            colors: {
                            primary: '#211F20',
                            },
                        }}
                    />
                </View>
                {
                    statusError ? 
                        <View>
                            <Text style={styles.labelErrorEmpty}>
                                <Icon name="exclamation-circle" size={20} />
                                {' '}
                                E-mail ou senha não inseridos.
                            </Text>
                        </View>
                    :
                        <View></View>
                }

                {
                    errorPassLimit ? 
                        <View>
                            <Text style={styles.labelErrorEmpty}>
                                <Icon name="key" size={20} />
                                {' '}
                                Sua senha deve conter 6 digitos ou mais.
                            </Text>
                        </View>
                    :
                        <View></View>
                }
                <View style={styles.viewTextAgree}>
                    <Text style={styles.textAgree}>
                        Clicando em CONTINUAR eu aceito os
                    </Text>
                    <Text style={[styles.textAgree, {color: 'blue'}]}>
                        termos e condições de uso do aplicativo.
                    </Text>
                </View>
                    <Button
                        mode="contained"
                        loading={loading}
                        onPress={() => onRegister()}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        icon={() => <Icon name="arrow-circle-right" size={15} color="#FFF" />}
                    >
                        Continuar
                    </Button>
            </View>
        </View>
    )
}

export default Register;
