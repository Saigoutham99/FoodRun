import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleRegister = async () => {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
  
        // Save the username to Firebase Realtime Database
        const db = getDatabase();
        await set(ref(db, `users/${userId}`), { username });
  
        Alert.alert('Success', 'Registered successfully!');
        navigation.navigate('Login');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up for Free</Text>
  
        <TextInput
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
  
        <TextInput
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
  
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
  
        <TextInput
          placeholder="Password Confirmation"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
  
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
  
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
  
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Sign In
          </Text>
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#004d40',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 30,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    loginText: {
      marginTop: 15,
      color: '#777',
    },
    loginLink: {
      color: '#004d40',
      fontWeight: 'bold',
    },
  });
  
  export default RegisterScreen;