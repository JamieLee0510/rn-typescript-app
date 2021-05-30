import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input} from '../components';
import firebase from 'firebase';

const App: FC = (props) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signup = async () => {
    if (name && email && password) {
      try {
        const {user} = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user) {
          //存user資料到firebase
          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set({name, email, password});
          // Alert.alert(JSON.stringify(user));
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      Alert.alert('error');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign up Screen</Text>
      <Input
        placeholder="name"
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Input
        placeholder="email"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        placeholder="password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button title="signup" onPress={signup} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Already have an account?</Text>
        <TouchableOpacity
          //神奇的props.navigation，應該是用AuthStack中的navigator來控制的
          onPress={() => {
            props.navigation.navigate('login');
          }}
          style={{marginHorizontal: 5}}>
          <Text style={{color: 'rgba(81, 135,200,1)'}}> Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    flexDirection: 'row',
    marginVertical: 20,
  },
});

export default App;
