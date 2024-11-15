import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      
      {/* Example Notification Item */}
      <View style={styles.notificationItem}>
        <Text style={styles.notificationText}>Your order has been shipped!</Text>
        <Text style={styles.notificationDate}>2 hours ago</Text>
      </View>

      <View style={styles.notificationItem}>
        <Text style={styles.notificationText}>You have a new message from John Doe</Text>
        <Text style={styles.notificationDate}>Yesterday</Text>
      </View>
      
      {/* Add more notifications here */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default NotificationsScreen;
