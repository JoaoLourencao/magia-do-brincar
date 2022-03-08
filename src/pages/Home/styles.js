import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    linear: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    card: {
        marginTop: 25,
        height: 150,
        width: '100%',
        padding: 20,
        marginLeft: 40,
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
        top: 20,
    },
    viewArrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 50,
        alignSelf: 'flex-start',
    },
    iconArrow: {
        alignSelf: 'center',
        marginLeft: 10,
        color: '#FFF',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#f192a9',
    },
    buttonMore: {
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 20,
        height: 50,
		borderRadius: 100,        
    },
    textButtonMore:{
        color:'#514a78',
        fontWeight:'bold'
    },
    buttonLabelMore: {
        alignSelf: 'center',
    }
});

export { styles };