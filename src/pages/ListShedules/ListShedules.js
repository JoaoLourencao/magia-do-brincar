import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/apis';
import { styles } from './styles';

const ListShedules = ({ navigation }) => {
  const [shedules, setShedules] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      let shedules = (await api.get('/schedules')).data
      console.log(shedules, " &&&&&&&&&&&&&&&&&")
      setShedules(shedules.data)
      setLoading(false)
    }
    getServices();
  }, []);

  function goDetail(id) {
    let shedule = shedules.find(x => x.id == id);
    navigation.navigate('DetailShedule', {
      shedule: shedule
    })
  }

  const Item = ({ shedule, id }) => {
    return (
      <TouchableOpacity onPress={() => goDetail(id)}>
        <View style={styles.item}>          
          <Text style={styles.title} numberOfLines={1}>{shedule}</Text>
          <Ionicons name="arrow-forward" size={26} color="#514a78" style={styles.iconArrow} />
        </View>
      </TouchableOpacity>
    )
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        shedule={item.service}
        id={item.id}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient useAngle={true} angle={130} locations={[0.4, 0.7, 1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>
        <Text style={styles.servicesText}>Agendamentos</Text>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color='#211F20' />
            </View>
            :
            <FlatList
              data={shedules}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        }
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ListShedules;
