<template>
    <Menu :theme="menuTheme" width="auto">
        <template v-for="item in menuList">
            <sidebarMenuItem :item="item" :menuTheme="menuTheme" @on-menu-item-select="menuSelect">
            </sidebarMenuItem>
        </template>
    </Menu>
</template>

<script>
    import sidebarMenuItem from './sidebarMenuItem.vue';

    const prefixCls = 'ivu-menu';

    export default {
        name: 'sidebarMenu',
        props: {
            menuList: Array,
            menuTheme: {
                type: String,
                default: 'dark'
            }
        },
        components: {
            sidebarMenuItem
        },
        computed: {
            classes () {
                let theme = this.menuTheme;
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${theme}`,
                    {
                        [`${prefixCls}-vertical`]: 'vertical'
                    }
                ];
            }
        },
        methods: {
            menuSelect (id, active) {
                this.$emit('on-menu-item-select', id, active);
            }
        }
    };
</script>
