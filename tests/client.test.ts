import { getClient, defaultConfig } from '../src';

test('getClient has correct parameter fallbacks', () => {
  const client = getClient('test-client-id');

  // Parameter fallbacks
  expect(client.clientId).toEqual('test-client-id');
  expect(client.mode).toEqual('prod');
  expect(client.scope).toEqual('openid email');
  expect(client.config).toEqual(defaultConfig);
});

test('getClient concatinates scope correctly', () => {
  const client = getClient('test-client-id', ['openid', 'profile']);
  expect(client.scope).toEqual('openid profile');
});
