import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input} from '../components';
import firebase from 'firebase';

const App: FC = (props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    if (email && password) {
      const {user} = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } else {
      Alert.alert('Missing Field');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
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
      <Button title="login" onPress={login} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Don't have an account？</Text>
        <TouchableOpacity
          //神奇的props.navigation，應該是用AuthStack中的navigator來控制的
          onPress={() => {
            props.navigation.navigate('signup');
          }}
          style={{marginHorizontal: 5}}>
          <Text style={{color: 'rgba(81, 135,200,1)'}}>Register Here</Text>
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
