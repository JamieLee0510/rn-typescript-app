import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Dashboard} from '../screens';

const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator>
      {/* 這邊很像React的<Link/> 和 <NavLink/> */}
      <Screen name="home" component={Home} />
      <Screen name="dashboard" component={Dashboard} />
    </Navigator>
  );
};

export default AppStack;
