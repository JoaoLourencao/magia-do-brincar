import React, { useEffect, useState } from 'react';
import { Picker, SafeAreaView, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../components/Loading';
import {api} from '../../services/apis';
import { styles } from './styles';


const Cart = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [serviceValue, setServiceValue] = useState("");
  const [quantityChildren, setQuantityChildren] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getServices = async () => {
      setIsLoading(true)
      let services = (await api.get('/services')).data.data;
      setServices(services)
      setIsLoading(false)
    }
    getServices();
  }, []);

  const mapServices = (service, index) => {
    return <Picker.Item label={service.service} value={service.id} key={index}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient useAngle={true} angle={130} locations={[0.4, 0.7, 1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>
        <Text style={styles.servicesText}>Serviços</Text>
        <ScrollView>
          {isLoading ? (
            <View style={styles.loadLogin}>
              <Loading isLoading={isLoading} />
            </View>
          ) : (
            <View style={styles.viewProfile}>
              <View style={styles.gridInfo}>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={serviceValue}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#514a78' }}
                    onValueChange={(itemValue, itemIndex) => setServiceValue(itemValue)}
                  >
                    <Picker.Item label="Selecione um serviço" value="" />
                    {services && services.map(mapServices)}
                  </Picker>
                </View>
                <View style={styles.viewPicker}>
                  <Picker
                    selectedValue={quantityChildren}
                    style={{ height: 50, width: "100%", justifyContent: "center", color: '#514a78' }}
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
              </View>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Cart;
