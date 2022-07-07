import query from 'query-string';

// Import configuration file
import config from './config.json';

type OIDCAuthClientMode = 'prod' | 'test' | 'dev';

interface OIDCAuthClient {
  clientId: string;
  scope: string;
  mode: OIDCAuthClientMode;
}

interface OIDCAuthResult {
  token: string;
  expiresIn: number;
}

function getAuthUrl(client: OIDCAuthClient, redirectUri: string): string {
  const { endpoint, routes } = config[client.mode].auth;

  // Stringify the query parameters
  const params = query.stringify({
    client_id: client.clientId,
    redirectUri
  });

  // Redirect the user
  return `https://${endpoint}/${routes.authorize + params}`;
}

// eslint-disable-next-line import/prefer-default-export
export { getAuthUrl, OIDCAuthClient, OIDCAuthClientMode, OIDCAuthResult };
