import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    item: {
        padding: 10,
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'green',
    },
    date: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'blue',
    },
    iconClose: {
        marginRight: 5
    },
    emptyView: {
        padding: 20,
        marginTop: 100,
        alignSelf: 'center'
    },
    emptyText: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonServices: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#101847'
    },
    buttonFinish: {
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#101847',
        marginTop: 60,
    },
    buttonContinue: {
        padding: 6,
        width: '90%',
        borderColor: '#101847',
        borderWidth: 2,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        marginTop: 15,
        marginBottom: 20,
    },
    buttonLabelContinue: {
        color: '#000',
    }
});

export { styles };