import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from "expo-router";
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface LeaveCardProps {
  title: string;
  count: number;
  type: 'balance' | 'approved' | 'pending' | 'cancelled';
}

const LeaveCard = ({ title, count, type }: LeaveCardProps) => {
  const getCardStyle = () => {
    switch (type) {
      case 'balance':
        return { backgroundColor: '#EBF3FF', borderWidth: 1, borderColor: '#919ab8' };
      case 'approved':
        return { backgroundColor: '#F0FAEC', borderWidth: 1, borderColor: '#acc2a3' };
      case 'pending':
        return { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#b5a5a5' };
      case 'cancelled':
        return { backgroundColor: '#FFE5E5', borderWidth: 1, borderColor: '#bd9595' };
      default:
        return { backgroundColor: '#EBF3FF', borderWidth: 1, borderColor: '#c3cae0' };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'balance':
        return '#4A90E2';
      case 'approved':
        return '#89AC46';
      case 'pending':
        return '#666666';
      case 'cancelled':
        return '#FF4757';
      default:
        return '#4A90E2';
    }
  };

  return (
      <View style={[styles.card, getCardStyle()]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardCount, { color: getTextColor() }]}>{count}</Text>
      </View>
  );
};

interface LeaveHistoryItemProps {
  startDate: string;
  endDate: string;
  applyDays: number;
  leaveBalance: number;
  approvedBy: string;
  status: 'Approved' | 'Rejected';
  date: Date;
  navigationLocked: boolean;
  setNavigationLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveHistoryItem = ({
                            startDate,
                            endDate,
                            applyDays,
                            leaveBalance,
                            approvedBy,
                            status,
                            date,
                            navigationLocked,
                            setNavigationLocked
                          }: LeaveHistoryItemProps) => {
  const isApproved = status === 'Approved';

  const handleViewLeaveDetails = () => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    router.push({
      pathname: '/LeaveDetailsScreen',
      params: {
        startDate,
        endDate,
        applyDays: applyDays.toString(),
        leaveBalance: leaveBalance.toString(),
        approvedBy,
        status,
        date: date.toISOString()
      }
    });
    setTimeout(() => setNavigationLocked(false), 1000);
  };

  return (
      <TouchableOpacity style={styles.historyItem} onPress={handleViewLeaveDetails}>
        <View style={[styles.coloredBar, { backgroundColor: isApproved ? '#89AC46' : '#FF4757' }]} />
        <View style={styles.contentWrapper}>
          <Text style={[styles.statusText, {
            color: isApproved ? '#89AC46' : '#FF4757',
            backgroundColor: isApproved ? '#E6F4D3' : '#FFE5E9',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 4,
            alignSelf: 'flex-end',
            overflow: 'hidden'
          }]}
          >{status}</Text>

          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Date</Text>
            <Text style={styles.dateRange}>{startDate} - {endDate}</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Apply Days</Text>
              <Text style={styles.detailValue}>{applyDays} Days</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Leave Balance</Text>
              <Text style={styles.detailValue}>{leaveBalance}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Approved By</Text>
              <Text style={styles.detailValue}>{approvedBy}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );
};

type FilterType = 'all' | 'past' | 'upcoming';

export default function CalendarScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const router = useRouter();
  const [navigationLocked, setNavigationLocked] = useState(false);

  const applyLeave = () => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    router.push('/ApplyLeaveScreen');
    setTimeout(() => setNavigationLocked(false), 1000);
  };

  const leaveHistory: LeaveHistoryItemProps[] = [
    {
      startDate: "Apr 15, 2023",
      endDate: "Apr 18, 2023",
      applyDays: 3,
      leaveBalance: 16,
      approvedBy: "Martin Deo",
      status: "Rejected",
      date: new Date(2026, 3, 15),
      navigationLocked, setNavigationLocked
    },
    {
      startDate: "Mar 10, 2023",
      endDate: "Mar 12, 2023",
      applyDays: 2,
      leaveBalance: 19,
      approvedBy: "Martin Deo",
      status: "Rejected",
      date: new Date(2023, 2, 10),
      navigationLocked, setNavigationLocked
    },
    {
      startDate: "May 20, 2024",
      endDate: "May 22, 2024",
      applyDays: 3,
      leaveBalance: 15,
      approvedBy: "Martin Deo",
      status: "Approved",
      date: new Date(2024, 4, 20),
      navigationLocked, setNavigationLocked
    },
    {
      startDate: "May 20, 2026",
      endDate: "May 22, 2027",
      applyDays: 2,
      leaveBalance: 4,
      approvedBy: "Martin Deo",
      status: "Approved",
      date: new Date(2026, 7, 4),
      navigationLocked, setNavigationLocked
    }
  ];

  const getFilteredLeaves = () => {
    const today = new Date();
    switch (activeFilter) {
      case 'past':
        return leaveHistory.filter(leave => new Date(leave.date) < today);
      case 'upcoming':
        return leaveHistory.filter(leave => new Date(leave.date) >= today);
      default:
        return leaveHistory;
    }
  };

  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>All Leaves</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={applyLeave}>
                <Ionicons name="add" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardsContainer}>
              <LeaveCard title="Leave Balance" count={20} type="balance" />
              <LeaveCard title="Leave Approved" count={2} type="approved" />
              <LeaveCard title="Leave Pending" count={4} type="pending" />
              <LeaveCard title="Leave Cancelled" count={10} type="cancelled" />
            </View>

            <View style={styles.filterSection}>
              {(['all', 'past', 'upcoming'] as FilterType[]).map(filter => (
                  <TouchableOpacity
                      key={filter}
                      style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}
                      onPress={() => setActiveFilter(filter)}
                  >
                    <Text style={[styles.filterButtonText, activeFilter === filter ? { color: '#fff' } : { color: '#666' }]}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Text>
                  </TouchableOpacity>
              ))}
            </View>

            <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
              {getFilteredLeaves().map((item, index) => (
                  <LeaveHistoryItem key={index} {...item} />
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', zIndex: 1,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerButtons: { flexDirection: 'row', gap: 12 },
  iconButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center'
  },
  cardsContainer: {
    flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12, backgroundColor: '#fff'
  },
  card: {
    flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, marginBottom: 8
  },
  cardTitle: { fontSize: 20, marginBottom: 8, fontWeight: 'bold' },
  cardCount: { fontSize: 25, fontWeight: 'bold' },
  filterSection: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingVertical: 8,
    marginBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#fff'
  },
  filterButton: {
    flex: 1, minWidth: '10%', maxWidth: '45%', paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center'
  },
  activeFilter: { backgroundColor: '#89AC46' },
  filterButtonText: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  historyContainer: { flex: 1, paddingHorizontal: 16 },
  historyItem: {
    flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 12, padding: 0, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8,
    elevation: 2, overflow: 'hidden'
  },
  coloredBar: { width: 6, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  contentWrapper: { flex: 1, padding: 16 },
  dateSection: { marginBottom: 12 },
  dateLabel: { fontSize: 14, color: '#666', marginBottom: 2 },
  dateRange: { fontSize: 17, color: '#333', fontWeight: '600' },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailColumn: { flex: 1, marginRight: 8 },
  detailLabel: { fontSize: 13, color: '#666', marginBottom: 3 },
  detailValue: { fontSize: 17, color: '#333', fontWeight: '600' },
  statusText: { fontSize: 14, fontWeight: '500', textAlign: 'right' },
});
