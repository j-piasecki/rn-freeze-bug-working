import React from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

const Data = new Array(1000).fill(0).map((_, i) => i);

export default function Home({navigation}) {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <Pressable
        onPress={() => {
          navigation.push('Root');
        }}>
        <SafeAreaView style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {Data.map((item, index) => (
            <View
              style={{width: 10, height: 10, backgroundColor: 'red', margin: 2}}
              key={index}
            />
          ))}
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
