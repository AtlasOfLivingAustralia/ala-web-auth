import queryString from 'query-string';

// Import configuration file
import config from './config.json';

type OIDCAuthClientMode = 'prod' | 'test' | 'dev';

interface OIDCAuthClient {
  clientId: string;
  scope: string;
  mode: OIDCAuthClientMode;
}

interface OIDCAuthResult {
  accessToken: string;
  expiresIn: number;
}

function getAuthUrl(client: OIDCAuthClient, redirectUri: string): string {
  const { endpoint, routes } = config[client.mode].auth;

  // Stringify the query parameters
  const params = queryString.stringify({
    response_type: 'token',
    scope: client.scope,
    client_id: client.clientId,
    redirect_uri: redirectUri
  });

  // Redirect the user
  return `https://${endpoint}/${routes.authorize}?${params}`;
}

// Safe-parse functionality for JSON
const getJson = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getAuthUrl,
  getJson,
  OIDCAuthClient,
  OIDCAuthClientMode,
  OIDCAuthResult
};
