# Maestro Test Suite Best Practices

## Table of Contents
1. [Project Structure](#project-structure)
2. [Core Maestro Commands](#core-maestro-commands)
3. [Test Data Management](#test-data-management)
4. [Page Object Model (POM)](#page-object-model-pom)
5. [Test Case Structure](#test-case-structure)
6. [Advanced Testing Scenarios](#advanced-testing-scenarios)
7. [Best Practices](#best-practices)
8. [Running Tests](#running-tests)
9. [Troubleshooting](#troubleshooting)

## Project Structure

```
maestro/
├── config/
│   └── testdata.js         # Centralized test data
├── elements/               # Page Object Model (POM) definitions
│   ├── common.js          # Common elements
│   └── [feature].js       # Feature-specific elements
├── tests/
│   ├── _common/           # Reusable test flows
│   └── [feature]/         # Feature test cases
│       ├── _screenshots/  # Visual references
│       ├── [scenario_1].yaml
│       └── [scenario_2].yaml
└── reports/               # Test execution reports
```

### Key Directories

1. **`config/`**
   - `testdata.js`: Centralized test data and configurations
   - Environment-specific configurations (optional)

2. **`elements/`**
   - `common.js`: Shared UI elements across the app
   - `[feature].js`: Feature-specific UI elements
   - Follows Page Object Model (POM) pattern

3. **`tests/`**
   - `_common/`: Reusable test flows (e.g., login, navigation)
   - `[feature]/`: Feature-specific test cases
   - `_screenshots/`: Visual references for tests

4. **`reports/`**
   - Test execution reports
   - Screenshot comparisons
   - Performance metrics

## Core Maestro Commands

### Navigation
```yaml
- launchApp: clearState: true  # Start fresh
- back:  # Navigate back
- openLink: "myapp://settings"  # Deep linking
```

### Interaction
```yaml
- tapOn: "button-id"  # Basic tap
- doubleTapOn: "image-id"
- longPressOn: "item-id"
- inputText:
    text: "Test Input"
    targetElement: "input-field"
- scroll: "0, -300"  # x, y coordinates
- scrollUntilVisible:
    element: "footer-element"
    direction: DOWN
```

### Assertions
```yaml
- assertVisible: "welcome-message"
- assertNotVisible: "loading-indicator"
- assertTrue: "${output.user.loggedIn}"
- assertWithAI:
    prompt: "Verify the checkout button is green"
    screenshot: true
```

### Flow Control
```yaml
- runFlow: "_common/login.yaml"
- runScript: "config/testdata.js"
- repeat: 3
  commands:
    - tapOn: "add-item"
- retry:
    times: 3
    delay: 1000
    commands:
      - tapOn: "unstable-button"
```

### Media & Device
```yaml
- takeScreenshot: "screenshot-name"
- startRecording: "test-recording"
- setLocation: 37.7749, -122.4194  # lat, long
- setAirplaneMode: true
- clearKeychain  # Clear stored credentials
```

## Test Data Management

### Structure in `config/testdata.js`
```javascript
output.testData = {
  users: {
    validUser: {
      email: "test@example.com",
      password: "SecurePass123!",
      name: "Test User"
    },
    adminUser: {
      email: "admin@example.com",
      password: "Admin@123"
    }
  },
  invalidCredentials: {
    wrongPassword: {
      email: "test@example.com",
      password: "WrongPass123!",
      expectedError: "Invalid email or password"
    },
    emptyCredentials: {
      email: "",
      password: "",
      expectedError: "Please fill in all fields"
    },
    malformedEmail: {
      email: "invalid-email",
      password: "ValidPass123!",
      expectedError: "Please enter a valid email address"
    }
  },
  // Generate dynamic test data when needed
  generate: {
    randomEmail: () => `test-${Date.now()}@example.com`,
    randomString: (length = 10) => Math.random().toString(36).substring(2, 2 + length)
  }
};
```

### Usage in Tests
```yaml
# Load test data
- runScript: "config/testdata.js"

# Use static test data
- inputText:
    text: "${output.testData.users.validUser.email}"
    targetElement: "email-field"

# Generate dynamic test data
- runScript: |
    output.dynamicEmail = output.testData.generate.randomEmail()
- inputText:
    text: "${output.dynamicEmail}"
    targetElement: "email-field"

# Access nested properties
- assertVisible:
    text: "${output.testData.invalidCredentials.wrongPassword.expectedError}"
    id: "error-message"
```

### Best Practices

1. **Centralization**
   - Store all test data in `config/testdata.js`
   - Group related data in logical objects
   - Use descriptive property names

2. **Data Organization**
   - Separate users by roles (e.g., `adminUser`, `standardUser`)
   - Group test cases (e.g., `invalidCredentials`, `validAddresses`)
   - Include expected error messages with test data

3. **Dynamic Data**
   - Generate unique values for each test run
   - Create helper functions for common patterns
   - Avoid hardcoding values in test files

4. **Environment-Specific Data**
   - Use environment variables for sensitive data
   - Support different environments (dev, staging, prod)
   - Keep environment-specific data separate

5. **Maintenance**
   - Document the structure in comments
   - Keep data up-to-date with application changes
   - Remove unused test data

## Page Object Model (POM)

### Example: `elements/login.js`
```javascript
/**
 * Login Screen Elements
 * Follows Page Object Model pattern for better maintainability
 */

// Feature-specific elements
output.login = {
    // Basic elements
    emailInput: "id=email",
    passwordInput: "id=password",
    signInButton: "id=sign-in-button",
    forgotPasswordLink: "id=forgot-password",
    
    // Messages
    errorMessage: "id=error-message",
    successMessage: "id=success-message",
    
    // States
    loadingState: "id=loading-indicator",
    disabledButton: "id=disabled-button",
    
    // Accessibility
    a11y: {
        signInButton: "Sign in button",
        emailField: "Email input field",
        passwordField: "Password input field"
    }
};

// Common elements (reusable across features)
output.common = {
    backButton: "Back",
    submitButton: "Submit",
    cancelButton: "Cancel",
    nextButton: "Next",
    
    // Common messages
    loadingText: "Loading...",
    successText: "Success!"
};

// Helper functions (if needed)
output.helpers = {
    waitForLoading: () => {
        return [
            { waitForAnimationToEnd: true },
            { assertNotVisible: output.login.loadingState }
        ];
    }
};
```

### Usage in Tests
```yaml
# Load POM elements
- runScript: "../../elements/login.js"

# Access elements
- tapOn: "${output.login.signInButton}"
- inputText:
    text: "test@example.com"
    targetElement: "${output.login.emailInput}"

# Use common elements
- tapOn: "${output.common.submitButton}"

# Use helper functions
- runScript: |
    const loadingSteps = output.helpers.waitForLoading();
    output.loadingSteps = loadingSteps;
- runSteps: "${output.loadingSteps}"
```

### Best Practices

1. **Element Organization**
   - Group related elements logically
   - Use clear, consistent naming
   - Include comments for complex selectors

2. **Element Naming**
   - Use `camelCase` for element names
   - Be descriptive (e.g., `signInButton` not `button1`)
   - Include element type in name (e.g., `emailInput`, `submitButton`)

3. **Accessibility**
   - Include accessibility labels
   - Support screen readers
   - Follow platform conventions

4. **Common Elements**
   - Share common elements across features
   - Keep global elements in `common` object
   - Document usage examples

5. **Maintenance**
   - Keep selectors simple and stable
   - Update with UI changes
   - Remove unused elements

## Test Case Structure

### Complete Example
```yaml
# Test ID: AUTH-LOGIN-001
# Description: Verify successful login with valid credentials
# Preconditions: 
#   - User is on the login screen
#   - Test user account exists and is active
# Expected Results:
#   - User is authenticated successfully
#   - Home screen is displayed
#   - Welcome message shows user's name
# Tags: [regression, authentication, smoke]
appId: com.madgicaltechdom.storagesysapp
name: Successful login with valid credentials
tags: [regression, authentication, smoke]
---

# 1. Setup
- runScript: "../../elements/login.js"
- runScript: "../../config/testdata.js"
- launchApp:
    clearState: true
    arguments:
      - "--env"
      - "test"

# 2. Get test credentials
- runScript: |
    output.creds = output.testData.users.validUser

# 3. Verify login screen components
- assertVisible: "${output.login.emailInput}"
- assertVisible: "${output.login.passwordInput}"
- assertVisible: "${output.login.signInButton}"

# 4. Enter credentials
- inputText:
    text: "${output.creds.email}"
    targetElement: "${output.login.emailInput}"
- inputText:
    text: "${output.creds.password}"
    targetElement: "${output.login.passwordInput}"
    hideKeyboard: true

# 5. Submit form
- tapOn: "${output.login.signInButton}"
- waitForAnimationToEnd

# 6. Verify successful login
- extendedWaitUntil:
    timeout: 10000
    commands:
      - assertVisible: "id=home-screen"
- assertVisible:
    text: "Welcome, ${output.creds.name}"
    id: "welcome-message"
- takeScreenshot: "login-success"

# 7. Cleanup
- runFlow: "_common/sign_out.yaml"
```

### Best Practices

1. **Test Metadata**
   - Include clear, descriptive test ID
   - Document preconditions and expected results
   - Use appropriate tags for filtering

2. **Test Structure**
   - Follow Arrange-Act-Assert pattern
   - Group related steps with comments
   - Keep tests focused and atomic

3. **Element References**
   - Always use POM variables
   - Avoid hardcoded selectors
   - Include accessibility considerations

4. **Assertions**
   - Verify both positive and negative cases
   - Include meaningful assertion messages
   - Check for error states

5. **Maintenance**
   - Keep tests independent
   - Clean up test data
   - Document complex scenarios

## Advanced Testing Scenarios

### 1. Visual Regression Testing

```yaml
# Take baseline screenshot (first run)
- takeScreenshot: "home-screen-baseline-${device.name}"
  saveTo: "baselines/"

# Compare with baseline (subsequent runs)
- takeScreenshot: "home-screen-current-${device.name}"
  saveTo: "actual/"
- compareScreenshots:
    base: "baselines/home-screen-baseline-${device.name}.png"
    current: "actual/home-screen-current-${device.name}.png"
    threshold: 0.1  # 10% difference allowed
    saveDiff: true
    diffPath: "diffs/"
```

### 2. Network Testing

```yaml
# Test with different network conditions
- name: "Test with slow network"
  steps:
    - setNetworkConditions:
        offline: false
        latency: 1000  # 1 second latency
        downloadThroughput: 500  # 500 Kbps
        uploadThroughput: 250    # 250 Kbps
    - runFlow: "_common/perform_data_loading.yaml"
    - assertVisible: "id=network-warning"
    - resetNetworkConditions

# Test offline mode
- setNetworkConditions:
    offline: true
- tapOn: "${common.retryButton}"
- assertVisible: "${messages.offlineError}"
```

### 3. Biometric Authentication

```yaml
# Enable biometric authentication
- enableBiometricAuth: true

# Test successful biometric auth
- tapOn: "${login.biometricButton}"
- authenticateBiometric:
    type: "faceId"  # or "touchId"
    match: true
- assertVisible: "${home.screen}"

# Test failed biometric auth
- tapOn: "${login.biometricButton}"
- authenticateBiometric:
    type: "faceId"
    match: false
- assertVisible: "${login.errorMessage}"
```

### 4. Deep Linking

```yaml
# Test deep link navigation
- openLink: "myapp://products/123"
- assertVisible: "${productDetails.screen}"
- assertVisible:
    text: "Product #123"
    id: "product-title"

# Test with parameters
- openLink: "myapp://search?query=test&category=electronics"
- assertVisible: "${searchResults.screen}"
- assertVisible:
    text: "Results for 'test'"
```

### 5. Performance Testing

```yaml
# Measure app launch time
- startTimer: "app_launch"
- launchApp:
    clearState: true
- stopTimer: "app_launch"
- assertLessThan:
    value: "${timers.app_launch}"
    expected: 2000  # milliseconds

# Measure screen transition time
- startTimer: "screen_transition"
- tapOn: "${home.settingsButton}"
- waitForAnimationToEnd
- stopTimer: "screen_transition"
```

### 6. Data-Driven Testing

```yaml
# Load test data
- runScript: |
    output.testCases = [
      { username: "user1@test.com", password: "pass123", valid: true },
      { username: "invalid@test.com", password: "wrong", valid: false },
      { username: "", password: "", valid: false }
    ]

# Execute tests for each data set
- repeatWith: "${output.testCases}"
  as: "testCase"
  commands:
    - launchApp: { clearState: true }
    - inputText:
        text: "${testCase.username}"
        targetElement: "${login.emailInput}"
    - inputText:
        text: "${testCase.password}"
        targetElement: "${login.passwordInput}"
    - tapOn: "${login.submitButton}"
    - if: "${testCase.valid}"
      then:
        - assertVisible: "${home.screen}"
      else:
        - assertVisible: "${login.errorMessage}"
```

## Environment Setup

### 1. Configuration File
Create `app/.maestro/config.yaml` with required variables:

```yaml
# Test Configuration
appId: com.madgicaltechdom.storagesysapp

# Test Data
TEST_EMAIL: "test@example.com"
TEST_PASSWORD: "securepassword"
INVALID_EMAIL: "invalid-email"
LONG_NAME: "A very long name that exceeds maximum allowed characters"
```

### 2. Loading Environment
In your test files:

```yaml
appId: com.madgicaltechdom.storagesysapp
name: "Feature - Test Case"
description: "Test case description"
tags: [feature, test-type]
env:
  - ../../config/test-env.yaml
---
# Test steps here
```

## Page Object Model (POM)

### Element Definition File
Create `elements/[featureName].js`:

```javascript
// elements/featureName.js
output.featureName = {
    // Navigation
    tabName: 'Tab Label',
    backButton: 'Back',
    
    // Form Elements
    inputField: 'Input Label',
    submitButton: 'Submit',
    
    // Messages
    successMessage: 'Success!',
    errorMessage: 'Error occurred',
    
    // Other Elements
    loadingIndicator: 'loading-indicator'
}
```

### Loading Elements in Tests
```yaml
- runScript: ../../elements/featureName.js
- assertVisible: "${output.featureName.screenTitle}"
```

## Test File Structure

### Basic Template
```yaml
# tests/feature/feature_test_case.yaml
appId: com.madgicaltechdom.storagesysapp
name: "Feature - Test Case"
description: "Detailed test case description"
tags: [feature, test-type, priority]
env:
  - ../../config/test-env.yaml
---

# 1. Load Elements
- runScript: ../../elements/featureName.js

# 2. Navigate to Screen
- runFlow: "../login/login_success.yaml"  # If auth required
- tapOn: "${output.featureName.tabName}"
- waitForAnimationToEnd

# 3. Test Steps
- tapOn: "${output.featureName.inputField}"
- inputText: "${TEST_DATA}"
- tapOn: "${output.featureName.submitButton}"

# 4. Verify Results
- assertVisible: 
    id: "${output.featureName.successMessage}"
    text: "Expected success message"
- takeScreenshot: "test_case_verification"
```

## Common Flows

### Example: Navigation Flow
`tests/feature/_common/navigate_to_feature.yaml`
```yaml
- runFlow: "../login/login_success.yaml"
- tapOn: "${output.featureName.tabName}"
- waitForAnimationToEnd
- assertVisible: "${output.featureName.screenTitle}"
```

### Example: Form Submission
`tests/feature/_common/submit_form.yaml`
```yaml
- tapOn: "${output.featureName.submitButton}"
- waitForAnimationToEnd
- assertVisible: "${output.featureName.successMessage}"
```

## Best Practices

### 1. Test Organization

#### File Naming
- Use `feature_scenario_spec.yaml` format (e.g., `login_invalid_credentials_spec.yaml`)
- Group related tests in feature folders
- Prefix common flows with underscore (e.g., `_common/`)

#### Test Structure
```yaml
# tests/login/successful_login_spec.yaml
appId: com.madgicaltechdom.storagesysapp
name: "Login - Successful Authentication"
description: "Verify user can login with valid credentials"
tags: [regression, authentication, smoke]
---
# Test steps...
```

### 2. Element Management

#### POM Best Practices
- Store selectors in dedicated JS files
- Group related elements logically
- Include accessibility identifiers

```javascript
// elements/checkout.js
output.checkout = {
    // Form fields
    emailInput: "id=email",
    cardNumber: "id=card-number",
    
    // Buttons
    submitButton: "id=submit-payment",
    
    // Messages
    successMessage: "id=success-message",
    
    // Accessibility
    a11y: {
        submitButton: "Submit Payment"
    }
};
```

### 3. Test Data Management

#### Centralized Test Data
```javascript
// config/testdata.js
output.testData = {
    users: {
        standard: {
            email: "test@example.com",
            password: "SecurePass123!"
        },
        admin: {
            email: "admin@example.com",
            password: "Admin@123"
        }
    },
    products: {
        featured: "SKU-001",
        outOfStock: "SKU-999"
    }
};
```

#### Dynamic Data
```yaml
- runScript: |
    output.testEmail = `test+${Date.now()}@example.com`;
- inputText:
    text: "${output.testEmail}"
    targetElement: "${signup.emailField}"
```

### 4. Reliable Test Execution

#### Waiting Strategies
```yaml
# Wait for element with timeout
- extendedWaitUntil:
    timeout: 10000  # 10 seconds
    commands:
      - assertVisible: "${elements.loadingIndicator}"

# Wait for element to disappear
- waitForElementToDisappear: "${elements.loadingSpinner}"

# Smart waiting for animations
- waitForAnimationToEnd
```

#### Retry Mechanism
```yaml
- retry:
    times: 3
    delay: 1000
    commands:
      - tapOn: "${elements.unstableButton}"
      - assertVisible: "${elements.confirmationDialog}"
```

### 5. Assertions & Validations

#### Comprehensive Assertions
```yaml
# Basic visibility check
- assertVisible: "${elements.welcomeMessage}"

# Text content verification
- assertVisible:
    id: "welcome-message"
    text: "Welcome back, Test User!"

# Element state verification
- assertVisible:
    id: "submit-button"
    enabled: false

# Collection validation
- assertCount:
    element: "${productList.items}"
    count: 5

# Visual validation
- takeScreenshot: "home-screen-loaded"
- compareScreenshots:
    base: "baselines/home-screen.png"
    current: "actual/home-screen.png"
    threshold: 0.05
```

### 6. Test Maintenance

#### Documentation
```yaml
# Test ID: CHECKOUT-001
# Description: Verify guest checkout flow with valid payment
# Preconditions:
#   - User is on product page
#   - Product is in stock
# Expected Results:
#   - Order is placed successfully
#   - Confirmation email is sent
#   - Order appears in account history
# Tags: [checkout, payment, e2e]
```

#### Cleanup
```yaml
# Teardown steps
- runFlow: "_common/clear_cart.yaml"
- runScript: |
    // Reset test data
    api.deleteTestUser(output.testEmail);
```

### 7. Performance Considerations

```yaml
# Measure performance
- startTimer: "screen_load"
- launchApp: { clearState: true }
- stopTimer: "screen_load"
- assertLessThan:
    value: "${timers.screen_load}"
    expected: 2000  # 2 seconds

# Monitor memory usage
- takeHeapSnapshot: "after-login"
```

### 8. Cross-Platform Testing

```yaml
# Platform-specific steps
- if:
    platform: "ios"
  then:
    - tapOn: "Allow Notifications"
  else:
    - tapOn: "ALLOW"

# Device orientation
- setOrientation: "landscape"
- assertVisible: "${elements.landscapeView}"
```

### 9. Continuous Integration

#### Parallel Execution
```yaml
# Run tests in parallel
maestro test --parallel 4

# Tag-based execution
maestro test --tags smoke
maestro test --exclude-tags flaky
```

#### Test Reporting
```bash
# Generate JUnit report
maestro test --format junit --output test-results.xml

# HTML report
maestro test --format html --output report.html
```

### 10. Debugging Tips

#### Interactive Debugging
```bash
# Start Maestro Studio
maestro studio

# Record test execution
maestro record test.yaml
```

#### Logging
```yaml
# Add debug logs
- runScript: |
    console.log("Current user:", output.testUser);
    console.log("Environment:", env);

# Take screenshots on failure
- takeScreenshot: "before-form-submit"
```

## Environment Setup

## Example Test Cases

### 1. Happy Path
```yaml
# tests/feature/feature_success_flow.yaml
appId: com.madgicaltechdom.storagesysapp
name: "Feature - Success Flow"
description: "Verify successful feature operation"
tags: [feature, happy-path, smoke]
env:
  - ../../config/test-env.yaml
---
- runScript: ../../elements/featureName.js
- runFlow: "_common/navigate_to_feature.yaml"
- tapOn: "${output.featureName.actionButton}"
- assertVisible: "${output.featureName.successMessage}"
```

### 2. Error Case
```yaml
# tests/feature/feature_error_case.yaml
appId: com.madgicaltechdom.storagesysapp
name: "Feature - Error Case"
description: "Verify error handling"
tags: [feature, error-case, regression]
env:
  - ../../config/test-env.yaml
---
- runScript: ../../elements/featureName.js
- runFlow: "_common/navigate_to_feature.yaml"
- tapOn: "${output.featureName.actionButton}"
- assertVisible: 
    id: "${output.featureName.errorMessage}"
    text: "Expected error message"
```

## Running Tests

### Basic Commands
```bash
# Run all tests
maestro test .

# Run tests by tag
maestro test --tags smoke

# Run specific test file
maestro test tests/feature/test_case.yaml

# Run with HTML report
maestro test --format junit --output test-results.xml
```

### Common Options
- `--format`: Output format (junit, json)
- `--tags`: Filter by tags
- `--device`: Run on specific device
- `--env-file`: Custom environment file

## Maintenance Tips

1. **Version Control**
   - Keep test data out of version control
   - Use `.gitignore` for screenshots and reports

2. **Documentation**
   - Document complex test scenarios
   - Include setup/teardown instructions

3. **CI/CD Integration**
   - Add test execution to CI pipeline
   - Set up test result reporting

4. **Regular Updates**
   - Review and update selectors with UI changes
   - Remove deprecated test cases

## Troubleshooting

### Common Issues
1. **Element Not Found**
   - Verify element selectors
   - Add explicit waits if needed

2. **Test Flakiness**
   - Add proper waits
   - Verify test isolation
   - Retry mechanism for known flaky tests

3. **Environment Issues**
   - Check environment variables
   - Verify app installation

### Debugging Tips
- Use `maestro studio` for interactive testing
- Add `takeScreenshot` for visual debugging
- Check Maestro logs for detailed errors

---

*Last Updated: July 30, 2025*
