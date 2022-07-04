import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import { styles } from './styles';

const ServiceDetail = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);

    const goBack = () => {
        navigation.goBack();
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
                <ScrollView>
                    {isLoading ? (
                        <View style={styles.loadLogin}>
                            <Loading isLoading={isLoading} />
                        </View>
                    ) : (
                        <View style={styles.viewProfile}>
                            <TouchableOpacity
                                style={styles.buttonMore}
                                onPress={() => { }}
                                activeOpacity={0.75}>
                                <Text style={styles.textButtonMore}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default ServiceDetail
