// Test data configuration for Maestro tests
// This file exports test data to the global output object for use in Maestro flows

// Using a simple object literal that's compatible with Maestro's JavaScript engine
output.testData = {
  // User credentials
  users: {
    validUser: {
      email: "kapil.jain@madgicaltechdom.com",
      password: "Madgicaltechdom1",
      name: "Kapil Jain",
      bio: "I am a coder and techi at heart",
      memberSince: "07/29/25"
    }
  },

  // Invalid login scenarios
  invalidCredentials: {
    wrongPassword: {
      email: "test.user@example.com",
      password: "WrongPassword123",
      expectedError: "Invalid email or password"
    },
    nonExistentEmail: {
      email: "nonexistent@example.com",
      password: "SomePassword123",
      expectedError: "Account not found"
    },
    malformedEmail: {
      email: "not-an-email",
      password: "Password123",
      expectedError: "Please enter a valid email address"
    },
    emptyCredentials: {
      email: "",
      password: "",
      expectedError: "Email and password are required"
    }
  },

  // Test data for password reset
  passwordReset: {
    validEmail: "test.user@example.com",
    invalidEmail: "nonexistent@example.com",
    newPassword: "NewSecurePass123!",
    resetToken: "test-reset-token-123"
  },

  // Session data
  sessions: {
    defaultTimeout: 30, // seconds
    rememberMe: true
  },
  
  // UI elements selectors
  selectors: {
    loginForm: {
      emailField: "id=email",
      passwordField: "id=password",
      submitButton: "id=login-button",
      errorMessage: "id=error-message",
      successMessage: "id=success-message"
    }
  }
};

