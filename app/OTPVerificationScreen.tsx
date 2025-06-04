import forgotPasswordImage from "@/assets/images/otp-image.svg";
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (value: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Auto-navigate to next input
    if (value && idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every(digit => digit !== '')) {
      handleVerify();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(180);
      setCanResend(false);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/EnterNewPasswordScreen');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>We have sent the code verification to your mobile number.</Text>
        <Image
          style={styles.logo}
          source={forgotPasswordImage}
        />
        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputRefs.current[idx] = ref;
              }}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleChange(value, idx)}
              onKeyPress={e => handleKeyPress(e, idx)}
              editable={!isLoading}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResend}
          disabled={!canResend || isLoading}
        >
          <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
            {canResend ? 'Resend Code' : `${formatTime(timeLeft)} Resend it`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            (!otp.every(digit => digit !== '') || isLoading) && styles.verifyButtonDisabled
          ]}
          onPress={handleVerify}
          disabled={!otp.every(digit => digit !== '') || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 70,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#fafbfc',
    marginHorizontal: 4,
  },
  verifyButton: {
    backgroundColor: '#89AC46',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#3498ff',
    fontSize: 13,
  },
  resendTextDisabled: {
    color: '#999',
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
