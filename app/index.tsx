import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { enableScreens } from 'react-native-screens';


export default function SplashScreen() {
  enableScreens();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return <Redirect href={isLoggedIn ? '/(tabs)' : '/LoginScreen'} />;
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        style={styles.content}
      >
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn.bitrix24.com/b15879507/landing/690/6908c14563aa1bbdc9fac128ceb31a60/WeChat_Image_20230111114442_1x.png',
          }}
          contentFit="contain"
        />
        <Text style={styles.title}>HR Attendee</Text>
        <Text style={styles.subtitle}>Your HR Management Solution</Text>
        <ActivityIndicator 
          style={styles.loader} 
          size={Platform.OS === 'ios' ? 'large' : 50} 
          color="#89AC46" 
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? '100%' : undefined,
    maxWidth: 500,
    padding: 20,
  },
  logo: {
    width: Platform.OS === 'web' ? '40%' : 150,
    aspectRatio: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#89AC46',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
}); 