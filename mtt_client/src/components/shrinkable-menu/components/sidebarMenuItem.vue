<template>
    <div>
        <ul v-if="item.children.length === 1">
            <li :class="item.children[0].active ? 'ivu-menu-item item-active' : 'ivu-menu-item'" @click="handleClick(item.children[0].id, item.children[0].active)">
            <Icon :type="item.children[0].icon"></Icon>
            <span class="layout-text">{{ item.children[0].title }}</span>
            </li>
        </ul>
        <Submenu v-if="item.children.length > 1" :name="item.title">
            <template slot="title">
                <Icon :type="item.icon"></Icon>
                <span class="layout-text">{{ item.title }}</span>
            </template>
            <template v-for="child in item.children">
                <ul>
                    <li :class="child.active ? 'ivu-menu-item item-active' : 'ivu-menu-item'" @click="handleClick(child.id, child.active)">
                        <Icon :type="child.icon"></Icon>
                        <span class="layout-text">{{ child.title }}</span>
                    </li>
                </ul>
            </template>
        </Submenu>
    </div>
</template>

<script>
    const prefixCls = 'ivu-menu';

    export default {
        name: 'sidebarMenuItem',
        props: {
            item: {
                id: '',
                icon: '',
                title: '',
                children: []
            },
            menuTheme: {
                type: String,
                default: 'dark'
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.item.active,
                        [`${prefixCls}-item-selected`]: this.item.active
                    }
                ];
            }
        },
        methods: {
            handleClick (id, active) {
                this.$emit('on-menu-item-select', id, active);
            }
        }
    };
</script>
<style lang="less">
    .item-active{
        /*background: #363e4f;*/
        color: #2d8cf0;
        border-right: 2px solid #2d8cf0;
    }
</style>
