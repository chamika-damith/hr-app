import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from '../src/store';

type AttendanceDetailsParams = {
  name: string;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...Ionicons.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { 
            backgroundColor: '#fff',
          },
          animation: Platform.OS === 'web' ? 'none' : 'default',
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="LoginScreen" 
            options={{ 
              headerShown: false,
              presentation: 'modal',
            }} 
          />
          <Stack.Screen 
            name="ForgotPasswordScreen" 
            options={{ 
              headerShown: true,
              headerTitle: '',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="OTPVerificationScreen" 
            options={{ 
              headerShown: true,
              headerTitle: '',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="EnterNewPasswordScreen" 
            options={{ 
              headerShown: true,
              headerTitle: '',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="ApplyLeaveScreen" 
            options={{ 
              headerShown: true,
              headerTitle: 'Apply Leave',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }} 
          />

          <Stack.Screen
            name="LeaveDetailsScreen"
            options={{
              headerShown: true,
              headerTitle: 'Leave Details',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }}
          />

          <Stack.Screen
            name="AttendanceDetailsScreen"
            options={({ route }) => ({
              headerShown: true,
              headerTitle: (route.params as AttendanceDetailsParams)?.name || '',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '600',
                color: '#333333',
              },
              presentation: 'card',
            })}
          />

          <Stack.Screen
            name="NotificationScreen"
            options={{
              headerShown: true,
              headerTitle: 'Notifications',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '600',
                color: '#333333',
              },
              presentation: 'card',
            }}
          />
            <Stack.Screen
                name="ProfileDetailsScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'My Profile',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />
            <Stack.Screen
                name="SettingsScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Settings',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />

            <Stack.Screen
                name="ChangePasswordScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Change Password',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />

            <Stack.Screen
                name="CommonSettingsScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Common Settings',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />

            <Stack.Screen
                name="TermsScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Terms & Conditions',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />

            <Stack.Screen
                name="PrivacyPolicyScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Privacy Policy',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />

            <Stack.Screen
                name="TaskDetailsScreen"
                options={{
                    headerShown: true,
                    headerTitle: 'Task Details',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333333',
                    },
                    presentation: 'card',
                }}
            />
        </Stack>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      marginTop:35,
  },
});
