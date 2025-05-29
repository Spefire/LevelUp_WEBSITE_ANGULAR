const fs = require('fs');

const environmentContent = `
export const environment = {
  production: true,
  NG_APP_SUPABASE_ANON_KEY: '${process.env.NG_APP_SUPABASE_ANON_KEY}',
  NG_APP_SUPABASE_URL: '${process.env.NG_APP_SUPABASE_URL}'
};
`;

fs.writeFileSync('src/environments/environment.prod.ts', environmentContent);
