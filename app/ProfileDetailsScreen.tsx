import { useNavigation } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileDetailsScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('personal');


    const employeeInfo = {
        employeeNo: 'EMP-001',
        nic: '123456789V',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        contactNo: '0771234567',
        joinedDate: '2022-01-15',
        address: {
            line1: '123 Main Street',
            line2: 'Apt 4B',
            line3: 'Colombo 07'
        },
        department: 'Engineering',
        role: 'Developer',
        roleLevel: 'Senior',
        employmentType: 'Full-time',
        salaryDetails: {
            basicSalary: '75,000.00',
            performanceAllowance: '15,000.00',
            attendanceAllowance: '5,000.00'
        },
        bankDetails: {
            bankName: 'ABC Bank',
            branchName: 'Colombo',
            accountName: 'John Doe',
            accountNumber: '1234567890',
            branchCode: '001'
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'personal' && styles.activeTabButton]}
                    onPress={() => setActiveTab('personal')}
                >
                    <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
                        Personal
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'salary' && styles.activeTabButton]}
                    onPress={() => setActiveTab('salary')}
                >
                    <Text style={[styles.tabText, activeTab === 'salary' && styles.activeTabText]}>
                        Salary Details
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'bank details' && styles.activeTabButton]}
                    onPress={() => setActiveTab('bank details')}
                >
                    <Text style={[styles.tabText, activeTab === 'bank details' && styles.activeTabText]}>
                        Bank Details
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === 'personal' && (
                    <View style={styles.personalInfo}>
                        <Text style={styles.sectionTitle}>Employee Information</Text>
                        
                        <View style={styles.infoRow}>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Employee No</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.employeeNo}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>NIC</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.nic}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>First Name</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.firstName}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Last Name</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.lastName}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.email}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Contact No</Text>
                                <TextInput 
                                    style={styles.infoInput}
                                    value={employeeInfo.contactNo}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Joined Date</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.joinedDate}
                                editable={false}
                            />
                        </View>

                        <Text style={[styles.sectionTitle, styles.addressTitle]}>Address</Text>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Address Line 1</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.address.line1}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Address Line 2</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.address.line2}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Address Line 3</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.address.line3}
                                editable={false}
                            />
                        </View>

                        <Text style={[styles.sectionTitle, styles.jobTitle]}>Job Details</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Department</Text>
                                <Pressable style={styles.dropdownInput}>
                                    <Text style={styles.dropdownText}>{employeeInfo.department}</Text>
                                    <ChevronDown size={20} color="#666666" />
                                </Pressable>
                            </View>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Role</Text>
                                <Pressable style={styles.dropdownInput}>
                                    <Text style={styles.dropdownText}>{employeeInfo.role}</Text>
                                    <ChevronDown size={20} color="#666666" />
                                </Pressable>
                            </View>
                        </View>


                        <View style={styles.infoRow}>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Role Level</Text>
                                <Pressable style={styles.dropdownInput}>
                                    <Text style={styles.dropdownText}>{employeeInfo.roleLevel}</Text>
                                    <ChevronDown size={20} color="#666666" />
                                </Pressable>
                            </View>
                            <View style={styles.infoField}>
                                <Text style={styles.infoLabel}>Employment Type</Text>
                                <Pressable style={styles.dropdownInput}>
                                    <Text style={styles.dropdownText}>{employeeInfo.employmentType}</Text>
                                    <ChevronDown size={20} color="#666666" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}

                {activeTab === 'bank details' && (
                    <View style={styles.personalInfo}>
                        <Text style={styles.sectionTitle}>Bank Details</Text>
                        
                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Bank Name</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.bankDetails.bankName}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Branch Name</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.bankDetails.branchName}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Account Name</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.bankDetails.accountName}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Account Number</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.bankDetails.accountNumber}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Branch Code</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.bankDetails.branchCode}
                                editable={false}
                            />
                        </View>
                    </View>
                )}

                {activeTab === 'salary' && (
                    <View style={styles.personalInfo}>
                        <Text style={styles.sectionTitle}>Salary Information</Text>
                        
                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Basic Salary (LKR)</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.salaryDetails.basicSalary}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Performance Allowance (LKR)</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.salaryDetails.performanceAllowance}
                                editable={false}
                            />
                        </View>

                        <View style={styles.infoField}>
                            <Text style={styles.infoLabel}>Attendance Allowance (LKR)</Text>
                            <TextInput 
                                style={styles.infoInput}
                                value={employeeInfo.salaryDetails.attendanceAllowance}
                                editable={false}
                            />
                        </View>

                        <View style={styles.totalContainer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total Salary (LKR)</Text>
                                <Text style={styles.totalAmount}>
                                    {(
                                        parseFloat(employeeInfo.salaryDetails.basicSalary.replace(/,/g, '')) +
                                        parseFloat(employeeInfo.salaryDetails.performanceAllowance.replace(/,/g, '')) +
                                        parseFloat(employeeInfo.salaryDetails.attendanceAllowance.replace(/,/g, ''))
                                    ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
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
        borderBottomColor: '#E5E5E5',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    activeTabButton: {
        backgroundColor: '#89AC46',
    },
    tabText: {
        fontSize: 14,
        color: '#666666',
    },
    activeTabText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    personalInfo: {
        backgroundColor: '#FFFFFF',
        marginBottom:20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#89AC46',
        marginBottom: 16,
    },
    addressTitle: {
        marginTop: 24,
    },
   jobTitle: {
        marginTop: 24,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoField: {
        flex: 1,
        marginRight: 12,
        marginBottom: 16,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
    },
    infoInput: {
        fontSize: 16,
        color: '#333333',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    dropdownInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },
    totalContainer: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#89AC46',
    },
});