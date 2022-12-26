<template>
    <div id="compare-area" class="px-0">
        <div class="col-md-12 compare-header">
            <h6 class="fw-bold p-3 mb-0 text-white">
                Compare Product 
                <span class="float-end close" @click="compareClose"><font-awesome icon="xmark" /></span>
            </h6>
        </div>
        <div v-if="compareProducts.length" class="col-md-12 product-list">
            <div v-for="comparepro in compareProducts" :key="comparepro.product_id">
                <div class="proTitle py-2">
                    <p class="mb-0 ps-2 text-justify d-block product-title" >{{ comparepro.product.product_name }}</p>
                </div>
                <div class="proTrash"><span @click="removeProduct(comparepro.product_id)" class="trashm" ><font-awesome icon="trash" /></span></div>
                <div class="pro-border border-bottom"></div>
            </div>
        </div>
        <div v-else class="col-md-12 product-list text-center">
            <h5 class="mt-5">Compare product is empty!</h5>
        </div>
        <div class="col-md-12 compare-total bg-white p-2 ">
            <div class="form-group text-center fw-bold mt-1">
                <button class="btn col btn-danger me-2" @click="clearCompare">Clear All</button>
                <button class="btn col btn-primary" @click="compareNow" >Compare Now</button>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    name: 'compareView',
    props:['compareProducts'],
    data(){
        return{
            
        }
    },
    methods:{
        compareClose(){
           this.$emit('closecompare');
        },
        removeProduct(product_id){
           this.$store.dispatch('removeCompareProduct',product_id);
           this.$emit('compareReload');
        }, 
        clearCompare(){
           this.$store.dispatch('clearCompare',);
           this.$emit('compareReload');
        },
        compareNow(){
            if (this.compareProducts.length >1) {
                this.$router.push('/compare-products');
                this.$emit('closecompare');
            }
        },
    }
}
</script>
<style scoped>
    #compare-area{
        position: fixed;
        right: 0;
        top: 0;
        width: 300px;
        background: #f2f4f8;
        height: 100%;
        z-index: 999;
        box-shadow: 0px 0px 5px 0px;
        display: flex;
        flex-direction: column;
    }
    .compare-header{
        background: #08186e;
    }
    .close{
        font-size: 20px;
        cursor: pointer;
    }
    .product-list{
        overflow-y: auto;
        flex: 1 1 auto;
        min-height: 100px;
    }
    .compare-total{
        position: relative;
        bottom: 0;
        width: 300px;
        flex: 0 0 auto;
    }
    .proTitle{
        float: left; width: 258px;
    }
    .product-title{
        text-align: justify;
        line-height: 16px;
        font-size: 16px;
    }
    .proTrash{
        float: right; width: 30px; text-align: center;
    }
    .pro-price{
        font-size: 14px;
    }
    .pro-border{
        float: left; width: 100%; 
    }
    .trashm{
        margin-top: 70%; cursor: pointer; display: block;
    }
    .trashm:hover{
        color: red;
    }
</style>>