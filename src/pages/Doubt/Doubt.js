import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/apis';
import { styles } from './styles';

const Doubt = ({ navigation }) => {
    const [doubts, setDoubts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDoubts = async () => {
            let doubts = (await api.get('/doubts')).data
            setDoubts(doubts.data)
            setLoading(false)
        }
        getDoubts();
    }, []);

    const viewAnswer = (id) => {
        let doubts_copy = [...doubts]
        let doubt = doubts_copy.find(d => d.id === id)
        doubt.view = doubt.view !== null ? !doubt.view : true 
        setDoubts(doubts_copy)
    }

    const Item = ({ question, answer, id, view, index }) => {
        return (
            <TouchableOpacity onPress={() => {viewAnswer(id)}}>
                <View style={styles.item} onPress={() => {viewAnswer(id)}}>
                    <View style={styles.item_question}>
                        <Text style={styles.title} numberOfLines={1}>{index+1}. {question}?</Text>
                        <Ionicons name="arrow-down" size={15} color="#514a78" style={styles.iconArrow} />
                    </View>
                    <Text style={view ? styles.answer : styles.hiddenAnswer} numberOfLines={5}><Text style={{color: '#BA0000'}}>Resposta:</Text> {answer}.</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item, index }) => {
        return (
            <Item
                question={item.question}
                answer={item.answer}
                id={item.id}
                view={item.view}
                index={index}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient useAngle={true} angle={130} locations={[0.4, 0.7, 1]} colors={['#a295f1', '#d592c7', '#f192a9']} style={styles.gradient}>
                <Text style={styles.doubtsText}>Dúvidas</Text>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color='#211F20' />
                        </View>
                        :
                        <FlatList
                            data={doubts}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                }
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Doubt;
