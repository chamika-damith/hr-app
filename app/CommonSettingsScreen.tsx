import { Bell, ChevronRight, Globe, Moon } from 'lucide-react-native';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ் (Tamil)' }
];

export default function CommonSettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    const handleLanguageSelect = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
        setShowLanguageModal(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={styles.backButton}*/}
            {/*        onPress={() => router.back()}*/}
            {/*    >*/}
            {/*        <ChevronLeft size={24} color="#333333" />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Text style={styles.headerTitle}>Common Settings</Text>*/}
            {/*    <View style={{ width: 40 }} />*/}
            {/*</View>*/}

            <View style={styles.content}>
                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Bell size={20} color="#333333" />
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Notifications</Text>
                            <Text style={styles.settingDescription}>Enable push notifications</Text>
                        </View>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#E5E5E5', true: '#89AC46' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Moon size={20} color="#333333" />
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Dark Mode</Text>
                            <Text style={styles.settingDescription}>Switch to dark theme</Text>
                        </View>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: '#E5E5E5', true: '#89AC46' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.settingItem}
                    onPress={() => setShowLanguageModal(true)}
                >
                    <View style={styles.settingLeft}>
                        <Globe size={20} color="#333333" />
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Language</Text>
                            <Text style={styles.settingDescription}>Select your preferred language</Text>
                        </View>
                    </View>
                    <View style={styles.languageSelector}>
                        <Text style={styles.languageText}>{language}</Text>
                        <ChevronRight size={20} color="#89AC46" />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showLanguageModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <Pressable 
                    style={styles.modalOverlay}
                    onPress={() => setShowLanguageModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    language === lang.name && styles.selectedLanguage
                                ]}
                                onPress={() => handleLanguageSelect(lang.name)}
                            >
                                <Text style={[
                                    styles.languageOptionText,
                                    language === lang.name && styles.selectedLanguageText
                                ]}>
                                    {lang.name}
                                </Text>
                                {language === lang.name && (
                                    <View style={styles.checkmark} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
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
        padding: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingInfo: {
        marginLeft: 16,
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    settingDescription: {
        fontSize: 14,
        color: '#666666',
        marginTop: 4,
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    languageText: {
        fontSize: 16,
        color: '#89AC46',
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center',
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 4,
    },
    selectedLanguage: {
        backgroundColor: '#F0F9E8',
    },
    languageOptionText: {
        fontSize: 16,
        color: '#333333',
    },
    selectedLanguageText: {
        color: '#89AC46',
        fontWeight: '500',
    },
    checkmark: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#89AC46',
    },
}); 