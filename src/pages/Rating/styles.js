import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    viewFinish: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    iconDone: {
        alignSelf: 'center',
        marginTop: 20,
    },
    viewRow: {
        justifyContent: 'center',
        marginTop: 100,
        flexDirection: 'row',
        alignSelf: 'center',
        width: '70%',
    },
    iconOk: {
        alignSelf: 'flex-start'
    },
    iconNegative: {
        marginLeft: 60,
        alignSelf: 'flex-end',
    },
    rating: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 50,
    }
});

export { styles };