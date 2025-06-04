import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';


export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('LoginScreen');
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
      <View style={styles.container}>
          <Image
              style={styles.logo}
              source={{
                  uri: 'https://cdn.bitrix24.com/b15879507/landing/690/6908c14563aa1bbdc9fac128ceb31a60/WeChat_Image_20230111114442_1x.png',
              }}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89AC46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
      resizeMode: 'contain',

  },
});
