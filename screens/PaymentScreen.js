// src/screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {
  const item = route.params?.item;
  
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No item information found.</Text>
      </View>
    );
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount] = useState(item.price); // price from item data

  const handleMpesaPayment = async () => {
    if (!phoneNumber) {
      Alert.alert("Please enter a phone number.");
      return;
    }
    
    try {
      // Replace with your M-Pesa Daraja API credentials
      const consumerKey = '7QaGKTZhKgqpNs8lrScCXbg6p3f1ipzhM4TYWmgUkX52jrAd';
      const consumerSecret = 'cDiAntTnpp72DfkgX8TjKLVSiAAmWFAj33gFkGATClzO7zqbrRITNRCgDl2XDBB0';
      const shortCode = '600987';
      const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

      const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
        }
      });

      const token = tokenResponse.data.access_token;

      const paymentResponse = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: 'https://example.com/callback',
          AccountReference: item.name,
          TransactionDesc: `Payment for ${item.name}`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (paymentResponse.data.ResponseCode === '0') {
        Alert.alert("Payment successful!", `You paid Ksh ${item.price} for ${item.name}.`);
        navigation.goBack();
      } else {
        Alert.alert("Payment failed", "Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>M-Pesa Payment</Text>
      <Text style={styles.label}>Item: {item.name}</Text>
      <Text style={styles.label}>Price: Ksh {item.price}</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number (07XXXXXXXX)"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.paymentButton} onPress={handleMpesaPayment}>
        <Text style={styles.paymentButtonText}>Pay with M-Pesa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default PaymentScreen;
