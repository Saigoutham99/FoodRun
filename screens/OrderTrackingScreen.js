import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderTrackingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#004d40" />
      </TouchableOpacity>

      {/* Simulated Map Background */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/400x600.png?text=Static+Map+Background' }} 
        style={styles.mapImage}
      />

      {/* Static Markers */}
      <View style={styles.markerRestaurant}>
        <Icon name="restaurant" size={24} color="#FF5733" />
        <Text style={styles.markerLabel}>Restaurant</Text>
      </View>

      <View style={styles.markerCustomer}>
        <Icon name="person" size={24} color="#004d40" />
        <Text style={styles.markerLabel}>Customer</Text>
      </View>

      {/* Simulated Path */}
      <View style={styles.pathSegment} />
      <View style={[styles.pathSegment, { top: 230, left: 150 }]} />
      <View style={[styles.pathSegment, { top: 270, left: 180 }]} />
      <View style={[styles.pathSegment, { top: 310, left: 210 }]} />
      <View style={[styles.pathSegment, { top: 350, left: 240 }]} />

      {/* Order Information Panel */}
      <View style={styles.bottomPanel}>
        <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.driverImage} />
        <Text style={styles.statusText}>On the way • 25 mins</Text>
        <Text style={styles.addressText}>Jl. Jendral Soedirman 207, Ubud, Bali</Text>
        <TouchableOpacity style={styles.orderReceivedButton}>
          <Text style={styles.orderReceivedText}>Order Received</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  mapImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '70%',
  },
  markerRestaurant: {
    position: 'absolute',
    top: 150,
    left: 100,
    alignItems: 'center',
  },
  markerCustomer: {
    position: 'absolute',
    top: 400,
    left: 250,
    alignItems: 'center',
  },
  markerLabel: { fontSize: 12, color: '#333', marginTop: 4 },
  pathSegment: {
    position: 'absolute',
    top: 190,
    left: 120,
    width: 20,
    height: 5,
    backgroundColor: '#FFA500',
    borderRadius: 2,
  },
  bottomPanel: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  driverImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  statusText: { fontSize: 18, color: '#FF5733', marginBottom: 5 },
  addressText: { fontSize: 16, color: '#888', textAlign: 'center' },
  orderReceivedButton: {
    marginTop: 15,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  orderReceivedText: { color: '#fff', fontSize: 16 },
});

export default OrderTrackingScreen;
