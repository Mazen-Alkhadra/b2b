module.exports = {
  GetAuthIsLoggedIn: '/api/auth/is_loggedin',
  GetAuthLogout: '/api/auth/logout',
  GetDocFromLocalFS: '/api/fs/doc',
  GetImgFromLocalFS: '/api/fs/img',

  GetPublicActivateAcount: '/api/auth/activate/:loginName/:code',
  GetPublicCompanyTypes: '/api/public/company-type',
  GetPublicCities: '/api/public/cities',
  GetPublicCountries: '/api/public/countries',
  GetPublicAds: '/api/public/ads',
  GetPublicPrivacyPolicy: '/api/public/privacy-policy',
  GetPublicTerms: '/api/public/terms',

  PostAuthLogin: '/api/auth/login',
  PostAuthSignup: '/api/auth/signup',
  PostAuthGenActivateCode: '/api/auth/code/activate/generate',
  PostAuthGenResetPasswordCode: '/api/auth/code/reset-password/generate',
  PostAuthResetPassword: '/api/auth/reset-password',
  PostPublicCompany: '/api/public/company',
  PostPublicUploadDoc: '/api/public/doc/upload',
  PostPublicUploadImg: '/api/public/img/upload',
  PostPublicInfomCompletePay: '/api/public/e-pay/complete',
  PostPublicIssueReport: '/api/public/issue-report'
}