import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          testID="refresh-control"
        />
      }
      testID="home-scrollview"
    >
      <View style={styles.header} testID="header-container">
        <Text style={styles.welcomeText} testID="welcome-text">Welcome back!</Text>
        <Text style={styles.nameText} testID="user-name">
          {user.user_metadata?.full_name || user.email}
        </Text>
      </View>

      <View style={styles.card} testID="quick-stats-card">
        <Text style={styles.cardTitle} testID="quick-stats-title">Quick Stats</Text>
        <View style={styles.statsContainer} testID="stats-container">
          <View style={styles.statItem} testID="profile-stat">
            <Text style={styles.statNumber} testID="profile-count">1</Text>
            <Text style={styles.statLabel} testID="profile-label">Profile</Text>
          </View>
          <View style={styles.statItem} testID="connections-stat">
            <Text style={styles.statNumber} testID="connections-count">0</Text>
            <Text style={styles.statLabel} testID="connections-label">Connections</Text>
          </View>
          <View style={styles.statItem} testID="activity-stat">
            <Text style={styles.statNumber} testID="days-active-count">5</Text>
            <Text style={styles.statLabel} testID="days-active-label">Days Active</Text>
          </View>
        </View>
      </View>

      <View style={styles.card} testID="recent-activity-card">
        <Text style={styles.cardTitle} testID="activity-title">Recent Activity</Text>
        <View style={styles.activityItem} testID="activity-item-1">
          <Text style={styles.activityText} testID="activity-text-1">Profile created successfully</Text>
        </View>
        <View style={styles.activityItem} testID="activity-item-2">
          <Text style={styles.activityText} testID="activity-text-2">Email verified</Text>
        </View>
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
    backgroundColor: '#3B82F6',
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  activityItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});