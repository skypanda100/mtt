<style lang="less">
    @import '../../styles/common.less';
    @import './daily-record.less';
</style>

<template>
    <Row>
        <Col span="15">
            <Card>
                <p slot="title">晨起</p>
                <p>昨晚睡眠</p>
                入睡<Input v-model="value" placeholder="23:23" style="width: 60px"></Input>
                醒来<Input v-model="value" placeholder="7:12" style="width: 60px"></Input>
                深睡<Input v-model="value" placeholder="1小时12分" style="width: 60px"></Input>
                总睡<Input v-model="value" placeholder="7小时49分" style="width: 60px"></Input>
                清醒<Input v-model="value" placeholder="0" style="width: 60px"></Input>
                <p>血压/心跳/体温</p>
                第一组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
                第二组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input><br>
                第三组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
                第四组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
                <p>体重</p><Input v-model="value" style="width: 80px"></Input>
                <p>血糖值</p><Input v-model="value" style="width: 40px"></Input>
                <p>便便</p><Input v-model="value" placeholder="基本正常" style="width: 120px"></Input>

            </Card>
            <Card dis-hover>
                <p slot="title">ROw1.2</p>

            </Card>
        </Col>
        <Col span="9">
        <Card>
            <p slot="title">日中其他记录</p>
            <p>午睡时间
            入睡<Input v-model="value" placeholder="23:23" style="width: 60px"></Input>
            醒来<Input v-model="value" placeholder="7:12" style="width: 60px"></Input>
            总计午睡时间：30分钟</p>
            <p>日晒时长<Input v-model="value" placeholder="30分钟" style="width: 80px"></Input></p>
            <p>血压/心跳/体温</p>
            <p>记录原因<Input v-model="value" style="width: 100px"></Input></p>
            第一组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
            第二组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input><br>
            第三组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
            第四组<Input v-model="value" style="width: 40px"></Input>/<Input v-model="value" style="width: 40px"></Input>心<Input v-model="value" style="width: 40px"></Input>温<Input v-model="value" style="width: 50px"></Input>
            <p>膳食营养补充剂摄入记录</p>
            复合维生素1：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            海豹油：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            维生素D：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            消化酶：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            益生菌：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            低聚异麦芽糖：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            烟酰胺单核苷酸：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            碳酸钙片：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            镁片：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            维生素C片：数量<Input v-model="value" style="width: 40px"></Input>摄入时间<Input v-model="value" style="width: 40px"></Input><br>
            <p>
            血糖值1
            <Input v-model="value" style="width: 40px"></Input>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            血糖值2
            <Input v-model="value" style="width: 40px"></Input>
            <Select v-model="model1" style="width:80px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            血糖值3
            <Input v-model="value" style="width: 40px"></Input>
            <Select v-model="model1" style="width:80px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            血糖值4
            <Input v-model="value" style="width: 40px"></Input>
            <Select v-model="model1" style="width:80px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            血糖值5
            <Input v-model="value" style="width: 40px"></Input>
            <Select v-model="model1" style="width:80px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </p>





        </Card>
        </Col>
    </Row>
</template>
<script>
	export default {
		data () {
			return {
				cityList: [
					{
						value: '早餐后',
						label: '早餐后'
					},
					{
						value: '午餐前',
						label: '午餐前'
					},
					{
						value: '午餐后',
						label: '午餐后'
					},
					{
						value: '晚餐前',
						label: '晚餐前'
					},
					{
						value: '晚餐后',
						label: '晚餐后'
					}
				],
				model1: ''
			}
		}
	}
</script>
