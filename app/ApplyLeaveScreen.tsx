import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const leaveTypes = [
  'Medical Leave',
  'Vacation Leave',
  'Personal Leave',
  'Study Leave',
  'Other'
];

export default function ApplyLeaveScreen() {
  const [title, setTitle] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApplyLeave = () => {
    // Handle leave application submission
    console.log({
      title,
      leaveType,
      contactNumber,
      startDate,
      endDate,
      reason
    });
    setShowSuccessModal(true);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    router.back();
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <View>
              {/* Title Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Sick Leave"
                    placeholderTextColor="#999"
                />
              </View>
            </View>


            {/* Leave Type Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Leave Type</Text>
              <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowLeaveTypeDropdown(!showLeaveTypeDropdown)}
              >
                <Text style={leaveType ? styles.inputText : styles.placeholder}>
                  {leaveType || 'Select Leave Type'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
              {showLeaveTypeDropdown && (
                  <View style={styles.dropdown}>
                    {leaveTypes.map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setLeaveType(type);
                              setShowLeaveTypeDropdown(false);
                            }}
                        >
                          <Text style={styles.dropdownText}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                  </View>
              )}
            </View>

            {/* Contact Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                  style={styles.input}
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  placeholder="(603) 555-0123"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
              />
            </View>

            {/* Start Date Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.inputText}>{formatDate(startDate)}</Text>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </TouchableOpacity>
              {showStartDatePicker && (
                  <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowStartDatePicker(false);
                        if (selectedDate) {
                          setStartDate(selectedDate);
                        }
                      }}
                  />
              )}
            </View>

            {/* End Date Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.inputText}>{formatDate(endDate)}</Text>
                <Ionicons name="calendar-outline" size={20} color="#666" />
              </TouchableOpacity>
              {showEndDatePicker && (
                  <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowEndDatePicker(false);
                        if (selectedDate) {
                          setEndDate(selectedDate);
                        }
                      }}
                  />
              )}
            </View>

            {/* Reason Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Reason for Leave</Text>
              <TextInput
                  style={[styles.input, styles.textArea]}
                  value={reason}
                  onChangeText={setReason}
                  placeholder="I need to take a medical leave."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyLeave}
            >
              <Text style={styles.applyButtonText}>Apply Leave</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
            visible={showSuccessModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Modal Handle */}
              <View style={styles.modalHandle} />

              <View style={styles.modalContent}>
                <View style={styles.successIconContainer}>
                  <Ionicons name="checkmark" size={40} color="#fff" />
                </View>
                <Text style={styles.modalTitle}>Leave Applied Successfully</Text>
                <Text style={styles.modalSubtitle}>Your Leave has been applied successfully</Text>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleDone}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#89AC46',
    borderRadius: 12,
  },
  label: {
    fontSize: 13,
    color: '#89AC46',
    marginLeft: 16,
    marginBottom: 4,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  placeholder: {
    fontSize: 15,
    color: '#999',
  },
  textArea: {
    height: 100,
    paddingTop: 8,
    textAlignVertical: 'top',
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#89AC46',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#89AC46',
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#89AC46',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#89AC46',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  successIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#89AC46',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: '#89AC46',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});