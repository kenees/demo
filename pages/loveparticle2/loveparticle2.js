// pages/cooltimer/cooltimer.js
var ctx = null;
var timer1 = null;
var timer2 = null;
var factor = {
  speed: .02, // 运动速度，值越小越慢
  t: 0 //  贝塞尔函数系数
};

var factor1 = {
  speed: .02, // 运动速度，值越小越慢
  t: 0 //  贝塞尔函数系数
};

var texts = "汪汪汪";

var colors = ['lightskyblue', 'lawngreen', 'greenyellow', 'orangered', 'turquoise', 'pink', 'plum']
var points = [{
  x: 2,
  y: 4
}, {
  x: 20,
  y: 10
}, {
  x: 30,
  y: 40
}, {
  x: 30,
  y: 50
}, {
  x: 50,
  y: 70
}];


var heart1 = {
  arr1: [
    [{
      x: 190,
      y: 200
    }, {
      x: 0,
      y: 102
    }, {
      x: 70,
      y: 20
    }, {
      x: 190,
      y: 70
    }]
  ],
  arr2: [
    [{
      x: 190,
      y: 70
    }, {
      x: 310,
      y: 20
    }, {
      x: 380,
      y: 102
    }, {
      x: 190,
      y: 200
    }]
  ]
}

var ctx0 = null;
var ctx10 = null;
var factor0 = {
  speed: .008, // 运动速度，值越小越慢
  t: 0 //  贝塞尔函数系数
};

var timer3 = null; // 循环定时器


Page({
  data: {
    canvas_ct_height: null,
    canvas_ct_width: null,
    style_img: ''
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)

        that.setData({
          canvas_ct_width: res.screenWidth,
          canvas_ct_height: res.screenHeight
        })

        ctx = wx.createCanvasContext('canvas_ct')
        // ctx.drawImage("../../images/WechatIMG61.png", 0, 0, that.data.canvas_ct_width, that.data.canvas_ct_height)
        points.splice(0, points.length)
        factor1.t = 0;
        setTimeout(function() {
          timer1 = setInterval(function() {
            // that.render([[{x:150,y:200},{x:30,y:72},{x:70,y:20},{x:150,y:70}]])
            that.render(heart1.arr1, heart1.arr2)
          }, 30)
        }, 1000)


        ctx0 = wx.createCanvasContext('canvas_wi')
        ctx10 = wx.createCanvasContext('canvas_wi2')
        that.startTimer();
       
        //that.startTimer();

      },
    })

    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: options.title,
      success: function(res) {
        // success
      }
    })
    // var that = this
    // ctx = wx.createCanvasContext('canvas_ct')
    // points.splice(0, points.length)
    // factor1.t = 0;
    // setTimeout(function () {
    //   timer1 = setInterval(function () {
    //     // that.render([[{x:150,y:200},{x:30,y:72},{x:70,y:20},{x:150,y:70}]])
    //     that.render([[{ x: 150, y: 200 }, { x: 0, y: 102 }, { x: 70, y: 20 }, { x: 150, y: 70 }]])
    //   }, 30)
    // }, 1000) 
  },

  render: function(data, data2) {
    console.log("111")
    var that = this
    var p10 = data[0][0]; // 三阶贝塞尔曲线起点坐标值
    var p11 = data[0][1]; // 三阶贝塞尔曲线第一个控制点坐标值
    var p12 = data[0][2]; // 三阶贝塞尔曲线第二个控制点坐标值
    var p13 = data[0][3]; // 三阶贝塞尔曲线终点坐标值
    ctx.beginPath();
    points.splice(0, points.length)
    ctx.setLineWidth(1);
    ctx.setFillStyle(colors[Math.floor(Math.random() * 5)])
    var t = factor.t;
    ctx.setLineJoin('round')
    /*计算多项式系数 （下同）*/
    var cx1 = 3 * (p11.x - p10.x);
    var bx1 = 3 * (p12.x - p11.x) - cx1;
    var ax1 = p13.x - p10.x - cx1 - bx1;

    var cy1 = 3 * (p11.y - p10.y);
    var by1 = 3 * (p12.y - p11.y) - cy1;
    var ay1 = p13.y - p10.y - cy1 - by1;

    var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
    var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;
    points.push({
      x: xt1,
      y: yt1
    })
    factor.t += factor.speed;
    //  ctx.lineTo(xt1, yt1)

    for (var i = 0; i < points.length; i++) {

      // ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI)
      var n = parseInt(Math.random() * 10);
      ctx.drawImage("../../images/"+n+".png", points[i].x, points[i].y, 16, 16);
    }
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(230, 20, 270, 72, 150, 140)
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(70, 20, 30, 72, 150, 140)
    ctx.fill();
    if (yt1 < 200) {
      ctx.draw(true)
    } else {
      ctx.draw()
    }


    if (factor.t > 1) {
      factor.t = 0
      timer2 = setInterval(function() {
        // that.render2([[{x:150,y:60},{x:230,y:20},{x:270,y:72},{x:150,y:140}]])
        that.render2(data2)
      }, 30)
      clearInterval(timer1)
    }

  },


  render2: function(data) {
    console.log("222")
    var that = this
    var p20 = data[0][0];
    var p21 = data[0][1];
    var p22 = data[0][2];
    var p23 = data[0][3];
    points.splice(0, points.length)
    ctx.beginPath();
    ctx.setLineWidth(1);
    ctx.setLineJoin('red')
    ctx.setFillStyle(colors[Math.floor(Math.random() * 5)])
    var t = factor1.t;

    var cx2 = 3 * (p21.x - p20.x);
    var bx2 = 3 * (p22.x - p21.x) - cx2;
    var ax2 = p23.x - p20.x - cx2 - bx2;

    var cy2 = 3 * (p21.y - p20.y);
    var by2 = 3 * (p22.y - p21.y) - cy2;
    var ay2 = p23.y - p20.y - cy2 - by2;

    var xt2 = ax2 * (t * t * t) + bx2 * (t * t) + cx2 * t + p20.x;
    var yt2 = ay2 * (t * t * t) + by2 * (t * t) + cy2 * t + p20.y;

    points.push({
      x: xt2,
      y: yt2
    })
    factor1.t += factor1.speed;
    // ctx.lineTo(xt2, yt2)
    for (var i = 0; i < points.length; i++) {
      //ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI)
      var n = parseInt(Math.random() * 10);
      ctx.drawImage("../../images/"+n+".png", points[i].x, points[i].y, 16, 16);

    }
    if (points[points.length - 1].y >= 200) {
      clearInterval(timer2)
      that.renderText()
      return;
    }


    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(230, 20, 270, 72, 150, 140)
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(70, 20, 30, 72, 150, 140)
    ctx.fill();

    ctx.draw(true)

    if (factor1.t > 1) {
      factor1.t = 0
      clearInterval(timer2)
    }
  },

  renderText: function() {
    console.log('text...')
    ctx.setFontSize(20)
    setTimeout(function() {
      ctx.setFillStyle(colors[Math.floor(Math.random() * 5)])
      ctx.fillText(texts.substring(0, 1), 120, 100)
      ctx.draw(true)
    }, 1000)

    setTimeout(function() {
      ctx.setFillStyle(colors[Math.floor(Math.random() * 5)])
      ctx.fillText(texts.substring(1, 2), 140, 100)
      ctx.draw(true)
    }, 2000)

    setTimeout(function() {
      ctx.setFillStyle(colors[Math.floor(Math.random() * 5)])
      ctx.fillText(texts.substring(2, 3), 160, 100)
      ctx.draw(true)
    }, 3000)

  },

  startTimer: function() {
    var that = this
    that.setData({
      style_img: 'transform:scale(1.3);'
    })
    setTimeout(function() {
      that.setData({
        style_img: 'transform:scale(1);'
      })
    }, 500)
    that.drawImage([
      [{
        x: 30,
        y: 400
      }, {
        x: 70,
        y: 300
      }, {
        x: -50,
        y: 150
      }, {
        x: 30,
        y: 0
      }],
      [{
        x: 30,
        y: 400
      }, {
        x: 30,
        y: 300
      }, {
        x: 80,
        y: 150
      }, {
        x: 30,
        y: 0
      }],
      [{
        x: 30,
        y: 400
      }, {
        x: 0,
        y: 90
      }, {
        x: 80,
        y: 100
      }, {
        x: 30,
        y: 0
      }]
    ])

  },
  onClickImage: function(e) {
    var that = this
    that.setData({
      style_img: 'transform:scale(1.3);'
    })
    setTimeout(function() {
      that.setData({
        style_img: 'transform:scale(1);'
      })
    }, 500)
  },
  drawImage: function(data) {
    var that = this
    var p10 = data[0][0]; // 三阶贝塞尔曲线起点坐标值
    var p11 = data[0][1]; // 三阶贝塞尔曲线第一个控制点坐标值
    var p12 = data[0][2]; // 三阶贝塞尔曲线第二个控制点坐标值
    var p13 = data[0][3]; // 三阶贝塞尔曲线终点坐标值

    var p20 = data[1][0];
    var p21 = data[1][1];
    var p22 = data[1][2];
    var p23 = data[1][3];

    var p30 = data[2][0];
    var p31 = data[2][1];
    var p32 = data[2][2];
    var p33 = data[2][3];

    var t = factor0.t;

    /*计算多项式系数 （下同）*/
    var cx1 = 3 * (p11.x - p10.x);
    var bx1 = 3 * (p12.x - p11.x) - cx1;
    var ax1 = p13.x - p10.x - cx1 - bx1;

    var cy1 = 3 * (p11.y - p10.y);
    var by1 = 3 * (p12.y - p11.y) - cy1;
    var ay1 = p13.y - p10.y - cy1 - by1;

    var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
    var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;

    /** ---------------------------------------- */
    var cx2 = 3 * (p21.x - p20.x);
    var bx2 = 3 * (p22.x - p21.x) - cx2;
    var ax2 = p23.x - p20.x - cx2 - bx2;

    var cy2 = 3 * (p21.y - p20.y);
    var by2 = 3 * (p22.y - p21.y) - cy2;
    var ay2 = p23.y - p20.y - cy2 - by2;

    var xt2 = ax2 * (t * t * t) + bx2 * (t * t) + cx2 * t + p20.x;
    var yt2 = ay2 * (t * t * t) + by2 * (t * t) + cy2 * t + p20.y;


    /** ---------------------------------------- */
    var cx3 = 3 * (p31.x - p30.x);
    var bx3 = 3 * (p32.x - p31.x) - cx3;
    var ax3 = p33.x - p30.x - cx3 - bx3;

    var cy3 = 3 * (p31.y - p30.y);
    var by3 = 3 * (p32.y - p31.y) - cy3;
    var ay3 = p33.y - p30.y - cy3 - by3;

    /*计算xt yt的值 */
    var xt3 = ax3 * (t * t * t) + bx3 * (t * t) + cx3 * t + p30.x;
    var yt3 = ay3 * (t * t * t) + by3 * (t * t) + cy3 * t + p30.y;
    factor0.t += factor0.speed;
    ctx0.drawImage("../../images/heart1.png", xt1, yt1, 30, 30);
    ctx0.drawImage("../../images/heart2.png", xt2, yt2, 30, 30);
    ctx0.drawImage("../../images/heart3.png", xt3, yt3, 30, 30);
    ctx0.draw();
    ctx10.drawImage("../../images/heart1.png", xt1, yt1, 30, 30);
    ctx10.drawImage("../../images/heart2.png", xt2, yt2, 30, 30);
    ctx10.drawImage("../../images/heart3.png", xt3, yt3, 30, 30);
    ctx10.draw();
    if (factor0.t > 1) {
      factor0.t = 0;
      // clearTimeout(timer3);
      that.startTimer();
    } else {
      timer3 = setTimeout(function() {
        that.drawImage([
          [{
            x: 30,
            y: 400
          }, {
            x: 70,
            y: 300
          }, {
            x: -50,
            y: 150
          }, {
            x: 30,
            y: 0
          }],
          [{
            x: 30,
            y: 400
          }, {
            x: 30,
            y: 300
          }, {
            x: 80,
            y: 150
          }, {
            x: 30,
            y: 0
          }],
          [{
            x: 30,
            y: 400
          }, {
            x: 0,
            y: 90
          }, {
            x: 80,
            y: 100
          }, {
            x: 30,
            y: 0
          }]
        ])
      },20)
    }


  },
})