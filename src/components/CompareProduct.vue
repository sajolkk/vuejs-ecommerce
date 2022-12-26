<template>
    <div id="compareArea" class="col-md-12 px-3 mt-2 mb-5" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Compare Products</a></li>
                    </ol>
                </nav>
            </div>
        </div>
        <div v-if="compareProducts.length == 3" class="row mt-2 p-2 mx-2 bg-white rounded compare">
            <table class="table table-hover table-striped table-bordered table-responsive col-md-12">
                <tbody>
                    <tr class="fw-bold">
                        <td class="fw-bold align-middle">Product</td>
                        <td>
                            <img class="d-block img-fluid" :src="imageBaseUrl+compareProducts[0].product.image.small_photo" :alt="compareProducts[0].product.product_name">
                            <h5 class="text-center">
                                <router-link :to="/product-details/+[compareProducts[0].product.slug+'/'+compareProducts[0].product.product_id]" class="nav-link p-0 text-start" >
                                    {{ compareProducts[0].product.product_name }}
                                </router-link>
                                <span class="text-danger">{{ compareProducts[0].product.sale_price.toLocaleString() }} ৳</span>
                            </h5>
                        </td>
                        <td>
                            <img class="d-block img-fluid" :src="imageBaseUrl+compareProducts[1].product.image.small_photo" :alt="compareProducts[1].product.product_name">
                            <h5 class="text-center">
                                <router-link :to="/product-details/+[compareProducts[1].product.slug+'/'+compareProducts[1].product.product_id]" class="nav-link p-0 text-start" >
                                    {{ compareProducts[1].product.product_name }}
                                </router-link>
                                <span class="text-danger">{{ compareProducts[1].product.sale_price.toLocaleString() }} ৳</span>
                            </h5>
                        </td>
                        <td>
                            <img class="d-block img-fluid" :src="imageBaseUrl+compareProducts[2].product.image.small_photo" :alt="compareProducts[2].product.product_name">
                            <h5 class="text-center">
                                <router-link :to="/product-details/+[compareProducts[2].product.slug+'/'+compareProducts[2].product.product_id]" class="nav-link p-0 text-start" >
                                    {{ compareProducts[2].product.product_name }}
                                </router-link>
                                <span class="text-danger">{{ compareProducts[2].product.sale_price.toLocaleString() }} ৳</span>
                            </h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Model</td>
                        <td>
                            {{ compareProducts[0].product.product_model }}
                        </td>
                        <td>
                            {{ compareProducts[1].product.product_model }}
                        </td>
                        <td>
                            {{ compareProducts[2].product.product_model }}
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Brand</td>
                        <td>
                            {{ compareProducts[0].product.brand_name }}
                        </td>
                        <td>
                            {{ compareProducts[1].product.brand_name }}
                        </td>
                        <td>
                            {{ compareProducts[2].product.brand_name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Availability</td>
                        <td>
                            <span v-if="compareProducts[0].product.stock_status == 1">
                                Stock In
                            </span>
                            <span v-else-if="compareProducts[0].product.stock_status == 2">
                                Stock Out
                            </span>
                            <span v-else>
                                Upcomming
                            </span>
                        </td>
                        <td>
                            <span v-if="compareProducts[1].product.stock_status == 1">
                                Stock In
                            </span>
                            <span v-else-if="compareProducts[1].product.stock_status == 2">
                                Stock Out
                            </span>
                            <span v-else>
                                Upcomming
                            </span>
                        </td>
                        <td>
                            <span v-if="compareProducts[2].product.stock_status == 1">
                                Stock In
                            </span>
                            <span v-else-if="compareProducts[2].product.stock_status == 2">
                                Stock Out
                            </span>
                            <span v-else>
                                Upcomming
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Specification</td>
                        <td v-html="compareProducts[0].product.specification"></td>
                        <td v-html="compareProducts[1].product.specification"></td>
                        <td v-html="compareProducts[2].product.specification"></td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Description</td>
                        <td v-html="compareProducts[0].product.description"></td>
                        <td v-html="compareProducts[1].product.description"></td>
                        <td v-html="compareProducts[2].product.description"></td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Warranty</td>
                        <td v-html="compareProducts[0].product.word_warranty"></td>
                        <td v-html="compareProducts[1].product.word_warranty"></td>
                        <td v-html="compareProducts[2].product.word_warranty"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="row mt-2 p-2 mx-2 bg-white rounded compare">
            <table class="table table-hover table-striped table-bordered table-responsive col-md-12">
                <tbody>
                    <tr class="fw-bold">
                        <td class="fw-bold align-middle">Product</td>
                        <td>
                            <img class="d-block img-fluid" :src="imageBaseUrl+compareProducts[0].product.image.small_photo" :alt="compareProducts[0].product.product_name">
                            <h5 class="text-center">
                                <router-link :to="/product-details/+[compareProducts[0].product.slug+'/'+compareProducts[0].product.product_id]" class="nav-link p-0 text-start" >
                                    {{ compareProducts[0].product.product_name }}
                                </router-link>
                                <span class="text-danger">{{ compareProducts[0].product.sale_price.toLocaleString() }} ৳</span>
                            </h5>
                        </td>
                        <td>
                            <img class="d-block img-fluid" :src="imageBaseUrl+compareProducts[1].product.image.small_photo" :alt="compareProducts[1].product.product_name">
                            <h5 class="text-center">
                                <router-link :to="/product-details/+[compareProducts[1].product.slug+'/'+compareProducts[1].product.product_id]" class="nav-link p-0 text-start" >
                                    {{ compareProducts[1].product.product_name }}
                                </router-link>
                                <span class="text-danger">{{ compareProducts[1].product.sale_price.toLocaleString() }} ৳</span>
                            </h5>
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Model</td>
                        <td>
                            {{ compareProducts[0].product.product_model }}
                        </td>
                        <td>
                            {{ compareProducts[1].product.product_model }}
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Brand</td>
                        <td>
                            {{ compareProducts[0].product.brand_name }}
                        </td>
                        <td>
                            {{ compareProducts[1].product.brand_name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Availability</td>
                        <td>
                            <span v-if="compareProducts[0].product.stock_status == 1">
                                Stock In
                            </span>
                            <span v-else-if="compareProducts[0].product.stock_status == 2">
                                Stock Out
                            </span>
                            <span v-else>
                                Upcomming
                            </span>
                        </td>
                        <td>
                            <span v-if="compareProducts[1].product.stock_status == 1">
                                Stock In
                            </span>
                            <span v-else-if="compareProducts[1].product.stock_status == 2">
                                Stock Out
                            </span>
                            <span v-else>
                                Upcomming
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Specification</td>
                        <td v-html="compareProducts[0].product.specification"></td>
                        <td v-html="compareProducts[1].product.specification"></td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Description</td>
                        <td v-html="compareProducts[0].product.description"></td>
                        <td v-html="compareProducts[1].product.description"></td>
                    </tr>
                    <tr>
                        <td class="fw-bold align-middle">Warranty</td>
                        <td v-html="compareProducts[0].product.word_warranty"></td>
                        <td v-html="compareProducts[1].product.word_warranty"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CompareProduct',
    props: ['imageBaseUrl','compareProducts'],
    data() {
        return {

        }
    },
    mounted() {
        
    },
    methods: {

    },
    watch: {

    },
}
</script>
<style scoped>
    .compare{
        box-shadow: 0px 0px 5px 3px #c1c1c1;
    }
    td table{
        width: auto;
    }
</style>