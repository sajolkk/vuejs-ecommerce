import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../components/ProductDetailView.vue'
import TypeProductView from '../components/TypeProductView.vue'
import CategoryProduct from '../components/CategoryProduct.vue'
import SubCategoryProduct from '../components/SubCategoryProduct.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import AccountView from '../components/AccountView.vue'
import ProfileView from '../components/ProfileView.vue'
import PasswordChange from '../components/PasswordChange.vue'
import ProductQuestions from '../components/ProductQuestions.vue'
import ProductReviews from '../components/ProductReviews.vue'
import CheckOut from '../components/CheckOut.vue'
import OrderConfirm from '../components/OrderConfirm.vue'
import OrderView from '../components/OrderView.vue'
import OfferView from '../components/OfferView.vue'
import OfferInfo from '../components/OfferInfo.vue'
import OfferProducts from '../components/OfferProducts.vue'
import CompareProduct from '../components/CompareProduct.vue'
import OrderDetails from '../components/OrderDetails.vue'
import BrandProducts from '../components/BrandProducts.vue'
import SearchProducts from '../components/SearchProducts.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product-details/:slug/:product_id',
    name: 'product-detail',
    component: ProductDetailView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/type-products/:slug/:type_id',
    name: 'type-products',
    component: TypeProductView
  },
  {
    path: '/category-products/:type_slug/:type_id/:category_slug/:category_id',
    name: 'category-products',
    component: CategoryProduct
  },
  {
    path: '/subcategory-products/:type_slug/:type_id/:category_slug/:category_id/:subcategory_slug/:subcategory_id',
    name: 'subcategory-products',
    component: SubCategoryProduct
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/account/profile',
    name: 'accountProfile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/account/password-change',
    name: 'accountPasswordChange',
    component: PasswordChange,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrderView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/product-questions/:product_slug/:product_id',
    name: 'productQuestions',
    component: ProductQuestions,
  },
  {
    path: '/product-reviews/:product_slug/:product_id',
    name: 'productReviews',
    component: ProductReviews,
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut,
  },
  {
    path: '/order-confirm/:order_id',
    name: 'OrderConfirm',
    component: OrderConfirm,
  },
  {
    path: '/offers',
    name: OfferView,
    component: OfferView,
  },
  {
    path: '/offer-info/:slug/:offer_id',
    name: OfferInfo,
    component: OfferInfo,
  },
  {
    path: '/offer/offer-products/:slug/:offer_id',
    name: OfferProducts,
    component: OfferProducts,
  },
  {
    path: '/compare-products',
    name: CompareProduct,
    component: CompareProduct,
  },
  {
    path: '/order-details/:order_id',
    name: OrderDetails,
    component: OrderDetails,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/brand-products/:slug/:brand_id',
    name: BrandProducts,
    component: BrandProducts,
  },
  {
    path: '/product-search/:searchText',
    name: SearchProducts,
    component: SearchProducts,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
