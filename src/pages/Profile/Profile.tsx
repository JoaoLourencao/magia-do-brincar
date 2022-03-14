import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/auth';
import { convertDateTime } from '../../utils/index';
import { ProfileResponse } from './profile.type';
import { styles } from './styles';

interface IProfileState {
  username: string;
  name: string;
  isLoading: boolean;
}

const Profile: React.FC<IProfileState> = () => {
  const {user, signOutApp} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  //profile data
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [postalcode, setPostalcode] = useState('');


  useEffect(() => {
    setIsLoading(true);

    getProfile().then((profile: ProfileResponse) => {      

      console.log("profile", profile)

      const people = profile.people;
      const userProfile = profile.user;
      const phone = profile.phones[0];
      const address = profile.addresses[0];

      // set profile data
      setUserName(userProfile.user)
      setName(people.name + ' ' + people.last_name);
      setDocument(people.document);
      setBirthdate(convertDateTime(people.birth_date));
      setPhone(phone.ddd + phone.phone)
      setPostalcode(address.postal_code);

      setIsLoading(false);
    });
  }, []);

  async function getProfile() : Promise<ProfileResponse> {
    let profile = await AsyncStorage.getItem('@MagiaDoBrincar:user');

    return JSON.parse(profile!);
  }

  const handleLogout = () => {
    signOutApp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        useAngle={true}
        angle={300}
        locations={[0.4, 0.7, 1]}
        colors={['#a295f1', '#d592c7', '#f192a9']}
        style={styles.gradient}>
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
                    label="Usuário"
                    mode="flat"
                    value={username}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>  
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Dados de registro</Text>
                </View>
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Nome completo"
                    mode="flat"
                    value={name}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="CPF"
                    mode="flat"
                    value={document}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Data de nascimento"
                    mode="flat"
                    value={birthdate}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View> 
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Telefone"
                    mode="flat"
                    value={phone}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>        
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Endereço</Text>
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="CEP"
                    mode="flat"
                    value={postalcode}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Cidade"
                    mode="flat"
                    value={name}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Estado"
                    mode="flat"
                    value={name}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>    
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Endereçp"
                    mode="flat"
                    value={name}
                    style={styles.textInput}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View> 
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Número"
                    mode="flat"
                    value={name}
                    style={{flex:1, width: '100%', height: 50, alignSelf: 'center', marginTop: 10, backgroundColor: 'rgba(0, 0, 0, 0.05)'}}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                  <TextInput
                    label="Complemeto"
                    mode="flat"
                    value={name}
                    style={{flex:1, width: '100%', height: 50, alignSelf: 'center', marginTop: 10, backgroundColor: 'rgba(0, 0, 0, 0.05)', marginLeft: 10}}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={txt => setName(txt)}
                  />
                </View>   
              </View>
              {/* {!disableInputs ? (
                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => enableInputs()}
                  activeOpacity={0.75}
                  >
                  <Text style={styles.textButtonMore}>Editar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => saveData()}
                  activeOpacity={0.75}
                  >
                  <Text style={styles.textButtonMore}>Salvar</Text>
                </TouchableOpacity>
              )} */}

              <TouchableOpacity
                style={styles.buttonExit}
                onPress={() => handleLogout()}
                activeOpacity={0.75}
                >
                <Text style={styles.textButtonExit}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;
