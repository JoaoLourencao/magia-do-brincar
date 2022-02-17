import React, {useState, useEffect} from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import LogoImg from '../../assets/img/logo_off_background.png';
import {useAuth} from '../../contexts/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

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
        <SafeAreaView style={styles.container}>
            <LinearGradient useAngle={true} angle={300} locations={[0.4,0.7,1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>  
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
                <View style={styles.inputBox}>

                    <TextInput
                        label="E-mail"
                        mode="flat"
                        value={email}
                        error={statusError}
                        style={styles.textInput}                    
                        type="email"
                        placeholderTextColor="steelblue"
                        theme={{
                            colors: {
                                primary: '#fff',
                                placeholder: '#fff',
                                text: '#fff'
                            }
                        }}
                        onChangeText={(txt) => {setEmail(txt), setstatusError(false)}}
                    />
                    <TextInput
                        label="Senha"
                        mode="flat"
                        value={password}
                        error={statusError}
                        onChangeText={(txt) => setPassword(txt)}
                        style={styles.textInput}
                        secureTextEntry
                        theme={{
                            colors: {
                                primary: '#fff',
                                placeholder: '#fff',
                                text: '#fff'
                            },
                        }}
                    />
                </View>
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
                <TouchableOpacity
                    style={styles.buttonMore}
                    onPress={auth}
                    activeOpacity={0.75}
                >                    
                    <Text style={styles.textButtonContinue}>Continuar</Text>
                </TouchableOpacity> 
                {/* <Button
                    loading={loadingButton}
                    mode="contained"
                    onPress={() => auth()}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Continuar
                </Button> */}
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={goRegister}
                >                    
                    <Text style={styles.textButtonMore}>Cadastre-se</Text>
                </TouchableOpacity> 

                {/* <Button
                    mode="contained"
                    onPress={() => goRegister()}
                    style={styles.buttonRegister}
                    labelStyle={styles.buttonLabelRegister}
                >
                    Cadastre-se
                </Button> */}
                

                {/* <View style={styles.viewForgetPass}>
                    <Text style={styles.labelLink}>
                        <Icon name="lock" size={15} />
                        {' '}
                        Esqueceu sua senha?
                    </Text>
                </View> */}
               
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Login;