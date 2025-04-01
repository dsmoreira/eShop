const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src', 'assets', 'env.js');

const content = `(function(window) {
  window.__env = window.__env || {};
  
  // API URLs
  window.__env.apiUrl = '${process.env.API_URL || ''}';
  window.__env.basketApiUrl = '${process.env.BASKET_API_URL || ''}';
  window.__env.orderingApiUrl = '${process.env.ORDERING_API_URL || ''}';
  window.__env.identityApiUrl = '${process.env.IDENTITY_API_URL || ''}';
  
  // Estas variáveis são injetadas pelo Aspire
})(this);`;

fs.writeFileSync(envFilePath, content);
console.log(`Environment file ${envFilePath} has been generated`); 