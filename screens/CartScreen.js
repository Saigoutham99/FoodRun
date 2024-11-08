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

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${total}</Text>
        <Text style={styles.summaryText}>Delivery Fee: ${deliveryFee}</Text>
        <Text style={styles.summaryText}>Tax: ${tax}</Text>
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
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20 
  },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 8, 
    marginRight: 10 
  },
  itemDetails: { 
    flex: 1 
  },
  itemName: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  itemQuantity: { 
    fontSize: 16, 
    color: '#777', 
    marginVertical: 4 
  },
  itemPrice: { 
    fontSize: 16, 
    color: '#444', 
    fontWeight: '500' 
  },
  summaryContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryText: { 
    fontSize: 16, 
    color: '#555', 
    marginBottom: 5 
  },
  grandTotal: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginTop: 10 
  },
  checkoutButton: { 
    backgroundColor: '#004d40', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  checkoutButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center', 
    fontWeight: '600' 
  },
  backButton: { 
    color: '#004d40', 
    marginTop: 15, 
    textAlign: 'center', 
    fontSize: 16 
  },
});

export default CartScreen;
