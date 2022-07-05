import React, { useEffect, useState } from 'react';
import { Alert, Picker, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import {api} from '../../services/apis';
import { styles } from './styles';

const AddorUpdateEmail = ({navigation, route}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(route.params && route.params.item){
            setId(route.params.item.id)
            setEmail(route.params.item.email)
            setDescription(route.params.item.description)
            setIsEditing(true)
        }
    }, [route.params])

    const goBack = () => {
        navigation.goBack();
    }

    async function addorUpdateEmail() {
        if ([email].includes(""))
            Alert.alert('Oops!', 'Email deve ser preenchido');
        else {

            if (isEditing) {
                let response = await api.put(`/emails/${id}`, {email, description })
                if (response.status == 200) {
                    Alert.alert('Sucesso!', 'Email alterado!', [
                        {
                            text: "OK", onPress: () => {
                                route.params.setIsAddOrUpdateEmail(true);
                                navigation.goBack();
                            }
                        }
                    ]);
                }
                else
                    Alert.alert('Oops!', 'Ocorreu um erro ao alterar o email!');
            } else {
                let response = await api.post('/emails', {email, description })
                if (response.status == 201) {
                    Alert.alert('Sucesso!', 'Email cadastrado!', [
                        {
                            text: "OK", onPress: () => {
                                route.params.setIsAddOrUpdateEmail(true);
                                navigation.goBack();
                            }
                        }
                    ]);
                }
                else
                    Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar um email!');
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
                    <Text style={styles.profileText}>Editar email</Text>
                ) : (
                    <Text style={styles.profileText}>Cadastrar email</Text>
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
                                        label="Descrição para email"
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
                                        label="Email"
                                        mode="flat"
                                        value={email}
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
                                            setEmail(txt);
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => addorUpdateEmail()}
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

export default AddorUpdateEmail
