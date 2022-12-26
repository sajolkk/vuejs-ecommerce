<template>
  <div id="header" class="col-md-12" >
    <div class="row">
      <div class="col-md-12 top-header text-white py-1 ">
        <div class="logo d-inline-block">
          <router-link to="/"><img src="@/assets/logo.png" alt="" class="img-fluid logoimg" ></router-link>
        </div>
        <div class="search d-inline-block">
          <div class="form-group search-form">
            <input type="text" v-model="searchTxt" class="form-control" placeholder="Search product ..." @keyup.enter="SearchEnter">
            <div class="search-result mt-1 shadow rounded" :class="searchProducts.length>0? '':'d-none'">
              <ul class="nav flex-column" @click="searchClose">
                <li class="nav-item align-middle" v-for="product in searchProducts.slice(0,20)" :key="product.product_id">
                  <router-link class="nav-link" :to="/product-details/+[product.slug+'/'+product.product_id]" >
                    <div class="d-inline-block float-start">
                      <img :src="imageBaseUrl+product.image.small_photo" :alt="product.product_name" class="src-image pe-2">
                    </div>
                    <div class="d-inline-block">
                      <p class=" mb-0">
                        {{ product.product_name.slice(0,55) }} {{ product.product_name.length>55 ? '...':'' }}
                        <br>
                        <span class="pro-price fw-bold" >{{ product.sale_price.toLocaleString() }} ৳</span>
                        <small class="ps-3" v-if="product.discount>0" ><del class="text-secondary " >{{ (product.original_price - product.sale_price).toLocaleString() }} ৳</del></small>
                      </p> 
                    </div>                
                  </router-link>
                </li>
                <li v-if="searchProducts.length>20" class="nav-item text-center" >
                <router-link class="nav-link btn-primary text-white text-center" :to="'/product-search/'+searchTxt" >See All Result...</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="top-menu d-inline-block float-end ">
          <nav class="nav">
            <router-link to="/offers" class="nav-link text-white" >
              <div class="float-start"><font-awesome icon="gift" class="hisize mt-2" /> </div>
              <div class="float-end"><h5 class="ml-3 ml">Offers</h5> <p class="offer mb-0 ml">Latest Offers</p></div>
            </router-link>
            <div class="nav-link text-white" >
              <div class="float-start"><font-awesome icon="user" class="hisize mt-1" /></div>
              <span class="float-end ml-3">
                <h5 class="ml mb-0">Account</h5>
                <p class="offer mb-0" v-if="userInfo">
                  <router-link to="/account" class="nav-link ml px-0 d-inline-block cl">Profile</router-link>
                  or
                  <a href="#" class="nav-link px-0 d-inline-block cl" @click="logout" >Logout</a>
                </p>
                <p class="offer mb-0" v-else>
                  <router-link to="/register" class="nav-link ml px-0 d-inline-block cl">Register</router-link>
                  or
                  <router-link to="/login" class="nav-link px-0 d-inline-block cl" >Login</router-link>
                </p>
              </span>
            </div>
            <a class="nav-link text-white mt-1" href="#" @click="compareOpen">
              <font-awesome icon="shuffle" class="hisize" />
              <span class="count" v-if="compareProducts.length">{{ compareProducts.length }}</span>
              <span class="count" v-else >0</span>
            </a>
            <a class="nav-link text-white mt-1" href="#" @click="cartOpen">
              <font-awesome icon="cart-arrow-down" class="hisize" />
              <span class="count" v-if="cartProducts.length">{{ cartProducts.length }}</span>
              <span class="count" v-else >0</span>
            </a>
          </nav>
        </div>
      </div>
      <div class="col-md-12 menu-area py-2">
        <nav class="big-menu">
          <ul class="mb-0 px-0">
            <li v-for="(type,ti) in productCategories" :key="type.type_id">
              <router-link :to="/type-products/+[type.slug+'/'+type.type_id]">{{ type.type_name }}</router-link>
              <ul v-if="type.categories.length">
                <li v-for="category in type.categories" :key="category.category_id">
                  <router-link :to="/category-products/+[type.slug+'/'+type.type_id+'/'+category.category_slug+'/'+category.category_id]">
                    <span class="d-inline-block px-2" >{{ category.category_name }}</span>
                    <font-awesome icon="angle-right" class="float-end " v-if="category.sub_categories.length" />
                  </router-link>
                  <ul :class="[ti>6 ? 'left' : 'right']" v-if="category.sub_categories.length">
                    <li v-for="sub_category in category.sub_categories" :key="sub_category.sub_category_id">
                      <router-link :to="/subcategory-products/+[type.slug+'/'+type.type_id+'/'+category.category_slug+'/'+category.category_id+'/'+sub_category.sub_cat_slug+'/'+sub_category.sub_category_id]">{{ sub_category.sub_category_name }}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>            
          </ul>
        </nav>
      </div>
    </div>
    <div class="responsivemenus ">
      <div class="flex-fill text-start" @click="menuf()">
        <font-awesome icon="bars" class="res-menu" v-if="menuOpen" />
        <font-awesome icon="close" class="res-menu" v-if="menuClose" />
      </div>
      <div class="flex-fill text-center"><router-link to="/"><img src="@/assets/logo.png" alt="" class="img-fluid logoimg" ></router-link></div>
      <div class="flex-fill text-end text-white ">
        <font-awesome icon="magnifying-glass" @click="searchInShowf()" class="res-menu px-2" />
        
        <div class="d-inline mx-0" >
          <div class="dropdown d-inline-block">
            <button class="btn dropdown-toggle text-white restoggbtn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome icon="user" class="hisize mt-1" />
            </button>
            <ul v-if="userInfo" class="dropdown-menu res-dropmenu" aria-labelledby="dropdownMenuButton1">
              <li><router-link to="/account" class="dropdown-item">Profile</router-link></li>
              <li><a href="#" @click="logout" class="dropdown-item">Logout</a></li>
            </ul>
            <ul v-else class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><router-link to="register" class="dropdown-item">Register</router-link></li>
              <li><router-link to="login" class="dropdown-item">Login</router-link></li>
            </ul>
          </div>
        </div>      
        <div class="d-inline me-3 respointer" @click="compareOpen">
          <font-awesome icon="shuffle" class="res-menu px-2 " />  
          <span class="res-comcount" v-if="compareProducts.length">{{ compareProducts.length }}</span>
          <span class="res-comcount" v-else>0</span>
        </div>      
        <div class="d-inline me-1 respointer" @click="cartOpen">
          <font-awesome icon="cart-arrow-down" class="res-menu px-2 " />  
          <span class="res-count" v-if="cartProducts.length">{{ cartProducts.length }}</span>
          <span class="res-count" v-else>0</span>
        </div>      
      </div>       
    </div>
    <div v-if="menuShow" class="row responsive-menu-list bg-white" :style="{height: windowHeight+'px'}">
      <div class="col-md-12 px-1 py-1" >
        <nav class="sm-menu">
          <ul class="mb-0 px-0">
            <li v-for="typeres in productCategories" :key="typeres.type_id" >
              <router-link :to="/type-products/+[typeres.slug+'/'+typeres.type_id]">
                <span class="d-inline-block px-2" >{{ typeres.type_name }}</span>
                <font-awesome icon="angle-right" class="float-end " v-if="typeres.categories.length" />
              </router-link>
              <ul v-if="typeres.categories.length">
                <li v-for="category in typeres.categories" :key="category.category_id">
                  <router-link :to="/category-products/+[typeres.slug+'/'+typeres.type_id+'/'+category.category_slug+'/'+category.category_id]" class="pl-3">
                    <span class="d-inline-block px-2" >{{ category.category_name }}</span>
                    <font-awesome icon="angle-right" class="float-end " v-if="category.sub_categories.length" />
                  </router-link>
                  <ul v-if="category.sub_categories.length">
                    <li v-for="sub_category in category.sub_categories" :key="sub_category.sub_category_id">
                      <router-link :to="/subcategory-products/+[typeres.slug+'/'+typeres.type_id+'/'+category.category_slug+'/'+category.category_id+'/'+sub_category.sub_cat_slug+'/'+sub_category.sub_category_id]">{{ sub_category.sub_category_name }}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>            
          </ul>
        </nav>
      </div>
    </div>    
    <div v-if="search" class="row responsive-search bg-white">
      <div class="col-md-12 px-1 py-1">
        <div class="input-group">
          <input type="text" v-model="searchTxt" class="form-control" placeholder="Search..."  @keyup.enter="SearchEnter">
          <span class="input-group-text"  @click="SearchEnter"><font-awesome icon="search"  /></span>
          <div v-if="searchProducts.length" class="search-result-responsive mt-1 shadow rounded">
            <ul class="nav flex-column" @click="searchClose">
              <li class="nav-item align-middle" v-for="product in searchProducts.slice(0,20)" :key="product.product_id">
                <router-link class="nav-link" :to="/product-details/+[product.slug+'/'+product.product_id]" >
                  <div class="d-inline-block float-start">
                    <img :src="imageBaseUrl+product.image.small_photo" :alt="product.product_name" class="src-image pe-2">
                  </div>
                  <div class="d-inline-block">
                    <p class=" mb-0">
                      {{ product.product_name.slice(0,55) }} {{ product.product_name.length>55 ? '...':'' }}
                      <br>
                      <span class="pro-price fw-bold" >{{ product.sale_price.toLocaleString() }} ৳</span>
                      <small class="ps-3" v-if="product.discount>0" ><del class="text-secondary " >{{ (product.original_price - product.sale_price).toLocaleString() }} ৳</del></small>
                    </p> 
                  </div>                
                </router-link>
              </li>
              <li v-if="searchProducts.length>20" class="nav-item text-center" >
                <router-link class="nav-link btn-primary text-white text-center" :to="'/product-search/'+searchTxt" >See All Result...</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
  export default {
    name: 'TopHeader',
    props:['imageBaseUrl','cartProducts','compareProducts','userInfo'],
    data(){
      return{
        search: false,
        searchTxt: '',
        windowHeight: window.innerHeight-60,
        menuShow: false,
        menuOpen: true,
        menuClose: false,
        productCategories: [],
        searchProducts: [],
      }
      
      // console.log(this.windowHeight);
    },
    methods:{
      searchInShowf(){
        this.search = !this.search;
        this.searchTxt = '';
      },
      menuf(){
        this.menuShow = !this.menuShow;
        this.menuOpen = !this.menuOpen;
        this.menuClose = !this.menuClose;
      },
      cartOpen(){
        this.$emit('OpenCart');
      },
      compareOpen(){
        this.$emit('OpenCompare');
      },
      logout(){
        this.$emit('logout');
      },
      searchClose(){
        this.searchProducts = [];
      },
      SearchEnter(){
        if(this.searchTxt.length){
          this.searchProducts = [];
          this.$router.push('/product-search/'+this.searchTxt);
        }
      }
    },
    created(){
      this.$store.dispatch("productCategory").then(response => { 
        this.productCategories = response.data;      
      })
      .catch(error => {
        console.log(error);
      });
    },
    watch: {
      searchTxt(txt){
        if (txt.length) {
          this.$store.dispatch("SearchProduct",txt).then(response => {
            this.searchProducts = response.data;
          }).catch(error =>{
            console.log(error);
          })
        }else{
          this.searchProducts = [];
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cl{
    color: #bfbcbc;
  }
  #header{
    background: #293a99;
  }
  .logoimg{
    height: 60px;
  }
  .hisize{
    font-size: 22px;
  }
  .count{
    position: absolute;
    top: 13px;
    background: #1648ff;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    text-align: center;
  }

  .menu-area{
    background: white; box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
  }
  .restoggbtn{
    margin-top: -16px;
  }
  .res-dropmenu{
    min-width: 5em;
  }
  @media screen and (min-width: 1280px) {
    .search{
      width: 600px;
    }
    .top-menu{
      display: flex; float: right;
    }
    .offer{
      font-size: 13px;
      color: #dddddd;
      line-height: 0;
    }
    .ml{
      margin-left: 15px;
    }
    .responsivemenus{
      display: none;
    }
    .search-result-responsive{
      display: none;
    }

    .big-menu ul ul {
      display: none;
    }

    .big-menu ul li:hover > ul {
      display: block;
      z-index: 999;
    }

    .big-menu{
      height: 35px;
    }

    .big-menu ul {
      /* background: linear-gradient(top, #efefef 0%, #bbbbbb 100%);  
      background: -moz-linear-gradient(top, #efefef 0%, #bbbbbb 100%); 
      background: -webkit-linear-gradient(top, #efefef 0%,#bbbbbb 100%); 
      box-shadow: 0px 0px 9px rgba(0,0,0,0.15); */
      /* padding: 0 10px; */
      /* border-radius: 10px;   */
      list-style: none;
      position: relative;
      display: inline-table;
    }
    .big-menu ul:after {
      content: ""; clear: both; display: block;
    }
    .big-menu ul li {
      float: left;
    }
    .big-menu ul li a:hover {
      color: #EF4A23;
    }

    .big-menu ul li a {
      text-decoration: none;
      padding: 0 10px 0 10px;
      line-height: 35px;
      white-space: nowrap;
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #222;
    }


    .big-menu ul ul {
      background: white; border-radius: 0px; padding: 0;
      position: absolute; top: 100%;
      border-top: 2px solid #EF4A23;
      min-width: 200px;
    }
    .big-menu ul ul li {
      float: none; position: relative;
    }

    .big-menu ul ul li a {
      color: #222;
      font-size: 14px;
      white-space: normal;
      line-height: 19px;
      padding: 8px 5px;
      font-weight: normal;
    }
    .big-menu ul ul li a:hover {
      background: #EF4A23; color: white;
    }

    .big-menu ul ul .right {
      position: absolute; left: 100%; top:0;
    }
    .big-menu ul ul .left{
      position: absolute; right: 100%; top:0;
    }



  }

  @media screen and (min-width: 480px) and (max-width: 1279px) {
    .top-header, .menu-area{
      display: none;
    }
    .responsivemenus{
      display: flex;
    }
    .search-result{
      display: none;
    }
    .res-menu{
      font-size: 25px;
      color: rgb(255, 255, 255);
      margin-top: 20px;
    }
    .respointer{
      cursor: pointer;
    }
    .res-count{
      position: absolute;
      top: 14px;
      background: #1648ff;
      border-radius: 50%;
      width: 23px;
      height: 23px;
      text-align: center;
      right: 5px;
    }
    .res-comcount{
      position: absolute;
      top: 14px;
      background: #1648ff;
      border-radius: 50%;
      width: 23px;
      height: 23px;
      text-align: center;
      right: 65px;
    }
    .input-group-text{
      cursor: pointer;
    }
    .responsive-menu-list{
      position: absolute;
      z-index: 999;
      width: 280px;
      height: auto;
      overflow: scroll;
    }
    .category-menu{
      background: #8f8e8e1f;
    }
    .category-menu ul li a{
      padding-left: 15px;
      padding-right: 0;
    }
    .sub-category-menu{
      background: #e5e3e3;
    }
    .sub-category-menu ul li a{
      padding-left: 25px;
      padding-right: 0;
    }

    .sm-menu ul ul {
      display: none;
    }

    .sm-menu ul li:hover > ul {
      display: block;
      z-index: 999;
    }

    .sm-menu{
      height: auto;
    }

    .sm-menu ul {
      /* background: linear-gradient(top, #efefef 0%, #bbbbbb 100%);  
      background: -moz-linear-gradient(top, #efefef 0%, #bbbbbb 100%); 
      background: -webkit-linear-gradient(top, #efefef 0%,#bbbbbb 100%); 
      box-shadow: 0px 0px 9px rgba(0,0,0,0.15); */
      /* padding: 0 10px; */
      /* border-radius: 10px;   */
      list-style: none;
      position: relative;
      display: inline-table;
    }
    .sm-menu ul:after {
      content: ""; clear: both; display: block;
    }
    .sm-menu ul li {
      float: left;
      display: block;
      width: 100%;
    }
    .sm-menu ul li a:hover {
      color: #EF4A23;
    }

    .sm-menu ul li a {
      text-decoration: none;
      padding: 0 10px 0 0px;
      line-height: 35px;
      white-space: nowrap;
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #222;
    }


    .sm-menu ul ul {
      background: #8f8e8e1f; border-radius: 0px; padding: 0;
      position: relative; top: 100%;
      min-width: 200px;
    }
    .sm-menu ul ul li {
      float: none; position: relative;
    }

    .sm-menu ul ul li a {
      color: #222;
      font-size: 14px;
      white-space: normal;
      line-height: 19px;
      padding: 4px 10px;
      font-weight: normal;
    }

    .sm-menu ul ul ul li a {
      padding-left: 25px;
    }

    .sm-menu ul ul li a:hover {
      background: #EF4A23; color: white;
    }

    .sm-menu ul ul ul {
      position: relative; left: 0; top:0; background: #6865656b;
    }

    
  }
  .pro-price {
    color: #EF4A23;
  }
  .search-form{
    position: relative;
  }
  .search-result{
    display: block;
    position: absolute;
    background: white;
    width: 100%;
    /* overflow: scroll; */
    max-height: 400px;
    overflow: auto;
    z-index: 999;
  }
  .search-result-responsive{
    display: block;
    position: absolute;
    background: white;
    width: 100%;
    /* overflow: scroll; */
    max-height: 400px;
    overflow: auto;
    z-index: 999;
    top: 35px;
  }
  .src-image{
    width: 60px;
  }
  .nav-item:hover {
    background: #f2f4f8cf;
  }
</style>
