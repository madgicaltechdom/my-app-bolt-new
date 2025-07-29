import { Tabs } from 'expo-router';
import { Chrome as Home, User, Settings } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

// Custom tab bar button component with testID
interface TabBarButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  testID: string;
  children: React.ReactNode;
}

const TabBarButton = ({ testID, children, ...props }: TabBarButtonProps) => (
  <TouchableOpacity {...props} testID={testID}>
    {children}
  </TouchableOpacity>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              testID="home-tab"
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} testID="home-tab-icon" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              testID="profile-tab"
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} testID="profile-tab-icon" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              testID="settings-tab"
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} testID="settings-tab-icon" />
          ),
        }}
      />
    </Tabs>
  );
}