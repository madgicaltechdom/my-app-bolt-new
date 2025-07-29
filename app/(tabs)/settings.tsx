import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Shield, Bell, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  const handlePasswordReset = () => {
    router.push('/auth/reset-password');
  };

  const settingsOptions = [
    {
      icon: Shield,
      title: 'Security',
      subtitle: 'Change password, two-factor auth',
      onPress: handlePasswordReset,
      testID: 'security-option',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Push notifications, email alerts',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
      testID: 'notifications-option',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'FAQs, contact support',
      onPress: () => Alert.alert('Help', 'Contact us at support@yourapp.com'),
      testID: 'help-option',
    },
  ];

  return (
    <ScrollView style={styles.container} testID="settings-scrollview">
      <View style={styles.header} testID="settings-header">
        <Text style={styles.headerTitle} testID="settings-title">Settings</Text>
      </View>

      <View style={styles.section} testID="general-section">
        <Text style={styles.sectionTitle} testID="general-section-title">General</Text>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={option.onPress}
            testID={option.testID}
          >
            <View style={styles.settingIcon} testID={`${option.testID}-icon`}>
              <option.icon size={20} color="#6B7280" testID={`${option.testID}-icon-svg`} />
            </View>
            <View style={styles.settingContent} testID={`${option.testID}-content`}>
              <Text style={styles.settingTitle} testID={`${option.testID}-title`}>{option.title}</Text>
              <Text style={styles.settingSubtitle} testID={`${option.testID}-subtitle`}>{option.subtitle}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" testID={`${option.testID}-chevron`} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section} testID="account-section">
        <Text style={styles.sectionTitle} testID="account-section-title">Account</Text>
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={handleSignOut}
          testID="sign-out-button"
        >
          <LogOut size={20} color="#EF4444" testID="sign-out-icon" />
          <Text style={styles.signOutText} testID="sign-out-text">Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer} testID="footer">
        <Text style={styles.versionText} testID="version-text">Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginLeft: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});