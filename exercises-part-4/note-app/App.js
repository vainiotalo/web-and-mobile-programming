import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import styles from './styles';

const Header = ({ title, navigate }) => {
    if (title === "NEW NOTE") {
        return(
            <View style={styles.headerMain}>
                <View style={{height: Constants.statusBarHeight}} />
                <View style={styles.headerButton}>
                    <Button title={title}
                            onPress={navigate}
                            color="#B90E0A"
                    />
                </View>
            </View>
        )
    } else {
        return(
            <View style={styles.headerForm}>
                <View style={{height: Constants.statusBarHeight}} />
                <View style={styles.headerButton}>
                    <Button title={title}
                            onPress={navigate}
                            color="#B90E0A"
                    />
                </View>
            </View>
        )
    }
}

const NoteList = ({ navigation, notes }) => {
    return (
        <View style={{flex: 1}}>
            <Header title="NEW NOTE" navigate={() => navigation.navigate("New note")} />
            <ScrollView style={styles.noteList}>
                {notes.map((note, index) => {
                    return(
                        <Text key={index} style={styles.noteList}>{note}</Text>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const NoteForm = ({ navigation, onPress }) => {
    const [text, setText] = useState('');
    const [newText, setNewText] = useState('');

    const handlePress = () => {
        onPress(newText)
    }

    const handleChange = (text) => {
        setNewText(text)
    }

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
        <Header title="<" navigate={() => navigation.navigate("Notes")} />
        <View style={styles.noteForm}>
            <View style={{flex: 1}}>
            <TextInput
                placeholder="Write the note here"
                onChangeText={handleChange}
                defaultValue={text}
                style={styles.noteForm}
                multiline={true}
            />
            </View>
            <Button
                title="ADD NOTE"
                onPress={handlePress}
                color="#B90E0A"
            />
        </View>
        </View>
    );
}

const Stack = createStackNavigator();

const App = () => {
    const [notes, setNotes] = useState([]);

    const updateNotes = (text) => {
        if (notes.filter(note => note === text).length > 0) {
            Alert.alert(
                "Invalid input",
                "Note already exists",
                [
                    {
                        text: "OK",
                        onPress: () => { return null }
                    }
                ]
            )
        } else if (text === undefined || text === '') {
            Alert.alert(
                "Invalid input",
                "Note cannot be empty",
                [
                    {
                        text: "OK",
                        onPress: () => { return null }
                    }
                ]
            )
        } else {
            setNotes(notes.concat(text))
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Notes">
                    <Stack.Screen name="Notes">
                        {props => <NoteList {...props} notes={notes}/>}
                    </Stack.Screen>
                    <Stack.Screen name="New note">
                        {props => <NoteForm {...props} onPress={updateNotes}/>}
                    </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
