const fs = require('fs');

const environmentContent = `
export const environment = {
  production: true,
  NG_APP_BO_ADMIN: '${process.env.NG_APP_BO_ADMIN}',
  NG_APP_BO_MASTER: '${process.env.NG_APP_BO_MASTER}',
  NG_APP_BO_PLAYER: '${process.env.NG_APP_BO_PLAYER}',
  NG_APP_API_ANON_KEY: '${process.env.NG_APP_API_ANON_KEY}',
  NG_APP_API_URL: '${process.env.NG_APP_API_URL}',
  NG_APP_SUPABASE_ANON_KEY: '${process.env.NG_APP_SUPABASE_ANON_KEY}',
  NG_APP_SUPABASE_URL: '${process.env.NG_APP_SUPABASE_URL}'
};
`;

fs.writeFileSync('src/environments/environment.prod.ts', environmentContent);
