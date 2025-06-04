import { Tabs } from 'expo-router';
import { Calendar, ClipboardList, Home, User } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width: windowWidth } = Dimensions.get('window');

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'light';

    return (
        <Tabs
            screenOptions={{
                lazy: false,
                tabBarActiveTintColor: isDark ? '#89ac46' : '#89ac46',
                tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                    bottom: Platform.OS === 'web' ? 0 : 20,
                    height: 80,
                    borderRadius: 20,
                    marginHorizontal: 12,
                    backgroundColor: isDark
                        ? 'rgba(17, 24, 39, 0.6)'
                        : '#ffffff',
                    borderTopWidth: 0,
                    alignSelf: 'center',
                    width: Platform.OS === 'web' ? Math.min(windowWidth, 1200) : '95%',
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -8 },
                            shadowOpacity: 0.1,
                            shadowRadius: 16,
                        },
                        android: {
                            elevation: 8,
                        },
                        web: {
                            boxShadow: isDark
                                ? '0px -8px 32px rgba(0, 0, 0, 0.6)'
                                : '0px -8px 32px rgba(0, 0, 0, 0.1)',
                        },
                    }),
                },
                tabBarItemStyle: {
                    height: 80,
                    paddingBottom: 12,
                    paddingTop: 12,
                    flex: 1,
                    maxWidth: Platform.OS === 'web' ? 200 : undefined,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 6,
                    letterSpacing: 0.5,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
                            <Home
                                size={24}
                                color={focused ? (isDark ? '#89ac46' : '#89ac46') : (isDark ? '#9CA3AF' : '#6B7280')}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && <View style={[styles.activeIndicator, { backgroundColor: isDark ? '#89ac46' : '#89ac46' }]} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="leave"
                options={{
                    title: 'Leave',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
                            <Calendar
                                size={24}
                                color={focused ? (isDark ? '#89ac46' : '#89ac46') : (isDark ? '#9CA3AF' : '#6B7280')}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && <View style={[styles.activeIndicator, { backgroundColor: isDark ? '#89ac46' : '#89ac46' }]} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="task"
                options={{
                    title: 'Task',
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
                            <ClipboardList
                                size={24}
                                color={focused ? (isDark ? '#89ac46' : '#89ac46') : (isDark ? '#9CA3AF' : '#6B7280')}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && <View style={[styles.activeIndicator, { backgroundColor: isDark ? '#89ac46' : '#89ac46' }]} />}
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
                            <User
                                size={24}
                                color={focused ? (isDark ? '#89ac46' : '#89ac46') : (isDark ? '#9CA3AF' : '#6B7280')}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                            {focused && <View style={[styles.activeIndicator, { backgroundColor: isDark ? '#89ac46' : '#89ac46' }]} />}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
        position: 'relative',
    },
    focusedIcon: {
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
    },
    activeIndicator: {
        position: 'absolute',
        top:58,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#10B981',
                shadowOpacity: 0.3,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 10,
            },
            web: {
                boxShadow: '0px 6px 20px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease',
            },
        }),
    },
    addButtonGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        opacity: 0.3,
        ...Platform.select({
            web: {
                filter: 'blur(8px)',
            },
        }),
    },
});
