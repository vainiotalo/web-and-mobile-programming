import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

const StatusBar = () => {
    const height = Constants.statusBarHeight
    return(
        <View style={{height}}></View>
    )
}

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    const updateNotes = (text) => {
        setNotes(notes.concat(text))
    }

    return (
        <View style = {{flex: 1}}>
            <StatusBar />
            {notes.map((note, index) => {
                return(
                    <Text key={index}>{note}</Text>
                )
            })}
            <View style={{flex: 1,justifyContent: 'flex-end'}}>
                <NoteForm onPress={updateNotes}/>
            </View>
        </View>
    );
}

const NoteForm = props => {
    const [text, setText] = useState('');
    const [newText, setNewText] = useState('');

    const handlePress = () => {
        props.onPress(newText)
    }

    const handleChange = (text) => {
        setNewText(text)
    }

    return (
        <View>
            <TextInput
                placeholder="Write the note here"
                onChangeText={handleChange}
                defaultValue={text}
            />
            <Button title="ADD NOTE" onPress={handlePress}/>
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
