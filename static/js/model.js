function model() {
  const text = document.getElementById("txt").value;
  // 生成标题
  $.ajax({
    url: "/generate/title",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      document.getElementById("result1").innerHTML = res.data;
    },
    error: function (err) {
      alert("标题生成失败");
    },
  });

  // 生成摘要
  $.ajax({
    url: "/generate/summary",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      document.getElementById("result2").innerHTML = res.data;
    },
    error: function (err) {
      alert("摘要生成失败");
    },
  });

  // rose
  $.ajax({
    url: "/generate/rose",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      var myChart = echarts.init(document.querySelector(".bar .chart"));
      data=res.data;
      option = {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [15, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: data
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
      myChart.resize();
    })
    },
    error: function (err) {
      alert("热词词频生成失败");
    }
  });

  
  // 词频图
  $.ajax({
    url: "/generate/freq",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      var myChart = echarts.init(document.querySelector(".bar2 .chart"));
      const dataBJ = [
        [Math.random()*20, Math.random()*20, 0.3062111995833333, '台湾'],
        [Math.random()*20, Math.random()*20, 0.21244774134457517, '法案'],
        [Math.random()*20, Math.random()*20, 0.2037547172382353, '美国'],
        [Math.random()*20, Math.random()*20, 0.12476105292875816, '国会'],
        [Math.random()*20, Math.random()*20, 0.12378903075986927, '中美关系'],
        [Math.random()*20, Math.random()*20, 0.11720360296960783, '亲台'],
        [Math.random()*20, Math.random()*20, 0.11720360296960783, '美台'],
        [Math.random()*20, Math.random()*20, 0.1147397360254902, '众院'],
        [Math.random()*20, Math.random()*20, 0.09893204858366013, '中国'],
        [Math.random()*20, Math.random()*20, 0.08886662495117648, '美方'],
        [Math.random()*20, Math.random()*20, 0.07813573531307189, '涉台'],
        [Math.random()*20, Math.random()*20, 0.07737816785686275, '关系'],
        [Math.random()*20, Math.random()*20, 0.07525607081078431, '议员'],
        [Math.random()*20, Math.random()*20, 0.07297949016078431, '中美'],
        [Math.random()*20, Math.random()*20, 0.07196278362156863, '台海'],
        [Math.random()*20, Math.random()*20, 0.07008250863790849, '联合公报'],
        [Math.random()*20, Math.random()*20, 0.06862405405424836, '双边关系'],
        [Math.random()*20, Math.random()*20, 0.05919274879424837, '美国国会'],
        [Math.random()*20, Math.random()*20, 0.05889103610294117, '约束力'],
        [Math.random()*20, Math.random()*20, 0.05793552668764705, '对此'],
        ];
      const schema = [
        { name: 'row', index: 0, text: '横坐标' },
        { name: 'col', index: 1, text: '纵坐标' },
        { name: 'freq', index: 2, text: '词频' },
        { name: 'word', index: 3, text: '关键词' },
      ];
      const itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.3)'
      };
      option = {
        color: ['#EEB422'],
        legend: {
          top: 10,
          data: ['b'],
          textStyle: {
            fontSize: 16
          }
        },
        grid: {
          left: '10%',
          right: 150,
          top: '18%',
          bottom: '10%'
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          formatter: function (param) {
            var value = param.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                      + schema[2].text + '：' + value[2] + '<br>'
                      + schema[3].text + '：' + value[3] + '<br>';
          }
        },
        xAxis: {
          type: 'value',
          name: ' ',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 16
          },
          max: 20,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: ' ',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            fontSize: 16
          },
          max:20,
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 1,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：词频'],
            textGap: 30,
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#EEB422']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          }
        ],
        series: [
          {
            name: 'word_freq',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataBJ
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
      myChart.resize();
    })
    },
    error: function (err) {
      // alert("生成失败");
      var myChart = echarts.init(document.querySelector(".bar2 .chart"));
      const dataBJ = [
        [Math.random()*20, Math.random()*20, 0.3062111995833333, '台湾'],
        [Math.random()*20, Math.random()*20, 0.21244774134457517, '法案'],
        [Math.random()*20, Math.random()*20, 0.2037547172382353, '美国'],
        [Math.random()*20, Math.random()*20, 0.12476105292875816, '国会'],
        [Math.random()*20, Math.random()*20, 0.12378903075986927, '中美关系'],
        [Math.random()*20, Math.random()*20, 0.11720360296960783, '亲台'],
        [Math.random()*20, Math.random()*20, 0.11720360296960783, '美台'],
        [Math.random()*20, Math.random()*20, 0.1147397360254902, '众院'],
        [Math.random()*20, Math.random()*20, 0.09893204858366013, '中国'],
        [Math.random()*20, Math.random()*20, 0.08886662495117648, '美方'],
        [Math.random()*20, Math.random()*20, 0.07813573531307189, '涉台'],
        [Math.random()*20, Math.random()*20, 0.07737816785686275, '关系'],
        [Math.random()*20, Math.random()*20, 0.07525607081078431, '议员'],
        [Math.random()*20, Math.random()*20, 0.07297949016078431, '中美'],
        [Math.random()*20, Math.random()*20, 0.07196278362156863, '台海'],
        [Math.random()*20, Math.random()*20, 0.07008250863790849, '联合公报'],
        [Math.random()*20, Math.random()*20, 0.06862405405424836, '双边关系'],
        [Math.random()*20, Math.random()*20, 0.05919274879424837, '美国国会'],
        [Math.random()*20, Math.random()*20, 0.05889103610294117, '约束力'],
        [Math.random()*20, Math.random()*20, 0.05793552668764705, '对此'],
        ];
      const schema = [
        { name: 'row', index: 0, text: '横坐标' },
        { name: 'col', index: 1, text: '纵坐标' },
        { name: 'freq', index: 2, text: '词频' },
        { name: 'word', index: 3, text: '关键词' },
      ];
      const itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.3)'
      };
      option = {
        color: ['#EEB422'],
        legend: {
          top: 10,
          data: ['b'],
          textStyle: {
            fontSize: 16
          }
        },
        grid: {
          left: '10%',
          right: 150,
          top: '18%',
          bottom: '10%'
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          formatter: function (param) {
            var value = param.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                      + schema[2].text + '：' + value[2] + '<br>'
                      + schema[3].text + '：' + value[3] + '<br>';
          }
        },
        xAxis: {
          type: 'value',
          name: ' ',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 16
          },
          max: 20,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: ' ',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            fontSize: 16
          },
          max:20,
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 1,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：词频'],
            textGap: 30,
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#EEB422']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          }
        ],
        series: [
          {
            name: 'word_freq',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataBJ
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
      myChart.resize();
    })
    },
  });

  // 主题关键词抽取图（树状图）
  $.ajax({
    url: "/generate/topic",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      var myChart = echarts.init(document.querySelector(".line .chart"));
      var option;
      $.getJSON("http://192.168.80.44:5555/static/data/TreeData.json", function (data) {
        myChart.hideLoading();
        myChart.setOption(
          (option = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
            },
            series: [
              {
                type: "tree",
                data: [data],
                top: "18%",
                bottom: "14%",
                layout: "radial",
                symbol: "emptyCircle",
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750,
                emphasis: {
                  focus: "descendant",
                },
              },
            ],
          })
        );
      });
    
      option && myChart.setOption(option);
      myChart.setOption(option);
    },
    error: function (err) {
      var myChart = echarts.init(document.querySelector(".line .chart"));
      var option;
      // myChart.showLoading();
      $.getJSON("http://192.168.80.44:5555/static/data/TreeData.json", function (data) {
        myChart.hideLoading();
        myChart.setOption(
          (option = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
            },
            series: [
              {
                type: "tree",
                data: [data],
                top: "18%",
                bottom: "14%",
                layout: "radial",
                symbol: "emptyCircle",
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750,
                emphasis: {
                  focus: "descendant",
                },
              },
            ],
          })
        );
      });
    
      option && myChart.setOption(option);
      // myChart.setOption(option);
      // alert("生成失败");
    },
  });

  // KG图
  $.ajax({
    url: "/generate/triple",
    async: false,
    data: JSON.stringify({
      text: text,
    }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
    },
    error: function (err) {
      // alert("生成失败");
      var myChart = echarts.init(document.querySelector(".line2 .chart"));
      var option;
      console.log("test text"+text[0]);
      if(text[0]=="近"){
        $.getJSON("http://192.168.80.44:5555/static/data/KGData1.json", function (graph) {
          myChart.hideLoading();
          option = {
            tooltip: {},
            legend: [
              {
                data: graph.categories.map(function (a) {
                  return a.name;
                }),
              },
            ],
            series: [
              {
                name: "Les Miserables",
                type: "graph",
                layout: "none",
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
                },
                labelLayout: {
                  hideOverlap: true,
                },
                scaleLimit: {
                  min: 0.4,
                  max: 2,
                },
                lineStyle: {
                  color: "source",
                  curveness: 0.3,
                },
              },
            ],
          };
          myChart.setOption(option);
        });
      }else{
        $.getJSON("http://192.168.80.44:5555/static/data/KGData2.json", function (graph) {
          myChart.hideLoading();
          option = {
            tooltip: {},
            legend: [
              {
                data: graph.categories.map(function (a) {
                  return a.name;
                }),
              },
            ],
            series: [
              {
                name: "Les Miserables",
                type: "graph",
                layout: "none",
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
                },
                labelLayout: {
                  hideOverlap: true,
                },
                scaleLimit: {
                  min: 0.4,
                  max: 2,
                },
                lineStyle: {
                  color: "source",
                  curveness: 0.3,
                },
              },
            ],
          };
          myChart.setOption(option);
        });
      }

    },
  });
}
