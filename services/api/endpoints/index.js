module.exports = {
  GetAuthIsLoggedIn: '/api/auth/is_loggedin',
  GetAuthLogout: '/api/auth/logout',
  GetDocFromLocalFS: '/api/fs/doc',
  GetImgFromLocalFS: '/api/fs/img',
  GetAdminFullUsers: '/api/admin/users/full',
  GetAdminFullCompany: '/api/admin/company/full',
  GetAdminFullSubscribePackages: '/api/admin/subscription/packages/full',
  GetAdminSubscribePackageFeatures: '/api/admin/subscription/package/:idPackage/features',
  GetAdminSubscribeFeaturesFull: '/api/admin/subscription/features/full',
  GetAdminSubscribePromotionsFull: '/api/admin/subscription/promotions/full',
  GetAdminUsersSubscribeFull: '/api/admin/subscription/users-subscriptions/full',
  GetAdminACRolesFull: '/api/admin/ac/roles/full',
  GetAdminACRolePermissions: '/api/admin/ac/role/:idRole/permissions/full',
  GetAdminACResourcesFull: '/api/admin/ac/resources/full',
  GetAdminACPermissionsFull: '/api/admin/ac/permissions/full',
  GetAdminIssuesReportsFull: '/api/admin/issues-reports/full',
  GetAdminFaqsFull: '/api/admin/faqs/full',
  GetAdminAboutusFull: '/api/admin/aboutus/full',
  GetAdminCategoriesFull: '/api/admin/categories/full',
  GetAdminBrandsFull: '/api/admin/brands/full',
  GetAdminProductsFull: '/api/admin/products/full',
  GetAdminContactInfoFull: '/api/admin/contact-info/full',
  GetAdminPrivacyPolicyFull: '/api/admin/privacy-policy/full',
  GetAdminTermsFull: '/api/admin/terms/full',
  GetAdminUsersCaresFull: '/api/admin/users/cares/full',
  GetAdminTendersFull: '/api/admin/tenders/full',
  GetAdminOffersFull: '/api/admin/offers/full',
  GetAdminPaymentsFull: '/api/admin/payments/full',

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
  PostAdminUserSubscribe: '/api/admin/subscription/user-subscription',
  PostAdminUserSubscribeUpdate: '/api/admin/subscription/user-subscription/update',
  POSTAdminACRole: '/api/admin/ac/role',
  POSTAdminACRoleUpdate: '/api/admin/ac/role/update',
  PostResetACResetRolePermissions: '/api/admin/ac/role/permissions/reset',
  PostAdminIssueReportUpdate: '/api/admin/issue-report/update',
  PostAdminFaq: '/api/admin/faq',
  PostAdminFaqUpdate: '/api/admin/faq/update',
  PostAdminAboutusUpdate: '/api/admin/aboutus/update',
  PostAdminCategory: '/api/admin/category',
  PostAdminCategoryUpdate: '/api/admin/category/update',
  PostAdminBrand: '/api/admin/brand',
  PostAdminBrandUpdate: '/api/admin/brand/update',
  PostAdminProduct: '/api/admin/product',
  PostAdminProductUpdate: '/api/admin/product/update',
  PostAdminContctInfoUpdate: '/api/admin/contact-info/update',
  PostAdminPrivacyPolicyUpdate: '/api/admin/privacy-policy/update',
  PostAdminTermsUpdate: '/api/admin/term/update',
  PostAdminUploadDoc: '/api/admin/doc/upload',
  PostAdminUploadImg: '/api/admin/img/upload',

  DeleteAdminUser: '/api/admin/user',
  DeleteAdminCompany: '/api/admin/company',
  DeleteAdminSubscribePackage: '/api/admin/subscription/package',
  DeleteAdminSubscribePromotion: '/api/admin/subscription/promotion',
  DeleteAdminUserSubscribe: '/api/admin/subscription/user-subscription',
  DeleteAdminACRole: '/api/admin/ac/role',
  DeleteAdminIssueReport: '/api/admin/issue-report',
  DeleteAdminFaq: '/api/admin/faq',
  DeleteAdminAboutus: '/api/admin/aboutus',
  DeleteAdminCategory: '/api/admin/category',
  DeleteAdminBrand: '/api/admin/brand',
  DeleteAdminProduct: '/api/admin/product'
}