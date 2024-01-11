import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  useEffect(() => {
    // Check if there is a logged-in user
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const loggedUserString = await AsyncStorage.getItem('loggeduser');
      if (loggedUserString) {
        // If a logged-in user is available, navigate to the 'Post' screen
        navigation.navigate('Post');
      }
    } catch (error) {
      console.error('Error checking logged-in user:', error);
    }
  };
  
  const handleAuth = async () => {
    try {
      if (!username) {
        alert('Username is required');
        return;
      }
  
      if (!password) {
        alert('Password is required');
        return;
      }
  
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
  
      if (mode === 'login') {
        const user = users.find((u) => u.username === username && u.password === password);
  
        if (user) {
            await AsyncStorage.setItem('loggeduser', JSON.stringify(user));
            navigation.navigate('Post');
        } else {
          alert('Invalid credentials. Please check your username and password.');
        }
      } else {
        if (users.some((u) => u.username === username)) {
          alert('Username already taken. Please choose another one.');
        } else {
          const newUser = { username, password };
          users.push(newUser);
          await AsyncStorage.setItem('users', JSON.stringify(users));
          alert("Signup successful please login now")
          setMode("login")
          setUsername("")
          setPassword("")
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An error occurred during authentication. Please try again later.');
    }
  };
  

  return (
    <KeyboardAvoidingView>

    <View className="h-[50vh] bg-teal-400 flex justify-center items-center">
      
        <View className="flex-1 justify-center items-center">
          <Text
            style={{fontFamily: 'Poppins-SemiBold'}}
            className="text-white pb-4">
            {mode === 'login' ? 'Login' : 'Signup'}
          </Text>
        </View>
        <View
          style={{elevation: 2}}
          className="bg-white absolute top-[200px] w-5/6  h-[50vh] rounded-xl ">
          <View className="pt-2">
            <Avatar
              bg="pink.600"
              alignSelf="center"
              size="lg"
              source={{
                uri: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
              }}></Avatar>
          </View>
          <View className="flex justify-center items-center pt-2">
            <TextInput
              className="text-black"
              placeholder="Username"
              placeholderTextColor={'grey'}
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              className="text-black"
              placeholder="Password"
              placeholderTextColor={'grey'}
              secureTextEntry={show}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
            />
         
            <TouchableOpacity
              className="bg-teal-500 w-24 mt-3 h-8 rounded-md"
              onPress={handleAuth}>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-white text-center p-1">
                {mode === 'login' ? 'Login' : 'Signup'}
              </Text>
            </TouchableOpacity>
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="text-teal-400 mt-2"
              onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login'
                ? 'Dont have an account ? Signup'
                : 'Already have an account ? Login'}
            </Text>
          </View>
          <View></View>
        </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#2dd4bf',
    borderRadius: 10,
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    padding: 10,
  },
});
