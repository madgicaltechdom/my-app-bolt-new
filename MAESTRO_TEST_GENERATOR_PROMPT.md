# Generate Comprehensive Maestro YAML Test Suite

Generate a comprehensive Maestro YAML test suite for the following feature:
**[FEATURE_NAME]** - [Brief description of the feature]

## Test Requirements:

### 1. **Test Metadata (Include in each test file):**
```yaml
# Test ID: [FEATURE]-[SCENARIO]-001
# Description: Brief description of what this test verifies
# Preconditions: What state the app should be in before test
# Expected Results: What should happen when test passes
# Tags: [regression, feature_name, priority_level]

# Test configuration
appId: com.madgicaltechdom.storagesysapp
name: Descriptive test name
tags: [regression, feature_name, critical]
---
```

### 2. **POM Implementation Pattern:**
**Create element definitions in `elements/[feature].js`:**
```javascript
output.[feature] = {
    // Screen titles and headers
    pageTitle: 'Feature Screen Title',
    headerText: 'Header Text',
    
    // Input fields
    inputField: 'input_field_id',
    emailField: 'email_input',
    
    // Buttons and actions
    submitButton: 'submit_btn',
    cancelButton: 'cancel_btn',
    
    // Messages and feedback
    successMessage: 'Success message text',
    errorMessage: 'Error message text',
    
    // Navigation elements
    backButton: 'back_arrow',
    nextButton: 'next_btn'
}
```

**Load elements with:**
```yaml
- runScript: 
    file: ../../elements/[feature].js
```

**Reference elements with:**
```yaml
- tapOn:
    id: ${output.[feature].submitButton}
- assertVisible: ${output.[feature].successMessage}
```

### 3. **Test Structure Pattern:**
```yaml
# Load ONLY the specific POM elements needed for this test
- runScript: 
    file: ../../elements/[feature].js
- runScript: 
    file: ../../elements/[preScreen].js  # if different from feature
- runScript: 
    file: ../../elements/[postScreen].js # if different from feature

# Load test data with random generation functions
- runScript: 
    file: ../../config/testdata.js

# Launch app with clean state
- runFlow: "_common/launch_app.yaml"

# Navigate to feature (if needed)
- runFlow: "_common/navigate_to_[feature].yaml"

# Verify initial screen state
- runFlow: "_common/verify_[feature]_screen.yaml"

# Execute main test steps
[Main test logic here]

# Verify expected outcomes
- runFlow: "_common/verify_[expected_result].yaml"
```

### 4. **Reusable Subflows (Create these in `_common/` directory):**

**Essential subflows to create:**
- `launch_app.yaml` - Standard app launch with clearState
- `verify_[feature]_screen.yaml` - Verify screen elements are visible
- `fill_[form_name].yaml` - Parameterized form filling
- `navigate_to_[screen].yaml` - Navigation flows
- `verify_error_message.yaml` - Error state verification

**Load ONLY Required POM Elements:**
Each test should load only the specific POM files it needs:

```yaml
# Load only the POM elements required for this specific test
- runScript: 
    file: ../../elements/[feature].js
- runScript: 
    file: ../../elements/[relatedScreen].js
# Only load what you actually use in the test
```

**Example - Login test only loads login-related elements:**
```yaml
# Only load POM elements needed for login flow
- runScript: 
    file: ../../elements/login.js
- runScript: 
    file: ../../elements/home.js  # for post-login verification
```

**Example - Feature-specific test:**
```yaml
# Load only elements for this feature and navigation
- runScript: 
    file: ../../elements/[feature].js
- runScript: 
    file: ../../elements/navigation.js  # if navigation elements needed
```

**Example subflow structure:**
```yaml
# _common/fill_credentials.yaml
appId: com.madgicaltechdom.storagesysapp
---
- tapOn:
    id: ${output.login.emailField}
- eraseText
- inputText: ${LOGIN_EMAIL}
- tapOn:
    id: ${output.login.passwordField}  
- eraseText
- inputText: ${LOGIN_PASSWORD}
```

### 5. **Test Data Management:**
**Create `config/testdata.js` with random data generation functions:**
```javascript
output.testData = {
    users: {
        validUser: {
            email: "test.user@example.com",
            password: "ValidPass123!",
            name: "Test User"
        },
        invalidUser: {
            email: "invalid@email",
            password: "123"
        }
    },
    
    testInputs: {
        longText: "Very long text string for boundary testing...",
        specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
        emptyString: "",
        maxLength: "a".repeat(255)
    },
    
    // Custom random data generation functions
    generateUniqueId: function() {
        return "id_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    },
    
    generateRandomEmail: function() {
        const randomString = Math.random().toString(36).substring(2, 8);
        return `test_${randomString}@example.com`;
    },
    
    generateRandomString: function(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    generateRandomPhoneNumber: function() {
        return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    }
}
```

### 6. **Coverage Areas & Test Scenarios:**

**Create these test files:**

**Happy Path Tests:**
- `[feature]_success.yaml` - Complete successful flow
- `[feature]_alternate_paths.yaml` - Different valid approaches

**Input Validation Tests:**
- `[feature]_empty_fields.yaml` - Required field validation
- `[feature]_invalid_formats.yaml` - Format validation (email, phone, etc.)
- `[feature]_boundary_values.yaml` - Min/max length testing
- `[feature]_special_characters.yaml` - Special character handling

**Error Handling Tests:**
- `[feature]_network_error.yaml` - Network connectivity issues
- `[feature]_server_error.yaml` - Server-side error responses
- `[feature]_timeout_scenarios.yaml` - Request timeout handling

**Edge Cases:**
- `[feature]_long_inputs.yaml` - Very long text inputs
- `[feature]_rapid_interactions.yaml` - Fast user interactions
- `[feature]_device_rotation.yaml` - Orientation changes
- `[feature]_app_backgrounding.yaml` - App lifecycle testing

### 7. **UI Interaction Best Practices:**

**Verification Patterns:**
```yaml
# ID-based verification (for element presence)
- assertVisible:
    id: ${output.[feature].elementId}

# Text-based verification (for content validation) - uses text property by default
- assertVisible: ${output.[feature].elementText}

# Explicit text verification (when needed)
- assertVisible:
    text: ${output.[feature].specificMessage}

# Combined verification (most robust approach)
- assertVisible:
    id: ${output.[feature].submitButtonId}
- assertVisible: ${output.[feature].submitButtonText}

# Wait for animations
- waitForAnimationToEnd:
    timeout: 3000
```

**Input Patterns:**
```yaml
# Tap using ID (most reliable)
- tapOn:
    id: ${output.[feature].inputFieldId}
- eraseText
- inputText: ${TEST_DATA_VARIABLE}

# Tap using text (when ID not available)
- tapOn: ${output.[feature].buttonText}
```

**Navigation Patterns:**
```yaml
# Navigation with comprehensive verification
- tapOn:
    id: ${output.[feature].submitButtonId}

# Verify navigation succeeded with both ID and text
- assertVisible:
    id: ${output.[nextScreen].pageTitleId}
- assertVisible: ${output.[nextScreen].pageTitleText}
```

**Error Verification Patterns:**
```yaml
# Verify error container is visible
- assertVisible:
    id: ${output.[feature].errorContainerId}

# Verify specific error message from POM
- assertVisible: ${output.[feature].errorMessageText}

# Verify error is displayed (not hardcoded text)
- assertVisible: ${output.[feature].validationErrorText}
```

### 8. **Environment Variables Usage:**
```yaml
env:
  # Use descriptive variable names
  FEATURE_INPUT_DATA: "${output.testData.validInputs.standard}"
  EXPECTED_RESULT: "Expected success message"
  TIMEOUT_DURATION: 5000
  
  # Use custom random data generation from testdata.js
  UNIQUE_ID: "${output.testData.generateUniqueId()}"
  TEST_EMAIL: "${output.testData.generateRandomEmail()}"
  RANDOM_TEXT: "${output.testData.generateRandomString(10)}"
```

### 9. **File Naming Conventions:**
```
tests/[feature_name]/
├── _common/
│   ├── launch_app.yaml
│   ├── verify_[feature]_screen.yaml
│   ├── fill_[form_name].yaml
│   └── navigate_to_[screen].yaml
├── [feature]_success.yaml
├── [feature]_empty_fields.yaml
├── [feature]_invalid_formats.yaml
├── [feature]_boundary_values.yaml
├── [feature]_special_characters.yaml
├── [feature]_network_error.yaml
└── [feature]_edge_cases.yaml
```

### 10. **Screen State Verification Requirements:**

**IMPORTANT: Each test must verify both PRE and POST screen states using ID and text verification**

**Pre-Screen Verification:**
Before executing main test steps, verify you're on the correct starting screen:
```yaml
# Verify we're on the expected starting screen - Use ID verification
- assertVisible:
    id: ${output.[preScreen].pageTitle}
- assertVisible:
    id: ${output.[preScreen].requiredElement1}

# Verify screen content - Use text verification from POM
- assertVisible: ${output.[preScreen].headerText}
- assertVisible: ${output.[preScreen].screenIdentifierText}
```

**Post-Screen Verification:**
After test execution, verify successful transition to expected end screen:
```yaml
# Verify we've reached the expected destination screen - Use ID verification
- assertVisible:
    id: ${output.[postScreen].pageTitle}
- assertVisible:
    id: ${output.[postScreen].confirmationElement}

# Verify success content - Use text verification from POM
- assertVisible: ${output.[postScreen].successMessage}
- assertVisible: ${output.[postScreen].confirmationText}
```

**assertVisible Usage Patterns:**
- **ID-based verification:** `assertVisible: { id: ${output.feature.elementId} }`
- **Text-based verification:** `assertVisible: ${output.feature.elementText}` (uses text property by default)
- **Explicit text verification:** `assertVisible: { text: ${output.feature.elementText} }`

**Screen Definition Pattern in POM:**
When creating element definitions, include BOTH IDs and text values for comprehensive verification:

```javascript
// elements/[feature].js - Define elements with both ID and text properties
output.[featureStartScreen] = {
    // ID-based elements (for reliable element location)
    pageTitleId: 'screen_title_id',
    headerElementId: 'header_container_id',
    actionButtonId: 'primary_action_btn',
    
    // Text-based elements (for content verification)
    pageTitleText: 'Starting Screen Title',
    headerText: 'Welcome to Feature',
    actionButtonText: 'Get Started',
    
    // Combined approach for robust verification
    navigationElementId: 'nav_back_btn',
    navigationElementText: 'Back'
}

output.[featureEndScreen] = {
    // ID-based elements
    successContainerId: 'success_screen_container',
    confirmationIconId: 'success_checkmark_icon',
    nextActionButtonId: 'continue_btn',
    
    // Text-based elements  
    successTitle: 'Success!',
    confirmationMessage: 'Operation completed successfully',
    nextActionText: 'Continue',
    
    // Status indicators
    statusMessageId: 'status_message_container',
    statusMessageText: 'Your request has been processed'
}

output.[feature] = {
    // Feature interaction elements with both ID and text
    inputFieldId: 'email_input_field',
    inputFieldPlaceholder: 'Enter your email',
    
    submitButtonId: 'submit_form_btn',
    submitButtonText: 'Submit',
    
    // Error handling elements
    errorContainerId: 'error_message_container',
    errorMessageText: 'Please correct the errors below'
}
```

**Complete Test Flow Pattern:**
```yaml
# Load elements for ALL screens involved in this specific test
- runScript: 
    file: ../../elements/[preScreen].js
- runScript: 
    file: ../../elements/[feature].js
- runScript: 
    file: ../../elements/[postScreen].js

# Load test data
- runScript: 
    file: ../../config/testdata.js

# PRE-CONDITION: Verify starting screen state (ID + Text verification)
- assertVisible:
    id: ${output.[preScreen].pageTitleId}
- assertVisible: ${output.[preScreen].pageTitleText}
- assertVisible:
    id: ${output.[preScreen].requiredElementId}

# Execute main test steps
[Main feature interaction logic]

# POST-CONDITION: Verify ending screen state (ID + Text verification)
- assertVisible:
    id: ${output.[postScreen].successContainerId}
- assertVisible: ${output.[postScreen].successTitle}
- assertVisible:
    id: ${output.[postScreen].confirmationIconId}
- assertVisible: ${output.[postScreen].confirmationMessage}
```

**Navigation Verification Subflows:**
Create reusable verification subflows with both ID and text checks:

```yaml
# _common/verify_[screen_name]_screen.yaml
appId: com.madgicaltechdom.storagesysapp
---
# Verify screen by ID (structural verification)
- assertVisible:
    id: ${output.[screenName].pageTitleId}
- assertVisible:
    id: ${output.[screenName].keyElementId1}
- assertVisible:
    id: ${output.[screenName].keyElementId2}

# Verify screen content by text (content verification)  
- assertVisible: ${output.[screenName].pageTitleText}
- assertVisible: ${output.[screenName].keyElementText1}

# Wait for screen to fully load
- waitForAnimationToEnd:
    timeout: 2000
```

**Usage in main test:**
```yaml
# Verify pre-condition screen (comprehensive verification)
- runFlow: "_common/verify_[pre_screen]_screen.yaml"

# Execute feature actions
[Main test logic]

# Verify post-condition screen (comprehensive verification)
- runFlow: "_common/verify_[post_screen]_screen.yaml"
```

## Specific Test Scenarios to Include:
[List specific scenarios relevant to your feature - customize this section based on the actual feature being tested]

**For each scenario, specify:**
- **Pre-Screen:** What screen should the test start from?
- **Post-Screen:** What screen should the test end on?
- **Key Verification Points:** What elements confirm successful transition?

**Example Scenario Definitions:**
- **Happy Path:** Pre-Screen: [FeatureEntry] → Post-Screen: [SuccessConfirmation]
- **Validation Error:** Pre-Screen: [FeatureForm] → Post-Screen: [FeatureForm with Error]
- **Cancel Action:** Pre-Screen: [FeatureForm] → Post-Screen: [PreviousScreen]

## Quality Checklist:
- [ ] Each test has proper metadata and documentation
- [ ] POM elements are properly defined and referenced
- [ ] Only required POM files are loaded per test
- [ ] Reusable subflows are created for common actions
- [ ] Test data is externalized and uses custom random generation functions
- [ ] All user paths are covered (happy path + error paths)
- [ ] Pre and post screen states are verified
- [ ] Proper assertions verify expected outcomes
- [ ] Environment variables are used for test data
- [ ] File naming follows consistent conventions
- [ ] Tests are independent and can run in any order