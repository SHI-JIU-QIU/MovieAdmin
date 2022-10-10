<template>
    <el-card shadow="hover" class="w-68% mb-4 h-40%" id="hot-play"> <span>正在热映</span></el-card>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    GridComponent,
    TransformComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue'
import { apisortAllMovie } from '@/api/movie';

echarts.use([
    DatasetComponent,
    GridComponent,
    TransformComponent,
    BarChart,
    CanvasRenderer
]);

onMounted(() => {
    apisortAllMovie({ name: '热门' }).then((result) => {
        let movieName: any[] = []
        let movieScore: any[] = []
        if (result.code == 200) {
            result.data.slice(0, 5).forEach((item: any) => {
                movieName.push(item.movieCName)
                movieScore.push(item.movieScore)
            });
        }

        console.log(movieName, movieScore);

        var chartDom = document.getElementById('hot-play') as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '评分排行',
                left: 'center',
                top: '5%'
            },

            xAxis: {
                type: 'category',
                data: movieName,
                axisLabel: {
                    interval: 0
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: movieScore,
                    type: 'bar',
                    barWidth: '30%',
                }
            ]

        }
        option && myChart.setOption(option);

    })

})





</script>

<style scoped>
</style>