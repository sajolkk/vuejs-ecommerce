<template>
    <div id="brandarea" class="col-md-12 px-3 my-4 mb-5 rounded">        
        <carousel v-if="brands" :items-to-show="6.5" class="brand rounded py-2 shadow" >
            <slide v-for="brand in brands" :key="brand.brand_id">
                <router-link :to="'/brand-products/'+brand.slug+'/'+brand.brand_id"> <img :src="imageBaseUrl+brand.image" :alt="brand.brand_name" :title="'Click to show all '+brand.brand_name.toUpperCase()+' products'" class="img-fluid img my-2 mt-2  rounded"> </router-link>
            </slide>

            <template #addons>
            <navigation />
            <pagination />
            </template>
        </carousel>
    </div>
</template>
<script>
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    export default ({
        name: 'BrandView',
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },
        data(){
            return{
                brands: [],
                imageBaseUrl: '',
            }
        }, 
        
        created(){
            this.$store.dispatch("allBrand").then(response => { 
                this.brands = response.data;  
            })
            .catch(error => {
                console.log(error);
            });

            this.imageBaseUrl = this.$store.getters.imgBaseUrl;
        }
    })
</script>

<style scoped>
    .brand{
        background: #8080803d;
    }
    .img{
        max-width: 80px; max-height: 80px; float: left; display: inline;
    }
</style>
