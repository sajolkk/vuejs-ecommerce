<template>
    <div id="slider" class="col-md-12 px-0 mt-3">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" v-for="(slider,i) in sliders" :key="slider.offer_id" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="i" :class="[ i==0? 'active':'']" :aria-current="[ i==0?'true':'']" aria-label="Slide 1"></button>
            </div>
            <div class="carousel-inner">
                <div v-for="(slider,i) in sliders" :key="slider.offer_id" class="carousel-item" :class="[i == 0 ? 'active' : '']" >
                    <router-link :to="'/offer-info/'+slider.slug+'/'+slider.offer_id"  >
                        <img :src="imageBaseUrl+slider.image" class="d-block w-100 img-fluid slider-img" alt="...">
                    </router-link>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SliderView',
        data(){
            return{
               sliders: [], 
               imageBaseUrl: '',
            }
        },

        methods:{

        },

        created(){
            this.$store.dispatch("offerSlider").then(response=>{
                this.sliders = response.data;
            })
            .catch(error => {
                console.log(error);
            });
            this.imageBaseUrl = this.$store.getters.imgBaseUrl;
        },

        mounted() {
            // this.sliders = this.$store.getters.sliders;
        }
    }

</script>

<style scoped>
    .carousel-control-prev, .carousel-control-next{
        top: 45%;  background: #031a9c; width: 50px; height: 50px;  margin: 5px; 
    }

</style>