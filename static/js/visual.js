// // 每一个图表都是立即执行函数，防止myChart、option等变量污染


// // KG图
// // (function () {
// //   var myChart = echarts.init(document.querySelector(".line2 .chart"));
// //   var option;
// //   // myChart.showLoading();
// //   $.getJSON("http://10.234.110.2:5555/static/data/KGData.json", function (graph) {
// //     myChart.hideLoading();
// //     option = {
// //       tooltip: {},
// //       legend: [
// //         {
// //           data: graph.categories.map(function (a) {
// //             return a.name;
// //           }),
// //         },
// //       ],
// //       series: [
// //         {
// //           name: "Les Miserables",
// //           type: "graph",
// //           layout: "none",
// //           data: graph.nodes,
// //           links: graph.links,
// //           categories: graph.categories,
// //           roam: true,
// //           label: {
// //             show: true,
// //             position: "right",
// //             formatter: "{b}",
// //           },
// //           labelLayout: {
// //             hideOverlap: true,
// //           },
// //           scaleLimit: {
// //             min: 0.4,
// //             max: 2,
// //           },
// //           lineStyle: {
// //             color: "source",
// //             curveness: 0.3,
// //           },
// //         },
// //       ],
// //     };
// //     myChart.setOption(option);
// //   });
// // })();


// // 词频极坐标图
// (function () {
//   // 1实例化对象
//   var myChart = echarts.init(document.querySelector(".bar .chart"));
//   // 2. 指定配置项和数据
//   const data = [
//     [5000, 10000, 6785.71],
//     [4000, 10000, 6825],
//     [3000, 6500, 4463.33],
//     [2500, 5600, 3793.83],
//     [2000, 4000, 3060],
//     [2000, 4000, 3222.33],
//     [2500, 4000, 3133.33],
//     [1800, 4000, 3100],
//     [2000, 3500, 2750],
//     [2000, 3000, 2500],
//     [1800, 3000, 2433.33],
//     [2000, 2700, 2375],
//     [1500, 2800, 2150],
//     [1500, 2300, 2100],
//     [1600, 3500, 2057.14],
//     [1500, 2600, 2037.5],
//     [1500, 2417.54, 1905.85],
//     [1500, 2000, 1775],
//     [1500, 1800, 1650],
//   ];
//   // prettier-ignore
//   const cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'];
//   const barHeight = 50;
//   var option = {
//     // title: {
//     //   text: 'How expensive is it to rent an apartment in China?',
//     //   subtext: 'Data from https://www.numbeo.com'
//     // },
//     legend: {
//       show: true,
//       top: "bottom",
//       data: ["Range", "Average"],
//     },
//     grid: {
//       top: 100,
//     },
//     angleAxis: {
//       type: "category",
//       data: cities,
//     },
//     tooltip: {
//       show: true,
//       formatter: function (params) {
//         const id = params.dataIndex;
//         return (
//           cities[id] +
//           "<br>Lowest：" +
//           data[id][0] +
//           "<br>Highest：" +
//           data[id][1] +
//           "<br>Average：" +
//           data[id][2]
//         );
//       },
//     },
//     radiusAxis: {},
//     polar: {},
//     series: [
//       {
//         type: "bar",
//         itemStyle: {
//           color: "transparent",
//         },
//         data: data.map(function (d) {
//           return d[0];
//         }),
//         coordinateSystem: "polar",
//         stack: "Min Max",
//         silent: true,
//       },
//       {
//         type: "bar",
//         data: data.map(function (d) {
//           return d[1] - d[0];
//         }),
//         coordinateSystem: "polar",
//         name: "Range",
//         stack: "Min Max",
//       },
//       {
//         type: "bar",
//         itemStyle: {
//           color: "transparent",
//         },
//         data: data.map(function (d) {
//           return d[2] - barHeight;
//         }),
//         coordinateSystem: "polar",
//         stack: "Average",
//         silent: true,
//         z: 10,
//       },
//       {
//         type: "bar",
//         data: data.map(function (d) {
//           return barHeight * 2;
//         }),
//         coordinateSystem: "polar",
//         name: "Average",
//         stack: "Average",
//         barGap: "-100%",
//         z: 10,
//       },
//     ],
//   };

//   // 3. 把配置项给实例对象
//   myChart.setOption(option);
//   // 4. 让图表跟随屏幕自动的去适应
//   window.addEventListener("resize", function () {
//     myChart.resize();
//   });
// })();


// // 气泡图
// // (function () {
// //   var myChart = echarts.init(document.querySelector(".bar2 .chart"));
// //   const dataBJ = [
// //     [Math.random()*20, Math.random()*20, 0.3062111995833333, '台湾'],
// //     [Math.random()*20, Math.random()*20, 0.21244774134457517, '法案'],
// //     [Math.random()*20, Math.random()*20, 0.2037547172382353, '美国'],
// //     [Math.random()*20, Math.random()*20, 0.12476105292875816, '国会'],
// //     [Math.random()*20, Math.random()*20, 0.12378903075986927, '中美关系'],
// //     [Math.random()*20, Math.random()*20, 0.11720360296960783, '亲台'],
// //     [Math.random()*20, Math.random()*20, 0.11720360296960783, '美台'],
// //     [Math.random()*20, Math.random()*20, 0.1147397360254902, '众院'],
// //     [Math.random()*20, Math.random()*20, 0.09893204858366013, '中国'],
// //     [Math.random()*20, Math.random()*20, 0.08886662495117648, '美方'],
// //     [Math.random()*20, Math.random()*20, 0.07813573531307189, '涉台'],
// //     [Math.random()*20, Math.random()*20, 0.07737816785686275, '关系'],
// //     [Math.random()*20, Math.random()*20, 0.07525607081078431, '议员'],
// //     [Math.random()*20, Math.random()*20, 0.07297949016078431, '中美'],
// //     [Math.random()*20, Math.random()*20, 0.07196278362156863, '台海'],
// //     [Math.random()*20, Math.random()*20, 0.07008250863790849, '联合公报'],
// //     [Math.random()*20, Math.random()*20, 0.06862405405424836, '双边关系'],
// //     [Math.random()*20, Math.random()*20, 0.05919274879424837, '美国国会'],
// //     [Math.random()*20, Math.random()*20, 0.05889103610294117, '约束力'],
// //     [Math.random()*20, Math.random()*20, 0.05793552668764705, '对此'],
// //     ];
// //   const schema = [
// //     { name: 'row', index: 0, text: '横坐标' },
// //     { name: 'col', index: 1, text: '纵坐标' },
// //     { name: 'freq', index: 2, text: '词频' },
// //     { name: 'word', index: 3, text: '关键词' },
// //   ];
// //   const itemStyle = {
// //     opacity: 0.8,
// //     shadowBlur: 10,
// //     shadowOffsetX: 0,
// //     shadowOffsetY: 0,
// //     shadowColor: 'rgba(0,0,0,0.3)'
// //   };
// //   option = {
// //     color: ['#EEB422'],
// //     legend: {
// //       top: 10,
// //       data: ['b'],
// //       textStyle: {
// //         fontSize: 16
// //       }
// //     },
// //     grid: {
// //       left: '10%',
// //       right: 150,
// //       top: '18%',
// //       bottom: '10%'
// //     },
// //     tooltip: {
// //       backgroundColor: 'rgba(255,255,255,0.7)',
// //       formatter: function (param) {
// //         var value = param.value;
// //         return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
// //                   + schema[2].text + '：' + value[2] + '<br>'
// //                   + schema[3].text + '：' + value[3] + '<br>';
// //       }
// //     },
// //     xAxis: {
// //       type: 'value',
// //       name: ' ',
// //       nameGap: 16,
// //       nameTextStyle: {
// //         fontSize: 16
// //       },
// //       max: 20,
// //       splitLine: {
// //         show: false
// //       }
// //     },
// //     yAxis: {
// //       type: 'value',
// //       name: ' ',
// //       nameLocation: 'end',
// //       nameGap: 20,
// //       nameTextStyle: {
// //         fontSize: 16
// //       },
// //       max:20,
// //       splitLine: {
// //         show: false
// //       }
// //     },
// //     visualMap: [
// //       {
// //         left: 'right',
// //         top: '10%',
// //         dimension: 2,
// //         min: 0,
// //         max: 1,
// //         itemWidth: 30,
// //         itemHeight: 120,
// //         calculable: true,
// //         precision: 0.1,
// //         text: ['圆形大小：词频'],
// //         textGap: 30,
// //         inRange: {
// //           symbolSize: [10, 70]
// //         },
// //         outOfRange: {
// //           symbolSize: [10, 70],
// //           color: ['rgba(255,255,255,0.4)']
// //         },
// //         controller: {
// //           inRange: {
// //             color: ['#EEB422']
// //           },
// //           outOfRange: {
// //             color: ['#999']
// //           }
// //         }
// //       }
// //     ],
// //     series: [
// //       {
// //         name: 'word_freq',
// //         type: 'scatter',
// //         itemStyle: itemStyle,
// //         data: dataBJ
// //       }
// //     ]
// //   };
// //   myChart.setOption(option);
// //   window.addEventListener("resize", function () {
// //   myChart.resize();
// // })
// // })();



// // // 主题关键词抽取图（树状图）
// // (function () {
// //   var myChart = echarts.init(document.querySelector(".line .chart"));
// //   var option;
// //   // myChart.showLoading();
// //   $.getJSON("http://10.234.110.2:5555/static/data/filename.json", function (data) {
// //     myChart.hideLoading();
// //     myChart.setOption(
// //       (option = {
// //         tooltip: {
// //           trigger: "item",
// //           triggerOn: "mousemove",
// //         },
// //         series: [
// //           {
// //             type: "tree",
// //             data: [data],
// //             top: "18%",
// //             bottom: "14%",
// //             layout: "radial",
// //             symbol: "emptyCircle",
// //             symbolSize: 7,
// //             initialTreeDepth: 3,
// //             animationDurationUpdate: 750,
// //             emphasis: {
// //               focus: "descendant",
// //             },
// //           },
// //         ],
// //       })
// //     );
// //   });

// //   option && myChart.setOption(option);
// //   myChart.setOption(option);
// // })();
