import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                    <Text style={styles.sectionText}>
                        By accessing and using this HR Management application, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
                    <Text style={styles.sectionText}>
                        Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must notify the company immediately of any unauthorized use of their account.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Data Privacy</Text>
                    <Text style={styles.sectionText}>
                        We are committed to protecting your personal information. All data collected through the application will be handled in accordance with our Privacy Policy and applicable data protection laws.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
                    <Text style={styles.sectionText}>
                        All content, features, and functionality of the application are owned by the company and are protected by international copyright, trademark, and other intellectual property laws.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Modifications</Text>
                    <Text style={styles.sectionText}>
                        We reserve the right to modify these Terms and Conditions at any time. Users will be notified of any changes, and continued use of the application constitutes acceptance of the modified terms.
                    </Text>
                </View>

                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>6. Contact Information</Text>
                    <Text style={styles.sectionText}>
                        For any questions regarding these Terms and Conditions, please contact our HR department or system administrator.
                    </Text>
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
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    lastSection: {
        marginBottom: 0,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666666',
    },
}); 