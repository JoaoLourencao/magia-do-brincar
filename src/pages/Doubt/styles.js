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
        alignItems: 'center',
        backgroundColor: 'rgba(233, 221, 242, 0.9)',
        padding: 8,
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 10,
        minHeight: 50,
      },
      item_question: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 10,
        minHeight: 50,
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
        width: '90%',
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
      doubtsText:{
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
      },
      hiddenAnswer: {
        display: 'none'
      },
      answer: {
        textAlign: 'justify',
        padding: 8,
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
        color: '#514a78'
      },
      
});

export { styles };

