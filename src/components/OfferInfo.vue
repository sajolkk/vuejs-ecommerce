<template>
    <div id="offer" class="col-md-12 px-3 mt-2 mb-5">
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><router-link to="/offers" class="text-decoration-none text-capitalize">Offers</router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Offer Info</a></li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-8 col-md-10 col-sm-12 col-12 offer offset-xl-2 offset-md-2 " >
                <div class="item" v-if="offer" >
                    <div class="product p-2 mb-0">
							<div class="p-2 d-block float-start w-100">
								<div class="float-start text-dark fw-bold offerTitle pt-2 mt-1"> {{ title }} </div>
                                <div class="float-end pr-3 count">
                                    <span class="d-inline-block time-area">
                                        <span class="days d-inline-block " >{{ days }}</span>
                                        <br>
                                        <span class="d-inline-block txt" >Days</span>
                                    </span>

                                    <span class="d-inline-block time-area">
                                        <span class="hours d-inline-block">{{ hours }}</span>
                                        <br>
                                        <span class="d-inline-block txt" >Hours</span>
                                    </span>

                                    <span class="d-inline-block time-area">
                                        <span class="minutes d-inline-block">{{ minutes }}</span>
                                        <br>
                                        <span class="d-inline-block txt" >Minutes</span>
                                    </span>

                                    <span class="d-inline-block time-area">
                                        <span class="seconds d-inline-block">{{ seconds }}</span>
                                        <br>
                                        <span class="d-inline-block txt" >Seconds</span>
                                    </span>
                                </div>
							</div>
							<img :src="imageBaseUrl+offer.image" class="img-fluid" >
							<br>
							<h5 class="mb-0 text-dark py-2 font-weight-bold text-center text-capitalize title" >{{ offer.title }}</h5>
							<p class="mb-0  pb-1 py-2 text-dark time font-weight-bold text-center" >
                                <font-awesome icon="calendar" />
                                {{ dateTime(offer.start_from) }} - {{ dateTime(offer.end_to) }}
                            </p>
                            <p class="border-bottom pt-1"></p>
							<div v-html="offer.offer_details" class="d-block" ></div>
                            <h4 class="text-center"><span class="d-inline-blok cbg-primary rounded p-2" >Promo Code: {{ offer.promo_code }}</span></h4>
                            <h5> <span class="d-inline-block border-bottom" >Conditions:</span> </h5>
                            <div class="d-block text-start" v-html="offer.conditions"></div>
                            <div class="d-block text-center">
                                <router-link :to="'/offer/offer-products/'+offer.slug+'/'+offer.offer_id" class="btn btn-sm cbtn-primary">View Offer Products</router-link>
                            </div>
						</div>
                </div>
                <h4 v-else class="text-center text-danger" > Offer Not Found!!! </h4>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    name: 'OfferInfo',
    props: ['imageBaseUrl'],
    data() {
        return{
            offer: '',
            offer_id: this.$route.params.offer_id,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            title: '',
        }
    },
    mounted() {
        this.getOfferInfo();        
    },
    methods: {
        getOfferInfo(){
            this.$store.dispatch('GetOfferInfo',this.offer_id).then(response => {
                this.offer = response.data;
                this.timeInterval();
            }).catch(error => {
                console.log(error);
            });
        },
        timeInterval(){
            let start_from = this.offer.start_from;
            let end_to = this.offer.end_to;
            let countDownDate = new Date(start_from).getTime();
            let endDate = new Date(end_to).getTime();
            setInterval(() => {
                var now = new Date().getTime();		    
                var distance = countDownDate - now;                
                if (distance >0) {
                    this.title = 'OFFER START IN';
                   this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                   this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                   this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                   this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
                }else{
                    var now2 = new Date().getTime();		    
                    distance = endDate - now2;
                    if (distance>0) {
                        this.title = 'OFFER ENDS IN';
                        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    }else{
                        this.title = 'OFFER EXPIRED';
                        this.days = 0;
                    }
                }			  
            }, 1000);
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
    .cbg-primary,.cbtn-primary{
        background: #293a99; color: white;
    }
    .time-area{
        background: linear-gradient(350deg, #081b86, #293a997d);
        color: white;
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        margin-right: 5px;
        font-size: 12px;
        line-height: 18px;
    }
</style>