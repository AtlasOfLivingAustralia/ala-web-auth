import { getClient } from '../src';

test('getClient has correct parameter fallbacks', () => {
  const client = getClient('test-client-id');

  // Parameter fallbacks
  expect(client.clientId).toEqual('test-client-id');
  expect(client.mode).toEqual('prod');
  expect(client.scope).toEqual('openid email');
});

test('getClient concatinates scope correctly', () => {
  const client = getClient('test-client-id', ['openid', 'profile']);
  expect(client.scope).toEqual('openid profile');
});
