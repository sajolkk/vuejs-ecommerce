<template>
    <div id="cart-area" class="px-0">
        <div class="col-md-12 cart-header">
            <h6 class="fw-bold p-3 mb-0 text-white">
                YOUR CART 
                <span class="float-end close" @click="cartClose"><font-awesome icon="xmark" /></span>
            </h6>
        </div>
        <div v-if="cartProducts.length" class="col-md-12 product-list">
            <div v-for="cartpro in cartProducts" :key="cartpro.product_id">
                <div class="proTitle py-2">
                    <p class="mb-0 ps-2 text-justify d-block product-title" >{{ cartpro.product.product_name }}</p>
                    <div class="text-end pro-price"> 
                        <span class="fw-bold">{{ cartpro.product.sale_price.toLocaleString() }}৳</span> x 
                        <span class="fw-bold">{{ cartpro.qty.toLocaleString() }} = {{ (cartpro.product.sale_price * cartpro.qty).toLocaleString() }}৳ </span> 
                    </div>
                </div>
                <div class="proTrash"><span @click="removeProduct(cartpro.product_id)" class="trashm" ><font-awesome icon="trash" /></span></div>
                <div class="pro-border border-bottom"></div>
            </div>
        </div>
        <div v-else class="col-md-12 product-list text-center">
            <h5 class="mt-5">Your shopping cart is empty!</h5>
        </div>
        <div class="col-md-12 cart-total bg-white p-2 ">
            <!-- <div class="form-group fw-bold py-1 border-bottom">
                <span>Sub Total</span>
                <span class="float-end">{{ cartTotal.subTotal.toLocaleString() }}৳</span>
            </div> -->
            <div class="form-group fw-bold border-bottom py-1">
                <span>Total</span>
                <span class="float-end" v-if="cartProducts.length" >{{ cartTotal.subTotal.toLocaleString() }}৳</span>
                <span class="float-end" v-else >0৳</span>
            </div>
            <div class="form-group text-center fw-bold mt-1">
                <button class="btn col btn-danger me-2" @click="clearCart()" >Clear All</button>
                <router-link to="/checkout" class="btn col btn-primary" @click="cartClose" >Checkout Now</router-link>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    name: 'CartView',
    props:['cartProducts','cartTotal'],
    data(){
        return{
            
        }
    },
    methods:{
        cartClose(){
           this.$emit('closeCart');
        },
        removeProduct(product_id){
           this.$store.dispatch('removeProduct',product_id);
           this.$emit('cartReload');
        },
        clearCart(){
            this.$store.dispatch('clearCart');
            this.$emit('cartReload');  
        },
    }
}
</script>
<style scoped>
    #cart-area{
        position: fixed;
        right: 0;
        top: 0;
        width: 300px;
        background: #f2f4f8;
        height: 100%;
        z-index: 999;
        box-shadow: 0px 0px 5px 0px;
        display: flex;
        flex-direction: column;
    }
    .cart-header{
        background: #08186e;
    }
    .close{
        font-size: 20px;
        cursor: pointer;
    }
    .product-list{
        overflow-y: auto;
        flex: 1 1 auto;
        min-height: 100px;
    }
    .cart-total{
        position: relative;
        bottom: 0;
        width: 300px;
        flex: 0 0 auto;
    }
    .proTitle{
        float: left; width: 258px;
    }
    .product-title{
        text-align: justify;
        line-height: 16px;
        font-size: 16px;
    }
    .proTrash{
        float: right; width: 30px; text-align: center;
    }
    .pro-price{
        font-size: 14px;
    }
    .pro-border{
        float: left; width: 100%; 
    }
    .trashm{
        margin-top: 70%; cursor: pointer; display: block;
    }
    .trashm:hover{
        color: red;
    }
</style>>