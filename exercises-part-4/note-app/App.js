import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import styles from './styles';

const StatusBar = () => {
    const height = Constants.statusBarHeight
    return(
        <View style={{height}} />
    )
}

const NoteList = () => {
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
        <View style={{flex: 1}}>
            <StatusBar />
            <ScrollView style={styles.notelist}>
                {notes.map((note, index) => {
                    return(
                        <Text key={index} style={styles.notelist}>{` - ${note}`}</Text>
                    )
                })}
            </ScrollView>
            <View style={{justifyContent: "flex-end"}}>
                <NoteForm onPress={updateNotes}/>
            </View>
        </View>
    );
}

const NoteForm = ({ onPress }) => {
    const [text, setText] = useState('');
    const [newText, setNewText] = useState('');

    const handlePress = () => {
        onPress(newText)
    }

    const handleChange = (text) => {
        setNewText(text)
    }

    return (
        <View style={styles.noteform}>
            <TextInput
                placeholder="Write the note here"
                onChangeText={handleChange}
                defaultValue={text}
                style={styles.noteform}
            />
            <Button
                title="ADD NOTE"
                onPress={handlePress}
                color="#B90E0A"
            />
        </View>
    );
}

const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="notes" component={NoteList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
