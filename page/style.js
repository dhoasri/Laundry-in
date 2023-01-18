import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    viewStyle:{
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    textInput:{
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1,
        marginBottom: 50,
        height: 40,
        fontSize: 20
    },
    viewStyle:{
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    textInput:{
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1,
        marginBottom: 50,
        height: 40,
        fontSize: 20,
        flex: 1,
    },
    gambar2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 140,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 150,
        borderRadius: 10,
        backgroundColor: 'black',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        width: '100%'
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold", 
        color: "#FF914D",
    },
    subtitle: {
        fontSize: 20, 
        color: "#DDD8D7",
    },
    loginButtonSection: {
        width: '100%',
        // height: '30%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: '#2396f2',
        color: 'white',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 10,
    },
    registerButtonSection: {
        width: '100%',
        // height: '30%',
        marginTop: '1%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapsButton: {
        backgroundColor: '#6f00ff',
        color: 'white',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#dbe4f3",
    }
})

export default styles;
