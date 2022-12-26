<template>
    <div id="checkout" class="col-md-12 px-3 mt-2 mb-5 mx-auto" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none"><font-awesome icon="home" /></a></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none">Checkout</a></li>
                    </ol>
                </nav>
            </div>
            <div class="col-xl-4 col-md-4" >
                <div class="bg-white rounded shadow-sm p-3" >
                    <h6 class="fw-bold pb-3 pt-1 border-bottom mb-4">Customer Billing Information</h6>
                    <div class="name d-flex">
                        <div class="first_name d-flex w-50 me-2">
                            <div class="form-group">
                                <label for="" class="text-dark">First Name:</label>
                                <input type="text" class="form-control py-1" v-model="form.first_name"  placeholder="Enter first name">
                                <span class="text-danger" v-if="error_list.first_name">{{ error_list.first_name }}</span>
                            </div>
                        </div>
                        <div class="first_name d-flex w-50 ms-2">
                            <div class="form-group">
                                <label for="">Last Name:</label>
                                <input type="text" class="form-control py-1" v-model="form.last_name" placeholder="Enter last name">
                                <span class="text-danger" v-if="error_list.last_name">{{ error_list.last_name }}</span>
                            </div>
                        </div>                        
                    </div>
                    <div class="form-group mt-3">
                        <label for="">Mobile:</label>
                        <input type="text" class="form-control py-1 ps-5" v-model="form.mobile" placeholder="Enter mobile number">
                        <span class="mobile">+88</span>
                        <span class="text-danger" v-if="error_list.mobile">{{ error_list.mobile }}</span>
                    </div>
                    <div class="form-group ">
                        <label for="">E-mail:</label>
                        <input type="text" class="form-control py-1 " v-model="form.email" placeholder="Enter email number">  
                        <span class="text-danger" v-if="error_list.email">{{ error_list.email }}</span>                      
                    </div>
                    <div class="city-area d-flex mt-3">
                        <div class="city d-flex me-2 w-50">
                            <div class="form-group">
                                <label for="">City:</label>
                                <input type="text" class="form-control py-1" v-model="form.city" placeholder="Enter city" >
                                <span class="text-danger" v-if="error_list.city">{{ error_list.city }}</span>
                            </div>
                        </div>
                        <div class="zone d-flex ms-2 w-50">
                            <div class="form-group w-100">
                                <label for="">Zone:</label>
                                <select class="form-select py-1" v-model="form.zone_id" @change="zonef($event)">
                                    <option value="">Select zone</option>
                                    <option v-for="shipping in shipping_areas" :key="shipping.zone_id" :value="shipping.zone_id" >{{ shipping.shipping_area }}</option>
                                </select>
                                <span class="text-danger" v-if="error_list.zone_id">{{ error_list.zone_id }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="">Address:</label>
                        <input type="text" class="form-control py-1" v-model="form.address" placeholder="Enter address">
                        <span class="text-danger" v-if="error_list.address">{{ error_list.address }}</span>
                    </div>
                    <div class="form-group mt-3">
                        <label for="">Comment:</label>
                        <textarea class="form-control py-1" cols="30" rows="3" v-model="form.comment" placeholder="Write your comment"></textarea>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-md-8">
                <div class="row">
                    <div class="col-xl-6 col-md-6 px-xl-0 px-md-0 mt-3 mt-xl-0 mt-md-0" >
                        <div class="bg-white rounded shadow-sm p-3" >
                            <h6 class="fw-bold pb-3 pt-1 border-bottom mb-4">Payment Method</h6>
                            <div class="form-group">
                                <label for="">Select a Payment Method:</label>
                            </div>
                            <div class="form-gorup mt-1">
                                <input type="radio" name="payment" id="cash" checked="true" @change="payment('cash_on_delivery')" >
                                <label for="cash" class="ms-3">Cash On Delivery</label>
                            </div>
                            <div class="form-gorup">
                                <input type="radio" name="payment" id="online" @change="payment('online')" >
                                <label for="online" class="ms-3">Online Payment</label>
                            </div>
                            <!-- <div class="form-group mt-3">
                                <label for="" class=""><small class="fw-bold">We Accepted:</small></label>
                                <div class="d-flex">
                                    <span>s</span>
                                    <span>s</span>
                                    <span>s</span>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mt-3 mt-xl-0 mt-md-0" >
                        <div class="bg-white rounded shadow-sm p-3 h-100" >
                            <h6 class="fw-bold pb-3 pt-1 border-bottom mb-4">Delivery Method</h6> 
                            <div class="form-group">
                                <label for="">Select a Delivery Method:</label>
                            </div>
                            <div class="form-gorup mt-1">
                                <input type="radio" name="delivery_method" id="home" @change="delivery('home_delivery')" checked="true" >
                                <label for="home"  class="ms-3">Home Delivery - {{ this.shipping_fee }}৳</label>
                            </div>
                            <div class="form-gorup">
                                <input type="radio" name="delivery_method" id="store" @change="delivery('store_pickup')">
                                <label for="store"  class="ms-3">Store Pickup - 0৳</label>
                            </div>                          
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-3 ps-xl-0 ps-md-0">
                        <div class="bg-white rounded shadow-sm p-3"> 
                            <h6 class="fw-bold pb-4 pt-1 border-bottom mb-2">
                                <span>Order Overview</span>
                                <div class="input-group float-end" id="promoCode">
                                    <input type="text" class="form-control" :readonly="form.discount" v-model="code" placeholder="Promo code" aria-describedby="basic-addon2">
                                    <span class="input-group-text p-0" id="basic-addon2">
                                        <button class="btn btn-primary" @click="applyCode">Apply Code</button>
                                    </span>                                                
                                </div> 
                            </h6>
                            <table class="table table-hover table-striped" v-if="products">
                                <thead class="bg-secondary text-white text-center">
                                    <th class="py-2">SL</th>
                                    <th class="py-2">Product</th>
                                    <th class="py-2">Unit Price</th>
                                    <th class="py-2">Total Price</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(cartPro,i) in products" :key="cartPro.product_id">
                                        <td>{{ ++i }}</td>
                                        <td>{{ cartPro.product.product_name }}</td>
                                        <td class="text-end pe-3">{{ cartPro.product.sale_price.toLocaleString() }}৳ x {{ cartPro.qty }}</td>
                                        <td class="text-end pe-3">{{ (cartPro.product.sale_price * cartPro.qty).toLocaleString() }}৳</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end pe-3">
                                            <small class="fw-bold">Sub Total:</small>
                                        </td>
                                        <td class="text-end pe-3" v-if="cartTotal.subTotal">
                                            <small class="fw-bold">{{ form.sub_total.toLocaleString() }}৳</small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end pe-3">
                                            <small class="fw-bold">Home Delivery:</small>
                                        </td>
                                        <td class="text-end pe-3" >
                                            <small class="fw-bold">{{ form.shipping_fee }}৳</small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end pe-3 py-1" >
                                            <small v-if="this.form.promo_code" class="float-start btn btn-sm fw-bold bg-danger text-white p-1 rounded" @click="removeVoucher()" title="Click for remove voucher" >
                                                <font-awesome icon="close" />
                                                <span v-if="offerProduct.offer_type == 'discount'">
                                                    Voucher Discount (- {{ this.form.discount.toLocaleString() }}৳)
                                                </span>                                                                                                
                                                <span v-else >
                                                    Voucher Free Gift
                                                </span>                                                                                                
                                            </small>
                                            <small class="fw-bold">Total:</small>
                                        </td>
                                        <td class="text-end pe-3 align-middle py-1" v-if="form.net_amount">
                                            <small class="fw-bold">{{ form.net_amount.toLocaleString() }}৳</small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        <div class="row mx-1 mt-4">
            <div class="col-xl-10 col-md-9 col-12 bg-white rounded py-3">
                <div class="form-group " >
                    <input type="checkbox" v-model="check" id="term">
                    <label class="mb-0 ms-3 d-inline" for="term">I have read and agree to the 
                        <router-link to="/"  class=" text-danger">Terms and Conditions</router-link> , 
                        <router-link to="/"  class=" text-danger">Privacy Policy</router-link> and 
                        <router-link to="/" class=" text-danger">Refund and Return Policy</router-link>    
                    </label>
                </div>
            </div>
            <div class="col-xl-2 col-md-3 col-12 bg-white rounded py-3 mt-3 mt-xl-0 mt-md-0">
                <div class="form-group text-center">
                    <button class="btn btn-primary" @click="orderConfirm">Order Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            products: [],
            cartTotal: {},
            userInfo: '',
            form: {},
            shipping_areas: [],
            check: true,
            shipping_fee: 0,
            delivery_method: '',
            payment_type: '',
            selected: '',
            code: '',
            offerProduct: '',
            error_list: {
                first_name: '',
                last_name: '',
                mobile: '',
                email: '',
                city: '',
                zone_id: '',
                address: '',
            }
        }
    },
    mounted(){
        this.products = this.$store.getters.productCart;
        this.cartTotal = this.$store.getters.cartTotal;
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!this.userInfo) {
            this.$router.push('/login');
        }else{
            this.form = {
                'customer_id': this.userInfo.user.customer_id,
                'first_name': this.userInfo.user.first_name,
                'last_name': this.userInfo.user.last_name,
                'mobile': this.userInfo.user.mobile,
                'email': this.userInfo.user.email,
                'city': '',
                'address': this.userInfo.user.address,
                'comment': '',
                'sub_total': this.cartTotal.subTotal,
                'discount': 0,                
                'offer_id': '',
                'promo_code': '',
                'delivery_method': 'home_delivery',
                'payment_type': 'cash_on_delivery',
            }
        }        
        this.getShippingArea();
    },

    methods:{
        getShippingArea(){
            this.$store.dispatch('ShippingArea').then( response => {
                this.shipping_areas = response.data;
                this.form.zone_id = this.shipping_areas[0].zone_id;
                this.form.shipping_fee = this.shipping_areas[0].shipping_fee;
                this.shipping_fee = this.form.shipping_fee;
                this.form.net_amount = parseInt(this.cartTotal.subTotal) + parseInt(this.shipping_fee);
            }).catch(error => {
                console.log(error);
            });
        },        
        delivery(type){
            this.form.delivery_method = type;
            if (type == 'store_pickup') {
                this.form.shipping_fee = 0;
                this.form.net_amount = parseInt(this.form.sub_total) - parseInt(this.form.discount);
            } else {
                this.form.shipping_fee = this.shipping_fee;
                this.form.net_amount = (parseInt(this.form.sub_total) + parseInt(this.shipping_fee)) - parseInt(this.form.discount);
            }
        },
        payment(type){
            this.payment_type = type;
            this.form.payment_type = type;
        },
        zonef(event){
            let shipping = this.shipping_areas.find(item => item.zone_id == event.target.value);            
            this.shipping_fee = shipping.shipping_fee;
            if (this.delivery_method == 'store_pickup') {
                this.form.net_amount = parseInt(this.form.sub_total) - parseInt(this.form.discount);
                this.form.shipping_fee = 0;
            } else {
                this.form.net_amount = (parseInt(this.form.sub_total) + parseInt(this.shipping_fee)) - parseInt(this.form.discount);
                this.form.shipping_fee = shipping.shipping_fee;
            }            
        }, 
        applyCode(){
          if(this.code.length){
            this.$store.dispatch('promoCode',this.code).then(response => {
                if(response.status == 200){
                    this.offerProduct = response.data;
                    let discount = 0;
                    this.offerProduct.products.forEach(offterItem => {
                        this.products.forEach(carItem => {
                            if (carItem.product_id === offterItem.product_id) {
                                discount += parseInt(carItem.qty) * parseInt(offterItem.discount);                                
                            }
                        });
                    });
                    this.form.offer_id = this.offerProduct.offer_id;
                    this.form.discount = discount;
                    this.form.net_amount = (parseInt(this.form.sub_total) + parseInt(this.shipping_fee)) - parseInt(this.form.discount);
                    this.form.promo_code = this.offerProduct.promo_code;
                    this.code = '';
                }else{
                    this.$swal({
                        title: 'INVALID!',
                        icon: 'error',
                        text: response.data,
                    })   
                }
            })
            .catch(error =>{
                console.log(error)
            })
          } else{
            this.$swal({
                title: 'REQUIRED!',
                icon: 'error',
                text: 'Promo code is required!',
            })
          }
        },
        removeVoucher(){
            this.form.offer_id = '';
            this.form.discount = 0;
            this.form.net_amount = (parseInt(this.form.sub_total) + parseInt(this.shipping_fee) + parseInt(this.form.discount));
            this.form.promo_code = '';            
        },
        orderConfirm(){
            let error = '';
            if(this.form.first_name.length){
                this.error_list.first_name = '';
            }else{
                this.error_list.first_name = 'First name is required!';
                error += '<p class="mb-0 text-danger">First name is required!</p>';
            }
            if(this.form.last_name.length){
                this.error_list.last_name = '';
            }else{
                this.error_list.last_name = 'Last name is required!';
                error += '<p class="mb-0 text-danger">Last name is required!</p>';
            }
            if(this.form.mobile.length){
                this.error_list.mobile = '';
            }else{
                this.error_list.mobile = 'Mobile is required!';
                error += '<p class="mb-0 text-danger">Mobile is required!</p>';
            }
            if(this.form.email.length){
                this.error_list.email = '';
            }else{
                this.error_list.email = 'E-mail is required!';
                error += '<p class="mb-0 text-danger">E-mail is required!</p>';
            }
            if(this.form.city.length){
                this.error_list.city = '';
            }else{
                this.error_list.city = 'City is required!';
                error += '<p class="mb-0 text-danger">City is required!</p>';
            }
            if(this.form.zone_id){
                this.error_list.zone_id = '';
            }else{
                this.error_list.zone_id = 'Zone is required!';
                error += '<p class="mb-0 text-danger">Zone is required!</p>';
            }
            if(this.form.address.length){
                this.error_list.address = '';
            }else{
                this.error_list.address = 'Address is required!';
                error += '<p class="mb-0 text-danger">Address is required!</p>';
            }
            if(!this.check){
                error += '<p class="mb-0 text-danger">Terms & condition is required!</p>';
            }
            if(error.length){
                this.$swal({
                    title: "REQUIRED",
                    icon: "warning",
                    html: error,
                });
            }else{
                let product_list = [];
                this.products.forEach(item => {
                    product_list.push({
                        product_id: item.product_id,
                        variation_type_id: item.variation_type_id,
                        variation_id: item.variation_id,
                        qty: item.qty,
                        sale_price: item.product.sale_price,
                        total_price: parseInt(item.product.sale_price) * parseInt(item.qty),
                        warranty: item.product.warranty,
                        word_warranty: item.product.word_warranty,
                    });
                });
                this.form.products = product_list;
                this.$store.dispatch('OrderConfirm',this.form).then(response => {
                     if(response.status == 200){
                        this.$store.dispatch('clearCart');
                        this.$emit('cartReload');  
                        if (response.data.payment_type == 'cash_on_delivery') {
                            this.$router.push('/order-confirm/'+response.data.order_id);
                        }else{
                            console.log('online order');
                        }
                    }else{
                        this.$swal({
                            title: "ERROR",
                            icon: "warning",
                            text: response.data,
                        });
                    }
                }).catch(error => {
                    console.log(error);
                })
            }            
        },
    },

    watch: {
        // ['form.zone_id'](oldd,newd){
        //     console.log(oldd);
        //     console.log(newd);
        // }
    }


}
</script>
<style scoped>
    .mobile{
        position: relative;
        top: -28px;
        background: #f2f4f8;
        color: black;
        padding: 5px;
        left: 5px;
    }
    #promoCode{
        width: 270px;
    }
</style>