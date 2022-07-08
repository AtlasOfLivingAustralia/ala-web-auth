import { getClient, getAuthUrl } from '../src';
import { getJson, OIDCAuthClientMode } from '../src/helpers';
import config from '../src/config.json';

test('getAuthUrl correct parameter generation', () => {
  const client = getClient('test-client-id');
  const url = getAuthUrl(client, 'http://localhost:3000');

  expect(url).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A3000');
  expect(url).toContain('client_id=test-client-id');
  expect(url).toContain('response_type=token');
});

test('getAuthUrl correct auth URL from config', () => {
  const modes: OIDCAuthClientMode[] = ['prod', 'test', 'dev'];
  modes.forEach((mode) => {
    const client = getClient('test-client-id', ['openid', 'email'], mode);
    const url = getAuthUrl(client, 'http://localhost:3000');

    expect(url).toContain(config[mode].auth.endpoint);
  });
});

test('getJson returns null on incorrect formatting', () => {
  expect(getJson('')).toBeNull();
  expect(getJson('incorrect format')).toBeNull();
  expect(getJson('\\')).toBeNull();
  expect(getJson('{a: 24}')).toBeNull();
});

test('getJson handles correct formatting', () => {
  expect(getJson('{"a": 24}')).toEqual(JSON.parse('{"a": 24}'));
});
