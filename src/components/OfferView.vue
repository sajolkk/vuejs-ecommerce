<template>
    <div id="offer" class="col-md-12 px-3 mt-2 mb-5">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Offers</a></li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-md-6 col-sm-6 col-12 offer " v-for="offer in offers" :key="offer.offer_id">
                <div class="item" >
                    <div class="product p-2 mb-0 text-center">
                        <img :src="imageBaseUrl+offer.image" class="img-fluid">
                        <br>
                        <small class="mb-0 py-2 d-block text-dark time text-center" >
                            <font-awesome icon="calendar" />
                            {{ dateTime(offer.start_from) }} - {{ dateTime(offer.end_to) }}
                        </small>
                        <p class="border-bottom mb-0 pt-1" ></p>
                        <p class="mb-0 py-2 text-dark fw-bold text-center text-uppercase title" >{{ offer.title }}</p>
                        <router-link :to="'/offer-info/'+offer.slug+'/'+offer.offer_id"  class="btn btn-primary mt-3" type="button" style="font-size: 14px;" > View Details </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    name: 'OfferView',
    props: ['imageBaseUrl'],
    data() {
        return{
            offers: '',
        }
    },
    mounted() {
        this.getOffers();
    },
    methods: {
        getOffers(){
            this.$store.dispatch('GetOffer').then(response => {
                this.offers = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        dateTime(value) {
            return moment(value).format('DD MMM YYYY hh:mma');
        },
    },
    watch: {

    }
}
</script>
<style scoped>
    .item{
        background: white;
        padding: 20px;
        border-radius: 5px;
    }
</style>