<template>
  <div class="content-area px-0">
    <SliderView/>
    <ContentView :imageBaseUrl="imageBaseUrl"/>
    <BrandView />
  </div>
</template>

<script>
  import SliderView from '@/components/Layouts/SliderView.vue'
  import ContentView from '@/components/Layouts/ContentView.vue'
  import BrandView from '@/components/Layouts/BrandView.vue'
  export default {
    props: ['imageBaseUrl'],
    name: 'HomeView',
    components: {
      SliderView, ContentView, BrandView,
    }
  }
</script>
