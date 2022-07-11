import queryString from 'query-string';

interface OIDCAuthConfigEntry {
  auth: {
    endpoint: string;
    routes: {
      authorize: string;
    };
  };
}

interface OIDCAuthConfig {
  prod: OIDCAuthConfigEntry;
  test: OIDCAuthConfigEntry;
  dev: OIDCAuthConfigEntry;
}

type OIDCAuthClientMode = 'prod' | 'test' | 'dev';

interface OIDCAuthClient {
  clientId: string;
  scope: string;
  mode: OIDCAuthClientMode;
  config: OIDCAuthConfig;
}

interface OIDCAuthResult {
  accessToken: string;
  expiresIn: number;
}

/**
 * Generates a URL to use for implicit authentication.
 * @param client The client configuration to be used for authentication
 * @param redirectUri The URI to redirect to upon authentication
 */
function getAuthUrl(client: OIDCAuthClient, redirectUri: string): string {
  const { endpoint, routes } = client.config[client.mode].auth;

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

/**
 * A helper function which safely parses JSON strings
 * @param input The input JSON string to parse
 */
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
  OIDCAuthResult,
  OIDCAuthConfig
};
