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
    color: '#FFF',
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
    marginBottom: 5,
    marginTop: 15,
    paddingHorizontal: 0,
  },
  profileText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#514a78',
  },
  textInfo: {
    fontSize: 20,
    color: '#ffffffba',
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardAddress: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: '#fff',
    padding: 0,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    elevation: 0,
    marginBottom: 15,
  },
  viewEdit: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    paddingHorizontal: 20,
  },
  cardTitle: {
    color: '#fff',
  },
  cardSubTitle: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 'bold',
    fontSize: 15,
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
    backgroundColor: '#211F20',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#FFF',
  },

  buttonEdit: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 15,
    width: '100%',
    height: 50,
    borderRadius: 100,
  },
  textbuttonEdit: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
  },
  buttonMore: {
    backgroundColor: 'rgba(233, 221, 242, 0.9)',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 30,
    width: '100%',
    height: 50,
    borderRadius: 100,
  },
  textButtonMore: {
    color: '#514a78',
    fontWeight: 'bold',
  },
  txtBtnCancel: {
    color: '#ff0000',
  },
  buttonExit: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 50,
    marginBottom: 150,
    width: '100%',
    height: 50,
    borderRadius: 100,
  },
  textButtonExit: {
    color: 'rgba(233, 221, 242, 1)',
    fontWeight: 'bold',
  },
  closeBtn:{
    textAlign: 'right',
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  viewInputs: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
  iconInputs: {
    alignSelf: 'center',
    marginRight: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonEditLabel: {
    color: '#211F20',
  },
});

export { styles };

