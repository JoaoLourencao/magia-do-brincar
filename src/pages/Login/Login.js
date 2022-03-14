import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoImg from '../../assets/img/logo.png';
import Loading from '../../components/Loading';
import {useAuth} from '../../contexts/auth';
import {styles} from './styles';

const Login = ({navigation}) => {
  const [statusError, setstatusError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const {signIn, loginError} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const auth = async () => {
    Keyboard.dismiss();

    if (email.length === 0 || password.length === 0) {
      setstatusError(true);
      Alert.alert('Oops!', 'Senha e e-mail devem ser preenchidos');
    } else {
      setIsLoading(true);

      await signIn(email, password)
        .then(function () {
          setIsLoading(false);
        })
        .catch(error => {
          Alert.alert('Oops!', JSON.stringify(error.message));
          setIsLoading(false);
        });
    }
  };

  const goRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        useAngle={true}
        angle={150}
        locations={[0.4, 0.7, 1]}
        colors={['#a295f1', '#d592c7', '#f192a9']}
        style={styles.gradient}>
        <View style={styles.logo}>
          <Image
            style={{
              marginTop: '30%',
              width: 250,
              height: 250,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={LogoImg}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            label="Usuário"
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
                text: '#fff',
              },
            }}
            onChangeText={txt => {
              setEmail(txt), setstatusError(false);
            }}
          />
          <TextInput
            label="Senha"
            mode="flat"
            value={password}
            error={statusError}
            onChangeText={txt => {
              setPassword(txt), setstatusError(false);
            }}
            style={styles.textInput}
            secureTextEntry
            theme={{
              colors: {
                primary: '#fff',
                placeholder: '#fff',
                text: '#fff',
              },
            }}
          />
        </View>
        {visibleModal ? (
          <View style={styles.errorLoginView}>
            <Text style={styles.labelErrorLogin}>
              <Icon name="exclamation-circle" size={20} /> E-mail ou senha
              inválidos
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        {isLoading ? (
          <View style={styles.loadLogin}>
            <Loading isLoading={isLoading} />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.buttonMore}
              onPress={auth}
              activeOpacity={0.75}>
              <Text style={styles.textButtonContinue}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={goRegister}>
              <Text style={styles.textButtonMore}>Cadastre-se</Text>
            </TouchableOpacity>
          </>
        )}

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
