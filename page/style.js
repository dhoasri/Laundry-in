import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    viewStyle:{
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    viewStyle2:{
        flex: 1,
        padding: 20,
        marginTop: 50
    },
    textInput:{
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1,
        marginBottom: 50,
        height: 40,
        fontSize: 20,
        flex: 1,
    },
    loginText: {
        color: '#363636',
        marginTop: 25,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
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
    button2:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 250,
        borderRadius: 5,
        backgroundColor: '#2396f2',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        width: '100%'
    },
    action2: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        width: '90%'
    },
    action3: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        width: '100%'
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
    title: {
        flex: 1,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#2396f2",
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
        backgroundColor: '#01A6CA',
        color: 'white',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFF'
    },
    registerButtonSection: {
        width: '100%',
        // height: '30%',
        marginTop: 30,
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
    },
    koor: {
        width: '100%',
        // height: '30%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default styles;
