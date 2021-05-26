import React, {FC, useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import AppStack from './appStack';
import AuthStack from './authStack';

const MainNav: FC = () => {
  const [user, setUser] = useState<any>(null);
  const initUser = () => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
  };
  //初始化組件後渲染的邏輯，像是componentDidMount
  useEffect(() => {
    initUser();
    // return () => {
    //   cleanup;
    // };
  }, []);
  return (
    <NavigationContainer>
      {user === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default MainNav;
