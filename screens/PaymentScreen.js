import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

const PaymentScreen = ({ route, navigation }) => {
  const totalAmount = route.params?.totalAmount || 0;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mpesaPin, setMpesaPin] = useState('');
  const [isMpesaModalVisible, setMpesaModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);

  const handleCashPayment = () => {
    Alert.alert(
      'Payment Successful!',
      `You have paid Ksh ${totalAmount} for your items.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'), // Redirect to Home
        },
      ]
    );
  };

  const handleMpesaPayment = () => {
    setMpesaModalVisible(true);
  };

  const submitPhoneNumber = () => {
    if (!phoneNumber || !/^07\d{8}$/.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Kenyan phone number (07XXXXXXXX).');
      return;
    }
    setMpesaModalVisible(false);
    setPinModalVisible(true);
  };

  const submitMpesaPin = () => {
    if (!mpesaPin || mpesaPin.length !== 4) {
      Alert.alert('Invalid PIN', 'Please enter a valid 4-digit M-Pesa PIN.');
      return;
    }
    setPinModalVisible(false);
    Alert.alert(
      'Payment Successful!',
      `You have paid Ksh ${totalAmount} to paybill number 522533, account number 7664166.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'), // Redirect to Home
        },
      ]
    );
  };

  const handleOtherPayment = () => {
    Alert.alert('Payment Option', 'Other payment methods are coming soon!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options</Text>
      <Text style={styles.label}>Total Amount: Ksh {totalAmount}</Text>

      {/* Cash Payment */}
      <TouchableOpacity style={styles.paymentButton} onPress={handleCashPayment}>
        <Text style={styles.paymentButtonText}>Pay with Cash</Text>
      </TouchableOpacity>

      {/* M-Pesa Payment */}
      <TouchableOpacity style={styles.paymentButton} onPress={handleMpesaPayment}>
        <Text style={styles.paymentButtonText}>Pay with M-Pesa</Text>
      </TouchableOpacity>

      {/* Other Payment */}
      <TouchableOpacity style={styles.paymentButton} onPress={handleOtherPayment}>
        <Text style={styles.paymentButtonText}>Other Payment Methods</Text>
      </TouchableOpacity>

      {/* M-Pesa Modal */}
      <Modal transparent={true} visible={isMpesaModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Your Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="07XXXXXXXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={submitPhoneNumber}>
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setMpesaModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* M-Pesa PIN Modal */}
      <Modal transparent={true} visible={isPinModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              You are paying Ksh {totalAmount} to Paybill 522533, Account No. 7664166
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your M-Pesa PIN"
              keyboardType="numeric"
              secureTextEntry={true}
              value={mpesaPin}
              onChangeText={setMpesaPin}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={submitMpesaPin}>
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setPinModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
});

export default PaymentScreen;
