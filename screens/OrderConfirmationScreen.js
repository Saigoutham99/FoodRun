import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderId, total, cartItems, address } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#004d40" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Confirmation Icon and Title */}
      <View style={styles.header}>
        <Icon name="checkmark-circle-outline" size={60} color="#4CAF50" />
        <Text style={styles.title}>Order Confirmed</Text>
        <Text style={styles.subtitle}>We’re preparing your order. It will be ready soon!</Text>
      </View>

      {/* Order Information Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Order Details</Text>
        <Text style={styles.infoText}>Order ID: #{orderId}</Text>
        <Text style={styles.infoText}>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Ordered Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Cart</Text>
        {Object.values(cartItems).map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.quantity} × {item.item}</Text>
              <Text style={styles.itemPrice}>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Amount</Text>
        <Text style={styles.summaryPrice}>${total.toFixed(2)}</Text>
      </View>

      {/* Delivery Information Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Delivery To</Text>
        <Text style={styles.infoText}>{address.fullName}</Text>
        <Text style={styles.infoText}>{address.street}, {address.city}</Text>
      </View>

      {/* Track Order Button */}
      <TouchableOpacity
        style={styles.trackOrderButton}
        onPress={() => navigation.navigate('OrderTrackingScreen')}
      >
        <Text style={styles.trackOrderButtonText}>Track Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffffff' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButtonText: { fontSize: 16, color: '#004d40', marginLeft: 5 },

  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#4CAF50', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#777', textAlign: 'center', paddingHorizontal: 20, marginTop: 5 },

  infoContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  infoText: { fontSize: 16, color: '#555' },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 5,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemPrice: { fontSize: 16, color: '#004d40', fontWeight: 'bold' },

  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
  },
  summaryText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  summaryPrice: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },

  trackOrderButton: {
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  trackOrderButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default OrderConfirmationScreen;
