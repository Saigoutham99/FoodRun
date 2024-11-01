import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const MenuScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [cartItems, setCartItems] = useState({});

  const addItem = (item) => {
    setCartItems((prev) => ({
      ...prev,
      [item.item]: {
        ...item,
        quantity: (prev[item.item]?.quantity || 0) + 1,
      },
    }));
  };

  const removeItem = (item) => {
    setCartItems((prev) => {
      const currentQuantity = prev[item.item]?.quantity || 0;
      if (currentQuantity <= 1) {
        const { [item.item]: _, ...remaining } = prev;
        return remaining;
      }
      return {
        ...prev,
        [item.item]: {
          ...item,
          quantity: currentQuantity - 1,
        },
      };
    });
  };

  const totalAmount = () =>
    Object.values(cartItems).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{restaurant.name} - Menu</Text>

      <ScrollView style={styles.menuList}>
        {restaurant.menu.map((menuItem, index) => (
          <View key={index} style={styles.menuItem}>
            <Image source={menuItem.image} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.itemName}>{menuItem.item}</Text>
              <Text style={styles.itemPrice}>${menuItem.price.toFixed(2)}</Text>
              <Text style={styles.itemCalories}>{menuItem.calories} Cal</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => removeItem(menuItem)}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>
                {cartItems[menuItem.item]?.quantity || '00'}
              </Text>
              <TouchableOpacity onPress={() => addItem(menuItem)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalAmount().toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigation.navigate('Cart', { cartItems, total: totalAmount() })
          }
        >
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  backButton: { fontSize: 18, color: '#004d40', margin: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  menuList: { flex: 1, paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  menuImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  menuDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, color: '#004d40' },
  itemCalories: { fontSize: 14, color: '#777' },
  counter: { flexDirection: 'row', alignItems: 'center' },
  counterButton: { fontSize: 20, padding: 10, color: '#004d40' },
  counterValue: { marginHorizontal: 10, fontSize: 18 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eaeaea',
  },
  totalText: { fontSize: 22, fontWeight: 'bold', color: '#004d40' },
  cartButton: {
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 8,
  },
  cartButtonText: { color: '#fff', fontSize: 18 },
});

export default MenuScreen;
