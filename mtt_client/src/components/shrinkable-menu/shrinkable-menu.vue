<style lang="less">
    @import 'styles/menu.less';
</style>

<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu
                v-show="!shrink"
                :menu-theme="theme"
                :menu-list="menuList"
                @on-menu-item-select="menuSelect"
        ></sidebar-menu>
        <sidebar-menu-shrink
                v-show="shrink"
                :menu-theme="theme"
                :menu-list="menuList"
                :icon-color="shrinkIconColor"
                @on-menu-item-select="menuSelect"
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
    import sidebarMenu from './components/sidebarMenu.vue';
    import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
    import util from '@/libs/util';

    export default {
        name: 'shrinkableMenu',
        components: {
            sidebarMenu,
            sidebarMenuShrink
        },
        props: {
            shrink: {
                type: Boolean,
                default: false
            },
            menuList: {
                type: Array,
                required: true
            },
            theme: {
                type: String,
                default: 'dark',
                validator (val) {
                    return util.oneOf(val, ['dark', 'light']);
                }
            }
        },
        computed: {
            bgColor () {
                return this.theme === 'dark' ? '#495060' : '#fff';
            },
            shrinkIconColor () {
                return this.theme === 'dark' ? '#fff' : '#495060';
            }
        },
        methods: {
            menuSelect (id, active) {
                this.$emit('on-menu-item-select', id, active);
            }
        }
    };
</script>
