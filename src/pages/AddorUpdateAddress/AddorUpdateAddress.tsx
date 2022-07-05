import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Picker, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Loading from '../../components/Loading';
import {api, api_cep} from '../../services/apis';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddorUpdateAddress = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [public_place, setPublicPlace] = useState("");
    const [number, setNumber] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [complement, setComplement] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(route.params && route.params.item){
            setId(route.params.item.id)
            setPostalCode(route.params.item.postal_code)
            setPublicPlace(route.params.item.public_place)
            setNumber(route.params.item.number)
            setDistrict(route.params.item.district)
            setCity(route.params.item.city)
            setUf(route.params.item.uf)
            setComplement(route.params.item.complement)
            setDescription(route.params.item.description)
            setIsEditing(true)
        }
    }, [route.params])

    const goBack = () => {
        navigation.goBack();
    }

    useMemo(async () => {
        try{
            if(postal_code.length == 9){
                let address = (await api_cep.get(`${postal_code}/json/`)).data
                setPublicPlace(address.logradouro ? address.logradouro : null)
                setDistrict(address.bairro ? address.bairro : null)
                setCity(address.localidade ? address.localidade : null)
                setUf(address.uf ? address.uf : null)
                setComplement(address.complement ? address.complement : null)
            }
        }
        catch(e){
            console.log(e.response.status)
        }
    }, [postal_code])

    async function addorUpdateAddress() {
               
        if(isEditing){
            let response = await api.put(`/addresses/${id}`, {
                postal_code, public_place, number, district, 
                city, uf, complement, description
            })
            if(response.status == 200){
                Alert.alert('Sucesso!', 'Endereço alterado!')
            }
            else{
                Alert.alert('Oops!', 'Ocorreu um erro ao alterar o endereço!');
            }
            route.params.setIsAddOrUpdateAddress(true);
            navigation.goBack();
        } 
        else{
            let response = await api.post('/addresses', { 
                postal_code, public_place, number, district, 
                city, uf, complement, description
                })
            if (response.status == 201) {
                Alert.alert('Sucesso!', 'Endereço cadastrado!')
            }
            else{
                Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar um endereço!');
            }
            route.params.setIsAddOrUpdateAddress(true);
            navigation.goBack();
           
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
                    <Text style={styles.profileText}>Editar endereço</Text>
                ) : (
                    <Text style={styles.profileText}>Cadastrar endereço</Text>
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
                                        label="Nome do endereço"
                                        mode="flat"
                                        value={description}
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
                                            setDescription(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="CEP"
                                        mode="flat"
                                        value={postal_code}
                                        style={styles.textInput}
                                        placeholderTextColor="red"
                                        theme={{
                                            colors: {
                                                primary: '#514a78',
                                                placeholder: '#514a78',
                                                text: '#514a78',
                                            },
                                        }}
                                        render={props => (
                                            <TextInputMask {...props} mask={'[00000]-[000]'} />
                                        )}
                                        onChangeText={txt => {
                                            setPostalCode(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Logradouro"
                                        mode="flat"
                                        value={public_place}
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
                                            setPublicPlace(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Número"
                                        mode="flat"
                                        value={number}
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
                                            setNumber(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Bairro"
                                        mode="flat"
                                        value={district}
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
                                            setDistrict(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Cidade"
                                        mode="flat"
                                        value={city}
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
                                            setCity(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="UF"
                                        mode="flat"
                                        value={uf}
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
                                            setUf(txt);
                                        }}
                                    />
                                </View>
                                <View style={styles.viewInputs}>
                                    <TextInput
                                        label="Complemento"
                                        mode="flat"
                                        value={complement}
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
                                            setComplement(txt);
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => addorUpdateAddress()}
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

export default AddorUpdateAddress
