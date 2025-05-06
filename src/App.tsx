import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { CurrencybyRupey } from './constants';
import CurrencyButton from './component/currencybtn';
import Snackbar from 'react-native-snackbar';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const [inputvalue, setinputvalue] = useState('');
  const [resultvalue, setresultvalue] = useState('');
  const [targetcurrency, settargetcurrency] = useState('');

  const buttonPressed = (targetvalue: currency) => {
    if (!inputvalue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputvalue);
    if (!isNaN(inputAmount)) {
      const convertedvalue = inputAmount * targetvalue.value;
      const result = `${targetvalue.Symbol} ${convertedvalue.toFixed(2)}`;
      setresultvalue(result);
      settargetcurrency(targetvalue.Name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputvalue}
              clearButtonMode="always" // iOS only
              onChangeText={setinputvalue}
              keyboardType="number-pad"
              placeholder="Enter amount in Rupees"
              style={{ flex: 1 }}
            />
          </View>
          {resultvalue && (
            <Text style={styles.resulttxt}>{resultvalue}</Text>
          )}
        </View>
        <View style={styles.bottomcontainer}>
          <FlatList
            numColumns={3}
            data={CurrencybyRupey}
            keyExtractor={(item) => item.Name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetcurrency === item.Name && styles.selected,
                ]}
                onPress={() => {
                  buttonPressed(item);
                }}
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F4',
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  topContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DADCE0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  rupee: {
    fontSize: 22,
    marginRight: 8,
    color: '#202124',
  },
  resulttxt: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A73E8',
    textAlign: 'center',
    marginTop: 4,
  },
  bottomcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    backgroundColor: '#E3F2FD',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  selected: {
    backgroundColor: '#BBDEFB',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
});



export default App;
