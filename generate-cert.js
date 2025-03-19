const fs = require('fs');
const { execSync } = require('child_process');

// Check if OpenSSL is installed
try {
  execSync('openssl version');
  console.log('OpenSSL is installed, generating certificates...');
} catch (error) {
  console.error('OpenSSL is not installed. Please install OpenSSL to generate certificates.');
  process.exit(1);
}

// Generate certificates
try {
  // Generate a private key
  execSync('openssl genrsa -out key.pem 2048');
  
  // Generate a CSR (Certificate Signing Request)
  execSync('openssl req -new -key key.pem -out csr.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"');
  
  // Generate a self-signed certificate
  execSync('openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem');
  
  // Clean up the CSR file
  fs.unlinkSync('csr.pem');
  
  console.log('SSL certificates generated successfully!');
  console.log('You can now run the server with HTTPS support.');
} catch (error) {
  console.error('Error generating certificates:', error.message);
  process.exit(1);
}