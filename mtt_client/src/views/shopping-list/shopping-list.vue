<style lang="less">
    @import './shopping-list.less';
</style>

<template>
    <div>
        <Modal v-model="editable" width="360">
            <p slot="header" style="color:#060;text-align:center">
                <span>编辑order</span>
            </p>
            <Form :model="editOrder" :label-width="80">
                <FormItem label="食材名称">
                    <Select v-model="editOrder.name" filterable >
                        <Option v-for="(item, index) in foods" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="重量(克)">
                    <InputNumber v-model="editOrder.weight" :min="0"></InputNumber>
                </FormItem>
                <FormItem label="金额(元)">
                    <InputNumber v-model="editOrder.amount" :min="0"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" long style="width: 45%;" @click="handleOrderEdit">确认</Button>
                <Button type="ghost" style="width: 45%;" @click="handleOrderClear">清除</Button>
            </div>
        </Modal>
        <Row>
            <i-col span="4">
                <DatePicker type="date" v-model="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </i-col>
            <i-col span="12">
                <ButtonGroup>
                    <Button type="ghost" @click="handleSearch">查询订单</Button>
                    <Button type="ghost" @click="handleSave">保存订单</Button>
                </ButtonGroup>
            </i-col>
        </Row>
        <br>
        <Table border ref="selection"
               height="560"
               @on-row-dblclick="handleRowDbClick"
               @on-selection-change	="handleSelectChange"
               :loading="loading"
               :columns="foodColumns"
               :data="foodData">
        </Table>
        <p>合计金额：{{ totalPrice.toFixed(2) }}元</p>
        <Row style="background:#eee;padding:5px" v-for="i in Math.ceil(nutritions.length / 12)">
            <i-col span="2" v-for="j in (nutritions.length - (i - 1) * 12) > 12 ? 12 : (nutritions.length - (i - 1) * 12)">
                <Card shadow>
                    <p slot="title">{{ nutritions[(i - 1) * 12 + j - 1].chName }}</p>
                    <p>{{ totalWeight[(i - 1) * 12 + j - 1].num }}({{ totalWeight[(i - 1) * 12 + j - 1].percent }}%)</p>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import util from '@/libs/util';
    import {fetchNutritions, fetchFoods, fetchOrders, saveOrders} from '@/api/shopping-list';

    const MaxFoodDataLen = 30;

    export default {
        data () {
            return {
                date: new Date(),
                totalPrice: 0,
                totalWeight: [],
                editable: false,
                editOrder: {
                    index: -1,
                    name: '',
                    weight: 0,
                    amount: 0
                },
                loading: false,
                nutritions: [],
                foods: [],
                order: {},
                foodColumns: [
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '食材名称',
                        width: 100,
                        key: 'name',
                        fixed: 'left'
                    },
                    {
                        title: '重量(克)',
                        width: 70,
                        key: 'weight',
                        fixed: 'left'
                    },
                    {
                        title: '金额(元)',
                        width: 70,
                        key: 'amount',
                        fixed: 'left'
                    }
                ],
                foodData: []
            };
        },
        mounted () {
            // 获取营养列表
            fetchNutritions().then(response => {
                this.nutritions = response.data;

                // 获取食物列表
                fetchFoods().then(response => {
                    this.foods = response.data;

                    // 获取订单列表
                    this.loading = true;
                    fetchOrders(null).then(response => {
                        this.order = response.data;
                        this.loading = false;
                    });
                });
            });
        },
        watch: {
            'nutritions': function (data) {
                this.totalWeight = [];
                let tmpColumns = this.foodColumns.slice(0, 4);
                data.map(d => {
                    this.totalWeight.push({
                        num: 0.0,
                        percent: 0.0
                    });

                    if (d.no < 5) {
                        tmpColumns.push({
                            title: d.chName,
                            width: 90,
                            key: d.egName,
                            fixed: 'left'
                        });
                    } else {
                        tmpColumns.push({
                            title: d.chName,
                            width: 90,
                            key: d.egName
                        });
                    }
                });
                this.foodColumns = tmpColumns;
            },
            'order': function (data) {
                let tmpData = [];
                if (!util.isNull(data) && !util.isNull(data.foods)) {
                    let orderedFoods = data.foods;
                    if (orderedFoods.length > 0) {
                        orderedFoods.map(food => {
                            tmpData.push({
                                name: food.name,
                                weight: food.weight,
                                amount: food.amount
                            });
                        });
                    }
                }
                this.initFoodData(tmpData);
            }
        },
        methods: {
            initFoodData (tmpData) {
                if (tmpData === null) {
                    tmpData = [];
                }
                let len = MaxFoodDataLen - tmpData.length;
                for (let i = 0; i < len; i++) {
                    tmpData.push({});
                }
                this.foodData = tmpData;

                let index = 0;
                tmpData.map(data => {
                    if (!util.isNull(data.name) && !util.isNull(data.weight)) {
                        this.calculate(index);
                    }
                    index++;
                });
            },
            calculate (index) {
                let data = this.foodData[index];
                let name = data.name;
                let weight = data.weight / 100.0;

                for (let food of this.foods) {
                    if (food.name === name) {
                        this.nutritions.map(nutrition => {
                            data[nutrition.egName] = (food[nutrition.egName] * weight).toFixed(2);
                        });
                        break;
                    }
                }
            },
            editFoodData () {
                let data = {
                    name: this.editOrder.name,
                    weight: this.editOrder.weight,
                    amount: this.editOrder.amount
                };
                this.foodData[this.editOrder.index] = data;
                this.foodData = this.foodData.slice(0);
                this.calculate(this.editOrder.index);
            },
            handleSelectChange (selection) {
                let selectedData = this.$refs.selection.getSelection();
                let tmpTotalWeight = [];
                this.nutritions.map(nutrition => {
                    tmpTotalWeight.push(0);
                });
                this.totalPrice = 0;
                selectedData.map(data => {
                    if (!util.isNull(data.amount)) {
                        this.totalPrice += data.amount;
                    }

                    let index = 0;
                    this.nutritions.map(nutrition => {
                        tmpTotalWeight[index] += util.isNull(data[nutrition.egName]) ? 0 : parseFloat(data[nutrition.egName]);
                        index++;
                    });
                });

                for (let i = 0; i < tmpTotalWeight.length; i++) {
                    let num = tmpTotalWeight[i];
                    let standard = this.nutritions[i].standardValue;
                    if (i > 0 && i < 4) {
                        standard = tmpTotalWeight[1] + tmpTotalWeight[2] + tmpTotalWeight[3];
                    }
                    this.totalWeight[i] = {
                        num: num.toFixed(2),
                        percent: standard === 0 ? 0 : (num / standard * 100).toFixed(2)
                    };
                }
            },
            handleRowDbClick (data, index) {
                this.editOrder.index = index;
                this.editOrder.name = util.isNull(data.name) ? '' : data.name;
                this.editOrder.weight = util.isNull(data.weight) ? 0 : data.weight;
                this.editOrder.amount = util.isNull(data.amount) ? 0 : data.amount;
                this.editable = true;
            },
            handleOrderEdit () {
                this.editable = false;
                setTimeout(() => {
                    this.editFoodData();
                }, 100);
            },
            handleOrderClear () {
                this.editOrder.name = '';
                this.editOrder.weight = 0;
                this.editOrder.amount = 0;
                this.editable = false;
                setTimeout(() => {
                    this.editFoodData();
                }, 100);
            },
            handleSearch () {
                let dateFmt = util.formatDate(this.date, 'yyyy-MM-dd');
                this.loading = true;
                fetchOrders({ 'date': dateFmt }).then(response => {
                    this.order = response.data;
                    this.loading = false;
                });
            },
            handleSave () {
                let selectedData = this.$refs.selection.getSelection();
                let dateFmt = util.formatDate(this.date, 'yyyy-MM-dd');
                let param = {
                    date: dateFmt,
                    foods: []
                };
                selectedData.map(data => {
                    param.foods.push({
                        name: util.isNull(data.name) ? '' : data.name,
                        weight: util.isNull(data.weight) ? 0 : data.weight,
                        amount: util.isNull(data.amount) ? 0 : data.amount
                    });
                });

                saveOrders({ 'data': param }).then(response => {
                    console.log(response);
                    this.$Message.success(response.data.message);
                });
            }
        }
    };
</script>
