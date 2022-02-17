import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
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
        padding: 10,
        marginVertical: 13,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 110,
      },
      viewLineCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
      },
      title: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        width: 170,
        color: '#514a78'
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