// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  algolia: {
    prodApiKey: '43024c8f7721bf107299ebdef48b972e',
    appId: 'N0TA2VKCHM',
    apiKey: '783df2fee854753ff2bf5f51cc155cdf',
    AppId: 'N0TA2VKCHM',
    ApiKey: '783df2fee854753ff2bf5f51cc155cdf',
    indexName: 'weusealgolia',
    routing: true
  },
  firebase: {
    apiKey: "AIzaSyBFGNi9wkx_8BLOr5v9TmCJIKHBUX1lauM",
    authDomain: "weusealgolia-9fbed.firebaseapp.com",
    databaseURL: "https://weusealgolia-9fbed.firebaseio.com",
    projectId: "weusealgolia-9fbed",
    storageBucket: "weusealgolia-9fbed.appspot.com",
    messagingSenderId: "213066620652"
  },
  cloudinary: { 
    cloudName: 'dfcq5fnhg', 
    uploadPreset: 'epafwhgt' 
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
