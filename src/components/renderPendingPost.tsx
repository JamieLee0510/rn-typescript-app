import React, {FC} from 'react';
import {Text, View} from 'react-native';

interface Props {
  msg: string;
  timestamp: number;
}

const App: FC = (props) => {
  return (
    <View>
      <Text>{props.msg}</Text>
    </View>
  );
};
