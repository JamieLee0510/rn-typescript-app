import React, {FC, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase';
import {Input, Button} from '../components';

const App: FC = (props) => {
  const [msg, setMsg] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);

  //user post message to firebase
  const postMsg = async () => {
    //testing area
    console.log(user);
    //testing area end
    if (msg) {
      const data = {
        msg: msg,
        timestamp: Date.now(),
        approved: false,
      };
      try {
        await firebase.firestore().collection('post').add(data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert('cannot post empty message');
    }
  };

  //fetch current user
  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const currUser = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    setUser({id: currUser.id, ...currUser.data()});
  };

  //user signout
  const signOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={signOut} title="Sign Out" />
      <View>
        <Input
          placeholder="write some message"
          onChangeText={(text) => {
            setMsg(text);
          }}
        />
        <Button title="post" onPress={postMsg} />
      </View>
      {user ? (
        user.isAdmin ? (
          <View>
            <Button
              title="Dashboard"
              onPress={() => props.navigation.navigate('dashboard')}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
