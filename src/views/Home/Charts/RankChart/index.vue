<template>
    <el-card shadow="hover" class="w-100% h-100% mb-4" id="rank"><span>今日票房</span> </el-card>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';
import { apiGetAllMovie } from '@/api/movie';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

onMounted(() => {
    apiGetAllMovie().then((result) => {
        let movieList: any[] = []
        let boxOffice: any[] = []
        if (result.code == 200) {
            result.commit.slice(0, 5).forEach((item: any) => {
                movieList.push(item.movieCName)
                boxOffice.push(item.movieBoxOffice)
            })
        }
        var chartDom = document.getElementById('rank') as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;

        option = {

            title: {
                text: '今日票房',
                left: 'center',
                top: '5%'
            },
            xAxis: {
                type: 'category',
                data: movieList,
                axisLabel: {
                    interval: 0,
                    formatter: function (value: any) {
                        if (value.length > 3) {
                            return `${value.slice(0, 3)}...`
                        }
                        return value
                    },
                }

            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: boxOffice,
                    type: 'bar',
                    showBackground: true,
                    // backgroundStyle: {
                    //     color: 'rgba(180, 180, 180, 0.2)'
                    // }
                }
            ]
        };

        option && myChart.setOption(option);
    })

})






</script>

<style scoped>
</style>