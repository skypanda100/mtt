<template>
    <div id="main" class="app-main">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        mounted () {
            this.$router.push({
                name: 'home'
            });
        },
        beforeDestroy () {

        },
        methods: {}
    };
</script>

<style>
    .app-main {
        width: 100%;
        height: 100%;
    }
</style>
