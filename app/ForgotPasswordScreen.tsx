import { Image } from "expo-image";
import {router, useRouter} from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import forgotPasswordImage from '../assets/images/forgot-password.svg';

export default function ForgotPasswordScreen() {
  const [navigationLocked, setNavigationLocked] = useState(false);

  const navigateSafe = (path) => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    router.push(path);
    setTimeout(() => setNavigationLocked(false), 1000);
  };

  const router = useRouter();
  const [selected, setSelected] = useState('email');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password 🤔</Text>
      <Text style={styles.subtitle}>Select which contact details should we use to reset your password.</Text>
      <View>
        <Image
          style={styles.logo}
          source={forgotPasswordImage}
        />
      </View>
      <TouchableOpacity style={[styles.option, selected === 'email' && styles.selected]} onPress={() => setSelected('email')}>
        <Text style={styles.optionText}>Email</Text>
        <Text style={styles.optionSub}>michael.mitc@example.com</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, selected === 'phone' && styles.selected]} onPress={() => setSelected('phone')}>
        <Text style={styles.optionText}>Phone Number</Text>
        <Text style={styles.optionSub}>(+91) 654-9811</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={() => navigateSafe('OTPVerificationScreen')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  option: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fafbfc',
  },
  selected: {
    borderColor: '#89AC46',
    backgroundColor: '#eaf4ff',
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  optionSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#89AC46',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
});
