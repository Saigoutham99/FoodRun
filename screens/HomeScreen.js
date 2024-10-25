import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const categories = ['Fries', 'Burger', 'Drink', 'Pasta', 'Pizza'];

const restaurants = [
  {
    id: 1,
    name: "McDonald's",
    location: 'Bloomington',
    rating: 4.9,
    image: require('../assets/images/mcd.jpg'),
    menu: [
      { item: 'Burger', price: 5.99, calories: 500, image: require('../assets/images/burger.jpg') },
      { item: 'Fries', price: 2.99, calories: 300, image: require('../assets/images/fries.jpg') },
      { item: 'Drink', price: 1.99, calories: 150, image: require('../assets/images/drink.jpg') },
    ],
  },
  {
    id: 2,
    name: 'Indiagardens',
    location: 'Indianapolis',
    rating: 3.9,
    image: require('../assets/images/indiagarden.jpg'),
    menu: [
      { item: 'Pasta', price: 8.99, calories: 400, image: require('../assets/images/pasta.jpg') },
      { item: 'Drink', price: 1.99, calories: 150, image: require('../assets/images/drink.jpg') },
      { item: 'Briyani', price: 1.99, calories: 150, image: require('../assets/images/briyani.jpg') },
      { item: 'Paneer', price: 1.99, calories: 150, image: require('../assets/images/paneer.jpg') },
    ],
  },
  {
    id: 3,
    name: 'Taste Of India',
    location: 'Columbus',
    rating: 4.6,
    image: require('../assets/images/toi.jpg'),
    menu: [
      { item: 'Burger', price: 6.99, calories: 600, image: require('../assets/images/burger.jpg') },
      { item: 'Drink', price: 1.99, calories: 150, image: require('../assets/images/drink.jpg') },
      { item: 'Briyani', price: 1.99, calories: 150, image: require('../assets/images/briyani.jpg') },
      { item: 'Paneer', price: 1.99, calories: 150, image: require('../assets/images/paneer.jpg') },
    ],
  },
  {
    id: 4,
    name: "Wendy's",
    location: 'Bloomington',
    rating: 4.6,
    image: require('../assets/images/wendys.jpg'),
    menu: [
      { item: 'Fries', price: 3.99, calories: 350, image: require('../assets/images/fries.jpg') },
      { item: 'Burger', price: 6.99, calories: 600, image: require('../assets/images/burger.jpg') },
      { item: 'Drink', price: 1.99, calories: 150, image: require('../assets/images/drink.jpg') },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsername(data.username);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.foodRunTitle}>FoodRun</Text>
        <Icon name="notifications-outline" size={28} style={styles.notificationIcon} />
      </View>

      <Text style={styles.welcomeText}>Welcome, {username}</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search food" style={styles.searchInput} />
        <Icon name="filter-outline" size={24} style={styles.filterIcon} />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() =>
              navigation.navigate('Restaurant', { category, restaurants })
            }
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>All Restaurants</Text>
      <View style={styles.restaurantGrid}>
        {restaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.restaurantCard}>
            <Image source={restaurant.image} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
              <Text style={styles.restaurantRating}>⭐ {restaurant.rating}</Text>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.navigate('Menu', { restaurant })}
              >
                <Text style={styles.menuButtonText}>View Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  foodRunTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  welcomeText: { fontSize: 22, color: '#777', marginBottom: 10 },
  notificationIcon: { color: '#004d40' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, height: 50 },
  filterIcon: { marginLeft: 10, color: '#004d40' },
  categories: { flexDirection: 'row', marginBottom: 20 },
  category: {
    backgroundColor: '#004d40',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  categoryText: { color: '#fff', fontSize: 16 },
  restaurantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
  },
  restaurantImage: {
    width: '90%',
    height: 100, 
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantInfo: { alignItems: 'center', width: '100%' },
  restaurantName: { fontSize: 16, fontWeight: 'bold' },
  restaurantLocation: { color: '#777', marginVertical: 4 },
  restaurantRating: { color: '#004d40', fontWeight: 'bold', marginBottom: 5 },
  menuButton: {
    backgroundColor: '#004d40',
    borderRadius: 5,
    paddingVertical: 10,
    width: '80%',
    marginTop: 5,
  },
  menuButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default HomeScreen;
