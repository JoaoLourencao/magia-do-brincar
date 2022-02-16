import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    card: {
        marginTop: 25,
        height: 220,
        width: '100%',
        padding: 15,
        marginLeft: 30,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textName: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        top: 50,
    },
    viewArrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 70,
        alignSelf: 'flex-start',
    },
    iconArrow: {
        alignSelf: 'center',
        marginLeft: 10,
        color: '#FFF',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#ca9751',
    },
    buttonMore: {
        backgroundColor: '#ca9751',
        marginTop: 20,
        marginBottom: 40,
        width: '91%',
        alignSelf: 'center',
        height: 40,
    },
    buttonLabelMore: {
        alignSelf: 'center',
    }
});

export { styles };