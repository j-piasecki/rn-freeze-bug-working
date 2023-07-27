import React, {useEffect} from 'react';
import {Freeze} from 'react-freeze';
import {Button, Pressable, SafeAreaView, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import FreezeWrapper from './FreezeWrapper';
import SmallStack from './SmallStack';

const Stack = createStackNavigator();

const listeners: Array<() => void> = [];

function addListener(listener: () => void) {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

setInterval(() => {
  listeners.forEach(listener => listener());
}, 1000);

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Root"
//           component={SmallStack}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      freeze: false,
    };
  }

  componentDidMount(): void {
    console.log('App mounted');
  }

  render(): React.ReactNode {
    console.log('App render');

    return (
      <View
        onLayout={() => {
          console.log('App layout');
          this.setState({freeze: true});
        }}
        style={{flex: 1, backgroundColor: 'red'}}
      />
    );
  }
}

function Square() {
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    console.log('Square mounted');
    const unsubscribe = addListener(() => {
      setCounter(x => x + 1);
      console.log('Square event received');
    });

    return () => {
      console.log('Square unmounted');
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('Counter changed', counter);
  }, [counter]);

  console.log('Square render');

  return (
    <View style={{width: 200, height: 200, backgroundColor: 'red'}}>
      <Text>{counter}</Text>
    </View>
  );
}

function FreezeTest() {
  const [visible, setVisible] = React.useState(true);
  const [frozen, setFrozen] = React.useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      {visible && (
        <Freeze freeze={frozen}>
          <Square />
        </Freeze>
      )}

      <Button title="Toggle visible" onPress={() => setVisible(!visible)} />
      <Button title="Toggle freeze" onPress={() => setFrozen(!frozen)} />
    </SafeAreaView>
  );
}

export default App;
