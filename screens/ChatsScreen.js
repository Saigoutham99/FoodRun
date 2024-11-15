import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ChatsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chats</Text>
      
      {/* Example Chat Item */}
      <TouchableOpacity style={styles.chatItem}>
        <Text style={styles.chatTitle}>John Doe</Text>
        <Text style={styles.chatMessage}>Hey! How's it going?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.chatItem}>
        <Text style={styles.chatTitle}>Jane Smith</Text>
        <Text style={styles.chatMessage}>Can we meet tomorrow?</Text>
      </TouchableOpacity>
      
      {/* Add more chat items here */}
      
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
  chatItem: {
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
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatMessage: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
});

export default ChatsScreen;
