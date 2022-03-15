import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert, FlatList, NativeSyntheticEvent, SafeAreaView,
  ScrollView,
  Text, TextInputEndEditingEventData, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, IconButton, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/auth';
import { validateDocumentId } from '../../utils';
import { convertDateTime } from '../../utils/index';
import { ProfileResponse } from './profile.type';
import { styles } from './styles';

interface IProfileState {
  username: string;
  name: string;
  isLoading: boolean;
}

const Profile: React.FC<IProfileState> = () => {
  const renderItem = ({ item }) => {
      return (
          <Item 
            addressdesc={item.description}
            postalcode={item.postal_code}
            city={item.city}
            uf={item.uf}
            number={item.number}
            publicplace={item.public_place}
            complement={item.complement}            
            id={item.id}
          />
      )
  }
  const Item = ({ addressdesc, postalcode, city, uf, number, publicplace, complement, id }) => {
    return (
      <Card style={styles.cardAddress}>
        <Card.Title
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubTitle}
          title={publicplace+', '+number}
          subtitle={city+'/'+uf}
          right={(props) => <IconButton color='white' {...props} icon="dots-vertical" onPress={() => {
            Alert.alert(
              publicplace+', '+number,
              city+'/'+uf,
              [
                {
                  text: 'Excluir',                
                  onPress: () => console.log('Ask me later pressed')
                },
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                { text: 'Editar', onPress: () => console.log('OK Pressed') }
              ],
              { cancelable: false }
            );
          }} />}
        />
        <Card.Content>
          <Text>{complement}</Text>
        </Card.Content>
        {/* <Card.Actions>
          <Button>Editar</Button>
        </Card.Actions> */}
      </Card>        
  )};

  const {user, signOutApp} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  //profile data
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [publicplace, setPublicplace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [addressdesc, setAddressDesc] = useState('');
  const [addresses, setAddresses] = useState(null);
  const [maskPhone, setMaskphone] = useState('');

  const checkDocumentId = (
		documentId: NativeSyntheticEvent<TextInputEndEditingEventData>
	) => {
		if (documentId.nativeEvent.text)
		if (!validateDocumentId(documentId.nativeEvent.text)){
      setDocument("");
			Alert.alert('Oops!', 'CPF inválido!');
    }      
	};

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
      if(phone){
        let phoneString = phone.ddd + phone.phone;
        if(phoneString.length <= 10)
          setMaskphone("([00]) [0000]-[0000]")
        else
          setMaskphone("([00]) [00000]-[0000]")

        setPhone(phoneString)
      }

      if(address){
        setPostalcode(address.postal_code);
        setCity(address.city);
        setUf(address.uf);
        setPublicplace(address.public_place);
        setNumber(address.number);
        setComplement(address.complement);
        setAddressDesc(address.description);
        setAddresses(profile.addresses);
      }

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
                    keyboardType="numeric"
                    onEndEditing={(
                      event: NativeSyntheticEvent<TextInputEndEditingEventData>
                    ) => checkDocumentId(event)}
                    render={(props) => (
                      <TextInputMask {...props} mask="[000].[000].[000]-[00]" />
                    )}
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={(formatted: string) => setDocument(formatted)}
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
				            keyboardType="phone-pad"
                    render={(props) => (
                      <TextInputMask {...props} mask={ maskPhone } />
                    )}
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={(formatted: string) => setPhone(formatted)}
                  />
                </View>        
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Endereços</Text>
                </View> 

                <FlatList
                  data={addresses}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
                                  
                {/* <View style={styles.viewInputs}>
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
                    value={city}
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
                    value={uf}
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
                    label="Endereço"
                    mode="flat"
                    value={publicplace}
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
                    value={number}
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
                    value={complement}
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
                </View>    */}
                 <TouchableOpacity
                style={styles.buttonExit}
                onPress={() => handleLogout()}
                activeOpacity={0.75}
                >
                <Text style={styles.textButtonExit}>Sair</Text>
              </TouchableOpacity>
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
             
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;
