// src/screens/ItemDetails.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const ItemDetails = ({ route, navigation }) => {
  const { cart } = route.params;
  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filter items by category
  const breakfastItems = Object.values(cart).filter(item =>
    ['chapati', 'tea', 'ndengu'].includes(item.name.toLowerCase())
  );
  const lunchItems = Object.values(cart).filter(item =>
    ['chapati', 'rice', 'ndegu', 'ugali', 'cabbage'].includes(item.name.toLowerCase())
  );
  const giftShopItems = Object.values(cart).filter(item =>
    ['hood', 'hat', 'cup', 'umbrella', 'white shirt', 'polo shirt', 'soda', 'biscuits', 'water'].includes(item.name.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.category, {textAlign:"center"}]}>Kenswed Canteen</Text>
      <Text style={styles.title}>Cart Details</Text>
      
      <ScrollView style={styles.cartItems}>
        {/* Breakfast Card */}
        {breakfastItems.length > 0 && (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>Breakfast Card</Text>
            {breakfastItems.map((item) => (
              <View key={item.id} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemText}>Subtotal: Ksh {item.price * item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Lunch Card */}
        {lunchItems.length > 0 && (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>Lunch Card</Text>
            {lunchItems.map((item) => (
              <View key={item.id} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemText}>Subtotal: Ksh {item.price * item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Gift Shop Card */}
        {giftShopItems.length > 0 && (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>Gift Shop Card</Text>
            {giftShopItems.map((item) => (
              <View key={item.id} style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemText}>Subtotal: Ksh {item.price * item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Text style={styles.totalText}>Total: Ksh {totalAmount}</Text>

      <TouchableOpacity 
        style={styles.paymentButton} 
        onPress={() => navigation.navigate('Payment', { totalAmount })}
      >
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8', // Background color for each category card
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemDetails;
