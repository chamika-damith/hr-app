import { useLocalSearchParams, useNavigation } from 'expo-router';
import { AlertCircle, Calendar, CheckCircle2, ChevronLeft, Clock, FileText, Send, User } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './constants/Colors';

// Mock data for tasks
const tasks = [
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

// Mock data for comments
const mockComments = [
    {
        id: 1,
        taskId: 1,
        userId: 'IT Head',
        message: 'The website design looks great! Please proceed with the implementation.',
        timestamp: '2024-03-15 10:30 AM',
        replies: [

        ]
    },
    {
        id: 2,
        taskId: 1,
        userId: 'IT Head',
        message: 'Make sure to include responsive design for mobile devices.',
        timestamp: '2024-03-16 09:15 AM',
        replies: []
    }
];

export default function TaskDetailsScreen() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const taskId = parseInt(id as string);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [comments, setComments] = useState(mockComments);

    // Find the task by ID
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Task Details</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Task not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const getStatusColor = (status:any) => {
        switch (status) {
            case 'Done':
                return Colors.success;
            case 'In progress':
                return '#F5A623';
            default:
                return Colors.textSecondary;
        }
    };

    const getPriorityColor = (priority:any) => {
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

    const getStatusIcon = (status:any) => {
        switch (status) {
            case 'Done':
                return <CheckCircle2 size={20} color={Colors.success} />;
            case 'In progress':
                return <Clock size={20} color="#F5A623" />;
            default:
                return <AlertCircle size={20} color={Colors.textSecondary} />;
        }
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: comments.length + 1,
                taskId: taskId,
                userId: 'IT Head', // This should come from actual user authentication
                message: newComment,
                timestamp: new Date().toLocaleString(),
                replies: []
            };
            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    };

    const handleAddReply = (commentId: number) => {
        if (newComment.trim()) {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [...comment.replies, {
                            id: Date.now(),
                            userId: 'Employee', // This should come from actual user authentication
                            message: newComment,
                            timestamp: new Date().toLocaleString()
                        }]
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setNewComment('');
            setReplyTo(null);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.taskHeader}>
                    <Text style={styles.taskName}>{task.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) + '20' }]}>
                        {getStatusIcon(task.status)}
                        <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>{task.status}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{task.description}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                            <AlertCircle size={20} color={getPriorityColor(task.priority)} />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Priority</Text>
                            <Text style={[styles.detailValue, { color: getPriorityColor(task.priority) }]}>{task.priority}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                            <User size={20} color='#89AC46' />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Assigned To</Text>
                            <Text style={styles.detailValue}>{task.assignedTo}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                            <Calendar size={20} color='#89AC46' />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Start Date</Text>
                            <Text style={styles.detailValue}>{task.startDate}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailIconContainer}>
                            <Calendar size={20} color='#89AC46'/>
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>End Date</Text>
                            <Text style={styles.detailValue}>{task.endDate}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deliverable</Text>
                    <View style={styles.deliverableContainer}>
                        <FileText size={20} color={Colors.primary} />
                        <Text style={styles.deliverableText}>{task.deliverable}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notes</Text>
                    <Text style={styles.notesText}>{task.notes}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Comments</Text>
                    {comments
                        .filter(comment => comment.taskId === taskId)
                        .map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <View style={styles.commentHeader}>
                                    <Text style={styles.commentUser}>{comment.userId}</Text>
                                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                                </View>
                                <Text style={styles.commentText}>{comment.message}</Text>
                                
                                {/* Replies */}
                                {comment.replies.map(reply => (
                                    <View key={reply.id} style={styles.replyContainer}>
                                        <View style={styles.commentHeader}>
                                            <Text style={styles.commentUser}>{reply.userId}</Text>
                                            <Text style={styles.commentTime}>{reply.timestamp}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{reply.message}</Text>
                                    </View>
                                ))}
                                
                                <TouchableOpacity 
                                    style={styles.replyButton}
                                    onPress={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                >
                                    <Text style={styles.replyButtonText}>Reply</Text>
                                </TouchableOpacity>

                                {replyTo === comment.id && (
                                    <View style={styles.commentInputContainer}>
                                        <TextInput
                                            style={styles.commentInput}
                                            value={newComment}
                                            onChangeText={setNewComment}
                                            placeholder="Write a reply..."
                                            multiline
                                        />
                                        <TouchableOpacity 
                                            style={styles.sendButton}
                                            onPress={() => handleAddReply(comment.id)}
                                        >
                                            <Send size={20} color={Colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                </View>
            </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
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
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    taskHeader: {
        marginBottom: 24,
    },
    taskName: {
        fontSize: 25,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 6,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.divider,
        marginVertical: 20,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 16,
    },
    detailIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#DDF6D2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    deliverableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryLight,
        borderRadius: 8,
        padding: 12,
    },
    deliverableText: {
        fontSize: 15,
        color: Colors.primary,
        marginLeft: 12,
        flex: 1,
    },
    notesText: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 22,
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.divider,
    },
    editButton: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
    },
    completeButton: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    completeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: Colors.error,
    },
    commentContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    commentUser: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    commentTime: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    commentText: {
        fontSize: 15,
        color: Colors.text,
        marginBottom: 8,
    },
    replyContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginLeft: 24,
        marginTop: 8,
        marginBottom: 8,
    },
    replyButton: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    replyButtonText: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: '500',
    },
    newCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.divider,
        backgroundColor: '#FFFFFF',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        minHeight: 40,
        borderWidth: 1,
        borderColor: Colors.divider,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});