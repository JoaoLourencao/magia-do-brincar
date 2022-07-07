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
      },
      viewPicker: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderColor: '#C4C4C4',
        backgroundColor: '#F6F6F6',
        borderBottomWidth: 1,
        marginTop: 15
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
        height: 50,
        borderRadius: 100,
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

