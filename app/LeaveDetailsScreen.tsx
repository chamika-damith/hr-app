import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Check, ChevronLeft, X, Calendar, Clock, User, Shield } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface LeaveDetailsParams extends Record<string, string> {
    startDate: string;
    endDate: string;
    applyDays: string;
    leaveBalance: string;
    approvedBy: string;
    status: string;
    date: string;
}

export default function LeaveDetailsScreen() {
    const params = useLocalSearchParams<LeaveDetailsParams>();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return {
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                    textColor: '#059669'
                };
            case 'pending':
                return {
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    borderColor: 'rgba(251, 191, 36, 0.3)',
                    textColor: '#D97706'
                };
            case 'rejected':
                return {
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    textColor: '#DC2626'
                };
            default:
                return {
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    borderColor: 'rgba(107, 114, 128, 0.3)',
                    textColor: '#6B7280'
                };
        }
    };

    const statusStyle = getStatusStyle(params.status);

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={[
                        styles.statusBadge,
                        {
                            backgroundColor: statusStyle.backgroundColor,
                            borderColor: statusStyle.borderColor
                        }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: statusStyle.textColor }
                        ]}>
                            {params.status}
                        </Text>
                    </View>
                    <Text style={styles.statusSubtext}>
                        Applied on {formatDate(params.date)}
                    </Text>
                </View>

                {/* Details Card */}
                <View style={styles.detailsCard}>
                    <Text style={styles.cardTitle}>Leave Information</Text>

                    <View style={styles.detailRow}>
                        <View style={styles.detailIconContainer}>
                            <Calendar size={20} color="#6366F1" />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Duration</Text>
                            <Text style={styles.detailValue}>
                                {params.startDate} - {params.endDate}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <View style={styles.detailIconContainer}>
                            <Clock size={20} color="#10B981" />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Days Applied</Text>
                            <Text style={styles.detailValue}>{params.applyDays} Days</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <View style={styles.detailIconContainer}>
                            <Shield size={20} color="#F59E0B" />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Leave Balance</Text>
                            <Text style={styles.detailValue}>{params.leaveBalance}</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                        <View style={styles.detailIconContainer}>
                            <User size={20} color="#8B5CF6" />
                        </View>
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Approved By</Text>
                            <Text style={styles.detailValue}>{params.approvedBy}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons - Only show if status is pending */}
            {params.status?.toLowerCase() === 'pending' && (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.rejectButton}
                        activeOpacity={0.8}
                    >
                        <X size={20} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.acceptButton}
                        activeOpacity={0.8}
                    >
                        <Check size={20} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    placeholder: {
        width: 44,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    statusCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 12,
    },
    statusText: {
        fontSize: 17,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    statusSubtext: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 20,
        letterSpacing: -0.3,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
    },
    detailIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    detailValue: {
        fontSize: 17,
        color: '#111827',
        fontWeight: '600',
        lineHeight: 24,
    },
    separator: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 56,
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        gap: 12,
    },
    rejectButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EF4444',
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    acceptButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22C55E',
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});