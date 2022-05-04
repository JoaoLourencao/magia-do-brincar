import React, { useEffect, useState } from 'react';
import { Alert, Picker, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import api from '../../services/apis';
import { styles } from './styles';

const AddorUpdatePhone = ({navigation, route}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [contactName, setContactName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phoneType, setPhoneType] = useState("");    
    const [number, setNumber] = useState("");    
    const [mask, setMask] = useState("");    

    useEffect(() => {
        setNumber("");
        if(phoneType == "fixo")
            setMask("[00] [0000]-[0000]")
        else
            setMask("[00] [00000]-[0000]")

    }, [phoneType]);

    const goBack = () => {
        navigation.goBack();
    }

    // const insertInCart = () => {        
    //     navigation.navigate('Carrinho');
    // }
 
    async function addorUpdatePhone(){
        if([phoneType, number].includes(""))
            Alert.alert('Oops!', 'Tipo do número e número devem ser preenchidos');
        else{
            setIsLoading(true);
            let ddd = number.split(' ')[0];
            let numberFormatted = number.split(' ')[1].replace('-', '');
            let type = phoneType[0].toLocaleUpperCase() + phoneType.substring(1);

            if(isEditing){
                console.log("editando")
            }else{
                let response = await api.post('/phones', {number: numberFormatted, ddd, type, description: contactName})
                if(response.status == "201")
                    Alert.alert('Sucesso!','Número cadastrado!');
                else
                    Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar um telefone!');
            }
            setIsLoading(false);
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
                    <Text style={styles.profileText}>Editar telefone</Text>
                ):(
                    <Text style={styles.profileText}>Cadastrar telefone</Text>
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
                                    label="Nome do contato"
                                    mode="flat"
                                    value={contactName}
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
                                        setContactName(txt);
                                    }}
                                />
                            </View> 
                            <View style={styles.viewPicker}>
                                <Picker
                                    selectedValue={phoneType}
                                    style={{ height: 50, width: "100%", justifyContent: "center", color:'#514a78'}}
                                    onValueChange={(itemValue, itemIndex) => setPhoneType(itemValue)}
                                >
                                    <Picker.Item label="Tipo do número" value="" />
                                    <Picker.Item label="Celular" value="celular" />
                                    <Picker.Item label="Fixo" value="fixo" />
                                </Picker>
                            </View>                        
                            <View style={styles.viewInputs}>
                                <TextInput
                                    label="Número"
                                    mode="flat"
                                    disabled={phoneType == "" ? true : false}
                                    value={number}
                                    style={styles.textInput}
                                    placeholderTextColor="red"
                                    render={props => (
                                        <TextInputMask {...props} mask={mask} />
                                      )}
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
                            <TouchableOpacity
                                style={styles.buttonMore}
                                onPress={() => addorUpdatePhone()}
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

export default AddorUpdatePhone
 