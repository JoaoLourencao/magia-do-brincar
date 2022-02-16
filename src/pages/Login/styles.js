import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#211F20',
        justifyContent: 'center',
    },
    card: {
        width: '95%',
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
    },
    logo: {
        width: '95%',
        height: '15%',
        position: 'absolute',
        top: '2%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textInput: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 15,
    },
    button: {
        position: 'absolute',
        bottom: '16%',
        width: '80%',
        padding: 6,
        alignSelf: 'center',
        backgroundColor: '#211F20',
      },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonRegister: {
        position: 'absolute',
        bottom: '5%',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderColor: '#211F20',
        borderWidth: 2,
    },
    buttonLabelRegister: {
        color: '#211F20',
        fontWeight: 'bold',
    },
    viewForgetPass: {
        padding: 10,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    labelLink: {
        alignSelf: 'flex-end',
        color: '#1C16C9',
        fontWeight: 'bold'
    },
    viewModal: {
        height: '30%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    buttonModal: {
      position: 'absolute',
      bottom: '16%',
      width: '50%',
      alignSelf: 'center',
      backgroundColor: 'red',
    },
    textModal: {
      marginTop: 10,
      fontSize: 16,
      color: 'red',
      fontWeight: 'bold',
    },
    errorLoginView: {
        marginTop: 20,
        padding: 10,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelErrorLogin: {
        alignSelf: 'center',
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export { styles };