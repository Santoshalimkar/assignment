import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './OnbordingScreen/Login';
import Signup from './OnbordingScreen/Signup';
import Post from './OnbordingScreen/Post';
const Stack = createNativeStackNavigator();
import {Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Test = () => {
 

const removeuser= async ()=>{
  await AsyncStorage.removeItem('loggeduser');


}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={removeuser}>

              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black">
                logout
              </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Test;
