import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerMain: {
        alignItems: "flex-end"
    },
    headerForm: {
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    headerButton:{
        width: "30%",
    },
    noteForm: {
        fontSize: 40,
        backgroundColor: "#F9E4B7",
        borderTopColor: "#E1C699",
        borderTopWidth: 1,
        flex: 1
    },
    noteList: {
        fontSize: 20,
        borderTopColor: "#E1C699",
        borderTopWidth: 1,
        backgroundColor: "#F9E4B7",
        borderBottomColor: "#E1C699",
        borderBottomWidth: 2
    }
})

export default styles;
