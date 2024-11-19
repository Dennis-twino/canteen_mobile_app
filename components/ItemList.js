import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const items = {
  breakfast: [
    { id: '1', name: 'Chapati', price: 20, rating: 4.1, image: require('../assets/items/chapati.jpg') },
    { id: '2', name: 'Tea', price: 20, rating: 3.9, image: require('../assets/items/tea.jpg') },
    { id: '3', name: 'Ndegu', price: 20, rating: 4.5, image: require('../assets/items/ndegu.jpg') },
  ],
  lunch: [
    { id: '4', name: 'Chapati', price: 20, rating: 4.1, image: require('../assets/items/chapati.jpg') },
    { id: '5', name: 'Rice', price: 30, rating: 4.3, image: require('../assets/items/Rice.jpg') },
    { id: '6', name: 'Ndegu', price: 25, rating: 4.5, image: require('../assets/items/ndegu.jpg') },
    { id: '7', name: 'Ugali', price: 25, rating: 4.2, image: require('../assets/items/Ugali.jpg') },
    { id: '8', name: 'Cabbage', price: 15, rating: 4.0, image: require('../assets/items/Cabbage.jpg') },
  ],
  giftShop: [
    { id: '9', name: 'Hood', price: 1000, rating: 4.6, image: require('../assets/items/hoods.jpg') },
    { id: '10', name: 'Hat', price: 500, rating: 4.3, image: require('../assets/items/harts.jpg') },
    { id: '11', name: 'Cup', price: 200, rating: 4.2, image: require('../assets/items/cup.jpg') },
    { id: '12', name: 'Umbrella', price: 800, rating: 4.5, image: require('../assets/items/umbrella.jpg') },
    { id: '13', name: 'White Shirt', price: 700, rating: 4.4, image: require('../assets/items/White_Polo_Shirt.jpg') },
    { id: '14', name: 'Polo Shirt', price: 800, rating: 4.6, image: require('../assets/items/Black_Polo_Shirt.jpg') },
    { id: '15', name: 'Soda', price: 50, rating: 4.0, image: require('../assets/items/soda.jpg') },
    { id: '16', name: 'Biscuits', price: 30, rating: 4.2, image: require('../assets/items/biscuits.png') },
    { id: '17', name: 'Water', price: 20, rating: 4.1, image: require('../assets/items/water.png') },
  ]
};

const ItemList = ({ navigation }) => {
  const [cart, setCart] = useState({});

  const updateQuantity = (itemId, increment, category) => {
    const item = items[category].find(item => item.id === itemId);
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemId]?.quantity || 0) + increment;
      if (newQuantity > 0) {
        return { ...prevCart, [itemId]: { ...item, quantity: newQuantity } };
      } else {
        const updatedCart = { ...prevCart };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.category, {textAlign:"center"}]}>Kenswed Canteen</Text>

      {/* Main ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Breakfast Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>Breakfast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {items.breakfast.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Ksh {item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1, 'breakfast')} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{cart[item.id]?.quantity || 0}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1, 'breakfast')} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Lunch Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>Lunch</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {items.lunch.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Ksh {item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1, 'lunch')} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{cart[item.id]?.quantity || 0}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1, 'lunch')} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Gift Shop Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>Gift Shop</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {items.giftShop.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Ksh {item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1, 'giftShop')} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{cart[item.id]?.quantity || 0}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1, 'giftShop')} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* View Cart Button */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate('ItemDetails', { cart })}
        >
          <Text style={styles.viewCartButtonText}>View Cart ({totalItems})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 20,
  },
  scrollViewContent: {
    paddingBottom: 60,  // Additional space for View Cart button
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 120,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  viewCartButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItemList;
