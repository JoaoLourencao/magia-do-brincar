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
    infoItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
      marginTop: 20,
      paddingHorizontal: 0,
    },
    textInfo: {
      fontSize: 20,
      color: '#ffffffba',
      fontWeight: 'bold',
    },
      item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        padding: 8,
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 90,
      },
      textInput: {
        width: '100%',
        height: 50,
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
      textArea: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
      textInputHalf: {
        width: '48%',
        height: 50,
        alignSelf: 'center',
        marginTop: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
      loadLogin: {
        marginTop: 85,
        marginBottom: 15,
      },
      viewProfile: {
        flex: 1,
        borderRadius: 5,
        padding: 0,
        alignSelf: 'stretch',
        marginTop: 0,
        marginBottom: 50,
      },
      textButtonMore: {
        color: '#514a78',
        fontWeight: 'bold',
      },
      viewPicker: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderBottomWidth: 1,
        marginTop: 15,
        color: "#fff",
        textDecorationColor: "#fff"        
      },
      viewRadioButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "#fff"
      },
      viewLineCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
      },
      gridInfo: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
      },
      title: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        width: 170,
        color: '#514a78'
      },
      buttonMore: {
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 15,
        height: 50,
        borderRadius: 100,
      },
      agendamento:{        
        alignItems: 'center',
      },  
      agendamentoTexto:{
        color: "#fff",
        fontSize: 16,
        marginTop: 10
      },
      servicesText:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#fff'
      },
      iconArrow: {
        alignSelf:'center',
        marginRight: 10        
      },
      iconCar: {
          alignSelf: 'center',
          backgroundColor: 'red',
          height: 100,
          width: 100,
      }
      
});

export { styles };

