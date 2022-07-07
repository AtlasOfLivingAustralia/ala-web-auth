// Helper functions
import {
  getAuthUrl,
  // Types
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
const getAuthToken = () => window.localStorage.getItem('ala-auth-token');

// Redirects the user for authentication
const signInWithRedirect = (
  client: OIDCAuthClient,
  redirectUri: string
): void => window.location.replace(getAuthUrl(client, redirectUri));

// Redirects the user for authentication
const signInWithTab = async (
  client: OIDCAuthClient,
  redirectUri: string
): Promise<OIDCAuthResult> =>
  new Promise((resolve, reject) => {
    const url = getAuthUrl(client, redirectUri);
    const wnd = window.open(url);

    if (wnd) {
      wnd.focus();
      wnd.addEventListener('load', () => console.log(window.location));
    } else reject(new Error('Failed to open new tab'));
  });

export {
  getAuthUrl,
  getClient,
  getAuthToken,
  signInWithRedirect,
  signInWithTab
};
