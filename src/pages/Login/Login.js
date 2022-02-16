import React, {useState, useEffect} from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import {styles} from './styles';
import LogoImg from '../../assets/img/logo_off_background.png';
import {useAuth} from '../../contexts/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) =>  {
    const [statusError, setstatusError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const {signIn, loginError} = useAuth();

    useEffect(() => {
        function verifyErrorLogin() {
            if(loginError) {
                setVisibleModal(true);
                setLoadingButton(false);
            }
        }

        verifyErrorLogin();
    }, [loginError]);

    const auth = () => {
        if(email.length === 0 || password.length === 0){
            setstatusError(true);
            setVisibleModal(true);
        }else{
            setstatusError(false);
            setLoadingButton(true);
            signIn(email,password);
        }

    }

    const goRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logo}>
                    <Image
                        style={{
                            marginTop: '30%',
                            width: 150,
                            height: 150,
                            alignSelf: 'center',
                            resizeMode: 'contain',
                        }}
                        source={LogoImg}
                    />
                </View>
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
                <Button
                    loading={loadingButton}
                    mode="contained"
                    onPress={() => auth()}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Continuar
                </Button>
                <Button
                    mode="contained"
                    onPress={() => goRegister()}
                    style={styles.buttonRegister}
                    labelStyle={styles.buttonLabelRegister}
                >
                    Cadastre-se
                </Button>
                

                {/* <View style={styles.viewForgetPass}>
                    <Text style={styles.labelLink}>
                        <Icon name="lock" size={15} />
                        {' '}
                        Esqueceu sua senha?
                    </Text>
                </View> */}

                {
                    visibleModal ? 
                        <View style={styles.errorLoginView}>
                            <Text style={styles.labelErrorLogin}>
                                <Icon name="exclamation-circle" size={20} />
                                {' '}
                                E-mail ou senha inválidos
                            </Text>
                        </View>

                    :
                        <View></View>
                }
            </View>
        </View>
    );
};

export default Login;