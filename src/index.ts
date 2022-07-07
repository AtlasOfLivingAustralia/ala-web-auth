// Helper functions
import {
  getAuthUrl,
  // Types
  OIDCAuthClient,
  OIDCAuthClientMode
} from './helpers';

/*
  PUBLIC AUTHENTICATION FUNCTIONS
*/
// Creates a client object to use for authentication
const getClient = (
  clientId: string,
  scope: string[] = ['openid', 'email'],
  mode: OIDCAuthClientMode = 'prod'
) => ({
  clientId,
  scope: scope.join(' '),
  mode
});

// Retireves the authentication from the local storage, or null if none exists.
const getAuthToken = () => window.localStorage.getItem('ala-auth-token');

// Redirects the user for authentication
const signInWithRedirect = (
  client: OIDCAuthClient,
  redirectUri: string
): void => window.location.replace(getAuthUrl(client, redirectUri));

export { getAuthUrl, getClient, getAuthToken, signInWithRedirect };
