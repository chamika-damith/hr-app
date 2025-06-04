import { router } from 'expo-router';
import { Bell, Calendar, Camera, ChevronRight, FileText, Home, LogOut, Settings, Shield, User } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from "react";

export default function ProfileScreen() {
  const [navigationLocked, setNavigationLocked] = useState(false);
  const user = {
    name: 'Chamika damith',
    role: 'Full Stack Developer',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFK-toJWo5W6Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1695037566372?e=1753920000&v=beta&t=KN7VNsVsi7mHIQCz0NpOOrh5Qg3bWdpJVQGsno--J0k'
  };

  const navigateSafe = (path) => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    router.push(path);
    setTimeout(() => setNavigationLocked(false), 1000);
  };

  const menuItems = [
    {
      icon: <User size={20} color="#333333" />,
      title: 'My Profile',
      onPress: () => navigateSafe('/ProfileDetailsScreen')
    },
    {
      icon: <Settings size={20} color="#333333" />,
      title: 'Settings',
      onPress: () => navigateSafe('/SettingsScreen')
    },
    {
      icon: <FileText size={20} color="#333333" />,
      title: 'Terms & Conditions',
      onPress: () => navigateSafe('/TermsScreen')
    },
    {
      icon: <Shield size={20} color="#333333" />,
      title: 'Privacy Policy',
      onPress: () => navigateSafe('/PrivacyPolicyScreen')
    },
  ];

  const handleLogout = () => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    setTimeout(() => {
      router.replace('/LoginScreen');
      setNavigationLocked(false);
    }, 500);
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>

          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    {item.icon}
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <ChevronRight size={20} color="#666666" />
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
              <LogOut size={20} color="red" />
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#89AC46',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#89AC46',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    gap:20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 19,
    color: '#333333',
    marginLeft: 16,
  },
  logoutButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
    borderColor: '#FF3B30',
    borderWidth: 1,
    borderRadius:10,
    backgroundColor:'#fceded'
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 16,
    fontWeight:'bold'
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  bottomNavFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: -20,
  },
  bottomNavFabInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#89AC46',
    alignItems: 'center',
    justifyContent: 'center',
  },
});