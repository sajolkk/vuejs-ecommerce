<template>
    <div id="orderConfirm" class="col-md-12 px-3 mt-2 mb-5 mx-auto" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><router-link to="/account" class="text-decoration-none text-capitalize">Account</router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">My Orders</a></li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12">
                <table class="table table-hover table-border table-striped table-responsive" >
                    <thead class="cbg-primary text-white">
                        <th class="align-middle text-center">SL#</th>
                        <th class="align-middle text-center">Order ID</th>
                        <th class="align-middle text-center">Date</th>
                        <th class="align-middle text-center">Status</th>
                        <th class="align-middle text-center">Net Amount</th>
                        <th class="align-middle text-center">Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="(order,i) in orders" :key="order.order_id">
                            <td>{{ ++i }}</td>
                            <td>#{{ order.order_id }}</td>
                            <td>{{ dateTime(order.created_at) }}</td>
                            <td>
                                <span class="rounded p-1 text-white" :class="order.status == 'cancel'? 'bg-danger':'bg-success'">{{ order.status }}</span>
                            </td>
                            <td>{{ order.net_amount.toLocaleString() }} ৳</td>
                            <td>
                                <router-link :to="'/order-details/'+order.order_id" >
                                    <font-awesome icon="eye" class="btn cbtn-primary" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    name: 'OrderView',
    props: ['userInfo'],
    data(){
        return{
            orders: [],           
        }
    },
    mounted(){
        this.getOrders();
    },
    methods:{
        getOrders(){
            this.$store.dispatch("AllOrders",this.userInfo.user.customer_id).then(response => { 
                this.orders = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        dateTime(value) {
            return moment(value).format('DD MMM, YYYY hh:mma');
        },
    },
    watch: {

    }
}
</script>
<style scoped>
    .cbg-primary, .cbtn-primary{
        background: #293a99;
        color: white;
    }
</style>