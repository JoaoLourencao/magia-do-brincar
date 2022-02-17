import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    gradient: {
        flex: 1,
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
        top: '2%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputBox:{
        marginTop: 110
    },  
    buttonMore: {
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        alignItems: 'center',
        paddingVertical: 15,
        height: 50,
		borderRadius: 100,     
        width: '85%',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },    
    textButtonContinue:{
        color:'#514a78',
        fontWeight:'bold',
        fontSize: 16

    },
    textButtonMore:{
        color:'#fff',
        fontWeight:'bold',
        fontSize: 16
    },
    textInput: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center'
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
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelErrorLogin: {
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8
    },
});

export { styles };