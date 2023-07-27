import {createStackNavigator} from '@react-navigation/stack';
import FreezeWrapper from './FreezeWrapper';
import Home from './Home';

const Stack = createStackNavigator();

export default function SmallStack() {
  return (
    <FreezeWrapper>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </FreezeWrapper>
  );
}
