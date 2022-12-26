<template>
    <div class="product-area col-md-12 px-3 mt-2 mb-5">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">{{ typeName }}</a></li>
                    </ol>
                </nav>
            </div>
            <div class="col-xl-2 filter-area px-0">
                <div class="price-range d-block float-start w-100 rounded bg-white px-2 py-3">
                    <p class="fw-bold filter-border mb-3 pb-2"><small>Price Range</small></p>
                    <div class="range d-block px-1">
                        <div class="track-container">
                            <div class="track" ref="_vpcTrack"></div>
                            <div class="track-highlight" ref="trackHighlight"></div>
                            <button class="track-btn track1" ref="track1"></button>
                            <button class="track-btn track2" ref="track2"></button>
                        </div>
                    </div>  
                    <div class="d-block float-start mt-3">
                        <input type="text" class="text-center min" v-model="minValue" @blur="priceFilter($event)">
                        <input type="text" class="text-center max" v-model="maxValue" @blur="priceFilter($event)">
                    </div>                  
                </div>
                <div class="availability-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>Availability</small> <span class="float-end px-2" @click="statusToggle()"><font-awesome :icon="this.statusShow?'angle-up':'angle-down'"  /></span></p>
                    <div v-if="this.statusShow">
                        <div class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" id="instock" value="1" @click="stockStatusf($event)" class="me-2 availability" >
                            <label for="instock">In Stock</label>
                        </div>
                        <div class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" id="upcomming" value="3" @click="stockStatusf($event)" class="me-2 availability" >
                            <label for="upcomming">Up Comming</label>
                        </div>
                    </div>
                </div>
                <div class="brand-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>Brand</small> <span class="float-end px-2" @click="brandToggle()" ><font-awesome :icon="this.brandShow?'angle-up':'angle-down'" /></span></p>
                    <div v-if="this.brandShow">
                        <div v-for="brand in filters.brands" :key="brand.brand_id" class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" name="brand_id[]" :id="'brandId'+brand.brand_id" :value="brand.brand_id" @click="brandClick($event)" class="me-2 availability" >
                            <label :for="'brandId'+brand.brand_id">{{ brand.brand_name }}</label>
                        </div>
                    </div>
                </div>
                <div v-for="(varType, si) in filters.varition_types" :key="varType.variation_type_id" class="variationtype-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>{{ varType.variation_type_name }}</small> <span class="float-end px-2" @click="variationToggle(si)"><font-awesome :icon="this.variationShow[si].show?'angle-up':'angle-down'" /></span></p>
                    <div v-if="this.variationShow[si].show">
                        <div v-for="variation in varType.variations" :key="variation.variation_id" class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" name="variation_id[]" :id="'variationId'+variation.variation_id" :value="variation.variation_id" @click="variationClick($event)" class="me-2 availability" >
                            <label :for="'variationId'+variation.variation_id">{{ variation.variation_name }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-10 col-md-12 col-sm-12 col-12">
                <div class="row bg-white sort-area rounded mx-1 py-2 mb-3">
                    <div class="col-md-12">
                        <div class="filter-btn float-start px-2 py-1" @click="filterClose">
                            <font-awesome icon="bars" class="me-1 d-inline-block"  />
                            <span class="d-inline-block">Filter</span>
                        </div>
                        <div class="sort-area float-end">
                            <div class="per-page d-inline-block me-2 px-2 py-1">
                                <label for="">Show: &nbsp;</label>
                                <select v-model="this.filterForm.limit">
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                    <option value="70">70</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div class="filter-sort d-inline-block px-2 py-1">
                                <label for="">Sort By: &nbsp;</label>
                                <select v-model="this.filterForm.sort_by">
                                    <option value="">Default</option>
                                    <option value="asc">Price (Low to High)</option>
                                    <option value="desc">Price (High to Low)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pro-card-area mt-1" v-if="products.data" >
                    <div class="pro-card" v-for="product in products.data" :key="product.product_id">                    
                        <div class="pro-card-inner">                    
                            <div class="marks" v-if="product.discount>0">
                                <span class="mark">Save: {{ (product.original_price - product.sale_price).toLocaleString() }}৳</span>                        
                            </div>
                            <div class="pro-image"> 
                                <router-link :to="/product-details/+[product.slug+'/'+product.product_id]">
                                    <img :src="imageBaseUrl+product.image.small_photo" :alt="product.product_name" class="thumble">
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
                <div v-else class="col-md-12 py-5 my-5" >
                    <h4 class="text-center py-5" >Product Not Found!!!</h4>
                </div>
                <div class="row mt-4 px-3" v-if="products.total">
                    <div class="col-md-12 bg-white rounded p-2" v-if="defaultd">
                        <div v-if="products.last_page>1" class="d-inline-block" >
                            <div class="d-inline-block" v-if="products.current_page == 1">
                                <button class="btn btn-sm btn-success me-2 mt-1 page-btn" >PREV</button>
                            </div>                        
                            <div class="d-inline-block" v-else>
                                <button class="btn btn-sm btn-success me-2 mt-1 page-btn" @click="paginationPro(products.current_page-1)" >PREV</button>
                            </div>  
                            <div class="d-inline-block" v-for="page in products.last_page" :key="page">                      
                                <button v-if="(page>(products.current_page-4)) && (page<(products.current_page+4))" class="btn btn-sm link-btn me-2 mt-1" :class="page == products.current_page? 'link-active':''" @click="paginationPro(page)" >{{ page }}</button>
                            </div>
                            <div class="d-inline-block" v-if="products.current_page == products.last_page">
                                <button class="btn btn-sm btn-success mt-1 page-btn" >NEXT</button>
                            </div>
                            <div class="d-inline-block" v-else>
                                <button class="btn btn-sm btn-success mt-1 page-btn" @click="paginationPro(products.current_page+1)" >NEXT</button>
                            </div>
                        </div>
                        <div class="page-number d-inline-block float-end">
                            <p class="mt-1 mb-0" ><small class="fw-bold page-btn">Showing {{ products.from }} to {{ products.to }} of {{ products.total }} ({{ products.last_page }} {{ products.last_page>1? 'Pages':'Page' }})</small></p>
                        </div>
                    </div>
                    <div v-else  class="col-md-12 bg-white rounded p-2">
                        <div v-if="products.last_page>1" class="d-inline-block" >
                            <div class="d-inline-block" v-if="products.current_page == 1">
                                <button class="btn btn-sm btn-success me-2 mt-1 page-btn" >PREV</button>
                            </div>
                            <div class="d-inline-block" v-else>
                                <button class="btn btn-sm btn-success me-2 mt-1 page-btn" @click="paginationFilterPro(products.current_page-1)" >PREV</button>
                            </div> 
                            <div class="d-inline-block" v-for="page in products.last_page" :key="page">
                                <button v-if="(page>(products.current_page-4)) && (page<(products.current_page+4))" class="btn btn-sm link-btn me-2 mt-1" :class="page == products.current_page? 'link-active':''"  @click="paginationFilterPro(page)"  >{{ page }}</button>
                            </div>
                            <div class="d-inline-block" v-if="products.current_page == products.last_page">
                                <button class="btn btn-sm btn-success mt-1 page-btn" >NEXT</button>
                            </div>
                            <div class="d-inline-block" v-else>
                                <button class="btn btn-sm btn-success mt-1 page-btn" @click="paginationFilterPro(products.current_page+1)" >NEXT</button>
                            </div>
                        </div>
                        <div class="page-number d-inline-block float-end">
                            <p class="mt-1 mb-0" ><small class="fw-bold page-btn">Showing {{ products.from }} to {{ products.to }} of {{ products.total }} ({{ products.last_page }} {{ products.last_page>1? 'Pages':'Page' }})</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- product detail moda area -->
        <div class="modal fade" :class="buyModalShow" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content" v-if="product_detail">
                    <div class="modal-header">
                        <h6 class="modal-title" id="staticBackdropLabel">{{ product_detail.product_name }}</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="buyModalClose()"></button>
                    </div>
                    <div class="modal-body row">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-12 border mb-1 p-1" v-if="product_detail">
                                    <img :src="imageBaseUrl+product_detail.image.large_photo" class="img-fluid" alt="" >
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
                                        <div class="col px-0 form-group">
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
                                        <div class="col px-0 form-group" v-if="product_detail.attr_type == 'color'">
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
                                        <div class="col px-0 form-group" v-else-if="product_detail.attr_type == 'size'">
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
                                        <div class="col px-0 form-group" v-else-if="product_detail.attr_type == 'color_size'">
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
                                        
                                        <div class="col px-0 form-group" v-if="product_detail.attr_type == 'color_size'">
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

                                        <div class="col mt-4">
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

        <!-- responsive filter area -->
        <div class="resp-filter-area" :class="filterModal? '':'d-none'">
            <div class="colose-area text-end mt-2 bg-white p-1 rounded">                
                <font-awesome icon="close" class="btn btn-primary" @click="filterClose"/>
            </div>
            <div class="responsive-filter mt-3">
                <div class="price-range d-block float-start w-100 rounded bg-white px-2 py-3">
                    <p class="fw-bold filter-border mb-0 pb-2"><small>Price Range</small></p>
                    <div class="d-block float-start mt-3">
                        <div class="left-min min">
                            <input type="text" class="text-center min-resp" v-model="filterForm.price[0]" @blur="priceFilter($event)">
                            <br>
                            <span>Min</span>
                        </div>
                        <div class="right-max max">
                            <input type="text" class="text-center max-resp" v-model="filterForm.price[1]" @blur="priceFilter($event)">
                            <br>
                            <span class="float-end">Max</span>
                        </div> 
                    </div>                  
                </div>
                <div class="availability-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>Availability</small> <span class="float-end px-2" @click="statusToggle()"><font-awesome :icon="this.statusShow?'angle-up':'angle-down'" /></span></p>
                    <div v-if="this.statusShow">
                        <div class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" id="rinstock" value="1" @click="stockStatusf($event)" class="me-2 availability" >
                            <label for="rinstock">In Stock</label>
                        </div>
                        <div class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" id="rupcomming" value="3" @click="stockStatusf($event)" class="me-2 availability" >
                            <label for="rupcomming">Up Comming</label>
                        </div>
                    </div>
                </div>
                <div class="brand-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>Brand</small> <span class="float-end px-2"  @click="brandToggle()" ><font-awesome :icon="this.brandShow?'angle-up':'angle-down'" /></span></p>
                    <div v-if="this.brandShow">
                        <div v-for="brand in filters.brands" :key="brand.brand_id" class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" :id="'rbrandId'+brand.brand_id" :value="brand.brand_id" class="me-2 availability" @click="brandClick($event)" >
                            <label :for="'rbrandId'+brand.brand_id">{{ brand.brand_name }}</label>
                        </div>
                    </div>
                </div>
                <div v-for="(varType,si) in filters.varition_types" :key="varType.variation_type_id" class="variationtype-area d-block w-100 mt-1 px-2 py-3 bg-white rounded float-start">                    
                    <p class="fw-bold filter-border mb-0 pb-2"><small>{{ varType.variation_type_name }}</small> <span class="float-end px-2" @click="variationToggle(si)"><font-awesome :icon="this.variationShow[si].show?'angle-up':'angle-down'" /></span></p>
                    <div v-if="this.variationShow[si].show">
                        <div v-for="variation in varType.variations" :key="variation.variation_id" class="form-group px-2 py-1 availability-grp">
                            <input type="checkbox" :id="'rvariationId'+variation.variation_id" :value="variation.variation_id" class="me-2 availability" @click="variationClick($event)" >
                            <label :for="'rvariationId'+variation.variation_id">{{ variation.variation_name }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'TypeProductView',
    props: ['imageBaseUrl','filterModal'],
        components: {
        // LoadingPage,
    },
    data(){
        return{
            loading: false,
            typeName: '',    
            pagePar: '',
            products: [],
            buyModalShow: '',
            product_detail: '',
            defaultd: true,
            variationShow: [],
            brandShow: true,
            statusShow: true,
            sizes:[],
            filters: [],
            cartForm: {
                variation_type_id: '',
                variation_id: '',
                qty: 1,
                product: '',
            },
            min: 0,
            max: 1000000,
            minValue: 0,
            maxValue: 1000000,
            step: 5,
            totalSteps: 0,
            percentPerStep: 1,
            trackWidth: null,
            isDragging: false,
            pos: {
                curTrack: null
            },
            filterForm: {
                type: 'type',
                type_id: this.$route.params.type_id,
                limit: '20',
                slug: this.$route.params.slug,
                sort_by: '',
                price: [0,1000000],
                page: 1,
                stock_status: [],
                brand_id: [],
                variation_id: [],
            }
        }
    },
    methods:{
        // buynow method
        buyNowf(product_id) {            
            this.$store.dispatch('productDetailf',product_id).then(response => {
                this.cartForm.qty = 1;
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
                    this.buyModalShow = 'show d-block';  
                    this.cartForm.product = '';                 
                }else if(this.product_detail.attr_type == 'color'){
                    var color = this.product_detail.color_variation[0];
                    this.cartForm.variation_type_id = '';
                    this.cartForm.variation_id = color.variation_id;
                    this.buyModalShow = 'show d-block';
                    this.cartForm.product = '';
                }else if(this.product_detail.attr_type == 'size'){
                    var sizev = this.product_detail.size_variation[0];
                    this.cartForm.variation_type_id = '';
                    this.cartForm.variation_id = sizev.variation_id;
                    this.buyModalShow = 'show d-block';
                    this.cartForm.product = '';
                }else{
                    this.cartForm.variation_type_id = '';
                    this.cartForm.variation_id = '';
                    this.cartForm.product = '';
                    this.addToCart(this.product_detail);
                }  
                
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
        paginationPro(page){
            this.pagePar = {
                'type_id': this.$route.params.type_id,
                'slug': this.$route.params.slug,
                'page': page,
            };
            this.$store.dispatch('typeProducts',this.pagePar).then(response => {
                this.products = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        paginationFilterPro(page){
            // this.pagePar = {
            //     'type_id': this.$route.params.type_id,
            //     'slug': this.$route.params.slug,
            //     'page': page,
            // };
            this.filterForm.page = page;
            this.$store.dispatch('filterProducts',this.filterForm).then(response => {
                this.products = response.data;
                this.defaultd = false;
            })
            .catch(error => {
                console.log(error);
            });
        },
        getProducts(){
            this.pagePar = {
                'type_id': this.$route.params.type_id,
                'slug': this.$route.params.slug,
                'page': 1,
            };            
            
            this.$store.dispatch('typeProducts',this.pagePar).then(response => {
                this.products = response.data;
                this.typeName = this.$route.params.slug.replace(/-/g,' ');                
            })
            .catch(error => {
                console.log(error);
            });            
            
        },
        getFilters(){
            this.$store.dispatch('typeFilter',this.pagePar.type_id).then(response => {
                this.filters = response.data;
                this.max = this.filters.max_price;
                this.maxValue = this.filters.max_price;
                for (let index = 0; index < this.filters.varition_types.length; index++) {
                    this.variationShow.push({
                        show: true,
                    });               
                }
            })
            .catch(error => {
                console.log(error);
            });  
            this.filterForm.type_id = this.$route.params.type_id;
            this.filterForm.limit = '20';
            this.filterForm.sort_by = '';
            this.filterForm.page = 1;
            this.filterForm.slug = this.$route.params.slug;
            this.filterForm.price = [0,this.maxValue];
            this.filterForm.stock_status = [];
            this.filterForm.brand_id = [];
            this.filterForm.variation_id = [];
            this.defaultd = true;         
        },
        filterClose(){
            this.$emit('filter');
        },

        moveTrack(track, ev){      
            let percentInPx = this.getPercentInPx();
            
            let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
            let clientX = ev.clientX;
            let moveDiff = clientX-trackX;

            let moveInPct = moveDiff / percentInPx
            // console.log(moveInPct)

            if(moveInPct<1 || moveInPct>100) return;
            let value = ( Math.round(moveInPct / this.percentPerStep) * this.step ) + this.min;
            if(track==='track1'){
                if(value >= (this.maxValue - this.step)) return;
                this.minValue = value;
                this.filterForm.price = [value,this.maxValue];                
            }

            if(track==='track2'){
                if(value <= (this.minValue + this.step)) return;
                this.maxValue = value;
                this.filterForm.price = [this.minValue,value];
            }
      
            this.$refs[track].style.left = moveInPct + '%';
            this.setTrackHightlight()
                
        },
        mousedown(ev, track){            
            if(this.isDragging) return;
            this.isDragging = true;
            this.pos.curTrack = track;
            console.log(ev);
            
        },

        touchstart(ev, track){
            this.mousedown(ev, track)
        },

        mouseup(ev, track){
            if(!this.isDragging) return;
            this.isDragging = false
            console.log(ev);
            console.log(track);
            this.filtergetProducts();
        },

        touchend(ev, track){
            // console.log('touch end');
            this.mouseup(ev, track)
            
        },

        mousemove(ev, track){
            if(!this.isDragging) return;      
            this.moveTrack(track, ev)
        },

        touchmove(ev, track){
            this.mousemove(ev.changedTouches[0], track)            
        },

        valueToPercent(value){
            return ((value - this.min) / this.step) * this.percentPerStep
        },

        setTrackHightlight(){
            this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
            this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
        },

        getPercentInPx(){
            let trackWidth = this.$refs._vpcTrack.offsetWidth;
            let oneStepInPx = trackWidth / this.totalSteps;
            // 1 percent in px
            let percentInPx = oneStepInPx / this.percentPerStep;
            
            return percentInPx;
        },

        setClickMove(ev){
            let track1Left = this.$refs.track1.getBoundingClientRect().left;
            let track2Left = this.$refs.track2.getBoundingClientRect().left;
            // console.log('track1Left', track1Left)
            if(ev.clientX < track1Left){
                this.moveTrack('track1', ev)
            }else if((ev.clientX - track1Left) < (track2Left - ev.clientX) ){
                this.moveTrack('track1', ev)
            }else{
                this.moveTrack('track2', ev)
            }
            this.filtergetProducts();
        },
        filtergetProducts(){
            this.filterForm.page = 1;
            this.$store.dispatch('filterProducts',this.filterForm).then(response => {
                this.products = response.data;
                this.defaultd = false;
            })
            .catch(error => {
                console.log(error);
            });
        },
        brandClick(event){
            if (event.target.checked) {
                this.filterForm.brand_id.push(
                    event.target.value
                );
            }else{
                this.filterForm.brand_id = this.filterForm.brand_id.filter(brand => {
                    return brand !== event.target.value;
                });
            }
            this.filtergetProducts();
        },
        variationClick(event){
            if (event.target.checked) {
                this.filterForm.variation_id.push(
                    event.target.value
                );
            }else{
                this.filterForm.variation_id = this.filterForm.variation_id.filter(variation => {
                    return variation !== event.target.value;
                });
            }
            this.filtergetProducts();
        },
        stockStatusf(event){
            if(event.target.checked){
                this.filterForm.stock_status.push(
                    event.target.value
                );
            }else{
                this.filterForm.stock_status = this.filterForm.stock_status.filter(statuss => {
                    return statuss !== event.target.value;
                });
            }
            this.filtergetProducts();
        },
        priceFilter(event){
            console.log(event.target.value);
            this.filtergetProducts();
        },
        variationToggle(si){
            this.variationShow[si].show = !this.variationShow[si].show;
        },
        brandToggle(){
            this.brandShow = !this.brandShow;
        },
        statusToggle(){
            this.statusShow = !this.statusShow;
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
        this.getProducts();
        this.getFilters();
    },
    mounted(){
        // document.onreadystatechange = () => {
        //     if (document.readyState == "complete") {
        //         this.loading = true;
        //         console.log('sdfsd');
        //     }
        // };
        // this.getProducts();
        // this.getFilters();
            // calc per step value
        this.totalSteps = (this.max - this.min) / this.step;

        // percent the track button to be moved on each step
        this.percentPerStep = 100 / this.totalSteps;
        // console.log('percentPerStep', this.percentPerStep)

        // set track1 initilal
        document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%'
        // track2 initial position
        document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%'
        // set initila track highlight
        this.setTrackHightlight()

        var self = this;

        ['mouseup', 'mousemove'].forEach( type => {
            document.body.addEventListener(type, (ev) => {
                // ev.preventDefault();
                if(self.isDragging && self.pos.curTrack){
                self[type](ev, self.pos.curTrack)
                }
            })
        });

        ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach( type => {
            document.querySelector('.track1').addEventListener(type, (ev) => {
                ev.stopPropagation();
                self[type](ev, 'track1')
            })
            document.querySelector('.track2').addEventListener(type, (ev) => {
                ev.stopPropagation();
                self[type](ev, 'track2')
            })
        })

        // on track clik
        // determine direction based on click proximity
        // determine percent to move based on track.clientX - click.clientX
        document.querySelector('.track').addEventListener('click', function(ev) {
            ev.stopPropagation();
            self.setClickMove(ev)        
        })

        document.querySelector('.track-highlight').addEventListener('click', function(ev) {
            ev.stopPropagation();
            self.setClickMove(ev)        
        });        

    },
    watch: {
        $route(){
            this.getProducts();
            this.getFilters();
        }, 
        ['filterForm.sort_by'](){
            this.filtergetProducts();
        },
        ['filterForm.limit'](){
            this.filtergetProducts();
        },
        // ['filterForm.price'](){
        //     if(!this.defaultd){
        //         this.filtergetProducts();
        //     }            
        // },
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
        flex: 0 0 25%;
        max-width: 25%;
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
    .link-btn{
        background: #1934cfad;
        color: white;
    }
    .filter-border{
        border-bottom: 1px solid #80808057;
    }
    .link-active{
        background: #00008bc7;
        box-shadow: 0px 0px 4px 1px #1934cf;
    }
    .filter-btn, .per-page, .filter-sort{
        background: #e7e9ed; color: black; font-size: 14px; cursor: pointer;
    }
    .availability{
        height: 16px;
        width: 16px;
        position: relative;
        top: 3px;
    }
    .availability-grp:hover{
        background: #02189178;
        color: white;
    }
    .resp-filter-area{
        position: absolute;
        width: 280px;
        background: #f2f4f8;
        top: 0;
        left: 10px;
        box-shadow: 0 0 10px 5px grey;
        z-index: 999;
        padding: 10px;
        overflow-y: scroll;
        height: 100%;
    }
    .filter-area{
        display: block;
    }
    .filter-btn{
        display: none;
    }
    .page-btn{
        font-size: 11px;
    }
    @media (max-width: 1279px){
        .pro-card{
            flex: 0 0 25%;
            max-width: 25%;
        }        
    }
    @media (max-width: 1200px){
        .filter-area{
            display: none;
        }
        .filter-btn{
            display: block;
        }
    }
    @media (min-width: 992px) {
        .modal-dialog{
            width: 95%;
        } 
    }
    @media (max-width: 767px){
        .pro-card {
            flex: 0 0 50%;
            max-width: 50%;
        }   
        .modal-dialog{
            width: 95%;
        }     
    }

    .min{
        width: 47%; float: left;
    }

    .max{
        width: 47%; float: right;
    }
  .track-container{
    width: 100%;
    position: relative;
    cursor: pointer;
    height: 0.5rem;
  }

  .track,
  .track-highlight {
    display: block;
    position: absolute;
    width: 100%;
    height: 0.5rem;
  }

  .track{
    background-color: #cccfd4;
  }

  .track-highlight{
    background-color: #293a99b3;
    z-index: 2;
  }

  .track-btn{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    display: block;
    position: absolute;
    z-index: 2;
    width: 1.2rem;
    height: 1.2rem;
    top: calc(-50% - 0.15rem);
    margin-left: -0.7rem;
    border: none;
    background-color: #293a99;
    border-radius: 50%;
    -ms-touch-action: pan-x;
    touch-action: pan-x;
    transition: box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
    transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease;
    transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
  }
  .min-resp, .max-resp{
    width: 113px;
  }
</style>
