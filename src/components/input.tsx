import React, {FC} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Input: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry || false}
      />
    </View>
  );
};

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
    alignSelf: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    marginTop: 5,
  },
  input: {
    padding: 15,
  },
});

export default Input;
