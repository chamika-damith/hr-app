import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                    <Text style={styles.sectionText}>
                        We collect personal information that you provide directly to us, including but not limited to your name, contact information, employment details, and other information necessary for HR management purposes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                    <Text style={styles.sectionText}>
                        Your information is used for:
                    </Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bulletPoint}>• Managing employee records</Text>
                        <Text style={styles.bulletPoint}>• Processing payroll and benefits</Text>
                        <Text style={styles.bulletPoint}>• Communication regarding work-related matters</Text>
                        <Text style={styles.bulletPoint}>• Compliance with legal obligations</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Data Security</Text>
                    <Text style={styles.sectionText}>
                        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Data Sharing</Text>
                    <Text style={styles.sectionText}>
                        We may share your information with third parties only when necessary for business operations, such as payroll processing, benefits administration, or as required by law. We ensure all third parties maintain appropriate security measures.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Your Rights</Text>
                    <Text style={styles.sectionText}>
                        You have the right to:
                    </Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bulletPoint}>• Access your personal information</Text>
                        <Text style={styles.bulletPoint}>• Request corrections to your data</Text>
                        <Text style={styles.bulletPoint}>• Request deletion of your data</Text>
                        <Text style={styles.bulletPoint}>• Object to processing of your data</Text>
                    </View>
                </View>

                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>6. Contact Us</Text>
                    <Text style={styles.sectionText}>
                        If you have any questions about this Privacy Policy or our data practices, please contact our HR department or data protection officer.
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
    bulletPoints: {
        marginTop: 8,
        paddingLeft: 8,
    },
    bulletPoint: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666666',
        marginBottom: 4,
    },
}); 