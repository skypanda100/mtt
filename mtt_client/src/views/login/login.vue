<style lang="less">
    @import 'login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                names: [
                    'admin'
                ],
                passwords: [
                    '123456'
                ],
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let nameIndex = this.names.indexOf(this.form.userName);
                        if (nameIndex > -1) {
                            let password = this.passwords[nameIndex];
                            if (password === this.form.password) {
                                this.$store.commit('login', this.form.userName, this.form.password);
                                this.$router.push({
                                    name: 'home'
                                });
                            } else {
                                this.$Message.error('密码错误');
                            }
                        } else {
                            this.$Message.error('用户名不存在');
                        }
                    }
                });
            }
        }
    };
</script>
