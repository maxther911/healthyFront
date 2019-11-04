// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  authenticatedUri: 'http://localhost:8080/healthyOauthServer/',
  clientDetailsURL : 'http://localhost:9001/healthyClientServer/',
  sensorsDataUrl :  'http://localhost:9002/healthyDataService/',
  token: 'oauth/token',
  checkToken : 'oauth/check_token',
  userUri : 'users/',
  extraMethod : 'extra/',
  userById: 'id/',
  userByToken : 'getUserByToken',
  third: 'third/',
  sensors: 'sensors/',
  getInformationById: 'getInformationById/',
  appConnect: 'USER_CLIENT_APP:password',
  appId: 'USER_CLIENT_APP',
  grandTypePassword: 'password'
};
