import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const MenuScreen = ({ route }) => {
  const { restaurant } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{restaurant.name} - Menu</Text>
      {restaurant.menu.map((menuItem, index) => (
        <View key={index} style={styles.menuItem}>
          <Image source={menuItem.image} style={styles.menuImage} />
          <View style={styles.menuDetails}>
            <Text style={styles.itemName}>{menuItem.item}</Text>
            <Text style={styles.itemPrice}>${menuItem.price.toFixed(2)}</Text>
            <Text style={styles.itemCalories}>{menuItem.calories} Cal</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, marginBottom: 20, fontWeight: 'bold' },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  menuImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  menuDetails: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, color: '#004d40' },
  itemCalories: { fontSize: 14, color: '#777' },
});

export default MenuScreen;
