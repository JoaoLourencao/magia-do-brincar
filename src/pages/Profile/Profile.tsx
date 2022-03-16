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
import api from '../../services/apis';
import { formatPhone, validateDocumentId } from '../../utils';
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
            city={item.city}
            uf={item.uf}
            number={item.number}
            publicplace={item.public_place}
            complement={item.complement}            
            id={item.id}
          />
      )
  }

  const renderPhones = ({ item }) => {
      return (
          <ItemPhone             
            type={item.type}
            phone={item.phone}
            ddd={item.ddd}            
            id={item.id}
            descPhone={item.description}
          />
      )
  }

  const ItemPhone = ({ type, phone, ddd, id, descPhone }) => {
    return (
      <Card style={styles.cardAddress}>
        {descPhone ? (
          <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={descPhone}
            style={{marginBottom: 5}}
            subtitle={type}
            right={(props) => <IconButton color='white' {...props} icon="dots-vertical" onPress={() => {
              Alert.alert(
                type,
                formatPhone(ddd+phone),
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
              <Text style={{marginBottom: 15}}>{formatPhone(ddd+phone)}</Text>
            </Card.Content>
            </> 
        ):(
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={type}
            style={{marginBottom: 5}}
            subtitle={formatPhone(ddd+phone)}
            right={(props) => <IconButton color='white' {...props} icon="dots-vertical" onPress={() => {
              Alert.alert(
                type,
                formatPhone(ddd+phone),
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
          )
        }                 
      </Card>        
  )};

  const Item = ({ addressdesc, city, uf, number, publicplace, complement, id }) => {
    return (
      <Card style={styles.cardAddress}>
        { addressdesc ? (
          <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={addressdesc}
            subtitle={publicplace+', '+number}
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
              <Text>{city+'/'+uf}</Text>
              <Text style={{marginBottom: 15}}>{complement}</Text>
            </Card.Content>
          </>
        ) : (
          <>
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
              <Text style={{marginBottom: 15}}>{complement}</Text>
            </Card.Content>
          </>
        )
        }        
      </Card>        
  )};

  const {user, signOutApp} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  //profile data
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phones, setPhones] = useState('');
  const [addresses, setAddresses] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [keyboardEnable, setKeyboardEnable] = useState(false);
  
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
    bindProfileData();    
  }, []);

  async function getProfile() : Promise<ProfileResponse> {
    let profile = await AsyncStorage.getItem('@MagiaDoBrincar:user');

    return JSON.parse(profile!);
  }

  function bindProfileData() {
    setIsLoading(true);

    getProfile().then(async (profile: ProfileResponse) => {      

      const people = profile.people;
      const userProfile = profile.user;

      const addresses = (await api.get('/users/addresses')).data.data
      const phones = (await api.get('/users/phones')).data.data

      // set profile data
      setUserName(userProfile.user)
      setName(people.name + ' ' + people.last_name);
      setDocument(people.document);
      setBirthdate(convertDateTime(people.birth_date));
      setAddresses(addresses);
      setPhones(phones);
      setIsLoading(false);
    });
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
                    disabled
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
                    onFocus ={() => {
                      setKeyboardEnable(true);
                    }}
                    onChangeText={txt => {
                      setName(txt);
                      setIsEditing(true);
                    }}
                    onEndEditing={() => setKeyboardEnable(false)}
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
                    ) => {
                      checkDocumentId(event);
                      setKeyboardEnable(false);
                    }}
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
                    onFocus ={() => {
                      setKeyboardEnable(true);
                    }}
                    onChangeText={(formatted: string) => {
                      setDocument(formatted);
                      setIsEditing(true);
                    }}

                  />
                </View>  
                <View style={styles.viewInputs}>
                  <TextInput
                    label="Data de nascimento"
                    mode="flat"
                    value={birthdate}
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholderTextColor="steelblue"
                    render={(props) => (
                      <TextInputMask {...props} mask="[00]/[00]/[0000]" />
                    )}
                    theme={{
                      colors: { 
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onFocus ={() => {
                      setKeyboardEnable(true);
                    }}
                    onChangeText={(formatted: string) => {
                      setBirthdate(formatted);
                      setIsEditing(true);
                    }}
                    onEndEditing={() => setKeyboardEnable(false)}

                  />
                </View> 
                
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Telefones</Text>
                </View>

                <FlatList
                  data={phones}
                  renderItem={renderPhones}
                  keyExtractor={item => item.id}
                />

                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Endereços</Text>
                </View>                

                <FlatList
                  data={addresses}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
                                                
              <TouchableOpacity
                  style={styles.buttonExit}
                  onPress={() => handleLogout()}
                  activeOpacity={0.75}
                >
                <Text style={styles.textButtonExit}>Sair</Text>
              </TouchableOpacity>
              </View>           
            </View>
          )}          
        </ScrollView>        
      </LinearGradient>
      {isEditing && !keyboardEnable ? (
           <View style={styles.viewEdit}>
            <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => handleLogout()}
                activeOpacity={0.75}
              >
              <Text style={styles.textbuttonEdit}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
              bindProfileData();
              setIsEditing(false);
            }}
            >
              <Text style={styles.txtBtnCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View> 
        ):(
          <></>
        )}      
    </SafeAreaView>
  );
};

export default Profile;
