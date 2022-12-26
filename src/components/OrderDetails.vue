<template>
    <div id="orderConfirm" class="col-md-12 px-3 mt-2 mb-5 mx-auto" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><router-link to="/account" class="text-decoration-none text-capitalize">Account</router-link></li>
                        <li class="breadcrumb-item "><router-link to="/orders" class="text-decoration-none text-capitalize">My Orders</router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Order Detail</a></li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12 px-2 ">
                <div class="d-block bg-white rounded p-3" v-if="order" >
                    <h6>Order ID: #{{ order.order_id }} </h6>
                    <h6>Order Date: {{ dateTime(order.created_at) }}</h6>
                    <h6 class="text-capitalize" >Payment Type: {{ order.payment_type.replace(/_/g, ' ') }}</h6>
                    <p class="mb-0">Shipping Address: {{ order.address }}</p>
                    <p class="mb-0">Note: {{ order.note }}</p>
                    <p class="mb-0 text-capitalize">Status: {{ order.status }}</p>
                    <div v-if="order.status == 'delivered'" class="d-block" >
                        <div class="processing float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Processing</small>
                        </div>
                        <div class="picked float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Picked</small>
                        </div>
                        <div class="shipped float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Shipped</small>
                        </div>
                        <div class="delivered float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <small class="delivery-txt">Delivered</small>
                        </div>
                    </div>                   
                    <div v-else-if="order.status = 'shipped'" class="d-block" >
                        <div class="processing float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Processing</small>
                        </div>
                        <div class="picked float-start">
                            <div class="picked-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="picked-bar pending-bar"></div>
                            <small class="pending-txt">Picked</small>
                        </div>
                        <div class="shipped float-start">
                            <div class="shipped-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="shipped-bar pending-bar"></div>
                            <small class="pending-txt">Shipped</small>
                        </div>
                        <div class="delivered float-start">
                            <div class="delivered-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <small class="pndelivery-txt">Delivered</small>
                        </div>
                    </div>                   
                    <div v-else-if="order.status = 'picked'" class="d-block" >
                        <div class="processing float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Processing</small>
                        </div>
                        <div class="picked float-start">
                            <div class="picked-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="picked-bar pending-bar"></div>
                            <small class="pending-txt">Picked</small>
                        </div>
                        <div class="shipped float-start">
                            <div class="shipped-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="shipped-bar pending-bar"></div>
                            <small class="pending-txt">Shipped</small>
                        </div>
                        <div class="delivered float-start">
                            <div class="delivered-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <small class="pndelivery-txt">Delivered</small>
                        </div>
                    </div>                    
                    <div v-else class="d-block" >
                        <div class="processing float-start">
                            <div class="complete-circle">
                                <font-awesome icon="circle-check" />
                            </div>
                            <div class="complete-bar"></div>
                            <small class="processing-txt">Processing</small>
                        </div>
                        <div class="picked float-start">
                            <div class="picked-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="picked-bar pending-bar"></div>
                            <small class="pending-txt">Picked</small>
                        </div>
                        <div class="shipped float-start">
                            <div class="shipped-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <div class="shipped-bar pending-bar"></div>
                            <small class="pending-txt">Shipped</small>
                        </div>
                        <div class="delivered float-start">
                            <div class="delivered-circle pending-circle">
                                <font-awesome icon="circle" class="circle" />
                            </div>
                            <small class="pndelivery-txt">Delivered</small>
                        </div>
                    </div>                    
                    <table class="table table-hover table-striped" >
                        <thead class="cbg-primary">
                            <th>Sl#</th>
                            <th class="text-center">Product</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </thead>
                        <tbody>
                            <tr v-for="(product,i) in order.order_products" :key="product.product_id">
                                <td>{{ ++i }}</td>
                                <td>{{ product.product_name }}</td>
                                <td>{{ product.qty }}</td>
                                <td class="text-end pr-2" >{{ product.sale_price.toLocaleString() }}</td>
                                <td class="text-end pr-2" >{{ product.total_amount.toLocaleString() }}</td>
                            </tr>
                            <tr class="fw-bold">
                                <td colspan="4" class="text-end pr-1" >Sub Total:</td>
                                <td class="text-end pr-1" >{{ order.sub_total.toLocaleString() }}</td>
                            </tr>
                            <tr class="fw-bold">
                                <td colspan="4" class="text-end pr-1" >(+)Shipping Fee:</td>
                                <td class="text-end pr-1" >{{ order.shipping_fee.toLocaleString() }}</td>
                            </tr>
                            <tr class="fw-bold" v-if="order.discount>0 && order.offer_id != null">
                                <td colspan="4" class="text-end pr-1" >(-)Voucher Discount:</td>
                                <td class="text-end pr-1" >{{ order.discount.toLocaleString() }}</td>
                            </tr>
                            <tr class="fw-bold">
                                <td colspan="4" class="text-end pr-1" >Net Amount:</td>
                                <td class="text-end pr-1" >{{ order.net_amount.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            order_id: this.$route.params.order_id,
            order: null,           
        }
    },
    mounted(){
        this.getOrder();
    },
    methods:{
        getOrder(){
            this.$store.dispatch("OrderDetails",this.order_id).then(response => { 
                this.order = response.data;
                console.log(response.data);
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
    .processing, .picked, .shipped, .delivered{
        width: 87px;
    }
    .complete-circle{
        width: auto;
        height: auto;
        font-size: 25px;
        color: green;
    }
    .complete-bar{
       width: 65px;
        height: 5px;
        background: green;
        position: relative;
        left: 24px;
        top: -21px;
    }
    .pending-circle{
        width: 25px;
        height: 25px;
        font-size: 10px;
        color: green;
        border: 2px solid gray;
        border-radius: 50%;
        text-align: center;
        position: relative;
        top: 5px;
    }
    .pending-bar{
        width: 65px;
        height: 5px;
        background: gray;
        position: relative;
        left: 24px;
        top: -9px;
    }
    .processing-txt{
        font-size: 11px;
        position: relative;
        top: -16px;
        font-weight: bold;
        left: -14px;
    }
    .delivery-txt{
        font-size: 11px;
        position: relative;
        top: -11px;
        font-weight: bold;
        left: -14px;
    }
    .pndelivery-txt{
        font-size: 11px;
        position: relative;
        top: 2px;
        font-weight: bold;
        left: -14px;
    }
    .pending-txt{
        font-size: 11px;
        position: relative;
        top: -4px;
        font-weight: bold;
        left: -14px;
    }
    .circle{
        margin-top: 6px;
    }
</style>