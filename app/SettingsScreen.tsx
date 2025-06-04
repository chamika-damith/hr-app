import { router } from 'expo-router';
import { ChevronRight, Lock, Settings as SettingsIcon } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from "react";

export default function SettingsScreen() {
    const [navigationLocked, setNavigationLocked] = useState(false);

    const navigateSafe = (path) => {
        if (navigationLocked) return;
        setNavigationLocked(true);
        router.push(path);
        setTimeout(() => setNavigationLocked(false), 1000);
    };

    const menuItems = [
        {
            icon: <Lock size={20} color="#333333" />,
            title: 'Change Password',
            onPress: () => navigateSafe('/ChangePasswordScreen')
        },
        {
            icon: <SettingsIcon size={20} color="#333333" />,
            title: 'Common Settings',
            onPress: () => navigateSafe('/CommonSettingsScreen')
        }
    ];

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.content}>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    content: {
        flex: 1,
    },
    menuContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
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
        fontSize: 16,
        color: '#333333',
        marginLeft: 16,
    },
}); 