import React from 'react';
import Test from './src/Components/Test';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
    <NativeBaseProvider>
      <Test></Test>
    </NativeBaseProvider>
  );
}
