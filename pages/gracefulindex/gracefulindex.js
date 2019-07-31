// pages/turnpage/turnpage.js
var ctx=null;
var res = null;
var factor={
              speed:.001,  // 运动速度，值越小越慢（不建议修改）
              t:0    //  贝塞尔函数系数
            };
var points = new Array()
var timer1 = null
var dy = 0  //   当前选中的索引的Y坐标
var dx = 0
var dfont = 0;

var startX = 0 ;  //  手指触摸时坐标
var startY = 0 ;
var moveX = 0;
var moveY = 0;
var endX = 0;
var endY = 0;

var diffY = 0;
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var names_temp = ['Allen','Albert','Aznar','Azfar','Alzheimers','Alite','Bezier','Berlin','Bert','Ciro','Caie','David','Eliza','Ferry','George','Hellen','I','Jeffer','Kavin','Lubinsky','Monkey','Naquin','Opera','Peter','Queen','Roster','Steam','Tiker','Unique','Vue','Weex','Xman','Yep','Zero']
var randomi = 0  // 手指滑动过程中的索引
var renderF = false;  //  防止重复渲染标记
var renderS = false;
var renderT = false;
Page({
  data:{
    canvas_tp_style:'',
    names:null,
    toView:''
  },
    
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
        title: options.title,
        success: function(res) {
          // success
        }
    })
    this.setData({
        names : names_temp
    })
    res = wx.getSystemInfoSync()
    this.setData({
      canvas_tp_style:'height:'+((res.windowHeight-50))+'px;'
    })
    var that = this
    ctx = wx.createCanvasContext('canvas_tp')
    ctx.setFillStyle('deepskyblue')
      randomi = -10
       this.drawF()
  },


  touchstart:function(e){
      startX = e.changedTouches[0].x
      startY = e.changedTouches[0].y
      renderF = false;
      renderS = false;
      renderT = false;
      randomi = Math.round((startY-14)/(((res.windowHeight-50))/26))
      this.drawF()
       
  },

  touchmove:function(e){
        moveX = e.changedTouches[0].x
        moveY = e.changedTouches[0].y
        diffY = moveY-startY;
        renderF = false;
        renderS = false;
        renderT = false;
        randomi = Math.round((moveY-14)/(((res.windowHeight-50))/26))
        if(randomi<0){
          randomi =0
        }else if(randomi>25){
          randomi =25
        }
       this.drawF()
       
      
         
  },

  touchend:function(e){
        endX = e.changedTouches[0].x
        endY = e.changedTouches[0].y
        randomi = -10
         this.drawF()
  },


  drawF:function(){

        ctx.setFillStyle('red')
        
        //  渲染手指触摸处的索引贝塞尔曲线
            if(randomi>=0){
                  factor.t = 0
                  dy = Math.round((randomi-2)*(((res.windowHeight-50))/26))+14
                  this.drawBerzier([[{x:60,y:dy},{x:30,y:dy+10},{x:30,y:4*Math.round(((res.windowHeight-50))/26)+dy-10},{x:60,y:4*Math.round(((res.windowHeight-50))/26)+dy}]])
            }
        

            //  渲染手指外的索引
        for(var i=0; i<26; i++){
            if(i<(randomi-2) || i>(randomi+2)){
               ctx.setFillStyle('red')
                ctx.setFontSize(14)
                ctx.fillText(letters[i], 60, i*(((res.windowHeight-50))/26)+14)
            }
        }
        ctx.draw()
  },


  drawBerzier:function(data){
      var p10= data[0][0];   // 三阶贝塞尔曲线起点坐标值
      var p11= data[0][1];   // 三阶贝塞尔曲线第一个控制点坐标值
      var p12= data[0][2];   // 三阶贝塞尔曲线第二个控制点坐标值
      var p13= data[0][3];   // 三阶贝塞尔曲线终点坐标值
      for(factor.t;factor.t<=1;factor.t +=factor.speed){
          var t = factor.t;
          var cx1 = 3*(p11.x-p10.x);
          var bx1 = 3*(p12.x-p11.x)-cx1;
          var ax1 = p13.x-p10.x-cx1-bx1;

          var cy1 = 3*(p11.y-p10.y);   
          var by1 = 3*(p12.y-p11.y)-cy1;  
          var ay1 = p13.y-p10.y-cy1-by1;   
          var xt1 = ax1*(t*t*t)+bx1*(t*t)+cx1*t+p10.x;  
          var yt1 = ay1*(t*t*t)+by1*(t*t)+cy1*t+p10.y;
         
              if(Math.round(yt1)==Math.round(((res.windowHeight-50))/26)+dy){
                    if( randomi>=1){
                         if(renderF==false){
                            ctx.setFontSize(14)
                            ctx.fillText(letters[randomi-1], xt1, yt1)
                            renderF = true
                        }
                    }
                   
                        
              }else if(Math.round(yt1)==2*Math.round(((res.windowHeight-50))/26)+dy){
                    if(renderS==false){
                      ctx.setFontSize(14)
                      ctx.fillText(letters[randomi], xt1, yt1)
                       ctx.setFontSize(20)
                      ctx.fillText(letters[randomi], xt1-20, yt1+2)
                      renderS = true
                      var temp_i = 0;
                      for(var i=0; i<names_temp.length;i++){
                          if(i>0){
                              if(names_temp[i].substring(0,1) == letters[randomi] & names_temp[i-1].substring(0,1)!=letters[randomi]){
                                  this.setData({
                                  toView:names_temp[randomi]
                                })
                              }
                          }else{
                            if(names_temp[i].substring(0,1) ==letters[randomi]){
                                this.setData({
                                  toView:names_temp[0]
                                })
                            }
                            
                            
                          }
                          
                      }
                      
                    }
                     
                   
                  
              }else if(Math.round(yt1)==3*Math.round(((res.windowHeight-50))/26)+dy){
                      if(randomi<=24){
                          if(renderT==false){
                              ctx.setFontSize(14)
                              ctx.fillText(letters[randomi+1], xt1, yt1)
                              renderT = true
                          }
                      }
            
              }
         
         
         
      }


     

      if(randomi>=2){
          ctx.setFontSize(14)
          ctx.fillText(letters[randomi-2], 60, dy)
      }
       if(randomi<=23){
           ctx.setFontSize(14)
          ctx.fillText(letters[randomi+2], 60, 4*Math.round(((res.windowHeight-50))/26)+dy)
      
       }


     
      if( dy >((res.windowHeight-50))+14){
          dy=0
      }
  },

 

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})