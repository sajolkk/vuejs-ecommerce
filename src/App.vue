<template>
  <div id="main" class="row">
    <TopHeader @OpenCart="cartEvent" @OpenCompare="compareEvent" :imageBaseUrl="imageBaseUrl" :cartProducts="cartProducts" :compareProducts="compareProducts" :userInfo="userInfo" @logout="logout"/>
    <router-view :imageBaseUrl="imageBaseUrl" @filter="filterModalf" :filterModal="filterModal" @loginReload="loginReload" :userInfo="userInfo" @logout="logout" :compareProducts="compareProducts" @cartReload="cartReload" />
    <FooterView />
    <CartView v-if="cartShow" @closeCart="cartEvent" :cartProducts="cartProducts" :cartTotal="cartTotal" @cartReload="cartReload" />
    <CompareView v-if="compareShow" @closecompare="compareEvent" :compareProducts="compareProducts" @compareReload="compareReload" />
  </div>
</template>
<script>
  import TopHeader from '@/components/Layouts/TopHeader.vue'
  import FooterView from '@/components/Layouts/FooterView.vue'
  import CartView from '@/components/Layouts/CartView.vue'
  import CompareView from '@/components/Layouts/CompareView.vue'
  export default {
    name: 'App',
    components: {
      TopHeader, FooterView, CartView, CompareView,
    },
    data(){
      return{
        icon: 'mobile',
        cartShow: false,
        cartProducts: [],
        cartTotal: {},
        imageBaseUrl: '',
        filterModal: false,
        compareShow: false,
        compareProducts: [],
        userInfo: '',
      }
    },
    methods:{
      cartEvent(){
        this.cartShow = !this.cartShow;
        this.cartTotal = this.$store.getters.cartTotal;
      },
      cartReload(){
        this.cartProducts = this.$store.getters.productCart;
        this.cartTotal = this.$store.getters.cartTotal;
      },
      compareEvent(){
        this.compareShow = !this.compareShow;
      },
      compareReload(){
        this.compareProducts = this.$store.getters.compareProducts;
      },
      filterModalf(){
        this.filterModal = !this.filterModal;
      },
      start(){
        console.log('loading start');
      },
      end(){
        console.log('loading end');
      },
      loginReload(){
        this.userInfo = this.$store.getters.userInfo;
      },
      logout(){
        this.$store.dispatch("userLogout",this.userInfo).then(response => {
          if (response.status == 200) {
            this.userInfo = '';
            this.$router.push('/');
          }else{
            alert('Logout fail! Try again.');
          }        
        });
      },
    },

    created(){
      // this.$store.dispatch("offerSlider").then(response=>{
      //   this.sliders = response.data;
      //   console.log(this.sliders);
      // })
      // .catch(error => {
      //   console.log(error);
      // })
      this.cartProducts = this.$store.getters.productCart;
      this.cartTotal = this.$store.getters.cartTotal;
      this.imageBaseUrl = this.$store.getters.imgBaseUrl;
      this.compareProducts = this.$store.getters.compareProducts;
      this.userInfo = this.$store.getters.userInfo;
      // console.log(this.userInfo);
    },

    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          console.log('complete');
        }else{
          console.log('loading');
        }
      };
    },
    watch:{
      cartProducts(){
        this.$store.getters.cartProducts;
      },
      cartTotal(){
        this.$store.getters.cartTotal;
      },
      compareProducts(){
        this.$store.getters.compareProducts;
      },
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
  }
  body{
    background-color: #F2F4F8;
  }
</style>
