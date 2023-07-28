import React from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

const Data = new Array(1000).fill(0).map((_, i) => i);

function Test({navigation}) {
  const [a, setA] = React.useState(0);

  React.useEffect(() => {
    console.log('Test Mount');

    return () => {
      console.log('Test Unmount');
    };
  }, []);
  console.log('Test render');

  return (
    <Pressable
      onPress={() => {
        navigation.push('Root');
      }}>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
        onLayout={() => {
          console.log('Test layout');
          setA(1);
        }}>
        {Data.map((item, index) => (
          <View
            style={{width: 10, height: 10, backgroundColor: 'red', margin: 2}}
            key={index}
          />
        ))}
      </SafeAreaView>
    </Pressable>
  );
}

function DelayedRender(props) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setImmediate(() => {
      console.log('DelayedRender done');
      setVisible(true);
    });
  }, []);

  if (visible) {
    console.log('DelayedRender done');
    return props.children;
  } else {
    console.log('DelayedRender waiting');
    return null;
  }
}

export default function Home({navigation}) {
  return (
    <DelayedRender>
      <Test navigation={navigation} />
    </DelayedRender>
  );
}
