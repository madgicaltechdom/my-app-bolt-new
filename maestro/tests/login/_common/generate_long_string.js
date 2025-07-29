// Generate a long email and long password for testing input fields
// This script sets output variables directly for Maestro to use

// Generate a long email address
const emailPrefix = 'testuser';
const domain = '@example.com';
// Create a prefix that fills the gap to make total email length ~100 characters
const repeatedSegment = '1234567890';
const longEmailPrefix = emailPrefix + repeatedSegment.repeat(8); // ~88 chars
const longEmail = (longEmailPrefix + domain).slice(0, 100); // Ensure 100-char email

// Generate a long password (e.g., 128 characters)
const passwordPattern = 'Abcdef123!@#';
const longPassword = passwordPattern.repeat(10).slice(0, 128); // Exactly 128 chars

// Set output variables for use in Maestro flows
output.longEmail = longEmail;
output.longPassword = longPassword;
output.emailLength = longEmail.length;
output.passwordLength = longPassword.length;
output.timestamp = new Date().toISOString();
output.type = 'test_credentials';

// Log output for debugging in Maestro
console.log(`Generated long email of length: ${longEmail.length}`);
console.log(`Generated long password of length: ${longPassword.length}`);
