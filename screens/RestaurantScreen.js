import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Restaurant = ({ route, navigation }) => {
  const { category, restaurants } = route.params;

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.menu.some((item) => item.item === category)
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Restaurants serving {category}</Text>
      {filteredRestaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.restaurantCard}
          onPress={() => navigation.navigate('Menu', { restaurant })}
        >
          <Image source={restaurant.image} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10, padding: 10 },
  backButtonText: { fontSize: 18, color: '#004d40' },
  title: { fontSize: 28, marginBottom: 20 },
  restaurantCard: { marginBottom: 10, alignItems: 'center' },
  restaurantImage: { width: 150, height: 150, marginBottom: 5 },
  restaurantName: { fontSize: 22 },
  restaurantLocation: { fontSize: 16, color: '#777' },
});

export default Restaurant;
