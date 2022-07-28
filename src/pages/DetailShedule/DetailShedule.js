import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const DetailShedule = ({ navigation, route }) => {
    const { service } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    function goScheduke() {
        goBack();
        navigation.navigate('Carrinho')
    }
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                useAngle={true}
                angle={300}
                locations={[0.4, 0.7, 1]}
                colors={['#fff', '#fff']}
                style={styles.gradient}>
                <ScrollView>
                    <View style={styles.viewProfile}>
                        <View style={styles.container}>
                            <Ionicons onPress={() => goBack()} name="close" size={35} color="gray" style={styles.iconClose} />
                            <Image source={{ uri: service.image }} style={styles.img} />
                            <Text style={styles.textStyle}>{service.service}</Text>
                            <Text style={styles.description}>{service.description}</Text>
                            <View style={styles.gridInfo}>
                                <TouchableOpacity
                                    style={styles.buttonMore}
                                    onPress={() => goScheduke()}
                                    activeOpacity={0.75}>
                                    <Text style={styles.textButtonMore}>Agende um horário</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View >
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default DetailShedule
