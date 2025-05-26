const fs = require('fs');

const environmentContent = `
export const environment = {
  production: true,
};
`;

fs.writeFileSync('src/environments/environment.prod.ts', environmentContent);
