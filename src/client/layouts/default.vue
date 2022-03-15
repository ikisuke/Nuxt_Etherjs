<template>
  <v-app>
      <!-- <HeaderLayout /> -->
         <v-main>
           <Header />

         </v-main>
       </v-app>
</template>

<script>
    import Header from "../components/Header.vue";
    export default {
        name: "DefaultLayout",
        data() {
            return {};
        },
        components: Header
    }
</script>
<style lang="scss" scoped>

</style>

