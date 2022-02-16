import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, Image, ScrollView } from 'react-native';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {convertDateTime} from '../../utils/parseDateTime';
import {useCart} from '../../contexts/cart';

const DetailService = ({navigation, route}) => {
    const {idService} = route.params;
    const [dataService, setDataService] = useState('');
    const [silicone, setSilicone] = useState('Sim');
    const [cheirinho, setCheirinho] = useState('Sim');
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectDateService, setSelectDateService] = useState(false);
    const {addItem} = useCart();


    useEffect(() => {
        async function getService() {
            const service = await firestore().collection('services').doc(idService).get();
            setDataService(service.data());
        };
       getService();
    }, []);

    const goBack = () => {
        navigation.goBack();
    }

    const insertInCart = () => {
        addItem({...dataService, silicone, cheirinho, date: convertDateTime(date), id: idService});
        navigation.navigate('Carrinho');
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Ionicons onPress={() => goBack()} name="close" size={35} color="gray" style={styles.iconClose} />
                <Image source={{uri: dataService.img}} style={styles.img} />
                <Text style={styles.name}>{dataService.name}</Text>
                <Text style={styles.description}>{dataService.description}</Text>
                <View style={styles.row}>
                    <Ionicons name="pricetag" size={26} color="green" style={styles.icon} />
                    <Text style={styles.price}>R$ {dataService.price}</Text>
                </View>
                <View style={styles.radio}>
                    <Text style={styles.title} numberOfLines={1}>Passar Cheirinho ?</Text>
                    <View style={styles.rowRadio}>
                        <RadioButton
                            value="Sim"
                            status={ cheirinho === 'Sim' ? 'checked' : 'unchecked' }
                            onPress={() => setCheirinho("Sim")}
                            color="gray"
                        />
                        <Text>Sim</Text>
                    </View>
                    <View style={styles.rowRadio}>
                        <RadioButton
                            value="Não"
                            status={ cheirinho === 'Não' ? 'checked' : 'unchecked' }
                            onPress={() => setCheirinho('Não')}
                            color="gray"
                        />
                        <Text>Não</Text>
                    </View>

                    <Text style={styles.title} numberOfLines={1}>Silicone no painel ?</Text>
                    <View style={styles.rowRadio}>
                        <RadioButton
                            value="Sim"
                            status={ silicone === 'Sim' ? 'checked' : 'unchecked' }
                            onPress={() => setSilicone("Sim")}
                            color="gray"
                        />
                        <Text>Sim</Text>
                    </View>
                    <View style={styles.rowRadio}>
                        <RadioButton
                            value="Não"
                            status={ silicone === 'Não' ? 'checked' : 'unchecked' }
                            onPress={() => setSilicone('Não')}
                            color="gray"
                        />
                        <Text>Não</Text>
                    </View>
                </View>

                {
                    selectDateService ?
                        <View>
                            <View style={styles.viewDate}>
                                <Text style={styles.textLabelDate}>Agendado para: </Text>
                                <Text style={styles.textDate}>{convertDateTime(date)}</Text>
                            </View>
                            <Button
                                mode="contained"
                                onPress={() => insertInCart()}
                                icon={() => <Ionicons name="cart" size={26} color="white" style={styles.icon} />}
                                style={styles.buttonCart}
                                labelStyle={styles.buttonLabelCart}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </View>
                    :
                        <View>
                            <Button
                                mode="contained"
                                onPress={() => setOpen(true)}
                                style={styles.buttonDate}
                                labelStyle={styles.buttonLabelDate}
                            >
                                Agende o horario
                            </Button>
            
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                title="Defina o horário"
                                confirmText="Confirmar"
                                cancelText="Cancelar"
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    setSelectDateService(true);
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                }

            </ScrollView>
        </View>
    )
}

export default DetailService
