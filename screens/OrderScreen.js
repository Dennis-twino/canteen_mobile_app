import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const handleProceedToPayment = () => {
    // Navigate to PaymentScreen and pass the selected item as a parameter
    navigation.navigate('Payment', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.price}>Price: Ksh {item.price}</Text>
      <Text style={styles.rating}>Rating: ⭐ {item.rating}</Text>

      <TouchableOpacity style={styles.paymentButton} onPress={handleProceedToPayment}>
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#4CAF50', // Green background for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
