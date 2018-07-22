<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main">
        <div class="sidebar-menu-con"
             :style="{width: shrink ? '60px' : '200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    :menu-list="menuList"
                    theme="dark"
                    @on-menu-item-select="menuSelect">
                <div slot="top" class="logo-con" @click="toggleClick">
                    <img v-show="!shrink" src="../images/logo.jpg" key="max-logo"/>
                    <img v-show="shrink" src="../images/logo-min.png" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="user-dropdown">
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="logout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                    </Row>
                </div>
            </div>
            <div class="tags-con">
                <tag-page :pageTagsList="pageTagsList"></tag-page>
            </div>
        </div>
        <div class="single-page-con"
             :style="{left: shrink ? '60px' : '200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import tagPage from '@/components/tag/tag-page';
    import {appRouter} from '@/router/router';
    import shrinkableMenu from '@/components/shrinkable-menu/shrinkable-menu.vue';

    export default {
        components: {
            tagPage,
            shrinkableMenu
        },
        data () {
            return {
                userName: ''
            };
        },
        methods: {
            init () {
                this.initCookies();
            },
            initCookies () {
                this.userName = Cookies.get('user');
            },
            toggleClick () {
                this.$store.dispatch('Shrink');
            },
            handleClickUserDropdown (name) {
                if (name === 'logout') {
                    this.$store.commit('logout');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            menuSelect (id, active) {
                if (!active) {
                    if (id === 'shopping-list') {
                        this.$router.push({
                            name: 'shopping-list'
                        });
                    } else if (id === 'daily-record') {
                        this.$router.push({
                            name: 'daily-record'
                        });
                    } else {
                        this.$router.push({
                            name: 'error'
                        });
                    }
                }
            }
        },
        computed: {
            pageTagsList () {
                return this.$store.state.tag.pageOpenedList; // 打开的页面的页面对象
            },
            shrink () {
                return this.$store.state.app.shrink;
            },
            menuList () {
                return this.$store.state.app.layers;
            }
        },
        mounted () {
            this.init();
        },
        created () {
            this.$store.commit('setOpenedList', [appRouter[0].children[0]]);
        }
    };
</script>
