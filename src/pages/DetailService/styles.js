import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    img: {
        height: 230,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 6
    },
    name: {
        fontSize: 40,
        color: '#000',
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center'
    },
    iconClose: {
        marginTop: 5,
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    price: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    radio: {
        padding: 20,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    rowRadio: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonDate: {
        backgroundColor: 'green',
        padding: 5,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    textDate: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
    },
    textLabelDate: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    viewDate: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    buttonCart: {
        backgroundColor: '#101847',
        padding: 5,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
    }
});

export { styles };