module.exports = {
  GetAuthIsLoggedIn: '/api/auth/is_loggedin',
  GetAuthLogout: '/api/auth/logout',
  GetAdminFullUsers: '/api/admin/users/full',
  GetAdminFullCompany: '/api/admin/company/full',
  GetAdminFullSubscribePackages: '/api/admin/subscription/packages/full',
  GetAdminSubscribePackageFeatures: '/api/admin/subscription/package/:idPackage/features',
  GetAdminSubscribeFeaturesFull: '/api/admin/subscription/features/Full',
  GetAdminSubscribePromotionsFull: '/api/admin/subscription/promotions/Full',

  PostAuthLogin: '/api/auth/login',
  PostAuthSignup: '/api/auth/signup',
  PostAdminUser: '/api/admin/user',
  PostAdminUpdateUser: '/api/admin/user/update',
  PostAdminCompany: '/api/admin/company',
  PostAdminUpdateCompany: '/api/admin/company/update',
  PostAdminSubscribePackage: '/api/admin/subscription/package',
  PostAdminSubscribePackageUpdate: '/api/admin/subscription/package/update',
  PostAdminSubscribePackageFeaturesReset: '/api/admin/subscription/package/features/reset',
  PostAdminSubscribeFeatureUpdate: '/api/admin/subscription/feature/update',
  PostAdminSubscribePromotion: '/api/admin/subscription/promotion',
  PostAdminSubscribePromotionUpdate: '/api/admin/subscription/promotion/update',

  DeleteAdminUser: '/api/admin/user',
  DeleteAdminCompany: '/api/admin/company',
  DeleteAdminSubscribePackage: '/api/admin/subscription/package',
  DeleteAdminSubscribePromotion: '/api/admin/subscription/promotion',

}