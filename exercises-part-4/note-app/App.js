import * as React from 'react';
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
    return (
        <View style = {{flex: 1}}>
            <StatusBar />
            <Text>Note 1</Text>
            <Text>Note 2</Text>
            <Text>Note 3</Text>
            <Text>Note 4</Text>
            <Text>Note 5</Text>
            <Text>Note 6</Text>
            <Text>Note 7</Text>
            <Text>Note 8</Text>
            <Text>Note 9</Text>
            <Text>Note 10</Text>
            <Text>Note 11</Text>
            <Text>Note 12</Text>
            <Text>Note 13</Text>
            <Text>Note 14</Text>
            <Text>Note 15</Text>
            <Text>Note 16</Text>
            <Text>Note 17</Text>
            <Text>Note 18</Text>
            <Text>Note 19</Text>
            <Text>Note 20</Text>
            <Text>Note 21</Text>
            <View style={{flex: 1,justifyContent: 'flex-end'}}>
                <NoteForm />
            </View>
        </View>
    );
}

const NoteForm = () => {
    return (
        <View>
            <TextInput placeholder="Write the note here"/>
            <Button title="ADD NOTE" />
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
