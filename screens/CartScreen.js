import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { cartItems, total } = route.params;

  const deliveryFee = (0.06 * total).toFixed(2);
  const tax = (0.05 * total).toFixed(2);
  const grandTotal = (parseFloat(total) + parseFloat(deliveryFee) + parseFloat(tax)).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cart Summary</Text>

      {Object.values(cartItems).map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        </View>
      ))}

      <View style={styles.summary}>
        <Text>Subtotal: ${total}</Text>
        <Text>Delivery Fee: ${deliveryFee}</Text>
        <Text>Tax: ${tax}</Text>
        <Text style={styles.grandTotal}>Total: ${grandTotal}</Text>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButton} 
        onPress={() => navigation.navigate('Checkout', { total, cartItems })}
        >
       <Text style={styles.checkoutButtonText}>Continue to Checkout</Text>
         </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemQuantity: { fontSize: 16, color: '#777' },
  itemPrice: { fontSize: 16 },
  summary: { marginVertical: 20 },
  grandTotal: { fontSize: 22, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#004d40', padding: 15, borderRadius: 8 },
  checkoutButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  backButton: { color: '#004d40', marginTop: 10, textAlign: 'center' },
});

export default CartScreen;
