# Full-Stack Mobile Authentication App

A complete mobile authentication and profile management application built with Expo (React Native) and Supabase.

## 📑 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📦 Installation](#-installation)
- [🚀 Running the App](#-running-the-app)
- [📱 App Structure](#-app-structure)
- [🔐 Authentication Flow](#-authentication-flow)
- [🎨 UI/UX Features](#-uiux-features)
- [🔧 Configuration](#-configuration)
- [🧪 Testing](#-testing)
  - [Running Tests](#running-tests)
  - [Maestro E2E Testing](#maestro-e2e-testing)
- [🚀 Deployment](#-deployment)
- [📈 Performance Optimizations](#-performance-optimizations)
- [🔒 Security Features](#-security-features)


## 🚀 Features

- **Authentication System**
  - Email/password registration and login
  - Email verification workflow
  - Password reset functionality
  - Secure session management

- **Profile Management**
  - View and edit user profiles
  - Update personal information (name, bio)
  - Account settings and preferences

- **Security & Performance**
  - JWT-based authentication with refresh tokens
  - Form validation with React Hook Form + Yup
  - Offline storage with AsyncStorage
  - Optimized performance (< 2s load time)

## 🛠️ Tech Stack

### Frontend
- **Expo SDK 53** - React Native development platform
- **React Navigation** - Tab and stack navigation
- **React Hook Form + Yup** - Form handling and validation
- **AsyncStorage** - Local data persistence
- **Lucide React Native** - Icon library

### Backend
- **Supabase** - Backend-as-a-Service
  - Authentication
  - PostgreSQL database
  - Real-time subscriptions
  - Email services

### Styling
- **React Native StyleSheet** - Native styling
- **Custom Design System** - Consistent UI components

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd expo-auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [Supabase](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Update the Supabase configuration

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 🚀 Running the App

### Development
```bash
npm run dev
```

This will start the Expo development server. You can then:
- Press `w` to open in web browser
- Scan QR code with Expo Go app (iOS/Android)
- Press `i` for iOS simulator
- Press `a` for Android emulator

### Building for Production
```bash
# Web build
npm run build:web

# Mobile builds (requires EAS CLI)
npx eas build --platform android
npx eas build --platform ios
```

## 📱 App Structure

```
app/
├── (tabs)/                 # Tab navigation screens
│   ├── index.tsx          # Home screen
│   ├── profile.tsx        # Profile management
│   └── settings.tsx       # App settings
├── auth/                  # Authentication screens
│   ├── login.tsx          # Login screen
│   ├── register.tsx       # Registration screen
│   └── reset-password.tsx # Password reset
└── _layout.tsx           # Root layout

components/
├── FormInput.tsx         # Reusable form input
├── LoadingButton.tsx     # Button with loading state
├── LoadingSpinner.tsx    # Loading indicator
└── ProfileForm.tsx       # Profile editing form

hooks/
└── useAuth.ts           # Authentication hook

providers/
└── AuthProvider.tsx     # Authentication context

lib/
└── supabase.ts         # Supabase client configuration
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Email Verification**: Automatic email verification (optional)
3. **Login**: Secure authentication with JWT tokens
4. **Session Management**: Automatic token refresh and persistence
5. **Password Reset**: Secure password reset via email

## 🎨 UI/UX Features

- **Material Design Principles**: Clean, intuitive interface
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Smooth loading indicators
- **Form Validation**: Real-time validation feedback
- **Error Handling**: User-friendly error messages
- **Animations**: Subtle transitions and interactions

## 🔧 Configuration

### Supabase Setup

1. Enable authentication in your Supabase project
2. Configure email templates (optional)
3. Set up Row Level Security policies
4. Enable the auth schema

### Environment Variables

Required environment variables:
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Test coverage
npm run test:coverage
```

### E2E Testing

#### Maestro E2E Testing

1. **Prerequisites**
   - Install Maestro by following the [official installation guide](https://maestro.mobile.dev/getting-started/installing-maestro)
   - Ensure you have Android Studio, Android SDK, and an Android emulator set up
   - Install ADB (Android Debug Bridge) if not already installed

2. **Building the Android App**
   ```bash
   # Install dependencies
   npm install
   
   # Prebuild the Android app (generates android/ directory)
   npx expo prebuild --platform android
   
   # Navigate to the Android directory
   cd android
   
   # Clean the project
   ./gradlew clean
   
   # Build the debug APK
   ./gradlew assembleDebug
   
   # The APK will be available at:
   # android/app/build/outputs/apk/debug/app-debug.apk
   
   # Install the APK on the connected device/emulator
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   
   # (Optional) If you have multiple devices/emulators, specify the target device
   # adb -s <device-id> install -r app/build/outputs/apk/debug/app-debug.apk
   
   # Return to the project root
   cd ..
   ```

3. **Verifying the Installation**
   - Check if the app is installed on your emulator
   - You can also verify the installation using:
     ```bash
     adb shell pm list packages | grep your.app.package.name
     ```
   - To launch the app:
     ```bash
     adb shell am start -n your.app.package.name/.MainActivity
     ```

4. **Running Tests**
   - Navigate to your project directory
   - To run all tests in the `maestro` directory:
     ```bash
     maestro test maestro/
     ```
   - To run a specific test (e.g., login test):
     ```bash
     maestro test maestro/tests/login/login_success.yaml
     ```

3. **Example Test: login_success.yaml**
   ```yaml
   # Test configuration
   appId: com.kapil.jain.boltexponativewind
   ---
   
   # Load POM
   - runScript: 
       file: ../../elements/login.js
   
   # Launch the app
   - runFlow: "_common/launch_app.yaml"
   
   # Verify login screen elements
   - runFlow: "_common/verify_login_screen.yaml"
   
   # Fill in credentials
   - runFlow: 
       file: "_common/fill_credentials.yaml"
       env:
         LOGIN_EMAIL: "kapil.jain@madgicaltechdom.com"
         LOGIN_PASSWORD: "Madgicaltechdom1"
   
   # Submit login form
   - runFlow: "_common/submit_login.yaml"
   
   # Verify login was successful by checking for home screen element
   - assertVisible: '${output.login.homeScreenElement}'
   ```

4. **Best Practices**
   - Keep test files in an `e2e` directory
   - Use descriptive test names
   - Include assertions to verify test results
   - Clean up test data after test completion

5. **Viewing Test Results**
   - Test results and recordings are available in the `maestro` directory
   - Use the Maestro Studio for visual test recording and debugging

For more information, refer to the [Maestro Documentation](https://maestro.mobile.dev/).

## 🚀 Deployment

### Web Deployment
```bash
npm run build:web
# Deploy dist/ folder to your hosting provider
```

### Mobile Deployment
Use Expo Application Services (EAS):
```bash
npx eas build --platform all
npx eas submit --platform all
```

## 📈 Performance Optimizations

- **Lazy Loading**: Screens load on demand
- **Image Optimization**: Compressed images with caching
- **Bundle Splitting**: Optimized bundle size
- **Offline Support**: Critical data cached locally
- **Fast Startup**: < 2s initial load time

## 🔒 Security Features

- **Secure Authentication**: JWT tokens with refresh rotation
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Parameterized queries
- **HTTPS Only**: All communications encrypted
- **Secure Storage**: Sensitive data encrypted locally

## 🎯 Future Enhancements

- **Social Login**: Google, Apple, Facebook authentication
- **Dark Mode**: System-aware theme switching
- **Internationalization**: Multi-language support
- **Push Notifications**: Real-time notifications
- **Biometric Auth**: Touch/Face ID support
- **Offline Sync**: Offline-first architecture

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

Built with ❤️ using Expo and React Native