import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { total, cartItems } = route.params;

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);

  const [address, setAddress] = useState({
    country: '',
    fullName: '',
    street: '',
    apartment: '',
    zipCode: '',
    city: '',
    state: '',
    phoneNumber: '',
  });

  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Mastercard •••• 0540');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    country: '',
    zipCode: '',
    nickname: '',
  });

  const handleChange = (name, value) => {
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (Object.values(address).some((field) => field === '')) {
      Alert.alert('Error', 'Please fill in all required fields.');
    } else {
      Alert.alert('Success', 'Order Placed Successfully!');
      navigation.goBack(); // Go back to CartScreen after placing order
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* Delivery Address Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text>{address.street || 'No address provided'}</Text>
      </View>

      {/* Delivery Instructions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Instructions</Text>
          <TouchableOpacity onPress={() => setInstructionsModalVisible(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text>{deliveryInstructions || 'No instructions provided'}</Text>
      </View>

      {/* Payment Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity onPress={() => setPaymentModalVisible(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text>{selectedPaymentMethod}</Text>
      </View>

      {/* Total Section */}
      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>Back to Cart</Text>
      </TouchableOpacity>

      {/* Address Modal */}
      <Modal visible={addressModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Address</Text>

          {['country', 'fullName', 'street', 'apartment', 'zipCode', 'city', 'state', 'phoneNumber'].map(
            (field) => (
              <TextInput
                key={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                style={styles.input}
                value={address[field]}
                onChangeText={(value) => handleChange(field, value)}
              />
            )
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setAddressModalVisible(false)}
          >
            <Text style={styles.saveButtonText}>Save and Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Delivery Instructions Modal */}
      <Modal visible={instructionsModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Delivery Instructions</Text>
          <TextInput
            placeholder="Write any delivery notes..."
            multiline
            style={styles.textArea}
            value={deliveryInstructions}
            onChangeText={setDeliveryInstructions}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setInstructionsModalVisible(false)}
          >
            <Text style={styles.saveButtonText}>Save Instructions</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal visible={paymentModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Payment Options</Text>

          {/* Credit/Debit Card Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setAddCardModalVisible(true)}
          >
            <Text>Credit/Debit Card</Text>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>

          {/* Cash on Delivery Option */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => {
              setSelectedPaymentMethod('Cash on Delivery');
              setPaymentModalVisible(false); // Close modal on selection
            }}
          >
            <Text>Cash on Delivery (Cash/UPI)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setPaymentModalVisible(false)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Add Card Modal */}
      <Modal visible={addCardModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Credit or Debit Card</Text>
          <TextInput
            placeholder="Card Number (12 digits)"
            maxLength={12}
            keyboardType="number-pad"
            style={styles.input}
            value={cardDetails.cardNumber}
            onChangeText={(value) => setCardDetails({ ...cardDetails, cardNumber: value })}
          />
          <TextInput
            placeholder="Exp. Date (MM/YY)"
            style={styles.input}
            value={cardDetails.expiryDate}
            onChangeText={(value) => setCardDetails({ ...cardDetails, expiryDate: value })}
          />
          <TextInput
            placeholder="Security Code"
            style={styles.input}
            secureTextEntry
            value={cardDetails.securityCode}
            onChangeText={(value) => setCardDetails({ ...cardDetails, securityCode: value })}
          />
          
          <TextInput
            placeholder="Nickname (optional)"
            style={styles.input}
            value={cardDetails.nickname}
            onChangeText={(value) => setCardDetails({ ...cardDetails, nickname: value })}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              setAddCardModalVisible(false);
              setSelectedPaymentMethod(`Card ending in ${cardDetails.cardNumber.slice(-4)}`);
            }}
          >
            <Text style={styles.saveButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddCardModalVisible(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  editButton: { color: '#004d40' },
  summary: { marginVertical: 20 },
  totalText: { fontSize: 22, fontWeight: 'bold' },
  placeOrderButton: { backgroundColor: '#004d40', padding: 15, borderRadius: 8, alignItems: 'center' },
  placeOrderButtonText: { color: '#fff', fontSize: 18 },
  backButton: { color: '#004d40', marginTop: 10, textAlign: 'center' },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  textArea: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, height: 100 },
  saveButton: { backgroundColor: '#004d40', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18 },
  paymentOption: { padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addIcon: { color: '#004d40', fontSize: 24 },
  cancelButton: { color: '#004d40', textAlign: 'center', marginTop: 10 },
});

export default CheckoutScreen;
