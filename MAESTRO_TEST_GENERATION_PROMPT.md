# Maestro Test Generation Prompt

## Feature Overview
[Provide a clear, concise description of the feature to be tested]

## Test Generation Guidelines

### 1. Test Coverage Areas
For each feature, ensure comprehensive test coverage including:

#### A. Positive Flows
- Happy path scenarios
- Successful operations with valid inputs
- Complete user journeys
- Data persistence across sessions

#### B. Input Validation
- Empty field validations
- Invalid input formats
- Minimum/maximum length checks
- Required field indicators
- Input masking and formatting

#### C. Error Handling
- Network failure scenarios
- Server error responses
- Timeout conditions
- Offline behavior
- Error message clarity and localization

#### D. Business Logic
- Duplicate entry prevention
- Permission-based access control
- Data consistency rules
- Workflow validations
- State management

#### E. Edge Cases
- Long input strings
- Special characters in inputs
- Boundary value analysis
- Concurrency issues
- Cross-platform consistency

### 2. Test Structure
- Follow the pattern: `feature_scenario_condition.yaml`
- Use the standard header format:
  ```yaml
  # Test ID: [FEATURE]-[SCENARIO]-[CONDITION]-[NUMBER]
  # Description: [Brief description of the test case]
  # Preconditions: [List any required preconditions]
  # Expected Results: [Expected outcome]
  # Tags: [smoke, regression, e2e, etc.]
  appId: com.madgicaltechdom.storagesysapp
  name: "[Feature] - [Scenario] - [Condition]"
  description: "[Detailed description]"
  
  env:
    - file: ../../config/testdata.js
  ```

### 2. Page Object Model (POM)
- Create element definitions in `elements/[feature].js`
- Use this structure:
  ```javascript
  output.[feature] = {
    // Navigation
    tabName: 'tab-name',
    
    // Common elements
    submitButton: 'submit-button',
    cancelButton: 'cancel-button',
    
    // Form fields
    form: {
      inputField: 'input-field',
      errorMessage: 'error-message'
    },
    
    // Messages
    successMessage: 'Success!',
    errorMessage: 'Error!'
  };
  ```
- Load elements with: `- runScript: ../../elements/[feature].js`
- Reference elements with: `${output.[feature].elementName}`

### 3. Test Data Management
- Store test data in `config/testdata.js`
- Use this structure:
  ```javascript
  output.testData = {
    users: {
      validUser: {
        email: "test@example.com",
        name: "Test User",
        // Add other user properties
      }
    },
    // Add other test data
  };
  ```
- Access test data with: `${output.testData.users.validUser.email}`

### 4. Test Case Structure
1. **Setup**: Load required data and navigate to the screen
   ```yaml
   - runScript: ../../elements/[feature].js
   - runScript: ../../config/testdata.js
   - evalScript: ${output.userData = output.testData.users.validUser}
   ```

2. **Execution**: Perform the test steps
   ```yaml
   - tapOn: ${output.[feature].tabName}
   - waitForAnimationToEnd
   - inputText: ${output.[feature].form.inputField}
     text: "${output.userData.name}"
   - tapOn: ${output.[feature].submitButton}
   ```

3. **Verification**: Assert expected outcomes
   ```yaml
   - assertVisible: ${output.[feature].successMessage}
   - assertNotVisible: ${output.[feature].errorMessage}
   - takeScreenshot: "[feature]_[scenario]_success"
   ```

### 5. Test Scenarios to Include
For each feature, consider:
- **Happy Path**: Successful operations
- **Input Validation**: Empty fields, invalid formats
- **Error Handling**: Network errors, server errors
- **Edge Cases**: Long inputs, special characters
- **Business Logic**: Duplicate entries, permissions

### 6. Best Practices
- Use `waitForAnimationToEnd` after navigation
- Include `takeScreenshot` for visual verification
- Use descriptive test names and comments
- Group related test cases in the same directory
- Include error handling and retries where needed
- Verify both UI state and business logic

### Example Test Case
```yaml
# Test ID: PROFILE-EDIT-VALID-001
# Description: Verify user can update profile with valid data
# Preconditions: User is logged in
# Expected Results: Profile is updated successfully
# Tags: [profile, edit, smoke, regression]
appId: com.madgicaltechdom.storagesysapp
name: "Profile - Edit - Valid Data"
description: "Test updating profile with valid data"

# Load POM and test data
- runScript: ../../elements/userProfile.js
- runScript: ../../config/testdata.js
- evalScript: ${output.userData = output.testData.users.validUser}

# Test steps
- tapOn: ${output.userProfile.profileTab}
- waitForAnimationToEnd
- tapOn: ${output.userProfile.editProfileButton}
- inputText: ${output.userProfile.form.nameInput}
  text: "${output.userData.name} Updated"
- tapOn: ${output.userProfile.saveButton}

# Verification
- assertVisible: ${output.userProfile.successMessage}
- assertVisible: ${output.userProfile.userName}
  text: "${output.userData.name} Updated"
- takeScreenshot: "profile_edit_success"
```

## Output Format
For each test case, provide:
1. Test case YAML file
2. Any new POM elements needed
3. Any new test data requirements
4. Dependencies on other test cases

## Quality Checks
Before finalizing, ensure each test:
- Follows the POM pattern
- Uses proper test data
- Includes assertions
- Handles errors gracefully
- Is maintainable and readable
