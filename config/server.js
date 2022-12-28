module.exports = {
  app: {
    name: 'B2B',
    defaultPort: 80,
    headersTimeout: 2 * 60 * 60 * 1000 /* 2h */
  },
  cluster: {
    maxWorkersNum: 5,
  },
  session: {
    defaultSecretKey: 'B2B@node-server',
    cookieMaxAge: 24 * 60 * 60 * 1000
  },
  cookie: {
    userLanguageKey: 'languagePref'
  },
  defaultEmailServer: {
    host: 'mail.b2back.net',
    port: 465,
    isSecure: true,
    userName: 'no-reply@b2back.net',
    password: 'D1y-rZ$YIcsv'
  },

  urls: {
    serverBaseUrl: 'http://b2back.net',
    activationAcountApiPath: '/api/auth/account/activate',
    resetPasswordApiPath: '/api/auth/account/resetpassword',
    resetPasswordPagePath: '/resetpassword'
  },

  ftp: {
    host: '',
    user: '',
    password: ''
  },

  uploads: {
    imgs: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/imgs`,
      fieldName: 'img',
      limitSizeBytes: 15 * 1024 * 1024, // 15 MB
      profileImgLimitSizeBytes: 5 * 1024 * 1024 // 5 MB      
    },
    docs: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/documnets`,
      fieldName: 'doc',
      limitSizeBytes: 20 * 1024 * 1024, // 20 MB
    },
    voices: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/voices`,
      fieldName: 'voice',
      limitSizeBytes: 30 * 1024 * 1024, // 30 MB
    },
    videos: {
      reqTimeoutMS: 60 * 60 * 1000 /* 60m */,
      resTimeoutMS: 60 * 60 * 1000 /* 60m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/videos`,
      fieldName: 'video',
      limitSizeBytes: 500 * 1024 * 1024, // 500 MB
    }
  },
  
  usersCodes: {
    activationCodeAge: 24 * 60 * 60 * 1000,
    resetPasswordCodeAge: 24 * 60 * 60 * 1000,
  },
  notify: {
    defualtImgUrl: 'http://b2back.net/assets/imgs/logo.svg'
  }
};