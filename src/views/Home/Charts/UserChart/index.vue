<template>
    <el-card shadow="hover" class="w-30% mb-4 h-40%" id="user"> </el-card>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, TitleComponent, } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onBeforeMount, onMounted } from 'vue'
import { apiGetAllUser } from '@/api/user';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

let count = 0
onBeforeMount(() => {

}),


    onMounted(() => {
        apiGetAllUser().then((result) => {
            count = result.count
            var chartDom = document.getElementById('user') as HTMLElement;
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '注册用户',
                    left: 'center',
                    top: '5%'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '14%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: 30,
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: count, name: count },
                            // { value: 735, name: 'Direct' },
                            // { value: 580, name: 'Email' },
                            // { value: 484, name: 'Union Ads' },
                            // { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]

            };

            option && myChart.setOption(option);
        })

    })







</script>

<style scoped>
</style>