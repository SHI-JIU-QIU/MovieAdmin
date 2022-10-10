<template>
    <el-card shadow="hover" class="w-100% mb-4 h-56%" id="order"> </el-card>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts/core';
import { onMounted } from 'vue';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { apiGetAllCinema } from '@/api/cinema';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
onMounted(() => {
    apiGetAllCinema().then((result) => {
        let cinemaList: any[] = []
        let cinemaScoreList: any[] = []
        if (result.code == 200) {
            result.data.slice(0, 7).forEach((item: any) => {
                cinemaList.push(item.cinemaName)
                cinemaScoreList.push(item.cinemaScore)
            });
        }
        var chartDom = document.getElementById('order') as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '热门影院',
                left: 'center',
                top: '5%'
            },
            xAxis: {
                type: 'category',
                data: cinemaList,
                 triggerEvent: true,
                axisLabel: {
                    interval: 0,
                    formatter: function (value:any) {
                    if (value.length > 3) {
                        return `${value.slice(0, 3)}...`
                    }
                    return value
                },
                },
                
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: cinemaScoreList,
                    type: 'line',
                    smooth: true
                }
            ]
        };

        option && myChart.setOption(option);
    })



})

</script>

<style scoped>
</style>