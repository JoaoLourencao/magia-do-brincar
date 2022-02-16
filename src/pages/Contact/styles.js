import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    cardInfos: {
        justifyContent: 'center',
        marginTop: 50,
        alignSelf: 'center',
        width: '70%',
        height: 200,
    },
    viewRowInfo: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    textInfos: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold'
    },
    viewSocials: {
        width: '70%',
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    logoSocial: {
        borderWidth: 1,
        borderRadius: 50,
        height: 50,
        width: 50,
        borderColor: '#211F20',
        backgroundColor: '#211F20',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { styles };