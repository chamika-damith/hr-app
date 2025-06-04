import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Lock, Bell, Info, Settings, UserCheck, Clock, CheckCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for notifications
const notifications = [
    {
        id: 1,
        type: 'profile',
        title: 'Profile Updated',
        message: 'You successfully updated your profile picture.',
        time: 'Just now',
        read: false,
        priority: 'normal'
    },
    {
        id: 2,
        type: 'security',
        title: 'Password Changed',
        message: "Your password has been successfully updated for security.",
        time: '2 hours ago',
        read: false,
        priority: 'high'
    },
    {
        id: 3,
        type: 'leave',
        title: 'Leave Request - Mark Allen',
        message: 'New leave application requires your approval.',
        time: '1 day ago',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        read: true,
        priority: 'normal'
    },
    {
        id: 4,
        type: 'system',
        title: 'App Update Available',
        message: 'Version 2.1.0 is available with new features and improvements.',
        time: '2 days ago',
        read: true,
        priority: 'low'
    },
    {
        id: 5,
        type: 'attendance',
        title: 'Attendance Reminder',
        message: 'Remember to check in when you arrive at the office.',
        time: '3 days ago',
        read: true,
        priority: 'normal'
    },
    {
        id: 6,
        type: 'approval',
        title: 'Request Approved',
        message: "Your expense claim has been approved and will be processed soon.",
        time: '1 week ago',
        read: true,
        priority: 'normal'
    },
    {
        id: 7,
        type: 'system',
        title: 'App Update Available',
        message: 'Version 2.1.0 is available with new features and improvements.',
        time: '2 days ago',
        read: true,
        priority: 'low'
    },
    {
        id: 8,
        type: 'attendance',
        title: 'Attendance Reminder',
        message: 'Remember to check in when you arrive at the office.',
        time: '3 days ago',
        read: true,
        priority: 'normal'
    },
    {
        id: 9,
        type: 'approval',
        title: 'Request Approved',
        message: "Your expense claim has been approved and will be processed soon.",
        time: '1 week ago',
        read: true,
        priority: 'normal'
    },
];

export default function NotificationsScreen() {
    const getNotificationIcon = (type: string) => {
        const iconProps = { size: 20, color: '#FFFFFF' };

        switch (type) {
            case 'profile':
                return <User {...iconProps} />;
            case 'security':
                return <Lock {...iconProps} />;
            case 'system':
                return <Settings {...iconProps} />;
            case 'leave':
                return <UserCheck {...iconProps} />;
            case 'attendance':
                return <Clock {...iconProps} />;
            case 'approval':
                return <CheckCircle {...iconProps} />;
            default:
                return <Bell {...iconProps} />;
        }
    };

    const getIconBackgroundColor = (type: string) => {
        switch (type) {
            case 'profile':
                return '#89AC46';
            case 'security':
                return '#EF4444';
            case 'system':
                return '#8B5CF6';
            case 'leave':
                return '#F59E0B';
            case 'attendance':
                return '#10B981';
            case 'approval':
                return '#22C55E';
            default:
                return '#6B7280';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#89AC46';
            case 'normal':
                return '#6366F1';
            case 'low':
                return '#6B7280';
            default:
                return '#6B7280';
        }
    };
    notifications.filter(n => !n.read).length;
    return (
        <SafeAreaView style={styles.container}>


            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {notifications.map((notification, index) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={[
                            styles.notificationCard,
                            !notification.read && styles.unreadCard
                        ]}
                        activeOpacity={0.7}
                    >
                        {/* Notification Icon/Avatar */}
                        <View style={styles.iconContainer}>
                            {notification.type === 'leave' && notification.avatar ? (
                                <View style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: notification.avatar }}
                                        style={styles.avatar}
                                    />
                                    <View style={[
                                        styles.avatarBadge,
                                        { backgroundColor: getIconBackgroundColor('leave') }
                                    ]}>
                                        {getNotificationIcon('leave')}
                                    </View>
                                </View>
                            ) : (
                                <View style={[
                                    styles.iconBackground,
                                    { backgroundColor: getIconBackgroundColor(notification.type) }
                                ]}>
                                    {getNotificationIcon(notification.type)}
                                </View>
                            )}
                        </View>

                        {/* Notification Content */}
                        <View style={styles.contentContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.notificationTitle} numberOfLines={1}>
                                    {notification.title}
                                </Text>
                                {!notification.read && (
                                    <View style={[
                                        styles.priorityDot,
                                        { backgroundColor: getPriorityColor(notification.priority || 'normal') }
                                    ]} />
                                )}
                            </View>

                            <Text style={styles.notificationMessage} numberOfLines={2}>
                                {notification.message}
                            </Text>

                            <View style={styles.timeRow}>
                                <Clock size={12} color="#9CA3AF" />
                                <Text style={styles.notificationTime}>{notification.time}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Empty State */}
                {notifications.length === 0 && (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Bell size={48} color="#D1D5DB" />
                        </View>
                        <Text style={styles.emptyTitle}>No notifications</Text>
                        <Text style={styles.emptyMessage}>
                            You are all caught up! Check back later for updates.
                        </Text>
                    </View>
                )}
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.5,
    },
    unreadBadge: {
        backgroundColor: '#EF4444',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    markAllButton: {
        alignSelf: 'flex-end',
    },
    markAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6366F1',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    notificationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#89AC46',
        shadowColor: '#89AC46',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconBackground: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatarBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    priorityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 8,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationTime: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
        marginLeft: 4,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
});