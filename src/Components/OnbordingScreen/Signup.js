import { View, Text } from 'react-native'
import React from 'react'
import { Center, Square, Circle } from 'native-base';

const Signup = () => {
  return (
    <Center>
    <Center bg="primary.400" _text={{
    color: "white",
    fontWeight: "bold"
  }} height={200} width={{
    base: 200,
    lg: 250
  }}>
      This is the Center
    </Center>
  </Center>
  )
}

export default Signup