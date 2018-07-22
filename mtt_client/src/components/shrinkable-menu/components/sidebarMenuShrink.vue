<style lang="less">
    .item-active {
        color: #409EFF !important;
    }
</style>

<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.title" :key="i">
                                <ul>
                                    <li @click="menuSelect(child.id, child.active)" :class="{'item-active': child.active}">
                                        <Icon :type="child.icon"></Icon>
                                        <span style="padding-left:10px;">{{ child.title }}</span>
                                    </li>
                                </ul>
                            </DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.children[0].icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].title" :key="'d' + index">
                            <ul>
                                <li @click="menuSelect(item.children[0].id, item.children[0].active)" :class="{'item-active': item.children[0].active}">
                                    <Icon :type="item.children[0].icon"></Icon>
                                    <span style="padding-left:10px;">{{ item.children[0].title }}</span>
                                </li>
                            </ul>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            },
            iconColor: {
                type: String,
                default: 'white'
            },
            menuTheme: {
                type: String,
                default: 'dark'
            }
        },
        methods: {
            menuSelect (id, active) {
                this.$emit('on-menu-item-select', id, active);
            }
        }
    };
</script>
