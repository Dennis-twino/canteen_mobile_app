// src/components/BannerCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BannerCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/banner.jpg')} style={styles.image} />
      <Text style={styles.title}>Order delicious meals with Us</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Ordering</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e0aaff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default BannerCard;
