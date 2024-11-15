import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderTrackingScreen = ({ navigation }) => {
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [timeStamps, setTimeStamps] = useState({});

  useEffect(() => {
    const currentTime = new Date();
    const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

    setTimeStamps({
      orderPlaced: currentTime,
      preparing: addMinutes(currentTime, 5),
      pickedUp: addMinutes(currentTime, 20),
      outForDelivery: addMinutes(currentTime, 30),
      nearby: addMinutes(currentTime, 35),
      arrivingSoon: addMinutes(currentTime, 45),
    });
  }, []);

  const toggleUpdates = () => setShowAllUpdates(!showAllUpdates);

  const formatTime = (date) => {
    if (!date) return '';
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#004d40" />
      </TouchableOpacity>

      {/* Order Tracking Timeline */}
      <View style={styles.timelineContainer}>
        <Text style={styles.arrivalText}>Estimated Arrival: Within 45 mins</Text>

        <View style={styles.timeline}>
          {/* Order Placed Step */}
          <View style={styles.timelineStep}>
            <Icon name="checkmark-circle" size={24} color="#4CAF50" style={styles.icon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Order Placed</Text>
              <Text style={styles.timelineDate}>{formatTime(timeStamps.orderPlaced)}</Text>
            </View>
          </View>

          {/* Preparing Step */}
          <View style={styles.timelineStep}>
            <Icon name="checkmark-circle" size={24} color="#FFC107" style={styles.icon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Preparing your order</Text>
              <Text style={styles.timelineDate}>{formatTime(timeStamps.preparing)}</Text>
            </View>
          </View>

          {/* Order Picked Up Step */}
          <View style={styles.timelineStep}>
            <Icon name="checkmark-circle" size={24} color="#FF5722" style={styles.icon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Picked up by delivery person</Text>
              <Text style={styles.timelineDate}>{formatTime(timeStamps.pickedUp)}</Text>
            </View>
          </View>

          {/* Out for Delivery Step */}
          <View style={styles.timelineStep}>
            <Icon name="checkmark-circle" size={24} color="#4CAF50" style={styles.icon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Out for delivery</Text>
              <TouchableOpacity onPress={toggleUpdates}>
                <Text style={styles.updateLink}>See all updates</Text>
              </TouchableOpacity>
              <Text style={styles.timelineDate}>{formatTime(timeStamps.outForDelivery)}</Text>
            </View>
          </View>

          {/* Additional Updates - Only visible if showAllUpdates is true */}
          {showAllUpdates && (
            <>
              <View style={styles.timelineStep}>
                <Icon name="time-outline" size={24} color="#2196F3" style={styles.icon} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Nearby your location</Text>
                  <Text style={styles.timelineDate}>{formatTime(timeStamps.nearby)}</Text>
                </View>
              </View>
              <View style={styles.timelineStep}>
                <Icon name="ellipse-outline" size={24} color="#9E9E9E" style={styles.icon} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Arriving soon</Text>
                  <Text style={styles.timelineDate}>Expected by {formatTime(timeStamps.arrivingSoon)}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  arrivalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  timelineContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  timeline: {
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
    paddingLeft: 20,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
    padding: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
  },
  timelineContent: {
    marginLeft: 10,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
  },
  updateLink: {
    color: '#004d40',
    textDecorationLine: 'underline',
    marginTop: 5,
    fontWeight: '500',
  },
});

export default OrderTrackingScreen;
