import queryString from 'query-string';

// Helper functions
import {
  getAuthUrl,
  getJson,
  OIDCAuthClient,
  OIDCAuthClientMode,
  OIDCAuthResult
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
const getToken = (): OIDCAuthResult | null =>
  getJson(
    window.localStorage.getItem('ala-auth-token') || ''
  ) as OIDCAuthResult;

// Attempts to parse the URL and retireve an auth token after redirect
const getRedirectResult = (): OIDCAuthResult | null => {
  // If an access token was provided in the URL
  if (window.location.href.includes('access_token')) {
    // Parse the URL
    const { query: params } = queryString.parseUrl(
      window.location.href.replace('#access_token', '?access_token')
    );
    // Check that an access_token and expiry were provided
    if (params.access_token && params.expires_in) {
      const token: OIDCAuthResult = {
        accessToken: params.access_token as string,
        expiresIn: Number.parseInt(params.expires_in as string, 10)
      };
      // Update local storage
      window.localStorage.setItem('ala-auth-token', JSON.stringify(token));
      return token;
    }
  }

  return getToken();
};

// Redirects the user for authentication
const signInWithRedirect = (
  client: OIDCAuthClient,
  redirectUri: string
): void => window.location.replace(getAuthUrl(client, redirectUri));

const signOut = () => window.localStorage.removeItem('ala-auth-token');

export { getClient, getToken, getRedirectResult, signInWithRedirect, signOut };
