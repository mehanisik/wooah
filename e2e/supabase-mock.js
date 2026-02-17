const SUPABASE_URL = 'https://test-project.supabase.co';

const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
const payload = Buffer.from(
  JSON.stringify({ sub: 'test-user-123', role: 'authenticated', exp: 9999999999, email: 'test@example.com' }),
).toString('base64url');
const TEST_ACCESS_TOKEN = `${header}.${payload}.dGVzdA`;

export const MOCK_USER = {
  id: 'test-user-123',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@example.com',
  email_confirmed_at: '2024-01-01T00:00:00.000Z',
  phone: '',
  confirmed_at: '2024-01-01T00:00:00.000Z',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  app_metadata: { provider: 'email', providers: ['email'] },
  user_metadata: {},
  identities: [],
};

function sessionPayload() {
  return {
    access_token: TEST_ACCESS_TOKEN,
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: 9999999999,
    refresh_token: 'test-refresh-token',
    user: MOCK_USER,
  };
}

export async function mockSupabaseAuth(page) {
  await page.route(`${SUPABASE_URL}/auth/v1/otp`, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );

  await page.route(`${SUPABASE_URL}/auth/v1/verify`, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(sessionPayload()) }),
  );

  await page.route(`${SUPABASE_URL}/auth/v1/logout**`, (route) => route.fulfill({ status: 204 }));

  await page.route(`${SUPABASE_URL}/auth/v1/token**`, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(sessionPayload()) }),
  );

  await page.route(`${SUPABASE_URL}/rest/v1/rpc/**`, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: 'null' }),
  );
}

export async function loginViaOtp(page) {
  await page.fill('#loginEmail', 'test@example.com');
  await page.click('#loginSendCode');
  await page.waitForSelector('#loginOtpStep:not([style*="none"])');
  await page.fill('#loginOtpInput', '123456');
  await page.click('#loginVerifyOtp');
  await page.waitForSelector('#app[style*="contents"]', { timeout: 5000 });
}
