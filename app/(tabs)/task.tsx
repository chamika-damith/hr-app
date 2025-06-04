import { router } from 'expo-router';
import { Calendar, ChevronDown, Filter, Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    name: 'Travel Web Site',
    priority: 'High',
    status: 'Done',
    startDate: '5/8/2025',
    endDate: '5/14/2025',
    deliverable: 'File',
    notes: 'Completed ahead of schedule',
    assignedTo: 'IT Head',
    description: 'Design and develop a responsive travel booking website with user authentication and payment integration.'
  },
  {
    id: 2,
    name: 'Backend With Hr and Payroll Employee Part',
    priority: 'Medium',
    status: 'Done',
    startDate: '5/15/2025',
    endDate: '5/23/2025',
    deliverable: 'File',
    notes: 'API documentation completed',
    assignedTo: 'IT Head',
    description: 'Implement backend services for HR and Payroll modules with employee management functionality.'
  },
  {
    id: 3,
    name: 'Payroll Mobile App',
    priority: 'High',
    status: 'In progress',
    startDate: '5/26/2025',
    endDate: 'N/A',
    deliverable: 'https://www.figma.com/design',
    notes: 'UI design in review',
    assignedTo: 'IT Head',
    description: 'Develop a mobile application for payroll management with features for time tracking, leave management, and salary calculations.'
  },
  {
    id: 4,
    name: 'Employee Onboarding System',
    priority: 'Medium',
    status: 'Not started',
    startDate: '6/1/2025',
    endDate: '6/15/2025',
    deliverable: 'Document',
    notes: 'Requirements gathering in progress',
    assignedTo: 'HR Manager',
    description: 'Create a comprehensive onboarding system for new employees with document management and training modules.'
  },
  {
    id: 5,
    name: 'Performance Review Dashboard',
    priority: 'Low',
    status: 'Not started',
    startDate: '6/10/2025',
    endDate: '6/25/2025',
    deliverable: 'Dashboard',
    notes: 'Waiting for design approval',
    assignedTo: 'IT Head',
    description: 'Build an interactive dashboard for performance reviews with analytics and reporting features.'
  },
];

export default function AddScreen() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [navigationLocked, setNavigationLocked] = useState(false);

  // Filter tasks based on search query and filters
  useEffect(() => {
    let filteredTasks = initialTasks;

    // Apply search filter
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }

    setTasks(filteredTasks);
  }, [searchQuery, statusFilter, priorityFilter]);

  const handleTaskPress = (taskId) => {
    if (navigationLocked) return;
    setNavigationLocked(true);
    router.push(`/TaskDetailsScreen?id=${taskId}`);
    setTimeout(() => setNavigationLocked(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return '#89AC46';
      case 'In progress':
        return '#F5A623';
      default:
        return Colors.textSecondary;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return Colors.error;
      case 'Medium':
        return '#F5A623';
      case 'Low':
        return Colors.success;
      default:
        return Colors.textSecondary;
    }
  };

  // Function to get colored bar color based on status
  const getColoredBarColor = (status) => {
    switch (status) {
      case 'Done':
        return '#89AC46'; // Green for completed
      case 'In progress':
        return '#F5A623'; // Orange for in progress
      case 'Not started':
        return '#FF4757'; // Red for not started
      default:
        return '#666666'; // Gray as default
    }
  };

  const renderTaskItem = ({ item }) => {
    const handlePress = () => {
      if (navigationLocked) return;
      setNavigationLocked(true);
      router.push(`/TaskDetailsScreen?id=${item.id}`);
      setTimeout(() => setNavigationLocked(false), 1000);
    };

    return (
        <TouchableOpacity
            style={styles.taskItem}
            onPress={handlePress}
        >
          <View style={[styles.coloredBar, { backgroundColor: getColoredBarColor(item.status) }]} />
          <View style={styles.contentWrapper}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskName}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.taskDetails}>
              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>Priority</Text>
                <Text style={[styles.taskDetailValue, { color: getPriorityColor(item.priority) }]}>{item.priority}</Text>
              </View>

              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>Start</Text>
                <Text style={styles.taskDetailValue}>{item.startDate}</Text>
              </View>

              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>End</Text>
                <Text style={styles.taskDetailValue}>{item.endDate}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Tasks</Text>
        </View>
        <View style={styles.tabContainer}>

        </View>
        <View style={styles.tasksContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={18} color={Colors.textSecondary} />
              <TextInput
                  style={styles.searchInput}
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View style={styles.filtersContainer}>
            <View style={styles.filterDropdown}>
              <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => {
                    setShowStatusDropdown(!showStatusDropdown);
                    setShowPriorityDropdown(false);
                  }}
              >
                <Text style={styles.filterButtonText}>Status: {statusFilter}</Text>
                <ChevronDown size={16} color={Colors.textSecondary} />
              </TouchableOpacity>

              {showStatusDropdown && (
                  <View style={styles.dropdownMenu}>
                    {['All', 'Done', 'In progress', 'Not started'].map((status) => (
                        <TouchableOpacity
                            key={status}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setStatusFilter(status);
                              setShowStatusDropdown(false);
                            }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            statusFilter === status && styles.dropdownItemTextSelected
                          ]}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                    ))}
                  </View>
              )}
            </View>

            <View style={styles.filterDropdown}>
              <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => {
                    setShowPriorityDropdown(!showPriorityDropdown);
                    setShowStatusDropdown(false);
                  }}
              >
                <Text style={styles.filterButtonText}>Priority: {priorityFilter}</Text>
                <ChevronDown size={16} color={Colors.textSecondary} />
              </TouchableOpacity>

              {showPriorityDropdown && (
                  <View style={styles.dropdownMenu}>
                    {['All', 'High', 'Medium', 'Low'].map((priority) => (
                        <TouchableOpacity
                            key={priority}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setPriorityFilter(priority);
                              setShowPriorityDropdown(false);
                            }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            priorityFilter === priority && styles.dropdownItemTextSelected
                          ]}>
                            {priority}
                          </Text>
                        </TouchableOpacity>
                    ))}
                  </View>
              )}
            </View>
          </View>

          <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.taskList}
              showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tasksContainer: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterDropdown: {
    position: 'relative',
    marginRight: 12,
    zIndex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButtonText: {
    fontSize: 15,
    color: Colors.text,
    marginRight: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.text,
  },
  dropdownItemTextSelected: {
    color: Colors.primary,
    fontWeight: '500',
  },
  taskList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 0,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDetail: {
    alignItems: 'center',
  },
  taskDetailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  taskDetailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  holidayList: {
    paddingHorizontal: 20,
  },
  coloredBar: {
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  contentWrapper: {
    flex: 1,
    padding: 16
  },
  dateSection: {
    marginBottom: 12
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2
  },
  dateRange: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600'
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  detailColumn: {
    flex: 1,
    marginRight: 8
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3
  },
  detailValue: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600'
  },
});