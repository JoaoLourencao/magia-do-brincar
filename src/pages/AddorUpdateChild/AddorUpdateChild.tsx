import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Picker, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Loading from '../../components/Loading';
import {api, api_cep} from '../../services/apis';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const AddorUpdateChild = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if(route.params && route.params.item){
            let birth_date = route.params.item.birth_date
            setId(route.params.item.id)
            setName(route.params.item.name)
            setLastName(route.params.item.last_name)
            setBirthDate(birth_date ? moment(birth_date).format('DD/MM/YYYY') : null)
            setGenre(route.params.item.genre)
            setDescription(route.params.item.description)
            setType(route.params.item.type)
            setIsEditing(true)
        }
    }, [route.params])

    const goBack = () => {
        navigation.goBack();
    }

    async function addorUpdateChild() {
        if ([name, genre, birth_date].includes(""))
            Alert.alert('Oops!', 'Nome, gênero e data de nascimento devem ser preenchidos');
        else {
            let birth_date_format = moment(birth_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
            if(isEditing){
                let response = await api.put(`/children/${id}`, {
                    name, last_name, birth_date: birth_date_format, genre, 
                    description, type
                })
                if(response.status == 200){
                    Alert.alert('Sucesso!', 'Criança alterada!')
                }
                else{
                    Alert.alert('Oops!', 'Ocorreu um erro ao alterar a criança!');
                }
                route.params.setIsAddOrUpdateChild(true);
                navigation.goBack();
            } 
            else{
                let response = await api.post('/children', { 
                    name, last_name, birth_date: birth_date_format, genre, 
                    description, type
                })
                if (response.status == 201) {
                    Alert.alert('Sucesso!', 'Criança cadastrada!')
                }
                else{
                    Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar uma criança!');
                }
                route.params.setIsAddOrUpdateChild(true);
                navigation.goBack();
            
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                useAngle={true}
                angle={300}
                locations={[0.4, 0.7, 1]}
                colors={['#fff', '#fff']}
                style={styles.gradient}>
                <View style={styles.closeBtn}>
                    <Ionicons onPress={() => goBack()} name="close" size={35} color="gray" />
                </View>
                {isEditing ? (
                    <Text style={styles.profileText}>Editar criança</Text>
                ) : (
                    <Text style={styles.profileText}>Cadastrar criança</Text>
                )}
                <ScrollView>
                    {isLoading ? (
                        <View style={styles.loadLogin}>
                            <Loading isLoading={isLoading} />
                        </View>
                    ) : (
                        <View style={styles.viewProfile}>
                            <View style={styles.gridInfo}>
                                
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Nome"
                                        mode="flat"
                                        value={name}
                                        style={styles.textInput}
                                        placeholderTextColor="red"
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        onChangeText={txt => {
                                            setName(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Último nome"
                                        mode="flat"
                                        value={last_name}
                                        style={styles.textInput}
                                        placeholderTextColor="red"
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        onChangeText={txt => {
                                            setLastName(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Data de nascimento"
                                        mode="flat"
                                        value={birth_date}
                                        style={styles.textInput}
                                        render={props => (
                                            <TextInputMask {...props} mask={'[00]/[00]/[0000]'} />
                                        )}
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        onChangeText={txt => {
                                            setBirthDate(txt);
                                        }}
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
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Descrição da criança"
                                        mode="flat"
                                        value={description}
                                        style={styles.textInput}
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        onChangeText={txt => {
                                            setDescription(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="O que está criança é seu?"
                                        mode="flat"
                                        value={type}
                                        style={styles.textInput}
                                        placeholder="Filho, sobrinho...."
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        onChangeText={txt => {
                                            setType(txt);
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => addorUpdateChild()}
                                    activeOpacity={0.75}>
                                    <Text style={styles.textButtonMore}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default AddorUpdateChild
