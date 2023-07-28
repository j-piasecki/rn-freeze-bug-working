/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Freeze} from 'react-freeze';
import {Button, SafeAreaView, Text, View} from 'react-native';

const listeners: Array<() => void> = [];

function addListener(listener: () => void) {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

function ComponentWithLayout() {
  const [a, setA] = React.useState(0);

  React.useEffect(() => {
    console.log('Test Mount');

    return () => {
      console.log('Test Unmount');
    };
  }, []);
  console.log('Test render');

  return (
    <View
      style={{width: 100, height: 100, backgroundColor: 'blue'}}
      onLayout={() => {
        console.log('Test layout');
        setA(1);
      }}>
      <Text>{a}</Text>
    </View>
  );
}

function DelayedRender(props: {children: React.ReactNode}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setImmediate(() => {
      console.log('DelayedRender immediate');
      setVisible(true);

      listeners.forEach(listener => listener());
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

function FreezeComponent({frozen}: {frozen: boolean}) {
  return (
    <View style={{width: 100, height: 100}}>
      <Freeze freeze={frozen}>
        <View style={{flex: 1, backgroundColor: 'red'}} />
      </Freeze>
    </View>
  );
}

function DelayedComponent({visible}: {visible: boolean}) {
  return (
    <View style={{width: 100, height: 100}}>
      {visible && (
        <DelayedRender>
          <ComponentWithLayout />
        </DelayedRender>
      )}
    </View>
  );
}

function FreezeTest() {
  const [frozen, setFrozen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const unsubscribe = addListener(() => {
      setFrozen(!frozen);
      console.log('freezed:', frozen);
    });

    return () => {
      unsubscribe();
    };
  }, [frozen]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 100, flexDirection: 'row'}}>
        <FreezeComponent frozen={frozen} />
        <DelayedComponent visible={visible} />
      </View>

      {!visible && (
        <Button
          title="Break"
          onPress={() => {
            setVisible(true);
          }}
        />
      )}

      {visible && (
        <Button
          title="Reset"
          onPress={() => {
            setVisible(false);
            setFrozen(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default FreezeTest;
