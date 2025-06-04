import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock, LogIn, LogOut, Calendar, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for attendance
const attendanceData = [
    {
        date: 'April 10, 2023',
        checkIn: '10:12 am',
        checkOut: '07:00 pm',
        workingHours: '8h 48m',
        status: 'Present'
    },
    {
        date: 'April 11, 2023',
        checkIn: '10:00 am',
        checkOut: '07:10 pm',
        workingHours: '9h 10m',
        status: 'Present'
    },
    {
        date: 'April 12, 2023',
        checkIn: '09:30 am',
        checkOut: '07:00 pm',
        workingHours: '9h 30m',
        status: 'Present'
    },
    {
        date: 'April 13, 2023',
        checkIn: '09:12 am',
        checkOut: '06:45 pm',
        workingHours: '9h 33m',
        status: 'Present'
    },
    {
        date: 'April 14, 2023',
        checkIn: '10:00 am',
        checkOut: '07:00 pm',
        workingHours: '9h 00m',
        status: 'Present'
    },
    {
        date: 'April 15, 2023',
        checkIn: null,
        checkOut: null,
        workingHours: '0h 00m',
        status: 'Absent'
    },
];

export default function AttendanceDetailsScreen() {
    const navigation = useNavigation();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'present':
                return {
                    bg: '#F0FAEC',
                    border: '#acc2a3',
                    text: '#89AC46'
                };
            case 'absent':
                return {
                    bg: 'rgba(239, 68, 68, 0.1)',
                    border: 'rgba(239, 68, 68, 0.3)',
                    text: '#DC2626'
                };
            case 'late':
                return {
                    bg: 'rgba(251, 191, 36, 0.1)',
                    border: 'rgba(251, 191, 36, 0.3)',
                    text: '#D97706'
                };
            default:
                return {
                    bg: 'rgba(107, 114, 128, 0.1)',
                    border: 'rgba(107, 114, 128, 0.3)',
                    text: '#6B7280'
                };
        }
    };

    const totalHours = attendanceData.reduce((total, item) => {
        if (item.workingHours && item.workingHours !== '0h 00m') {
            const hours = parseFloat(item.workingHours.split('h')[0]);
            const minutes = parseFloat(item.workingHours.split('h')[1].split('m')[0]) / 60;
            return total + hours + minutes;
        }
        return total;
    }, 0);

    return (
        <SafeAreaView style={styles.container}>


            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                    <View style={styles.summaryIconContainer}>
                        <TrendingUp size={24} color="#89AC46" />
                    </View>
                    <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryTitle}>This Week</Text>
                        <Text style={styles.summarySubtitle}>
                            {totalHours.toFixed(1)}h total • {attendanceData.filter(item => item.status === 'Present').length} days present
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {attendanceData.map((item, index) => {
                    const statusColor = getStatusColor(item.status);
                    const isAbsent = item.status === 'Absent';

                    return (
                        <View key={index} style={styles.attendanceCard}>
                            {/* Date Header */}
                            <View style={styles.dateHeader}>
                                <View style={styles.dateIconContainer}>
                                    <Calendar size={18} color="#89AC46" />
                                </View>
                                <Text style={styles.dateText}>{item.date}</Text>
                                <View style={[
                                    styles.statusBadge,
                                    {
                                        backgroundColor: statusColor.bg,
                                        borderColor: statusColor.border
                                    }
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        { color: statusColor.text }
                                    ]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>

                            {/* Time Details */}
                            {!isAbsent ? (
                                <View style={styles.timeDetailsContainer}>
                                    <View style={styles.timeRow}>
                                        <View style={styles.timeItem}>
                                            <View style={styles.timeIconContainer}>
                                                <LogIn size={16} color="#22C55E" />
                                            </View>
                                            <View>
                                                <Text style={styles.timeLabel}>Check In</Text>
                                                <Text style={styles.timeValue}>{item.checkIn}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.timeItem}>
                                            <View style={styles.timeIconContainer}>
                                                <LogOut size={16} color="#EF4444" />
                                            </View>
                                            <View>
                                                <Text style={styles.timeLabel}>Check Out</Text>
                                                <Text style={styles.timeValue}>{item.checkOut}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.workingHoursContainer}>
                                        <Clock size={16} color="#89AC46" />
                                        <Text style={styles.workingHoursText}>
                                            Total: {item.workingHours}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.absentContainer}>
                                    <Text style={styles.absentText}>No attendance recorded</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.5,
    },
    placeholder: {
        width: 44,
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 6,
        borderRadius: 14,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(34, 197, 94, 0.1)\'',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    summaryTextContainer: {
        flex: 1,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
        letterSpacing: -0.3,
    },
    summarySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        marginTop: 8,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 8,
    },
    attendanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    timeDetailsContainer: {
        gap: 16,
    },
    timeRow: {
        flexDirection: 'row',
        gap: 16,
    },
    timeItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        padding: 16,
    },
    timeIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    timeLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    timeValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    workingHoursContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0FAEC',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#acc2a3',
    },
    workingHoursText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#89AC46',
        marginLeft: 8,
    },
    absentContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    absentText: {
        fontSize: 14,
        color: '#DC2626',
        fontStyle: 'italic',
    },
});