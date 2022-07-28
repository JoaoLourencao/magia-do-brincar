import React, { useEffect, useState } from 'react';
import { Alert, Picker, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DarkTheme, RadioButton, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Loading from '../../components/Loading';
import { api } from '../../services/apis';
import { styles } from './styles';


const Cart = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [serviceValue, setServiceValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [quantityChildren, setQuantityChildren] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState('diario');
  const [keyboardEnable, setKeyboardEnable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [childInfo, setChildInfo] = useState("");

  useEffect(() => {
    const getServices = async () => {
      setIsLoading(true)
      let services = (await api.get('/services')).data.data;
      setServices(services)
      setIsLoading(false)
    }
    getServices();

    const getAddresses = async () => {
      setIsLoading(true)
      let addresses = (await api.get('/users/addresses')).data.data;
      setAddresses(addresses)
      setIsLoading(false)
    }
    getAddresses();

    const getPaymentMethods = async () => {
      setIsLoading(true)
      let paymentMethods = (await api.get('/payment_methods')).data.data;
      console.log(paymentMethods, "********************************")
      setPaymentMethods(paymentMethods)
      setIsLoading(false)
    }
    getPaymentMethods();
  }, []);

  async function realizeSchedule() {
    try {
      setIsLoading(true)

      if (checked == "diario") {
        if (checked && startDate && startHour && endHour && serviceValue && quantityChildren && childInfo && addressValue && paymentValue) {
          // let response = await api.post('/addresses', {
          //   user_id, service_id, user_has_address_id, payment_method_id, start_date, end_date, payday, number_children, description_children, service_description, services_has_characteristics, users_has_children
          // })
          if (response.status == 201) {
            Alert.alert('Sucesso!', 'Endereço cadastrado!')
          }
          else {
            Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar um endereço!');
          }
        }
      } else {
        if (checked && startDate && endDate && startHour && endHour && serviceValue && quantityChildren && childInfo && addressValue && paymentValue) {
          // let response = await api.post('/addresses', {
          //   postal_code, public_place, number, district,
          //   city, uf, complement, description
          // })
          if (response.status == 201) {
            Alert.alert('Sucesso!', 'Endereço cadastrado!')
          }
          else {
            Alert.alert('Oops!', 'Ocorreu um erro ao cadastrar um endereço!');
          }

        }
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Oops!', 'Ocorreu um erro ao realizar um agendamento!');
      setIsLoading(false)
    }
  }

  const mapServices = (service, index) => {
    return <Picker.Item label={service.service} value={service.id} key={index} />
  }

  const mapAddresses = (address, index) => {
    return <Picker.Item label={address.public_place + ', ' + address.number} value={address.id} key={index} />
  }

  const mapPaymentMethods = (method, index) => {
    return <Picker.Item label={method.payment_method} value={method.id} key={index} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient useAngle={true} angle={130} locations={[0.4, 0.7, 1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>
        <Text style={styles.servicesText}>Agendamento</Text>
        <ScrollView>
          {isLoading ? (
            <View style={styles.loadLogin}>
              <Loading isLoading={isLoading} />
            </View>
          ) : (
            <View style={styles.viewProfile}>
              <View style={styles.gridInfo}>
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Tipo</Text>
                </View>
                <View style={styles.viewRadioButton}>
                  <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                    <RadioButton.Item
                      theme={DarkTheme}
                      color='#fff'
                      label="Diário"
                      value="diario"
                    />
                    <RadioButton.Item
                      theme={DarkTheme}
                      color='#fff'
                      label="Período"
                      value="periodo"
                    />
                  </RadioButton.Group>
                </View>

                {checked == "diario" ?
                  (
                    <>
                      <View style={styles.infoItem}>
                        <Text style={styles.textInfo}>Data/Hora</Text>
                      </View>
                      <TextInput
                        label="Data de entrada"
                        mode="flat"
                        value={startDate}
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
                          setStartDate(formatted);
                        }}
                        onEndEditing={() => setKeyboardEnable(false)}
                      />
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <TextInput
                          label="Hora de entrada"
                          mode="flat"
                          value={startHour}
                          style={styles.textInputHalf}
                          keyboardType="numeric"
                          placeholderTextColor="steelblue"
                          render={props => (
                            <TextInputMask {...props} mask="[00]:[00]" />
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
                            setStartHour(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />

                        <TextInput
                          label="Hora de saída"
                          mode="flat"
                          value={endHour}
                          style={styles.textInputHalf}
                          keyboardType="numeric"
                          placeholderTextColor="steelblue"
                          render={props => (
                            <TextInputMask {...props} mask="[00]:[00]" />
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
                            setEndHour(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />
                      </View>

                    </>
                  )
                  :
                  (
                    <>
                      <View style={styles.infoItem}>
                        <Text style={styles.textInfo}>Data/Hora</Text>
                      </View>

                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TextInput
                          label="Data de entrada"
                          mode="flat"
                          value={startDate}
                          style={styles.textInputHalf}
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
                            setStartDate(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />
                        <TextInput
                          label="Hora de entrada"
                          mode="flat"
                          value={startHour}
                          style={styles.textInputHalf}
                          keyboardType="numeric"
                          placeholderTextColor="steelblue"
                          render={props => (
                            <TextInputMask {...props} mask="[00]:[00]" />
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
                            setStartHour(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TextInput
                          label="Data de saída"
                          mode="flat"
                          value={endDate}
                          style={styles.textInputHalf}
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
                            setEndDate(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />
                        <TextInput
                          label="Hora de saída"
                          mode="flat"
                          value={endHour}
                          style={styles.textInputHalf}
                          keyboardType="numeric"
                          placeholderTextColor="steelblue"
                          render={props => (
                            <TextInputMask {...props} mask="[00]:[00]" />
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
                            setEndHour(formatted);
                          }}
                          onEndEditing={() => setKeyboardEnable(false)}
                        />
                      </View>
                    </>
                  )
                }
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Dados do serviço</Text>
                </View>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={serviceValue}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#fff' }}
                    onValueChange={(itemValue, itemIndex) => setServiceValue(itemValue)}
                  >
                    <Picker.Item label="Selecione um serviço" value="" />
                    {services && services.map(mapServices)}
                  </Picker>
                </View>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={quantityChildren}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#fff' }}
                    onValueChange={(itemValue, itemIndex) => setQuantityChildren(itemValue)}
                  >
                    <Picker.Item label="Quantidade de crianças" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                  </Picker>
                </View>
                <View>
                  <TextInput
                    label="Características das crianças"
                    mode="flat"
                    multiline
                    numberOfLines={3}
                    value={childInfo}
                    style={styles.textArea}
                    placeholderTextColor="steelblue"
                    theme={{
                      colors: {
                        primary: '#fff',
                        placeholder: '#fff',
                        text: '#fff',
                      },
                    }}
                    onChangeText={(formatted: string) => {
                      setChildInfo(formatted);
                    }}
                  />
                </View>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={addressValue}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#fff' }}
                    onValueChange={(itemValue, itemIndex) => setAddressValue(itemValue)}
                  >
                    <Picker.Item label="Selecione um endereço" value="" />
                    {addresses && addresses.map(mapAddresses)}
                  </Picker>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.textInfo}>Pagamento</Text>
                </View>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={paymentValue}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#fff' }}
                    onValueChange={(itemValue, itemIndex) => setPaymentValue(itemValue)}
                  >
                    <Picker.Item label="Selecione um método de pagamento" value="" />
                    {paymentMethods && paymentMethods.map(mapPaymentMethods)}
                  </Picker>
                </View>
              </View>
              {checked == "diario" ?
                (
                  <TouchableOpacity
                    style={styles.buttonMore}
                    onPress={() => { realizeSchedule() }}
                    disabled={checked && startDate && startHour && endHour && serviceValue && quantityChildren && childInfo && addressValue && paymentValue ? false : true}
                    activeOpacity={0.75}>
                    <Text style={styles.textButtonMore}>Solicitar agendamento</Text>
                  </TouchableOpacity>
                )
                :
                (
                  <TouchableOpacity
                    style={styles.buttonMore}
                    onPress={() => { realizeSchedule() }}
                    disabled={checked && startDate && endDate && startHour && endHour && serviceValue && quantityChildren && childInfo && addressValue && paymentValue ? false : true}
                    activeOpacity={0.75}>
                    <Text style={styles.textButtonMore}>Solicitar agendamento</Text>
                  </TouchableOpacity>
                )
              }

            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView >
  )
}

export default Cart;
