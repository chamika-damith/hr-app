import { RootState } from "@/src/store";
import { Redirect, router, useNavigation } from 'expo-router';
import { Bell, Calendar, Coffee, LogIn, LogOut, Pause, Play, Utensils } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from "react-redux";
import CustomSwipeButton from '../../components/ui/SwipeButton';




// Break types
const breakTypes = [
  { id: 'Break_time' as BreakTypeId, name: 'Break Time', icon: Coffee },
  { id: 'lunch' as BreakTypeId, name: 'Lunch', icon: Utensils },
];

type BreakTypeId = 'Break_time' | 'lunch' | null;

export default function HomeScreen() {



  const [navigationLocked, setNavigationLocked] = useState(false);


  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateScrollRef = useRef<ScrollView>(null);

  // Timer states
  const [workingTime, setWorkingTime] = useState<number>(0); // in seconds
  const [breakTime, setBreakTime] = useState<number>(0); // in seconds
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const [activeBreakType, setActiveBreakType] = useState<BreakTypeId>(null);
  const workingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breakTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // FIXED: Start/stop timers based on check-in and break status
  useEffect(() => {
    if (isCheckedIn) {
      if (isOnBreak) {
        stopWorkingTimer();
        startBreakTimer();
      } else {
        stopBreakTimer();
        startWorkingTimer();
      }
    } else {
      // Stop all timers when not checked in
      stopWorkingTimer();
      stopBreakTimer();
    }

    return () => {
      if (workingTimerRef.current) clearInterval(workingTimerRef.current);
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    };
  }, [isCheckedIn, isOnBreak]);

  // Format seconds to HH:MM:SS
  const formatTimeSeconds = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Start working timer
  const startWorkingTimer = () => {
    if (workingTimerRef.current) clearInterval(workingTimerRef.current);

    workingTimerRef.current = setInterval(() => {
      setWorkingTime(prev => prev + 1);
    }, 1000);
  };

  // Stop working timer
  const stopWorkingTimer = () => {
    if (workingTimerRef.current) {
      clearInterval(workingTimerRef.current);
      workingTimerRef.current = null;
    }
  };

  // Start break timer
  const startBreakTimer = () => {
    if (breakTimerRef.current) clearInterval(breakTimerRef.current);

    breakTimerRef.current = setInterval(() => {
      setBreakTime(prev => prev + 1);
    }, 1000);
  };

  // Stop break timer
  const stopBreakTimer = () => {
    if (breakTimerRef.current) {
      clearInterval(breakTimerRef.current);
      breakTimerRef.current = null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const handleCheckIn = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(new Date());
      setWorkingTime(0);
      setBreakTime(0);
      setIsOnBreak(false);
      setActiveBreakType(null);
      // Timer will start via useEffect
    } else {
      setIsCheckedIn(false);
      setCheckInTime(null);
      setIsOnBreak(false);
      setActiveBreakType(null);
      // Timers will stop via useEffect
    }
  };

  // FIXED: Improved break toggle function
  const handleBreakToggle = (breakTypeId: BreakTypeId = null) => {
    if (!isCheckedIn) return;
    if (isOnBreak) {
      setIsOnBreak(false);
      setActiveBreakType(null);
    } else if (breakTypeId) {
      setIsOnBreak(true);
      setActiveBreakType(breakTypeId);
    }
  };

  const getMonthDates = () => {
    const dates = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(new Date(year, month, d));
    }
    return dates;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Scroll to today on mount
  useEffect(() => {
    const todayIndex = new Date().getDate() - 1;
    if (dateScrollRef.current) {
      setTimeout(() => {
        dateScrollRef.current?.scrollTo({ x: todayIndex * 72, animated: true });
      }, 100);
    }
  }, []);

  const activityData = [
    {
      type: 'Check In',
      time: '10:00 am',
      date: 'April 17, 2025',
      status: 'On Time',
      icon: 'log-in'
    },
    {
      type: 'Break In',
      time: '12:30 am',
      date: 'April 17, 2025',
      status: 'On Time',
      icon: 'cafe'
    }
  ];

  const navigateToAttendanceDetails = () => {
    if (navigationLocked) return;

    setNavigationLocked(true);
    router.push({
      pathname: '/AttendanceDetailsScreen',
      params: { name: 'Michael Mirc' }
    });

    setTimeout(() => setNavigationLocked(false), 500);
  };

  const navigateToNotifications = () => {
    if (navigationLocked) return;

    setNavigationLocked(true);
    router.push('/NotificationScreen');

    setTimeout(() => setNavigationLocked(false), 500);
  };

  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return <Redirect href={isLoggedIn ? '/(tabs)' : '/LoginScreen'} />;
  }



  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <Image
                  source={{ uri: 'https://api.a0.dev/assets/image?text=professional%20headshot%20of%20michael%20man%20in%20business%20attire&aspect=1:1&seed=42' }}
                  style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Michael Mirc</Text>
                <Text style={styles.profileRole}>Lead UI/UX Designer</Text>
              </View>
            </View>
            <TouchableOpacity
                style={styles.notificationButton}
                onPress={navigateToNotifications}
            >
              <Bell size={24} color="#333" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Date Selector: scrollable, all days in month, today highlighted */}
          <View style={styles.dateSelector}>
            <ScrollView
                ref={dateScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 1 }}
            >
              {getMonthDates().map((date, index) => (
                  <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateItem,
                        selectedDate.toDateString() === date.toDateString() && styles.selectedDateItem,
                      ]}
                      onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[
                      styles.dateNumber,
                      selectedDate.toDateString() === date.toDateString() && styles.selectedDateText
                    ]}>
                      {date.getDate().toString().padStart(2, '0')}
                    </Text>
                    <Text style={[
                      styles.dayName,
                      selectedDate.toDateString() === date.toDateString() && styles.selectedDateText
                    ]}>
                      {getDayName(date)}
                    </Text>
                  </TouchableOpacity>
              ))}
            </ScrollView>
          </View>


          {/* Timer section - only show when checked in */}
          {isCheckedIn && (
              <View style={styles.timersContainer}>
                {/* Working Time Timer: always show */}
                <View style={styles.timerCard}>
                  <View style={styles.timerHeader}>
                    <Text style={styles.timerTitle}>Working Time</Text>
                    <View style={styles.timerIconContainer}>
                      {!isOnBreak && isCheckedIn ? (
                        <Play size={16} color="#89AC46" />
                      ) : (
                        <Pause size={16} color="#666" />
                      )}
                    </View>
                  </View>
                  <Text style={styles.timerValueWork}>
                    {isCheckedIn ? formatTimeSeconds(workingTime) : '00:00:00'}
                  </Text>
                </View>

                {/* Break Time Timer: only show during a break */}
                {isCheckedIn && isOnBreak && (
                  <View style={styles.timerCard}>
                    <View style={styles.timerHeader}>
                      <Text style={styles.timerTitle}>Break Time</Text>
                      <View style={styles.timerIconContainer}>
                        <Play size={16} color="#89AC46" />
                      </View>
                    </View>
                    <Text style={styles.timerValueBreak}>{formatTimeSeconds(breakTime)}</Text>
                  </View>
                )}
              </View>
          )}

          {/* Break Type Selection: always visible, but disabled before check-in */}
          <View style={styles.breakTypeContainer}>
            {breakTypes.map((breakType) => {
              const BreakIcon = breakType.icon;
              const isActive = activeBreakType === breakType.id;
              const isDisabled = !isCheckedIn || (isOnBreak && !isActive);
              return (
                <TouchableOpacity
                  key={breakType.id}
                  style={[
                    styles.breakTypeButton,
                    isActive && styles.activeBreakTypeButton,
                    isDisabled && styles.disabledBreakTypeButton
                  ]}
                  onPress={() => {
                    if (!isCheckedIn) return;
                    if (isActive) {
                      handleBreakToggle(); // End current break
                    } else if (!isOnBreak) {
                      handleBreakToggle(breakType.id); // Start new break
                    }
                  }}
                  disabled={isDisabled}
                >
                  <BreakIcon
                    size={20}
                    color={isActive ? '#FFFFFF' : isDisabled ? '#CCC' : '#666'}
                  />
                  <Text style={[
                    styles.breakTypeText,
                    isActive && styles.activeBreakTypeText,
                    isDisabled && styles.disabledBreakTypeText
                  ]}>
                    {breakType.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Resume Button - only show when on break */}
          {isCheckedIn && isOnBreak && (
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={() => handleBreakToggle()}
            >
              <Text style={styles.resumeButtonText}>Back to Work</Text>
            </TouchableOpacity>
          )}

          {/* Today Attendance */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today Attendance</Text>
              <TouchableOpacity onPress={navigateToAttendanceDetails}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.attendanceGrid}>
              <View style={styles.attendanceCard}>
                <View style={styles.cardHeader}>
                  <LogIn size={20} color="#4A90E2" strokeWidth={2} />
                  <Text style={styles.cardTitle}>Check In</Text>
                </View>
                <Text style={styles.cardTime}>
                  {isCheckedIn && checkInTime ? formatTime(checkInTime) : '10:20 am'}
                </Text>
                <Text style={styles.cardStatus}>On Time</Text>
              </View>

              <View style={styles.attendanceCard}>
                <View style={styles.cardHeader}>
                  <LogOut size={20} color="#FF6B6B" strokeWidth={2} />
                  <Text style={styles.cardTitle}>Check Out</Text>
                </View>
                <Text style={styles.cardTime}>07:00 pm</Text>
                <Text style={styles.cardStatus}>Go Home</Text>
              </View>
            </View>

            <View style={styles.attendanceGrid}>
              <View style={styles.attendanceCard}>
                <View style={styles.cardHeader}>
                  <Coffee size={20} color="#FFA726" strokeWidth={2} />
                  <Text style={styles.cardTitle}>Break Time</Text>
                </View>
                <Text style={styles.cardTime}>{formatTimeSeconds(breakTime).substring(3, 8)} min</Text>
                <Text style={styles.cardStatus}>Avg Time 30 min</Text>
              </View>

              <View style={styles.attendanceCard}>
                <View style={styles.cardHeader}>
                  <Calendar size={20} color="#66BB6A" strokeWidth={2} />
                  <Text style={styles.cardTitle}>Total Days</Text>
                </View>
                <Text style={styles.cardTime}>28</Text>
                <Text style={styles.cardStatus}>Working Days</Text>
              </View>
            </View>
          </View>

          {/* Check In Button */}
          <View style={styles.checkInSection}>
            <CustomSwipeButton
                title={isCheckedIn ? 'Swipe to Check Out' : 'Swipe to Check In'}
                onSwipeSuccess={handleCheckIn}
                disabled={false}
                isCheckedIn={isCheckedIn}
            />
          </View>


        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 50,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRole: {
    fontSize: 16,
    color: '#666',
  },
  notificationButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dateSelector: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 18,
    borderRadius: 12,
    minWidth: 54,
  },
  selectedDateItem: {
    backgroundColor: '#89AC46',
  },
  dateNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dayName: {
    fontSize: 15,
    color: '#666',
  },
  selectedDateText: {
    color: 'white',
  },
  // Timer styles
  timersContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
    marginBottom: 10,
  },
  timerCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timerIconContainer: {
    width: 32,
    height: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerValueWork: {
    fontSize: 45,
    fontWeight: '700',
    color: 'green',
    textAlign: 'center',
  },
  timerValueBreak: {
    fontSize: 45,
    fontWeight: '700',
    color: 'red',
    textAlign: 'center',
  },
  breakTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10,
    marginBottom: 10,
  },
  breakTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  activeBreakTypeButton: {
    backgroundColor: '#89AC46',
  },
  disabledBreakTypeButton: {
    backgroundColor: '#F0F0F0',
    opacity: 0.6,
  },
  breakTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  activeBreakTypeText: {
    color: '#FFFFFF',
  },
  disabledBreakTypeText: {
    color: '#CCC',
  },
  resumeButton: {
    backgroundColor: '#DDF6D2',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal:15,
    alignItems: 'center',
    marginBottom:20,
  },
  resumeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'red',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom:10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 15,
    color: '#4A90E2',
    fontWeight: '500',
    marginBottom: 5,
  },
  attendanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
  },
  attendanceCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  cardTime: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    color: '#666',
  },
  activityList: {
    borderRadius: 12,
  },
  activityItem: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DDF6D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityTime: {
    alignItems: 'flex-end',
  },
  activityTimeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  activityStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  checkInSection: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
});