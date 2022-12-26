<template>
    <div id="product-detail" class="product-area col-md-12 px-3 mt-2 mb-5">
        <div class="row" v-if="product" >
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none"><font-awesome icon="home" /></a></li>
                        <li class="breadcrumb-item "><router-link :to="/type-products/+[product.product_type.slug+'/'+product.product_type.type_id]" class="text-decoration-none">{{ product.product_type.type_name }}</router-link></li>
                        <li class="breadcrumb-item " v-if="product.category" ><router-link :to="/category-products/+[product.product_type.slug+'/'+product.product_type.type_id+'/'+product.category.slug+'/'+product.category.category_id]" class="text-decoration-none">{{ product.category.category_name }}</router-link></li>
                        <li class="breadcrumb-item " v-if="product.sub_category" ><router-link :to="/subcategory-products/+[product.product_type.slug+'/'+product.product_type.type_id+'/'+product.category.slug+'/'+product.category.category_id+'/'+product.sub_category.slug+'/'+product.sub_category.sub_cat_id]" class="text-decoration-none">{{ product.sub_category.sub_cat_name }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ product.product_name.slice(0,20) }}{{ product.product_name.length>20 ? '...':'' }}</li>
                    </ol>
                </nav>
            </div>
            <div class="col-lg-5 col-md-5 col-12 mb-4 mb-md-0">
                <div class="row bg-white me-1 p-2" >
                    <div class="col-md-12 border mb-1 p-1" >
                        <img :src="imageBaseUrl+product.image.large_photo" class="img-fluid image" :alt="product.product_name" >
                    </div>
                    <div class="col-md-12 px-0 bg-white" v-if="product">
                        <img v-for="image in product.images" :key="image.pro_image_id" :src="imageBaseUrl+image.small_photo" class="d-inline gallary-img" alt="" >
                    </div>
                </div>
                <div class="loupe"></div>
            </div>
            <div  class="col-lg-7 col-md-7 col-12 bg-white px-3" >                
                <div class="row price-card" >
                    <h5 class="nav-link text-start ps-2">{{ product.product_name }}</h5>
                    <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1">
                        <div class="py-1 pl-1 price-bg px-1 rounded" >
                            <span class=" ">Price: </span><span class="text-dark fw-bold" >{{ product.sale_price.toLocaleString() }}৳</span>
                            <del  v-if="product.discount>0">{{ product.original_price.toLocaleString() }}৳</del>                                
                        </div>                                                                
                    </div>

                    <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1">
                        <div class=" py-1 pl-1 price-bg px-1 rounded" >
                            <span>Regular Price: </span><span class="text-dark fw-bold" >{{ product.regular_price.toLocaleString() }}৳</span> 
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                        <div class=" py-1 pl-1 price-bg px-1 rounded" >
                            <span>Status:</span>
                            <span class="text-dark fw-bold" v-if="product.stock_status == 1" >Stock In</span>
                            <span class="text-dark fw-bold" v-else-if="product.stock_status == 2" >Stock Out</span>
                            <span class="text-dark fw-bold" v-else >Upcomming</span> 
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                        <div class=" py-1 pl-1 price-bg px-1 rounded" >
                            <span>Product Code:</span>
                            <span class="text-dark fw-bold" >{{ product.product_id }}</span> 
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-4 col-6 col-sm-6 p-1 ">
                        <div class=" py-1 pl-1 price-bg px-1 rounded" >
                            <span>Brand:</span>
                            <span class="text-dark fw-bold" >{{ product.brand.brand_name }}</span> 
                        </div>
                    </div>
                </div> 
                <div class="row">
                    <div class="col-md-12 ps-1">
                        <p class="mb-0">Model: {{ product.product_model }}</p>
                        <p class="mb-0" v-if="product.warranty>0">Warranty: {{ product.word_warranty }} Months Available</p>
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
                            <div class="col-md-2 px-0 form-group" v-if="product.attr_type == 'color'">
                                <div class="cart-product-quantity">
                                    <div class="quantity">
                                        <label for="" class="d-block mb-0 pb-0">Color:</label>
                                        <select  class="form-control p-0" v-model="cartForm.variation_id" style="height: 34px;">
                                            <option v-for="datacv in product.color_variation" :key="datacv.variation_id" :value="datacv.variation_id">{{ datacv.variation_name }}</option>
                                        </select>
                                        <input type="hidden"  v-model="cartForm.variation_type_id">
                                    </div>
                                </div>
                            </div>
                            <!-- size section -->
                            <div class="col-md-2 px-0 form-group" v-else-if="product.attr_type == 'size'">
                                <div class="cart-product-quantity">
                                    <div class="quantity">
                                        <label for="" class="d-block mb-0 pb-0">Size:</label>
                                        <select  class="form-control p-0" v-model="cartForm.variation_id" style="height: 34px;">
                                            <option v-for="datacv in product.size_variation" :key="datacv.variation_id" :value="datacv.variation_id">{{ datacv.variation_name }}</option>
                                        </select>
                                        <input type="hidden"  v-model="cartForm.variation_type_id">
                                    </div>
                                </div>
                            </div>
                            <!-- color and size section -->
                            <div class="col-md-2 px-0 form-group" v-else-if="product.attr_type == 'color_size'">
                                <div class="cart-product-quantity">
                                    <div class="quantity">
                                        <label for="" class="d-block mb-0 pb-0">Color:</label>
                                        <select  class="form-control p-0" v-model="cartForm.variation_type_id" style="height: 34px;" @change="colorf($event)">
                                            <option v-for="datacv in product.color_size_variation" :key="datacv.variation_type_id" :value="datacv.variation_type_id">{{ datacv.variation_type_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-2 px-0 form-group" v-if="product.attr_type == 'color_size'">
                                <div class="cart-product-quantity">
                                    <div class="quantity">
                                        <label for="" class="d-block mb-0 pb-0">Size:</label>
                                        <select  class="form-control variation_id size_result p-0" v-model="cartForm.variation_id" style="height: 34px;" >
                                            <option v-for="size in sizes" :value="size.variation_id" :key="size.variation_id" >{{ size.variation_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div v-if="product.attr_type == ''" class="d-none">
                                <input type="hidden"  v-model="cartForm.variation_type_id">
                                <input type="hidden" v-model="cartForm.variation_id">
                            </div>

                            <div class="col-md-6 mt-4">
                                <button class="btn buybtn-primary mb-1 btn-sm  me-2" @click="addToCart(product)" ><font-awesome icon="cart-arrow-down" /> Add to Cart</button>
                                <button class="btn btn-secondary mb-1 btn-sm  " @click="addtoComparef(product)" ><font-awesome icon="plus" class="" /> Add to Compare</button>
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
            <div class="col-lg-9 col-md-8 col-12 mb-4 mb-md-0">
                <div class="row">
                    <div class="col-md-12 mt-4">
                        <a class="fw-bold me-3 py-2 px-3 speci-btn sactive text-decoration-none" href="#specification">Specification</a>
                        <a class="fw-bold me-3 py-2 px-3 speci-btn text-decoration-none" href="#description">Description</a>
                        <a class="fw-bold me-3 py-2 px-3 speci-btn text-decoration-none" href="#questions">Questions ({{ product.questions.length }})</a>
                        <a class="fw-bold me-3 py-2 px-3 speci-btn text-decoration-none" href="#reviews">Reviews ({{ product.reviews.length }})</a>
                    </div>
                    <div class="col-md-12 mt-3" id="specification">
                        <h5 class="mt-2 mx-1 bg-white pb-3"> <span class="d-inline-block ps-4 py-3 pb-4"></span>  Specification</h5>
                        <div class="mx-1 bg-white px-3 pb-4" v-html="product.specification"></div>
                    </div>
                    <div class="col-md-12 mt-3" id="description">
                        <h5 class="mt-2 mx-1 bg-white pb-3 mb-0"> <span class="d-inline-block ps-3 py-3 pb-4"></span>  Description</h5>
                        <div class="mx-1 bg-white px-4 pb-4" v-html="product.description"></div>
                    </div>
                    <div class="col-md-12 mt-3" id="questions">
                        <h5 class="mt-2 mx-1 bg-white mb-0"> 
                            <span class="d-inline-block ps-3 py-3">Questions ({{ product.questions.length }})</span>  
                            <span class="d-inline-block me-3 py-1 mt-2 btn buybtn-primary float-end" @click="QueRevModal('question')" >Ask Question</span>  
                        </h5>
                        <div class="mx-1 bg-white px-4 py-2 fw-bold ques-loop rounded mt-1" v-for="question in product.questions.slice(0, 10)" :key="question.question_id" >
                            <div class="ques">
                                <div class="qtitle">Q:</div>
                                <div class="qdetail">
                                    {{ question.question }}
                                    <br>
                                    <small  class="fw-normal text-dark" >By {{ question.sender_name }}</small> <span class="fw-normal fst-italic"><small>on {{ monthNames[(new Date(question.created_at)).getMonth()] }} {{ (new Date(question.created_at)).getDate() }}, {{ (new Date(question.created_at)).getFullYear() }}</small></span>
                                </div>
                            </div>
                            <div class="ques">
                                <div class="qtitle mt-2">A:</div>
                                <div class="qdetail mt-2">
                                    {{ question.answare }}
                                    <div v-if="question.answare">
                                        <small  class="fw-normal" >By Sopmax</small >
                                    </div>
                                </div>                                
                            </div>                            
                        </div>
                        <p v-if="product.reviews.length > 2" class="nav-link text-end my-0 mx-1 bg-white"><router-link :to="/product-questions/+[product.slug+'/'+product.product_id]" class="nav-link" >More questions...</router-link></p>
                        <div v-if="!product.questions.length" class="col-md-12 " >
                            <p class="fw-bold text-center pb-3 mx-1 bg-white pt-2 border-top ">There are no questions asked yet.</p>
                        </div>
                    </div>
                    <div class="col-md-12 mt-3" id="reviews">
                        <h5 class="mt-2 mx-1 bg-white mb-0"> 
                            <span class="d-inline-block ps-3 py-3">Reviews ({{ product.reviews.length }})</span>  
                            <span class="d-inline-block me-3 py-1 mt-2 btn buybtn-primary float-end" @click="QueRevModal('review')" >Write a Review</span>  
                            <span class="d-block mb-2 py-3 px-3" v-if="product.reviews.length" >
                                <font-awesome icon="star" v-for="n in parseInt(product.review_average[0].avg)" :key="n" class="text-success" :class="n" /> 
                                &nbsp;{{ product.review_average[0].avg }} out of 5
                            </span>
                        </h5>
                        <div class="mx-1 bg-white px-4 py-2 fw-bold ques-loop rounded mt-1" v-for="review in product.reviews.slice(0, 10)" :key="review.review_id" >
                            <div>
                                <div>{{ review.message }}</div>
                                <div>
                                    <font-awesome icon="star" v-for="n in review.rating" :key="n" class="text-success" :class="n" />
                                    <small  class="fw-normal ms-2" >By {{ review.reviewer_name }}</small >
                                </div>
                            </div>
                        </div>
                        <p v-if="product.reviews.length > 2" class="nav-link text-end my-0 mx-1 bg-white"><router-link  :to="/product-reviews/+[product.slug+'/'+product.product_id]" class="nav-link" >More reviews...</router-link></p>
                    </div>
                    <div v-if="!product.reviews.length" class="col-md-12 " >
                        <p class="fw-bold text-center pb-3 mx-1 bg-white pt-2 border-top ">This product has no reviews yet.</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-12 mb-4 mb-md-0 border">
                sidebar
            </div>
        </div>
            
            <!-- comment or question modal -->
        <div class="modal fade" :class="commentModalShow" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title fw-bold text-capitalize" id="staticBackdropLabel">Write {{ modalTitle }}</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="commentModalClose()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="pro" class="fw-bold mb-0">Product</label>
                            <input v-if="product" type="text" id="pro" class="form-control" readonly :value="product.product_name">
                        </div>
                        <div class="form-group mt-3" v-if="modalTitle == 'review'">
                            <label for="pro" class="fw-bold mb-0">Rating <small class="text-danger">*</small></label>
                            <div class="d-block">
                                <font-awesome icon="star" :class="one"  class="me-3" @click="star(1)" />
                                <font-awesome icon="star" :class="tow"  class="me-3" @click="star(2)" />
                                <font-awesome icon="star" :class="three" class="me-3" @click="star(3)" />
                                <font-awesome icon="star" :class="four"  class="me-3" @click="star(4)" />
                                <font-awesome icon="star" :class="five"  class="" @click="star(5)" />
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <label for="quRe" class="text-capitalize mb-0 fw-bold">{{ modalTitle }} <small class="text-danger">*</small></label>
                            <textarea name="" id="" cols="30" class="form-control" rows="5" :placeholder="'Write your '+modalTitle" v-model="form.msg"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="msgSubmit()">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="commentModalClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- login modal -->
        <div class="modal fade" :class="loginModal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered loginmodal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title fw-bold text-capitalize" id="staticBackdropLabel">Account Login</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="loginModalClose()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Account Login</a></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <form class="login-area d-block mx-auto border rounded">
                            <div class="form-group row mx-0">
                                <div class="col-6 py-2 text-center log " :class="mobile? 'activelog':''" @click="loginType">Login With Mobile</div>
                                <div class="col-6 py-2 text-center log" :class="!mobile? 'activelog':''" @click="loginType">Login With E-mail</div>
                            </div>
                            <div class="p-3">
                                <div class="form-group mt-3">
                                    <label for="" class="">{{ mobile? 'Mobile':'E-mail' }}:</label>
                                    <input type="text" v-model="loginForm.user_name" class="form-control" :class="mobile? 'ps-5':''" :placeholder="mobile? 'Enter mobile number':'Enter e-mail address'" >
                                    <span v-if="mobile"  class="mobile">+88</span>
                                </div>
                                <div class="form-group mt-3">
                                    <label for="" class="d-block">Password: <a class="float-end nav-link p-0 forgot d-inline-block" >Forgot Password?</a></label>
                                    <input type="password" v-model="loginForm.password" class="form-control" placeholder="Enter password" >
                                </div>
                                <div class="form-group row">
                                    <div class="col-6 mt-3">
                                        <button type="reset" class="btn btn-primary col-12">Clear</button>                
                                    </div>
                                    <div class="col-6 mt-3">
                                        <button type="button" class="btn btn-primary col-12" @click="login" >Login</button>                
                                    </div>
                                </div>
                                <div class="form-group mt-4 text-center">
                                    <p>Don't have an account?</p>
                                </div>
                                <div class="form-group">
                                    <router-link to="/register" class="btn btn-primary col-12">Create New Account</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="loginModalClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>    
</template>
<script>
// import imageZoom from "vue-image-zoomer";
export default{
    name: 'ProductDetailView',
    props: ['imageBaseUrl','userInfo'],
    // components:{imageZoom},
    data(){
        return{
            product_id: this.$route.params.product_id,
            product: null,
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            sizes: [],
            cartForm: {
                variation_type_id: '',
                variation_id: '',
                qty: 1,
                product: '',
            },
            form: {
                msg: '',
                rating: 0,
            },            
            commentModalShow: '',
            loginModal: '',
            modalTitle: '',
            one: '',
            tow: '',
            three: '',
            four: '',
            five: '',
            mobile: true,
            loginForm: {
                user_name: '',
                mobile: '',
                email: '',
                password: '',
            },
        }
    },
    methods:{
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
        // color change function
        colorf(event){
            var colordata = {
                'product_id': this.product_id,
                'variation_type_id': event.target.value,
            };
            this.$store.dispatch('colorSizeVariations',colordata).then(responses => {
                this.sizes = responses.data;
                this.cartForm.variation_id = this.sizes[0].variation_id;
            });
        },
        QueRevModal(val){ 
            this.modalTitle = val;      
            this.one = '';
            this.tow = '';
            this.three = '';
            this.four = '';
            this.five = '';     
            this.form.rating = 0;
            this.form.msg = '';
            if (this.userInfo) {
                this.commentModalShow = 'show d-block';                
            } else {
                this.loginModal = 'show d-block';
            }
        },
        commentModalClose(){
            this.commentModalShow = '';
        },
        loginModalClose(){
            this.loginModal = '';
        },
        star(id){
            if (id == 1) {
                this.one = 'text-success';
                this.tow = '';
                this.three = '';
                this.four = '';
                this.five = '';
            } else if(id == 2) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = '';
                this.four = '';
                this.five = '';
            }else if(id == 3) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = '';
                this.five = '';
            }else if(id == 4) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = 'text-success';
                this.five = '';
            }else if(id == 5) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = 'text-success';
                this.five = 'text-success';
            }
            this.form.rating = id;
        },
        loginType(){
            this.mobile = !this.mobile;
            this.loginForm.user_name = '';
            this.loginForm.mobile = '';
            this.loginForm.email = '';
            this.loginForm.password = '';
        },
        login(){
            var error = '';        
            if (this.mobile) {
                const mobExp = /^[0-9]*$/;
                this.loginForm.mobile = this.loginForm.user_name;
                if (this.loginForm.mobile == '') {
                    error += '<p class="text-danger mb-0">Mobile number is required!</p>';
                }else if (mobExp.test(this.loginForm.mobile) == false) {
                    error += '<p class="text-danger mb-0">Only number is allowed!</p>';
                }else if(this.loginForm.mobile.length < 11 || this.loginForm.mobile.length > 11){
                    error += '<p class="text-danger mb-0">Mobile number is invalid!</p>';
                } 
            } else {
                const emailRegex = RegExp(
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                );            
                this.loginForm.email = this.loginForm.user_name;
                if(this.loginForm.email == ''){
                    error += '<p class="text-danger mb-0">E-mail is required!</p>';
                }else if (!emailRegex.test(this.loginForm.email)) {
                    error += '<p class="text-danger mb-0">E-mail is invalid!</p>';
                }            
            }
            if(this.loginForm.password == ''){
                error += '<p class="text-danger mb-0">Password is required!';
            }else if(this.loginForm.password.length <6){
                error += '<p class="text-danger mb-0">Enter at least 6 digits password!</p>';
            }
            if(error != ''){
                this.$swal({
                    title: 'REQUIRED!',
                    icon: 'error',
                    html: error,
                });
            }else{
                this.$store.dispatch("UserLogin",this.loginForm).then(response => { 
                    if (response.status == 200) {
                        this.$emit('loginReload');
                        this.commentModalShow = 'show d-block';
                        this.loginModal = '';
                    }else{
                        var error = '<p class="text-danger mb-0">'+response.data+'</p>';
                        this.$swal({
                            title: 'Warning!',
                            icon: 'error',
                            html: error,
                        });
                    }  
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        msgSubmit(){
            var error = '';
            if (this.modalTitle == 'review') {
                let reviewData = {
                    'product_id' : this.product.product_id,
                    'message' : this.form.msg,
                    'rating' : this.form.rating,
                    'reviewer_name' : this.userInfo.user.first_name+' '+this.userInfo.user.last_name,
                    'email' : this.userInfo.user.email,
                }
                if (reviewData.message == '') {
                    error += '<p class="text-danger mb-0">Review is required!</p>';
                }
                if (reviewData.rating == 0) {
                    error += '<p class="text-danger mb-0">Rating is required!</p>';
                }
                if (error.length) {
                    this.$swal({
                        title: 'Warning!',
                        icon: 'error',
                        html: error,
                    });
                } else {
                   this.$store.dispatch('reviewStore',reviewData).then(response => {
                        if (response.status == 201) {
                            this.commentModalShow = '';
                            this.$swal({
                                title: 'success!',
                                icon: 'success',
                                text: response.data,
                            });
                        } else {
                            this.$swal({
                                title: 'Warning!',
                                icon: 'error',
                                text: response.data,
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    }); 
                }                
            } else {
                if (this.form.msg.length) {
                    let questionData = {
                        'product_id' : this.product.product_id,
                        'question' : this.form.msg,
                        'sender_name' : this.userInfo.user.first_name+' '+this.userInfo.user.last_name,
                        'email' : this.userInfo.user.email,
                    }

                    this.$store.dispatch('questionStore',questionData).then(response => {
                        if (response.status == 201) {
                            this.commentModalShow = '';
                            this.$swal({
                                title: 'success!',
                                icon: 'success',
                                text: response.data,
                            });
                        } else {
                            this.$swal({
                                title: 'Warning!',
                                icon: 'error',
                                text: response.data,
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }else{
                    error += '<p class="text-danger mb-0">Question is required!</p>';
                    this.$swal({
                        title: 'Warning!',
                        icon: 'error',
                        html: error,
                    });
                }
            }
        }
       
    },
    created(){
        this.$store.dispatch('productDetailf',this.product_id).then(response => {
            this.product = response.data;
            if (this.product.attr_type == 'color_size') {
                var colors = this.product.color_size_variation[0];
                var colordata = {
                    'product_id': this.product_id,
                    'variation_type_id': colors.variation_type_id,
                };
                this.$store.dispatch('colorSizeVariations',colordata).then(responses => {
                    this.sizes = responses.data;
                    this.cartForm.variation_id = responses.data[0].variation_id;
                });                    
                this.cartForm.variation_type_id = colors.variation_type_id;                    
            }else if(this.product.attr_type == 'color'){
                var color = this.product.color_variation[0];
                this.cartForm.variation_type_id = color.variation_type_id;
                this.cartForm.variation_id = color.variation_id;
            }else if(this.product.attr_type == 'size'){
                var sizev = this.product.size_variation[0];
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

    }

}
</script>
<style scoped>
    .gallary-img{
        height: 50px; width: 50px; border: 1px solid lightgray; padding: 5px; margin: 1px;
    }
    .price-bg{
        background: #f1f1f3d1;
    }
    .buybtn-primary{
        background: #293A99; color: white;
    }
    .buybtn-primary:hover{
        box-shadow: 0px 3px 3px 1px darkblue;
        color: #fffcfccc;
    }
    .btn-secondary:hover{
        box-shadow: 0px 3px 3px 1px #648fb9;
        color: #fffcfccc;
    }
    .loupe {
        display: none;
        position: absolute;
        width: 400px;
        height: 400px;
        border: 1px solid black;
        box-shadow: 5px 5px 12px black;
        background: rgba(0, 0, 0, 0.25);
        cursor: crosshair;
        overflow: hidden;
        right: 0;
        top: 0
    }
    .loupe img {
        position: absolute;
        right: 0;
    }
    .speci-btn{
        border: none; border-radius: 5px; background: white;
    }
    .sactive{
        background: #293a99; color: white;
    }
    .speci-btn:hover{
        background: #293a99; color: white;
    }
    .data-table{
        width: 100%;
    }
    .ques-loop{
        display: block; height: auto;
    }
    .ques{
        width: 100%; display: flex; height: auto;
    }
    .qtitle{
        width: 30px; float: left; height: auto;
    }
    .qdetail{
        width: auto; float: right; height: ;
    }
    .login-area{
        width: 400px;
        background: #293a99;
        box-shadow: 0px 5px 10px 1px gray;
        color: white;
    }
    .forgot{
        color: white;
    }
    .forgot:hover{
        color: #adb5bd; cursor: pointer;
    }
    .log{
        border-bottom: 1px solid white; cursor: pointer;
    }
    .activelog{
        background: #02255a; border-bottom: none;
    }
    .mobile{
        position: relative;
        top: -30px;
        background: #f2f4f8;
        color: black;
        padding: 5px;
        left: 5px;
    }
    .loginmodal{
        width: 450px;
    }
</style>