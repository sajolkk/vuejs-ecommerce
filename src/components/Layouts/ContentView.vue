<template>
    <div class="product-area col-md-12 px-3 mt-5">
        
        <h5 class="fw-bold feature mb-3 py-2" >Featured Products</h5>
        <div class="pro-card-area">
            <div class="pro-card " v-for="product in products" :key="product.product_id">
                <div class="pro-card-inner">                    
                    <div class="marks" v-if="product.discount>0">
                        <span class="mark">Save: {{ (product.original_price - product.sale_price).toLocaleString() }}৳</span>                        
                    </div>
                    <div class="pro-image"> 
                        <router-link :to="/product-details/+[product.slug+'/'+product.product_id]">
                            <img :src="imageBaseUrl+product.image.small_photo" :alt="product.product_name" class="thumble" >
                        </router-link>
                    </div>
                    <div class="pro-details">
                        <h4 class="pro-name"> <router-link :to="/product-details/+[product.slug+'/'+product.product_id]" class="nav-link p-0 text-start">{{ product.product_name }}</router-link></h4>
                        <div class="pro-price">
                            {{ product.sale_price.toLocaleString() }}৳    
                            <small class="ml-3" v-if="product.discount>0" ><del class="text-secondary " >{{ (product.original_price - product.sale_price).toLocaleString() }}৳</del></small>                            
                        </div>
                    </div>
                    <div class="justify-content-center buy-btn">                        
                        <button class="btn btn-out mb-2 btn-sm float-start col-12" v-if="product.stock_status == 2" >Stock Out</button>
                        <button class="btn btn-out mb-2 btn-sm float-start col-12" v-else-if="product.stock_status == 3" >Up Coming</button>
                        <button class="btn btn-primary mb-2 btn-sm float-start col-12" v-else @click="buyNowf(product.product_id)" ><font-awesome icon="cart-arrow-down" /> Buy Now</button>
                        <button class="btn btn-secondary mb-1 btn-sm float-end col-12" @click="addtoComparef(product)" ><font-awesome icon="plus" class="" /> Add to Compare</button>
                    </div> 
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" :class="buyModalShow" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="staticBackdropLabel">{{ product_detail.product_name }}</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="buyModalClose()"></button>
                    </div>
                    <div class="modal-body row">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-12 border mb-1 p-1" v-if="product_detail">
                                    <img :src="imageBaseUrl+product_detail.image.large_photo" class="img-fluid" :alt="product_detail.product_name" >
                                </div>
                                <div class="col-md-12 px-0" v-if="product_detail">
                                    <img v-for="image in product_detail.images" :key="image.pro_image_id" :src="imageBaseUrl+image.small_photo" class="d-inline gallary-img" alt="" >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8" v-if="product_detail">
                            <h5 class="nav-link ps-0">
                                <router-link :to="/product-details/+[product_detail.slug+'/'+product_detail.product_id]" class="nav-link p-0 text-start" >{{ product_detail.product_name }}</router-link>
                            </h5>
                            <div class="row price-card" >
                                <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1">
                                    <div class="py-1 pl-1 price-bg px-1" >
                                        <span class=" ">Price: </span><span class="text-dark fw-bold" >{{ product_detail.sale_price.toLocaleString() }}৳</span>
                                        <del  v-if="product_detail.discount>0">{{ product_detail.original_price.toLocaleString() }}৳</del>                                
                                    </div>                                                                
                                </div>

                                <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1">
                                    <div class=" py-1 pl-1 price-bg px-1" >
                                        <span>Regular Price: </span><span class="text-dark fw-bold" >{{ product_detail.regular_price.toLocaleString() }}৳</span> 
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                                    <div class=" py-1 pl-1 price-bg px-1" >
                                        <span>Status:</span>
                                        <span class="text-dark fw-bold" v-if="product_detail.stock_status == 1" >Stock In</span>
                                        <span class="text-dark fw-bold" v-else-if="product_detail.stock_status == 2" >Stock Out</span>
                                        <span class="text-dark fw-bold" v-else >Upcomming</span> 
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                                    <div class=" py-1 pl-1 price-bg px-1" >
                                        <span>Product Code:</span>
                                        <span class="text-dark fw-bold" >{{ product_detail.product_id }}</span> 
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                                    <div class=" py-1 pl-1 price-bg px-1" >
                                        <span>Brand:</span>
                                        <span class="text-dark fw-bold" >{{ product_detail.brand.brand_name }}</span> 
                                    </div>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-12 ps-1">
                                    <p class="mb-0">Model: {{ product_detail.product_model }}</p>
                                    <p class="mb-0" v-if="product_detail.warranty>0">Warranty: {{ product_detail.word_warranty }} Months Available</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row mt-2 ps-1">
                                        <div class="col-md-2 px-0 form-group">
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <label for="" class="d-block mb-0 pb-0">Quantity:</label>
                                                    <input type="button" value="-" class="minus" @click="decreaseQty">
                                                    <input type="text" name="quantity" @keypress="qtyFilter(event)" v-model="cartForm.qty" title="Qty" class="qty" size="4">
                                                    <input type="button" value="+" class="plus" @click="increaseQty">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- color section -->
                                        <div class="col-md-2 px-0 form-group" v-if="product_detail.attr_type == 'color'">
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <label for="" class="d-block mb-0 pb-0">Color:</label>
                                                    <select  class="form-control p-0" v-model="cartForm.variation_id" style="height: 34px;">
                                                        <option v-for="datacv in product_detail.color_variation" :key="datacv.variation_id" :value="datacv.variation_id">{{ datacv.variation_name }}</option>
                                                    </select>
                                                    <input type="hidden"  v-model="cartForm.variation_type_id">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- size section -->
                                        <div class="col-md-2 px-0 form-group" v-else-if="product_detail.attr_type == 'size'">
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <label for="" class="d-block mb-0 pb-0">Size:</label>
                                                    <select  class="form-control p-0" v-model="cartForm.variation_id" style="height: 34px;">
                                                        <option v-for="datacv in product_detail.size_variation" :key="datacv.variation_id" :value="datacv.variation_id">{{ datacv.variation_name }}</option>
                                                    </select>
                                                    <input type="hidden"  v-model="cartForm.variation_type_id">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- color and size section -->
                                        <div class="col-md-2 px-0 form-group" v-else-if="product_detail.attr_type == 'color_size'">
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <label for="" class="d-block mb-0 pb-0">Color:</label>
                                                    <select  class="form-control p-0" v-model="cartForm.variation_type_id" style="height: 34px;" @change="colorf($event)">
                                                        <option v-for="datacv in product_detail.color_size_variation" :key="datacv.variation_type_id" :value="datacv.variation_type_id">{{ datacv.variation_type_name }}</option>
                                                            <!-- @if($keyc == 0)
                                                                $variation_type_id = $datacv->variation_type_id; -->
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        
                                            <!-- $size = App\Models\Product_variation_view::where('variation_type_id', $variation_type_id)->orderBy('variation_name')->get();                                     -->
                                        
                                        <div class="col-md-2 px-0 form-group" v-if="product_detail.attr_type == 'color_size'">
                                            <div class="cart-product-quantity">
                                                <div class="quantity">
                                                    <label for="" class="d-block mb-0 pb-0">Size:</label>
                                                    <select  class="form-control variation_id size_result p-0" v-model="cartForm.variation_id" style="height: 34px;" >
                                                        <option v-for="size in sizes" :value="size.variation_id" :key="size.variation_id">{{ size.variation_name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="product_detail.attr_type == ''" class="d-none">
                                            <input type="hidden"  v-model="cartForm.variation_type_id">
                                            <input type="hidden" v-model="cartForm.variation_id">
                                        </div>

                                        <div class="col-md-6 mt-4">
                                            <button class="btn btn-primary mb-1 btn-sm  me-2" @click="addToCart(product_detail)" ><font-awesome icon="cart-arrow-down" /> Add to Cart</button>
                                            <button class="btn btn-secondary mb-1 btn-sm  " @click="addtoComparef(product_detail)" ><font-awesome icon="plus" class="" /> Add to Compare</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <hr />  
                                            <div class="product_share">
                                                <span>Share With:</span>
                                                <a href="#" class="nav-link me-2 d-inline" target="_blank" >Facebook</a>
                                                <a href="#" class="nav-link d-inline" target="_blank" >Twittter</a>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="buyModalClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default{
    name: 'ContentView',
    props: ['imageBaseUrl'],
    data(){
        return{
            products: [],
            buyModalShow: '',
            product_detail: '',
            sizes:[],
            cartForm: {
                variation_type_id: '',
                variation_id: '',
                qty: 1,
                product: '',
            },
        }
    },
    methods:{
        // buynow method
        buyNowf(product_id) {
            this.buyModalShow = 'show d-block';
            this.$store.dispatch('productDetailf',product_id).then(response => {
                this.product_detail = response.data;
                if (this.product_detail.attr_type == 'color_size') {
                    var colors = this.product_detail.color_size_variation[0];
                    var colordata = {
                        'product_id': this.product_detail.product_id,
                        'variation_type_id': colors.variation_type_id,
                    };
                    this.$store.dispatch('colorSizeVariations',colordata).then(responses => {
                        this.sizes = responses.data;
                        this.cartForm.variation_id = responses.data[0].variation_id;
                    });                    
                    this.cartForm.variation_type_id = colors.variation_type_id;                    
                }else if(this.product_detail.attr_type == 'color'){
                    var color = this.product_detail.color_variation[0];
                    this.cartForm.variation_type_id = color.variation_type_id;
                    this.cartForm.variation_id = color.variation_id;
                }else if(this.product_detail.attr_type == 'size'){
                    var sizev = this.product_detail.size_variation[0];
                    this.cartForm.variation_type_id = sizev.variation_type_id;
                    this.cartForm.variation_id = sizev.variation_id;
                }else{
                    this.cartForm.variation_type_id = '';
                    this.cartForm.variation_id = '';
                }                
                this.cartForm.qty = 1;
                this.cartForm.product = '';
                
            })
            .catch(error => {
                console.log(error);
            });
        },
        buyModalClose(){
            this.buyModalShow = '';
            this.product_detail = '';
        },

        // color change function
        colorf(event){
            var colordata = {
                'product_id': this.product_detail.product_id,
                'variation_type_id': event.target.value,
            };
            this.$store.dispatch('colorSizeVariations',colordata).then(responses => {
                this.sizes = responses.data;
                this.cartForm.variation_id = this.sizes[0].variation_id;
            });
        },
        addtoComparef(product){
            this.$store.dispatch('addtoCompare',product);
        },
        addToCart(product){
            if (this.cartForm.qty == 0 || this.cartForm.qty == '') {
                this.cartForm.qty = 1;
            }
            this.cartForm.product = product;
            this.$store.dispatch('addToCart',this.cartForm);
        },
        qtyFilter(evt) {
            evt = (evt) ? evt : window.event;
            let expect = evt.target.value.toString() + evt.key.toString();            
            if (!/^[-+]?[0-9]*?[0-9]*$/.test(expect)) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        decreaseQty(){
            if(this.cartForm.qty > 1){
                this.cartForm.qty -= 1;
            }
        },
        increaseQty(){
            this.cartForm.qty += 1;
        },
    },
    created(){
        // this.$store.dispatch('featureProducts').then(response => {
        //     this.products = response.data;
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        // this.imageBaseUrl = this.$store.getters.imgBaseUrl;
    },
    mounted(){
        this.$store.dispatch('featureProducts').then(response => {
            this.products = response.data;
        })
        .catch(error => {
            console.log(error);
        });
    },
    watch: {
        
    }
}
</script>
<style scoped>
    .feature{
        border-bottom: 2px solid #293a99 !important;
    }
    .thumble{
        height: 221px; width: 221px; text-align: center;
    }
    .pro-card-area{
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        padding: 0;
        justify-content: flex-start;
        background: none;
    }

    .pro-card{
        flex: 0 0 20%;
        max-width: 20%;
        padding: 0 5px 10px;
        margin-bottom: 0;
        display: flex;
        position: relative;
    }
    .pro-card-inner{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
    }
    .pro-card-inner:hover{
      box-shadow: 0px 0px 8px 1px gray;  
    }
    .marks{
        display: flex;
        position: absolute;
        top: 5px;
        left: 0;
        z-index: 10;
        flex-direction: column;
        align-items: flex-start;
    }
    .mark{
        background: #293a99;
        width: auto;
        color: #fff;
        font-size: 12px;
        padding: 3px 10px;
        line-height: 14px;
        margin-bottom: 2px;
        border-radius: 0 20px 20px 0;
        flex: 0 0 auto;
    }

    .pro-image{
        text-align: center;
        border-bottom: 3px solid rgba(55, 73, 187, 0.03);
        flex: 0 0 220px;
        padding: 20px;
        margin: 0;
    }
    .pro-image img {
        max-width: 100%;
    }
    .pro-details {
        padding: 10px;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        border-bottom: 3px solid rgba(55, 73, 187, 0.03);
    }
    .price-card{
        font-size: 14px;
    }
    .pro-name {
        font-weight: 400;
        font-size: 15px;
    }
    .pro-price {
        line-height: 22px;
        font-size: 17px;
        font-weight: 600;
        color: #EF4A23;
    }
    .text-dark{
        color: black;
    }
    .buy-btn {
        padding: 10px;       
    }
    .btn-primary{
        background: #293A99;
    }
    .btn-out{
        background: #293475c7;
        color: white;
    }
    .btn-primary:hover{
        box-shadow: 0px 3px 3px 1px darkblue;
        color: #fffcfccc;
    }
    .btn-secondary:hover{
        box-shadow: 0px 3px 3px 1px #648fb9;
        color: #fffcfccc;
    }
    .gallary-img{
        height: 50px; width: 50px; border: 1px solid lightgray; padding: 5px; margin: 1px;
    }
    .price-bg{
        background: #f1f1f3d1;
    }

    @media (max-width: 1279px){
        .pro-card{
            flex: 0 0 25%;
            max-width: 25%;
        }
    }
    @media (max-width: 767px){
        .pro-card {
            flex: 0 0 50%;
            max-width: 50%;
        }
    }
</style>
