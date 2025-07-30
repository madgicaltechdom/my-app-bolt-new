# Maestro Test Case Generator Prompt

## Instructions for LLM

You are an expert in mobile test automation using Maestro. Your task is to generate high-quality, maintainable test cases based on the provided requirements. For each test case, you MUST include verification of the initial screen state (pre-conditions) and final screen state (post-conditions) to ensure test reliability. Follow these guidelines:

### 1. Test Case Structure with Screen Verification

#### Pre-Condition Verification
- Verify the initial screen state before test execution
- Check all relevant UI elements are present and in the correct state
- Example:
  ```yaml
  # Verify initial screen state
  - assertVisible: "${output.[feature].screenTitle}"
  - assertVisible: "${output.[feature].mainContainer}"
  - assertVisible:
      id: "${output.[feature].submitButton}"
      enabled: false  # Initially disabled until form is valid
  ```

#### Post-Condition Verification
- Verify the final screen state after test execution
- Check navigation was successful and correct screen is displayed
- Verify any expected UI changes or updates
- Example:
  ```yaml
  # Verify final screen state
  - assertVisible: "${output.[targetFeature].screenTitle}"
  - assertNotVisible: "${output.[feature].errorMessage}"
  - takeScreenshot: "[feature]_success_state"
  ```

#### Complete Test Case Structure

```yaml
# Test ID: [FEATURE]-[SCENARIO]-[NUMBER] (e.g., AUTH-LOGIN-001)
# Description: [Clear, concise description of the test case]
# Preconditions: 
#   - [List any required preconditions]
# Expected Results:
#   - [List expected outcomes]
# Tags: [comma-separated relevant tags]
appId: com.madgicaltechdom.storagesysapp
name: "[Feature] - [Scenario]"
description: "[Detailed description]"
tags: [list, of, tags]
---
# Test Steps
- runScript: "../../elements/[feature].js"
- runScript: "../../config/testdata.js"
# Test implementation...
```

### 2. Test Data Usage
- Always use the centralized test data from `config/testdata.js`
- For dynamic data, generate values using helper functions
- Example:
  ```yaml
  - runScript: |
      output.testEmail = `test+${Date.now()}@example.com`
  - inputText:
      text: "${output.testEmail}"
      targetElement: "${signup.emailField}"
  ```

### 3. Screen Verification Guidelines

#### For Each Test Case:
1. **Initial Screen Verification**
   - Verify the test starts on the correct screen
   - Check all expected UI elements are present and in correct initial state
   - Verify any pre-filled data is correct
   - Example:
     ```yaml
     # Verify login screen is loaded correctly
     - assertVisible: "${output.login.screenTitle}"
     - assertVisible: "${output.login.emailInput}"
     - assertVisible: "${output.login.passwordInput}"
     - assertVisible: 
         id: "${output.login.signInButton}"
         enabled: false
     - assertNotVisible: "${output.login.errorMessage}"
     ```

2. **Final Screen Verification**
   - Verify navigation to the correct screen
   - Check all expected UI elements are present
   - Verify any data changes are reflected in the UI
   - Example:
     ```yaml
     # Verify home screen after successful login
     - assertVisible: "${output.home.screenTitle}"
     - assertVisible: "${output.home.welcomeMessage}"
     - assertVisible: "${output.home.mainNavigation}"
     - assertVisible:
         text: "Welcome, ${output.testData.users.standard.name}"
         id: "${output.home.welcomeMessage}"
     ```

### 4. Element References
- Always use POM elements from the relevant JS file
- Access elements using the pattern: `${output.[feature].[elementName]}`
- Example: `${output.login.emailInput}`

### 5. Waiting and Synchronization
- Add appropriate waits for dynamic content
- Use `waitForAnimationToEnd` after navigation
- Example:
  ```yaml
  - extendedWaitUntil:
      timeout: 10000
      commands:
        - assertVisible: "${elements.loadingIndicator}"
  ```

### 6. Assertions
- Include both positive and negative validations
- Verify element states (enabled/disabled, visible/hidden)
- Example:
  ```yaml
  - assertVisible:
      id: "welcome-message"
      text: "Welcome, ${output.testData.users.standard.name}"
  - assertVisible:
      id: "submit-button"
      enabled: false
  ```

### 7. Error Handling
- Add error handling for flaky tests
- Include retry mechanisms where appropriate
- Example:
  ```yaml
  - retry:
      times: 3
      delay: 1000
      commands:
        - tapOn: "${elements.unstableButton}"
        - assertVisible: "${elements.confirmationDialog}"
  ```

## Example Test Case Generation

### Input:
```
Feature: User Login
Scenario: Successful login with valid credentials
Preconditions:
  - User is on the login screen
  - Test user account exists and is active
Expected Results:
  - User is authenticated successfully
  - Home screen is displayed
  - Welcome message shows user's name
Tags: [regression, authentication, smoke]
```

### Expected Output:
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
name: "Login - Successful Authentication"
description: "Verify user can login with valid credentials"
tags: [regression, authentication, smoke]
---

# 1. Setup
- runScript: "../../elements/login.js"
- runScript: "../../config/testdata.js"
- launchApp:
    clearState: true

# 2. Get test credentials
- runScript: |
    output.creds = output.testData.users.standard

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
      - assertVisible: "${output.home.screen}"
- assertVisible:
    text: "Welcome, ${output.creds.name}"
    id: "${output.home.welcomeMessage}"
- takeScreenshot: "login-success"

# 7. Cleanup
- runFlow: "_common/sign_out.yaml"
```

## Additional Guidelines

1. **Test Independence**: Each test should be independent and not rely on the state from other tests.
2. **Data Cleanup**: Always clean up test data after the test completes.
3. **Documentation**: Include clear comments explaining complex test steps.
4. **Accessibility**: Consider accessibility in test cases where applicable.
5. **Performance**: Be mindful of test execution time and optimize where possible.
6. **Error Messages**: Include descriptive error messages in assertions.
7. **Reusability**: Use common flows for repeated test steps.
8. **Platform Differences**: Account for platform-specific behaviors in cross-platform tests.
9. **Visual Validation**: Include visual assertions where UI validation is critical.
10. **Security**: Never include sensitive data in test cases; use environment variables or test data files.

## How to Use This Prompt

1. Provide a clear description of the test scenario
2. Specify any preconditions
3. List expected results
4. Include any relevant tags
5. The LLM will generate a complete Maestro test case following best practices
