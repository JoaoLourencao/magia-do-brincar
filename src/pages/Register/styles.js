import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#211F20',
        justifyContent: 'center',
        padding: 12,
    },
    viewRegister: {
        flex: 1,
        borderRadius: 5,
        padding: 15,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
    },
    textRegister: {
        color: "#8e8378",
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconCancel: {
        alignSelf: 'flex-end',
    },
    line: {
        marginTop: 30,
        backgroundColor: '#8e8383',
        height: 1,
    },
    viewInputs: {
        marginTop: 10,
    },
    textInput: {
        marginBottom: 16,
        height: 45,
    },
    viewTextAgree: {
        marginTop: 90,
        alignItems: 'center',
    },
    textAgree: {
        color: "#8e8378",
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#211F20'
    },
    labelErrorEmpty: {
        color: 'red',
        fontSize: 14,
    },
});

export { styles };