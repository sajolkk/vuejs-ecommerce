<template>
    <div id="orderConfirm" class="col-md-12 px-3 mt-2 mb-5 mx-auto" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none"><font-awesome icon="home" /></a></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none">Checkout</a></li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12 text-center">
                <h3 class="text-success" >Your order is completed!</h3>
                <p>Thank you for your order! Your order is being processed and will be completed within 3-6 days. You will receive an email confirmation when your order is completed.</p>
                <h5 class="nav-link">Order ID: #{{ order_id }}</h5>
                <router-link to="/" class="btn btn-sm btn-primary">Continue Shopping</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderConfirm',
    data(){
        return{
            'order_id': this.$route.params.order_id,            
        }
    },
    mounted(){

    },
    methods:{

    },
    watch: {

    }
}
</script>