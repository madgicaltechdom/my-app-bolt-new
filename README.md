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
  - [Test Case Generation Guidelines](#maestro-test-case-generation-guidelines)
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
APK - https://drive.google.com/file/d/1myTe3A93GxOTpmT5K6oycthNnuVqNjSH/view?usp=drive_link
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

### Maestro Test Case Generation Guidelines

Create Maestro test cases for the  [feature] following these specific guidelines from @MAESTRO_TEST_GENERATOR_PROMPT.md.

When creating new test cases for features, follow these comprehensive guidelines to ensure consistency and reliability:

#### 1. Test ID Requirements (CRITICAL)
- **All** interactive elements must have `testID` props
- Follow this naming convention for testIDs:
  ```
  Input fields: [purpose]-input (e.g., 'email-input', 'password-input')
  Buttons: [action]-button (e.g., 'sign-up-button')
  Links: [action]-link (e.g., 'sign-in-link')
  Error messages: [field]-error (e.g., 'email-error')
  ```
- Test IDs should be descriptive and consistent
- Never use dynamic values in testIDs
- Add testID to both container and text elements

#### 2. Element Verification (MANDATORY)
For EVERY UI element verification, include BOTH:

1. Text-based verification:
   ```yaml
   - assertVisible: '${output.screen.elementText}'
   ```

2. ID and text verification:
   ```yaml
   - assertVisible:
       id: '${output.screen.elementId}'
       text: '${output.screen.elementText}'
   ```

#### 3. Test Data Management
- Store all test data in `maestro/config/testdata.js`
- Use JavaScript in testdata.js for all test data
   - Implement random email generation in JavaScript
   - Structure test data with success/error scenarios
   - Never hardcode test data in test files

#### 4. Screen Verification (Section 10):
   - Verify all interactive elements exist with both ID and text
   - Include placeholder text verification for all input fields
   - Mark password fields with `secure: true`
   - Verify element states (enabled/disabled) where applicable

#### 5. Test Structure (Sections 2-4):
   - Use proper metadata format (ID, description, preconditions, expected results)
   - Create reusable subflows for common actions
   - Follow file naming conventions (lowercase_with_underscores)
   - Group related tests in appropriate directories

#### 6. Test Coverage:
   - Happy path (successful registration)
   - Field validations (empty fields, email format, password rules)
   - Error states (duplicate email, server errors)
   - Navigation flows (to login, back button)
   - Form state management

#### 7. Quality Requirements (Section 11):
   - Ensure test independence (no test depends on another)
   - Include proper cleanup in teardown
   - Verify all error states and messages
   - Test both positive and negative scenarios
```

#### Example Test Case

```yaml
# Test metadata
- testID: REG-001
  description: "Verify successful registration with valid credentials"
  tags: [regression, authentication]

# Test steps
- launchApp
- assertVisible:
    id: '${register.signUpButtonId}'
    text: '${register.signUpButton}'

# Input field with both ID and placeholder verification
- tapOn: '${register.emailInput}'
- inputText: '${testData.validEmail}'
- assertVisible:
    id: '${register.emailInput}'
    text: '${testData.validEmail}'
    placeholder: 'Email'

# Secure field
- tapOn: '${register.passwordInput}'
- inputSecret: '${testData.validPassword}'
- assertVisible:
    id: '${register.passwordInput}'
    secure: true

# Submit form
- tapOn: '${register.submitButton}'

# Verify success
- assertVisible:
    id: '${register.successMessage}'
    text: 'Registration successful!'
```

For more detailed guidelines, see the [Maestro Test Guidelines](./maestro/README.md).

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
   - Organize test files in the `maestro/tests` directory with logical subdirectories
   - Group related test files (e.g., `login/`, `profile/`) under their respective feature directories
   - Place common test utilities and shared flows in `maestro/tests/_common`
   - Use descriptive test names that clearly indicate the test scenario
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
