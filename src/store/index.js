import { createStore } from 'vuex'
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/web.v1/';
var cartProduct = [];
var compareProduct = [];
var cartTotals = {
  subTotal: 0,
  total: 0,
  promoCode: 0,
  discountAmount: 0,
};
var userInfo = '';
if (localStorage.getItem("productCarts") !== null) {
  cartProduct = JSON.parse(localStorage.getItem('productCarts'));  
  cartTotals = JSON.parse(localStorage.getItem('cartTotals'));
}
if (localStorage.getItem("compareProduct") !== null) {
  compareProduct = JSON.parse(localStorage.getItem('compareProduct'));  
}
if (localStorage.getItem("userInfo") !== null) {
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
}
export default createStore({
  state: {
    imgBaseUrl: 'http://127.0.0.1:8000/',
    product_categories: [],
    brands: [],
    sliders: [],
    fetaureProducts: [],
    productDetail: [],
    colorSizes: [],
    carts: cartProduct,
    cartTotal: cartTotals,
    products: [],
    typeFilters: '',
    filterProducts: '',
    categoryFilters: '',
    categoryProducts: '',
    subCategoryFilters: '',
    subCategoryProducts: '',
    compareProducts: compareProduct,
    userInfo: userInfo,
    districts: [],
    // cartCalculation: {
    //   subTotal: 0,
    //   total: 0,
    //   promoCode: 0,
    //   discountAmount: 0,
    // }
  },
  getters: {
    imgBaseUrl: state => {
      return state.imgBaseUrl;
    },

    product_categories: state => {
      return state.product_categories;
    },

    brands: state => {
      return state.brands;
    },

    sliders: state => {
      return state.sliders;
    },

    fetaureProducts: state => {
      return state.fetaureProducts;
    },

    productDetail: state => {
      return state.productDetail;
    },

    productCart: state => {
      return state.carts;
    },
    cartTotal: state => {
      return state.cartTotal;
    },
    products: state => {
      return state.products;
    },
    typeFilter: state => {
      return state.typeFilters;
    },
    filterProducts: state => {
      return state.filterProducts;
    },
    categoryFilter: state => {
      return state.categoryFilters;
    },
    categoryProducts: state => {
      return state.categoryProducts;
    },
    subCategoryFilter: state => {
      return state.subCategoryFilters;
    },
    subCategoryProducts: state => {
      return state.subCategoryProducts;
    },
    compareProducts: state => {
      return state.compareProducts;
    },
    userInfo: state =>{
      return state.userInfo;
    },
    districts: state =>{
      return state.districts;
    },

  },
  mutations: {
    productCategorie(state, payload){
      return state.product_categories = payload;
    },

    brand(state, payload){
      return state.brands = payload;
    },
    
    slider(state, payload){
      return state.sliders = payload;
    },
    
    fetaureProducts(state, payload){
      return state.fetaureProducts = payload;
    },

    productDetail(state, payload){
      return state.productDetail = payload;
    },
    
    colorSize(state, payload){
      return state.colorSizes = payload;
    },

    productCart(state,payload){
      state.carts.push({
        product_id: payload.product.product_id,
        qty: payload.qty,
        variation_type_id: payload.variation_type_id,
        variation_id: payload.variation_id,
        product: payload.product,
      }); 
      var total = {
        subTotal: 0,
        total: 0,
        promoCode: 0,
        discountAmount: 0,
      };
      state.carts.forEach(item => {
        total.subTotal += item.qty * item.product.sale_price;
      });
      state.cartTotal = total;
      localStorage.setItem('productCarts',JSON.stringify(state.carts));
      localStorage.setItem('cartTotals',JSON.stringify(state.cartTotal));
    },

    cartQtyIncrement(state, payload){
      payload.qty++;
      var total = {
        subTotal: 0,
        total: 0,
        promoCode: 0,
        discountAmount: 0,
      };
      state.carts.forEach(item => {
        total.subTotal += item.qty * item.product.sale_price;
      });
      state.cartTotal = total;
      localStorage.setItem('productCarts',JSON.stringify(state.carts));
      localStorage.setItem('cartTotals',JSON.stringify(state.cartTotal));
    },

    productCartRemove(state,payload){
      state.carts = state.carts.filter(item => {
        return item.product_id !== payload;
      });
      var total = {
        subTotal: 0,
        total: 0,
        promoCode: 0,
        discountAmount: 0,
      };
      state.carts.forEach(item => {
        total.subTotal += item.qty * item.product.sale_price;
      });
      state.cartTotal = total;
      localStorage.setItem('productCarts',JSON.stringify(state.carts));
      localStorage.setItem('cartTotals',JSON.stringify(state.cartTotal));
    },
    clearCart(state){
      state.carts = []
      state.cartTotal = 0;
      localStorage.setItem('productCarts',JSON.stringify(state.carts));
      localStorage.setItem('cartTotals',JSON.stringify(state.cartTotal));
    },   
    products(state,payload){
      state.products = payload;
    },
    typeFilter(state,payload){
      state.typeFilters = payload;
    },
    filterProducts(state,payload){
      state.filterProducts = payload;
    },
    categoryFilter(state,payload){
      state.categoryFilters = payload;
    },
    categoryProducts(state,payload){
      state.categoryProducts = payload;
    },
    subCategoryFilter(state,payload){
      state.subCategoryFilters = payload;
    },
    subCategoryProducts(state,payload){
      state.subCategoryProducts = payload;
    },
    compareProduct(state,payload){
      const compareItem = state.compareProducts.find(item => item.product_id === payload.product_id);
      if(!compareItem){
        if (state.compareProducts.length !== 3) {
          state.compareProducts.push({
            product_id: payload.product_id,
            product: payload,
          }); 
          localStorage.setItem('compareProduct',JSON.stringify(state.compareProducts));
        }else{
          state.compareProducts = state.compareProducts.filter(item => {
            return item.product_id !== state.compareProducts[0].product_id;
          });
          state.compareProducts.push({
            product_id: payload.product_id,
            product: payload,
          }); 
          localStorage.setItem('compareProduct',JSON.stringify(state.compareProducts));
          console.log(state.compareProducts)
        }        
      }
    },
    productCompareRemove(state,payload){
      state.compareProducts = state.compareProducts.filter(item => {
        return item.product_id !== payload;
      });
      localStorage.setItem('compareProduct',JSON.stringify(state.compareProducts));
    },
    clearCompare(state){
      state.compareProducts = []
      localStorage.setItem('compareProduct',JSON.stringify(state.compareProducts));
    },
    logIn(state,payload){
      state.userInfo = payload;
      localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
    },
    profileUpdate(state,payload){
      state.userInfo.user = payload;
      localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
    },
    logout(state){
      state.userInfo = '';
      localStorage.setItem('userInfo',JSON.stringify(state.userInfo));      
    },
    districts(state,payload){
      state.districts = payload;    
    },
  },

  // action
  actions: {
    productCategory(context) {
      return new Promise((resolve, reject) => {
        axios.get('product-categories')
          .then((response)=>{
            context.commit('productCategorie',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    
    allBrand(context) {
      return new Promise((resolve, reject) => {
        axios.get('all-brand')
          .then((response)=>{
            context.commit('brand',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    offerSlider(context) {
      return new Promise((resolve, reject) => {
        axios.get('offer-slide')
          .then((response)=>{
            context.commit('slider',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    
    
    featureProducts(context) {
      return new Promise((resolve, reject) => {
        axios.get('feature-products')
          .then((response)=>{
            context.commit('fetaureProducts',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    productDetailf(context,product_id) {
      return new Promise((resolve, reject) => {
        axios.get('product-details/'+product_id)
          .then((response)=>{
            context.commit('productDetail',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },


    colorSizeVariations(context,colordata) {
      return new Promise((resolve, reject) => {
        axios.get('color-sizes/'+colordata.product_id+'/'+colordata.variation_type_id)
          .then((response)=>{
            context.commit('colorSize',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    // add to cart function
    addToCart(context,data) {
      const cartItem = context.state.carts.find(item => item.product_id === data.product.product_id);
      if(!cartItem){
        context.commit('productCart',data);
      }else{
        context.commit('cartQtyIncrement',cartItem);
      }      
    },
    removeProduct(context,product_id){
      context.commit('productCartRemove',product_id);
    },
    clearCart(context){
      context.commit('clearCart');
    },

    // type product
    typeProducts(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('type-products/'+data.slug+'/'+data.type_id+'?page='+data.page)
          .then((response)=>{
            context.commit('products',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    typeFilter(context,type_id) {
      return new Promise((resolve, reject) => {
        axios.get('type-filter/'+type_id)
          .then((response)=>{
            context.commit('typeFilter',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    filterProducts(context,formData) {
      return new Promise((resolve, reject) => {
        if (formData.sort_by.length && formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('type-filter-all/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        } else if(formData.sort_by.length && formData.stock_status.length && formData.brand_id.length) {
          axios.get('type-filter-sort-status-brand/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('type-filter-sort-brand-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('type-filter-status-brand-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length && formData.variation_id.length) {
          axios.get('type-filter-sort-status-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length) {
          axios.get('type-filter-sort-brand/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length) {
          axios.get('type-filter-status-brand/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length) {
          axios.get('type-filter-sort-status/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.variation_id.length) {
          axios.get('type-filter-sort-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.variation_id.length) {
          axios.get('type-filter-status-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.brand_id.length) {
          axios.get('type-filter-brand/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length) {
          axios.get('type-filter-sort/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length) {
          axios.get('type-filter-status/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.variation_id.length) {
          axios.get('type-filter-variation/'+formData.type_id+'/'+formData.price+'/'+formData.limit+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else {
          axios.get('type-products/'+formData.slug+'/'+formData.type_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('products',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }        
      });
    },

    // category product
    categoryProducts(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('category-products/'+data.type_id+'/'+data.category_id+'?page='+data.page)
          .then((response)=>{
            context.commit('categoryProducts',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    categoryFilter(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('category-filter/'+data.type_id+'/'+data.category_id)
          .then((response)=>{
            context.commit('categoryFilter',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    categoryFilterProducts(context,formData) {
      return new Promise((resolve, reject) => {
        if (formData.sort_by.length && formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('category-all/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        } else if(formData.sort_by.length && formData.stock_status.length && formData.brand_id.length) {
          axios.get('category-sort-status-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('category-sort-brand-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('category-status-brand-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length && formData.variation_id.length) {
          axios.get('category-sort-status-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length) {
          axios.get('category-sort-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length) {
          axios.get('category-status-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length) {
          axios.get('category-sort-status/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.variation_id.length) {
          axios.get('category-sort-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.variation_id.length) {
          axios.get('category-status-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.brand_id.length) {
          axios.get('category-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length) {
          axios.get('category-sort/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length) {
          axios.get('category-status/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.variation_id.length) {
          axios.get('category-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.price+'/'+formData.limit+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else {
          axios.get('category-products/'+formData.type_id+'/'+formData.category_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('categoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }        
      });
    },

    // sub category product
    subCategoryProducts(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('subcategory-products/'+data.type_id+'/'+data.category_id+'/'+data.subcategory_id+'?page='+data.page)
          .then((response)=>{
            context.commit('subCategoryProducts',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    subCategoryFilter(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('subcategory-filter/'+data.type_id+'/'+data.category_id+'/'+data.subcategory_id)
          .then((response)=>{
            context.commit('subCategoryFilter',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    subCategoryFilterProducts(context,formData) {
      return new Promise((resolve, reject) => {
        if (formData.sort_by.length && formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('subcategory-all/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        } else if(formData.sort_by.length && formData.stock_status.length && formData.brand_id.length) {
          axios.get('subcategory-sort-status-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('subcategory-sort-brand-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('subcategory-status-brand-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length && formData.variation_id.length) {
          axios.get('subcategory-sort-status-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length) {
          axios.get('subcategory-sort-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length) {
          axios.get('subcategory-status-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length) {
          axios.get('subcategory-sort-status/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.variation_id.length) {
          axios.get('subcategory-sort-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.variation_id.length) {
          axios.get('subcategory-status-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.brand_id.length) {
          axios.get('subcategory-brand/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length) {
          axios.get('subcategory-sort/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length) {
          axios.get('subcategory-status/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.variation_id.length) {
          axios.get('subcategory-variation/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'/'+formData.price+'/'+formData.limit+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else {
          axios.get('subcategory-products/'+formData.type_id+'/'+formData.category_id+'/'+formData.subcategory_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('subCategoryProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }        
      });
    },
    addtoCompare(context,product){
      context.commit('compareProduct',product);
    },
    removeCompareProduct(context,product_id){
      context.commit('productCompareRemove',product_id);
    },
    clearCompare(context){
      context.commit('clearCompare');
    },
    UserLogin(context,formData){
      return new Promise((resolve, reject) => {
        axios.post('login',formData)
          .then((response)=>{
            context.commit('logIn',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    userLogout(context,formData){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + formData.auth_token;
        axios.post('logout',formData.auth_token)
          .then((response)=>{
            context.commit('logout');
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    UserProfile(context){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.userInfo.auth_token;
        axios.get('user-profile')
          .then((response)=>{
            // context.commit('logout');
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getDistricts(context){
      return new Promise((resolve, reject) => {
        axios.get('district')
          .then((response)=>{
            context.commit('districts',response.data);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    Userregister(context,formData){
      return new Promise((resolve, reject) => {
        axios.post('register',formData)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    profileUpdate(context,formData){
      return new Promise((resolve, reject) => {
        axios.post('profile-update',formData)
          .then((response)=>{
            context.commit('profileUpdate',response.data.user);
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    passwordUpdate(context,formData){
      return new Promise((resolve, reject) => {
        axios.post('password-update',formData)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getQuestinos(context,formData){
      return new Promise((resolve, reject) => {
        axios.get('product-questions/'+formData.product_id+'?page='+formData.page)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getReviews(context,formData){
      return new Promise((resolve, reject) => {
        axios.get('product-reviews/'+formData.product_id+'?page='+formData.page)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    reviewStore(context,formData){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.userInfo.auth_token;
        axios.post('review-store',formData)
        .then((response) => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    questionStore(context,formData){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.userInfo.auth_token;
        axios.post('question-store',formData)
        .then((response) => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    ShippingArea(context){
      return new Promise((resolve,reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.userInfo.auth_token;
        axios.get('shipping-area')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
      });
    },
    promoCode(context,code){
      return new Promise((resolve,reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.userInfo.auth_token;
        axios.get('promo-code/'+code)
          .then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
      });
    },
    OrderConfirm(context,formData){
      return new Promise((resolve,reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.userInfo.auth_token;
        axios.post('order-confirm',formData)
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      });
    },
    AllOrders(context,customer_id){
      return new Promise((resolve,reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ context.state.userInfo.auth_token;
        axios.get('all-orders/'+customer_id)
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      });
    },
    GetOffer(){
      return new Promise((resolve,reject) => {
        axios.get('all-offers').then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    GetOfferInfo(context,offer_id){
      return new Promise ((resolve,reject) => {
        axios.get('offer-info/'+offer_id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      });
    },

    // offer product 
    offerProducts(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('offer-products/'+data.slug+'/'+data.offer_id+'?page='+data.page)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    offerFilter(context,offer_id) {
      return new Promise((resolve, reject) => {
        axios.get('offer-filter/'+offer_id)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    offerFilterProducts(context,formData) {
      return new Promise((resolve, reject) => {
        if (formData.sort_by.length && formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('offer-filter-all/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        } else if(formData.sort_by.length && formData.stock_status.length && formData.brand_id.length) {
          axios.get('offer-filter-sort-status-brand/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('offer-filter-sort-brand-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length && formData.variation_id.length) {
          axios.get('offer-filter-status-brand-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length && formData.variation_id.length) {
          axios.get('offer-filter-sort-status-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.brand_id.length) {
          axios.get('offer-filter-sort-brand/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.brand_id.length) {
          axios.get('offer-filter-status-brand/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.stock_status.length) {
          axios.get('offer-filter-sort-status/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length && formData.variation_id.length) {
          axios.get('offer-filter-sort-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length && formData.variation_id.length) {
          axios.get('offer-filter-status-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.brand_id.length) {
          axios.get('offer-filter-brand/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.sort_by.length) {
          axios.get('offer-filter-sort/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.stock_status.length) {
          axios.get('offer-filter-status/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if(formData.variation_id.length) {
          axios.get('offer-filter-variation/'+formData.offer_id+'/'+formData.price+'/'+formData.limit+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('filterProducts',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else {
          axios.get('offer-products/'+formData.slug+'/'+formData.offer_id+'?page='+formData.page)
            .then((response)=>{
              context.commit('products',response.data);
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }        
      });
    },
    OrderDetails(context,order_id){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.userInfo.auth_token;
        axios.get('order-details/'+order_id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // brand product 
    brandProducts(context,data) {
      return new Promise((resolve, reject) => {
        axios.get('brand-products/'+data.slug+'/'+data.brand_id+'?page='+data.page)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    brandFilter(context,brand_id) {
      return new Promise((resolve, reject) => {
        axios.get('brand-filter/'+brand_id)
          .then((response)=>{
            resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    brandFilterProducts(context,formData) {
      return new Promise((resolve, reject) => {
        if (formData.sort_by.length && formData.stock_status.length && formData.variation_id.length) {
          axios.get('brand-filter-all/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.sort_by.length && formData.stock_status.length) {
          axios.get('brand-filter-sort-status/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.sort_by.length && formData.variation_id.length) {
          axios.get('brand-filter-sort-variation/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.stock_status.length && formData.variation_id.length) {
          axios.get('brand-filter-status-variation/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.sort_by.length) {
          axios.get('brand-filter-sort/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.stock_status.length) {
          axios.get('brand-filter-status/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.stock_status+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else if (formData.variation_id.length) {
          axios.get('brand-filter-variation/'+formData.brand_id+'/'+formData.price+'/'+formData.limit+'/'+formData.variation_id+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }else{
          axios.get('brand-products/'+formData.slug+'/'+formData.brand_id+'?page='+formData.page)
            .then((response)=>{
              resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        }
      })
    },
    SearchProduct(context,txt){
      return new Promise((resolve,reject) => {
        axios.get('product-search/'+txt).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    SearchProducts(context,formData){
      return new Promise((resolve,reject) => {
        axios.get('search-all-products/'+formData.searchText+'?page='+formData.page).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    SearchFilterProducts(context,formData){
      return new Promise((resolve,reject) => {
        if (formData.sort_by) {
          axios.get('search-sort-products/'+formData.searchText+'/'+formData.limit+'/'+formData.sort_by+'?page='+formData.page).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        }else{
          axios.get('search-filter-products/'+formData.searchText+'/'+formData.limit+'?page='+formData.page).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        }
      })
    }

  },
  modules: {
  }
})
