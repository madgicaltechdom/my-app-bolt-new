import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProfileForm } from '@/components/ProfileForm';
import { CreditCard as Edit3, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  const handleUpdateProfile = async (data: any) => {
    setUpdating(true);
    try {
      await updateProfile(data);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container} testID="profile-scrollview">
      <View style={styles.header}>
        <Text style={styles.headerTitle} testID="profile-title">Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
          testID="edit-profile-button"
        >
          <Edit3 size={20} color="#3B82F6" testID="edit-icon" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard} testID="profile-card">
        <View style={styles.avatarContainer} testID="avatar-container">
          <View style={styles.avatar} testID="avatar">
            <User size={40} color="#6B7280" testID="user-icon" />
          </View>
        </View>

        {isEditing ? (
          <ProfileForm
            user={user}
            onSubmit={handleUpdateProfile}
            onCancel={() => setIsEditing(false)}
            loading={updating}
            testID="profile-form"
          />
        ) : (
          <View style={styles.profileInfo} testID="profile-info">
            <Text style={styles.nameText} testID="user-name">
              {user.user_metadata?.full_name || 'No name set'}
            </Text>
            <Text style={styles.emailText} testID="user-email">{user.email}</Text>
            
            <View style={styles.infoSection} testID="bio-section">
              <Text style={styles.sectionTitle} testID="bio-title">Bio</Text>
              <Text style={styles.bioText} testID="bio-text">
                {user.user_metadata?.bio || 'No bio added yet'}
              </Text>
            </View>

            <View style={styles.infoSection} testID="account-info-section">
              <Text style={styles.sectionTitle} testID="account-info-title">Account Info</Text>
              <View style={styles.infoRow} testID="email-verified-row">
                <Text style={styles.infoLabel} testID="email-verified-label">Email Verified:</Text>
                <Text 
                  style={[styles.infoValue, { color: user.email_confirmed_at ? '#10B981' : '#EF4444' }]}
                  testID="email-verified-value"
                >
                  {user.email_confirmed_at ? 'Yes' : 'No'}
                </Text>
              </View>
              <View style={styles.infoRow} testID="member-since-row">
                <Text style={styles.infoLabel} testID="member-since-label">Member Since:</Text>
                <Text style={styles.infoValue} testID="member-since-value">
                  {new Date(user.created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  editButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    padding: 24,
    paddingTop: 0,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
});