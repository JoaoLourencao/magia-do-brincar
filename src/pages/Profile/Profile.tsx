import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Picker,
  FlatList, NativeSyntheticEvent, SafeAreaView,
  ScrollView,
  Text,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, IconButton, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Loading from '../../components/Loading';
import { useAuth } from '../../contexts/auth';
import {api} from '../../services/apis';
import { formatPhone, validateDocumentId } from '../../utils';
import { age } from '../../utils/age';
import { convertDateTime } from '../../utils/index';
import { ProfileResponse } from './profile.type';
import { styles } from './styles';

interface IProfileState {
  username: string;
  name: string;
  isLoading: boolean;
}

const Profile: React.FC<IProfileState> = ({ navigation }) => {
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
        item={item}
      />
    );
  };

  const renderPhones = ({ item }) => {
    return (
      <ItemPhone
        type={item.type}
        phone={item.phone}
        ddd={item.ddd}
        id={item.id}
        descPhone={item.description}
        item={item}
      />
    );
  };

  const ItemPhone = ({type, phone, ddd, id, descPhone, item}) => {
    return (
      <Card style={styles.cardAddress}>
        <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={descPhone ? descPhone : type}
            style={{ marginBottom: 5 }}
            subtitle={descPhone ? type : null}
            right={props => (
              <IconButton
                color="white"
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  Alert.alert(
                    type,
                    formatPhone(ddd + phone),
                    [
                      {
                        text: 'Excluir',
                        onPress: () => {
                          removePhone(id);
                        }
                      },
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => console.log('Ask me later pressed'),
                      },
                      {
                        text: 'Editar',
                        onPress: () => goAddorUpdatePhone(item),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              />
            )}
          />
          <Card.Content>
            <Text style={{ marginBottom: 15 }}>{formatPhone(ddd + phone)}</Text>
          </Card.Content>
        </>
      </Card>
    );
  };

  const Item = ({
    addressdesc,
    city,
    uf,
    number,
    publicplace,
    complement,
    id,
    item
  }) => {
    return (
      <Card style={styles.cardAddress}>
        <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={addressdesc ? addressdesc : publicplace + ', ' + number }
            subtitle={addressdesc ? publicplace + ', ' + number : null}
            right={props => (
              <IconButton
                color="white"
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  Alert.alert(
                    publicplace + ', ' + number,
                    city + '/' + uf,
                    [
                      {
                        text: 'Excluir',
                        onPress: () => {
                          removeAddress(id);
                        }
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Editar',
                        onPress: () => goAddorUpdateAddress(item),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              />
            )}
          />
          <Card.Content>
            <Text style={{ marginBottom: 15 }}>{city + '/' + uf}</Text>
          </Card.Content>
        </>
      </Card>
    );
  };

  const renderEmails = ({ item }) => {
    return (
      <ItemEmail
        email={item.email}
        id={item.id}
        description={item.description}
        item={item}
      />
    );
  };

  const ItemEmail = ({email, description, id, item}) => {
    return (
      <Card style={styles.cardAddress}>
        <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={description ? description : email}
            style={{ marginBottom: 5 }}
            subtitle={description ? email : null}
            right={props => (
              <IconButton
                color="white"
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  Alert.alert(
                    description ? description : email,
                    description ? email : null,
                    [
                      {
                        text: 'Excluir',
                        onPress: () => {
                          removeEmail(id);
                        }
                      },
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => console.log('Ask me later pressed'),
                      },
                      {
                        text: 'Editar',
                        onPress: () => goAddorUpdateEmail(item),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              />
            )}
          />
        </>
      </Card>
    );
  };

  const renderChildren = ({ item }) => {
    return (
      <ItemChild
        name={item.name}
        last_name={item.last_name}
        id={item.id}
        type={item.type}
        item={item}
      />
    );
  };

  const ItemChild = ({name, last_name, id, type, item}) => {
    return (
      <Card style={styles.cardAddress}>
        <>
          <Card.Title
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            title={last_name ? `${name} ${last_name}` : name}
            style={{ marginBottom: 5 }}
            subtitle={type ? type : null}
            right={props => (
              <IconButton
                color="white"
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  Alert.alert(
                    last_name ? `${name} ${last_name}` : name,
                    type ? type : null,
                    [
                      {
                        text: 'Excluir',
                        onPress: () => {
                          removeChild(id);
                        }
                      },
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => console.log('Ask me later pressed'),
                      },
                      {
                        text: 'Editar',
                        onPress: () => goAddorUpdateChild(item),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              />
            )}
          />
          <Card.Content>
            <Text style={{ marginBottom: 15 }}>{age(item.birth_date)}</Text>
          </Card.Content>
        </>
      </Card>
    );
  };

  const { user, signOutApp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  //profile data
  const [username, setUserName] = useState('');
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [genre, setGenre] = useState('');
  const [phones, setPhones] = useState('');
  const [addresses, setAddresses] = useState(null);
  const [emails, setEmails] = useState(null);
  const [children, setChildren] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [keyboardEnable, setKeyboardEnable] = useState(false);
  const [isAddOrUpdatePhone, setIsAddOrUpdatePhone] = useState(false);
  const [isAddOrUpdateAddress, setIsAddOrUpdateAddress] = useState(false);
  const [isAddOrUpdateEmail, setIsAddOrUpdateEmail] = useState(false);
  const [isAddOrUpdateChild, setIsAddOrUpdateChild] = useState(false);

  const checkDocumentId = (
    documentId: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => {
    if (documentId.nativeEvent.text)
      if (!validateDocumentId(documentId.nativeEvent.text)) {
        setDocument('');
        Alert.alert('Oops!', 'CPF inválido!');
      }
  };

  useEffect(() => {
    bindProfileData();
  }, []);

  async function getProfile(): Promise<ProfileResponse> {
    let profile = await AsyncStorage.getItem('@MagiaDoBrincar:user');

    return JSON.parse(profile!);
  }

  async function deletePhone(idPhone: string): Promise<any> {
    const result = await api.delete('/phones/' + idPhone);
    return result;
  }

  async function deleteAddress(id: number): Promise<any> {
    const result = await api.delete('/addresses/' + id);
    return result;
  }
  
  async function deleteEmail(id: number): Promise<any> {
    const result = await api.delete('/emails/' + id);
    return result;
  }

  async function deleteChild(id: number): Promise<any> {
    const result = await api.delete('/children/' + id);
    return result;
  }

  async function removePhone(idPhone: string) {
    deletePhone(idPhone).then((result) => {
      if (result.status === 204) {
        Alert.alert('Sucesso!', 'Número excluído!', [
          { text: "OK", onPress: () => getPhones() }
        ]);
      } else {
        Alert.alert('Erro!', 'Não foi possível excluir o número.', [
          { text: "OK", onPress: () => getPhones() }
        ]);
      }
    });
  }

  async function removeAddress(id: number) {
    deleteAddress(id).then((result) => {
      if (result.status === 204) {
        Alert.alert('Sucesso!', 'Endereço excluído!', [
          { text: "OK", onPress: () => getAddresses() }
        ]);
      } else {
        Alert.alert('Erro!', 'Não foi possível excluir o endereço.', [
          { text: "OK", onPress: () => getAddresses() }
        ]);
      }
    });
  }
  
  async function removeEmail(id: number) {
    deleteEmail(id).then((result) => {
      if (result.status === 204) {
        Alert.alert('Sucesso!', 'Email excluído!', [
          { text: "OK", onPress: () => getEmails() }
        ]);
      } else {
        Alert.alert('Erro!', 'Não foi possível excluir o email.', [
          { text: "OK", onPress: () => getEmails() }
        ]);
      }
    });
  }
  
  async function removeChild(id: number) {
    deleteChild(id).then((result) => {
      if (result.status === 204) {
        Alert.alert('Sucesso!', 'Criança excluída!', [
          { text: "OK", onPress: () => getChildren() }
        ]);
      } else {
        Alert.alert('Erro!', 'Não foi possível excluir a criança.', [
          { text: "OK", onPress: () => getChildren() }
        ]);
      }
    });
  }

  const goAddorUpdatePhone = (item = null) => {
    setIsAddOrUpdatePhone(false);
    navigation.navigate('AddorUpdatePhone', {item, setIsAddOrUpdatePhone});
  };
  
  const goAddorUpdateAddress = (item = null) => {
    setIsAddOrUpdateAddress(false);
    navigation.navigate('AddorUpdateAddress', {item, setIsAddOrUpdateAddress});
  };
  
  const goAddorUpdateEmail = (item = null) => {
    setIsAddOrUpdateEmail(false);
    navigation.navigate('AddorUpdateEmail', {item, setIsAddOrUpdateEmail});
  };
  
  const goAddorUpdateChild = (item = null) => {
    setIsAddOrUpdateChild(false);
    navigation.navigate('AddorUpdateChild', {item, setIsAddOrUpdateChild});
  };

  function bindProfileData() {
    setIsLoading(true);

    getProfile().then(async (profile: ProfileResponse) => {
      const userProfile = profile.user;

      const people = (await api.get(`/peoples/${profile.people.id}`)).data.data;
      const addresses = (await api.get('/users/addresses')).data.data;
      const phones = (await api.get('/users/phones')).data.data;
      const emails = (await api.get('/users/emails')).data.data;
      const children = (await api.get('/users/children')).data.data;

      // set profile data
      setUserName(userProfile.user);
      if(people){
        setId(people.id);
        setName(people.name + ' ' + people.last_name);
        setDocument(people.document);
        setBirthdate(convertDateTime(people.birth_date));
        setGenre(people.genre);
      }
      setAddresses(addresses);
      setPhones(phones);
      setEmails(emails);
      setChildren(children);
      setIsLoading(false);
    });
  }

  async function getPhones() {
    const phones = (await api.get('/users/phones')).data.data;
    setPhones(phones);
  }
  
  async function getAddresses() {
    const addresses = (await api.get('/users/addresses')).data.data;
    setAddresses(addresses);
  }

  async function getEmails() {
    const emails = (await api.get('/users/emails')).data.data;
    setEmails(emails);
  }
  
  async function getChildren() {
    const children = (await api.get('/users/children')).data.data;
    setChildren(children);
  }

  useEffect(() => {
    getPhones()
    setIsAddOrUpdatePhone(false);
  }, [isAddOrUpdatePhone]);
  
  useEffect(() => {
    getAddresses()
    setIsAddOrUpdateAddress(false);
  }, [isAddOrUpdateAddress]);
  
  useEffect(() => {
    getEmails()
    setIsAddOrUpdateEmail(false);
  }, [isAddOrUpdateEmail]);
  
  useEffect(() => {
    getChildren()
    setIsAddOrUpdateChild(false);
  }, [isAddOrUpdateChild]);

  const handleLogout = () => {
    signOutApp();
  };

  const updatePeople = async () => {
    if ([name, document, genre, birthdate].includes(""))
        Alert.alert('Oops!', 'Nome, gênero e data de nascimento devem ser preenchidos');
    else {
        let birth_date_format = moment(birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        let first_name = name.split(' ')[0]
        let last_name = ""
        name.split(' ').map((n, i) => {
          last_name += i > 0 ? `${n} ` : ''
          return null
        })
        
        try{
          let response = await api.put(`/peoples/${id}`, {
            name: first_name, last_name, document, birth_date: birth_date_format, genre
          })
          if(response.status == 200){
            Alert.alert('Sucesso!', 'Alterado com sucesso!')
            bindProfileData()
            setIsEditing(false)
          }
          else{
            Alert.alert('Oops!', 'Ocorreu um erro ao alterar os dados!');
          }
        }
        catch(e){
          Alert.alert('Oops!', 'Ocorreu um erro ao alterar os dados!');
        }
    }
  }

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
                    onFocus={() => {
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
                    render={props => (
                      <TextInputMask {...props} mask="[000].[000].[000]-[00]" />
                    )}
                    theme={{
                      colors: {
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onFocus={() => {
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
                    render={props => (
                      <TextInputMask {...props} mask="[00]/[00]/[0000]" />
                    )}
                    theme={{
                      colors: {
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onFocus={() => {
                      setKeyboardEnable(true);
                    }}
                    onChangeText={(formatted: string) => {
                      setBirthdate(formatted);
                      setIsEditing(true);
                    }}
                    onEndEditing={() => setKeyboardEnable(false)}
                  />
                </View>
                <View style={styles.viewPicker}>
                    <Picker
                        selectedValue={genre}
                        style={{ height: 50, width: "100%", justifyContent: "center", color: '#514a78' }}
                        onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
                    >
                        <Picker.Item label="Gênero" value="" />
                        <Picker.Item label="Feminino" value="Feminino" />
                        <Picker.Item label="Masculino" value="Masculino" />
                    </Picker>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Telefones</Text>
                </View>

                <FlatList
                  data={phones}
                  renderItem={renderPhones}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => goAddorUpdatePhone()}
                  activeOpacity={0.75}>
                  <Text style={styles.textButtonMore}>Adicionar</Text>
                </TouchableOpacity>

                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Endereços</Text>
                </View>

                <FlatList
                  data={addresses}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => goAddorUpdateAddress()}
                  activeOpacity={0.75}>
                  <Text style={styles.textButtonMore}>Adicionar</Text>
                </TouchableOpacity>
                
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Emails</Text>
                </View>

                <FlatList
                  data={emails}
                  renderItem={renderEmails}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => goAddorUpdateEmail()}
                  activeOpacity={0.75}>
                  <Text style={styles.textButtonMore}>Adicionar</Text>
                </TouchableOpacity>
                
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Crianças</Text>
                </View>

                <FlatList
                  data={children}
                  renderItem={renderChildren}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={() => goAddorUpdateChild()}
                  activeOpacity={0.75}>
                  <Text style={styles.textButtonMore}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonExit}
                  onPress={() => handleLogout()}
                  activeOpacity={0.75}>
                  <Text style={styles.textButtonExit}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
      {isEditing && !keyboardEnable && (
        <View style={styles.viewEdit}>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => updatePeople()}
            activeOpacity={0.75}>
            <Text style={styles.textbuttonEdit}>Salvar Alterações</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bindProfileData();
              setIsEditing(false);
            }}>
            <Text style={styles.txtBtnCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
