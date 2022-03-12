import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    viewProfile: {
        flex: 1,
        borderRadius: 5,
        padding: 0,
        alignSelf: 'stretch',
        marginTop: 0,
    },
    gradient: {
        flex: 1,
    },
    logoProfile: {
        backgroundColor: '#211F20',
        width: '30%',
        alignSelf: 'center',
        height: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textImgProfile: {
        fontSize: 40,
        color: '#FFF'
    },
    textName: {
        marginTop: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    gridInfo: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    infoItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        marginTop: 0,
        paddingHorizontal: 0
    },
    profileText:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#fff'
      },
    textInfo: {
        fontSize: 20,
        color: "#ffffffba",
        fontWeight: 'bold',
    },
    textInput: {
        width: '100%',
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    loadLogin: {
        marginTop: 85,
        marginBottom: 15,
      },
    textInputDisabled: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    iconInfo: {
        fontSize: 20,
    },
    button: {
        marginTop: 40,
        width: '90%',
        height: 45,
        alignSelf: 'center',
        backgroundColor: "#211F20",
        justifyContent: 'center',
    },
    buttonLabel: {
        color: '#FFF',
    },
    buttonMore: {
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 30,
        height: 50,
		borderRadius: 100,        
    },

    buttonExit: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 60,
        height: 50,
		borderRadius: 100,
    },
    textButtonExit:{
        color:'rgba(233, 221, 242, 1)',
        fontWeight:'bold'
    },
    textButtonMore:{
        color:'#514a78',
        fontWeight:'bold'
    },
    viewInputs: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    iconInputs: {
        alignSelf: 'center',
        marginRight: 10,
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonEdit: {
        marginTop: 40,
        width: '90%',
        height: 45,
        alignSelf: 'center',
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: '#211F20',
        justifyContent: 'center',
    },
    buttonEditLabel: {
        color: '#211F20',
    }
});

export { styles };

