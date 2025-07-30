# Maestro Test Suite Template

## Table of Contents
1. [Project Structure](#project-structure)
2. [Environment Setup](#environment-setup)
3. [Page Object Model (POM)](#page-object-model-pom)
4. [Test File Structure](#test-file-structure)
5. [Common Flows](#common-flows)
6. [Best Practices](#best-practices)
7. [Example Test Cases](#example-test-cases)
8. [Running Tests](#running-tests)

## Project Structure

```
maestro/
├── elements/                  # POM element definitions
│   └── [featureName].js
├── tests/
│   ├── login/                 # Login test cases
│   ├── [featureName]/         # Feature test cases
│   │   ├── _common/           # Reusable test flows
│   │   ├── [test_case_1].yaml
│   │   └── [test_case_2].yaml
│   └── ...
└── config/
    └── test-env.yaml          # Environment variables
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
- Group related tests in feature folders
- Use clear, descriptive test names
- Follow naming convention: `[feature]_[scenario].yaml`

### 2. Element References
- Always use POM pattern
- Keep element names consistent with UI labels
- Document complex element selectors

### 3. Test Data
- Use environment variables for test data
- Include cleanup steps for data modifications
- Avoid hardcoded values

### 4. Assertions
- Verify both positive and negative cases
- Include descriptive assertion messages
- Check for error states and validations

### 5. Performance
- Add `waitForAnimationToEnd` after navigation
- Include loading state verifications
- Monitor test execution time

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
