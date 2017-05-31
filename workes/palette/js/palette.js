function Palette(obj,ctx,shadow){
    //画布  环境  宽度  高度
    this.obj=obj;
    this.shadow=shadow;
    this.ctx=ctx;
    this.width=obj.width;
    this.height=obj.height;
    //描边 还是 填充
    this.stroke='stroke';
    //线宽度 颜色
    this.lineWidth=1;
    this.strokeStyle='#000';
    this.fillStyle='#000';
    //历史记录 数组
    this.history=[];
    //多边形边数
    this.bianshu=5;
    //圆角矩形圆角半径
    this.radius=5;
    //字体
    this.font='20px sans-serif';
    this.textAlign='center';
    this.textBaseline='middle';
}
Palette.prototype={
    init:function(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.strokeStyle=this.strokeStyle;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.setLineDash([0,0]);
    },
    line:function(sx,sy,ex,ey){
        this.ctx.beginPath();
        this.ctx.moveTo(sx,sy);
        this.ctx.lineTo(ex,ey);
        this.ctx.closePath();
        this.ctx.stroke();
    },
    pencil:function(){
        var that=this;
        that.shadow.onmousedown=function(e){
            var sx=e.offsetX,sy=e.offsetY;
            that.init();
            that.ctx.clearRect(0,0,that.width,that.height);
            if(that.history.length>0){
                that.ctx.putImageData(that.history[that.history.length-1],0,0);
            }
            that.ctx.beginPath();
            that.shadow.onmousemove=function(e){
                var ex=e.offsetX,ey=e.offsetY;
                that.ctx.lineTo(ex,ey);
                that.ctx.stroke();
            }
            that.shadow.onmouseup=function(){
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.shadow.onmousemove=null;
                that.shadow.onmouseup=null;
            }
        }
    },
    poly:function(sx,sy,ex,ey){
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        var angle=(360/this.bianshu)*Math.PI/180;
        this.ctx.beginPath();
        for(var i=0;i<this.bianshu;i++){
            this.ctx.lineTo(sx+Math.cos(angle*i)*r,sy+Math.sin(angle*i)*r);
        }
        this.ctx.closePath();
        this.ctx[this.stroke]();
    },
    star:function(sx,sy,ex,ey){
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        var r1=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy))/3;
        var angle=(180/this.bianshu)*Math.PI/180;
        this.ctx.beginPath();
        for(var i=0;i<this.bianshu*2;i++){
            if(i%2==0){
                this.ctx.lineTo(sx+Math.cos(angle*i)*r,sy+Math.sin(angle*i)*r);
            }else{
                this.ctx.lineTo(sx+Math.cos(angle*i)*r1,sy+Math.sin(angle*i)*r1);
            }
        }
        this.ctx.closePath();
        this.ctx[this.stroke]();
    },
    rect:function(sx,sy,ex,ey){
        this.ctx.beginPath();
        this.ctx.moveTo(sx,sy);
        this.ctx.rect(sx,sy,Math.abs(ex-sx),Math.abs(ey-sy));
        this.ctx[this.stroke]();
    },
    circle:function(sx,sy,ex,ey){
        this.ctx.beginPath();
        this.ctx.arc(sx,sy,Math.abs(ex-sx),0,Math.PI*2,false);
        this.ctx[this.stroke]();
    },
    dashed:function(sx,sy,ex,ey){
        this.ctx.beginPath();
        this.ctx.moveTo(sx,sy);
        this.ctx.lineTo(ex,ey);
        this.ctx.setLineDash([5,4]);//会影响其他设置
        this.ctx[this.stroke]();
    },
    triangle:function(sx,sy,ex,ey){
        var r=Math.sqrt((ex-sx)*(ex-sx)+(ey-sy)*(ey-sy));
        var angle=(360/3)*Math.PI/180;
        this.ctx.beginPath();
        for(var i=0;i<3;i++){
            this.ctx.lineTo(sx+Math.cos(angle*i)*r,sy+Math.sin(angle*i)*r);
        }
        this.ctx.closePath();
        this.ctx[this.stroke]();
    },
    rectangle:function(sx,sy,ex,ey){
        this.ctx.beginPath();
        this.ctx.moveTo(sx+this.radius,sy);
        this.ctx.lineTo(ex-this.radius,sy);
        this.ctx.quadraticCurveTo(ex,sy,ex,sy+this.radius);
        this.ctx.lineTo(ex,ey-this.radius);
        this.ctx.quadraticCurveTo(ex,ey,ex-this.radius,ey);
        this.ctx.lineTo(sx+this.radius,ey);
        this.ctx.quadraticCurveTo(sx,ey,sx,ey-this.radius);
        this.ctx.lineTo(sx,sy+this.radius);
        this.ctx.quadraticCurveTo(sx,sy,sx+this.radius,sy);
        this.ctx.closePath();
        this.ctx[this.stroke]();
    },
    //精简代码  将公共部分整合  直线  多边形 矩形  圆 虚线  三角 圆角矩形
    draw:function(type){
        var that=this;
        that.shadow.onmousedown=function(e){
            var sx=e.offsetX,sy=e.offsetY;
            that.shadow.onmousemove=function(e){
                var ex=e.offsetX,ey=e.offsetY;
                that.init();
                /*var x=ex>sx?sx:ex;
                var y=ey>sy?sy:ey;*/
                that.ctx.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                //根据类型调用各个方法
                that[type](sx,sy,ex,ey);
            }
            that.shadow.onmouseup=function(){
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.shadow.onmousemove=null;
                that.shadow.onmouseup=null;
            }
        }
    },
    cancel:function(){
        if(this.history.length==0){
            return;
        }
        var last=this.history.pop();
        this.ctx.putImageData(last,0,0);
    },
    insert:function(obj,pos1=20,pos2=20,width=200,height=200){
        let that=this;
        var reader=new FileReader();
        reader.readAsDataURL(obj);
        reader.onload=function(){
            var img=new Image();
            img.src=reader.result;
            img.onload=function(){
                that.ctx.drawImage(img,pos1,pos2,width,height);
            }
        }
    },
    save:function(value){
        var data=this.obj.toDataURL('images/png');
        value.src=data;
    },
    eraser:function(eraserBtn,w,h){
        var that=this;
        that.shadow.onmousedown=function(){
            that.shadow.onmousemove=function(e){
                eraserBtn.style.display='block';
                var ex=e.offsetX-w/2,ey=e.offsetY-h/2;
                if(ex>=that.obj.width-w){
                    ex=that.obj.width-w;
                }
                if(ex<=0){
                    ex=0;
                }
                if(ey>=that.obj.height-h){
                    ey=that.obj.height-h;
                }
                if(ey<=0){
                    ey=0;
                }
                eraserBtn.style.left=ex+'px';
                eraserBtn.style.top=ey+'px';
                that.ctx.clearRect(ex,ey,w,h);
            }
            that.shadow.onmouseup=function(){
                eraserBtn.style.display='none';
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.shadow.onmousemove=null;
                that.shadow.onmouseup=null;
            }
        }
    },
    text:function(){
        let that=this;
        that.shadow.onmousedown=function(e){
            var lefts=e.offsetX,tops=e.offsetY;
            var div=document.createElement('p');
            div.style.cssText=`
                width:100px;min-height:20px;border:1px dashed #000;position:absolute;top:${tops}px;left:${lefts}px
            `;
            div.contentEditable=true;
            that.shadow.appendChild(div);
            that.ele=div;
            that.shadow.onmousedown=null;
            //对文字进行拖拽
            /*that.ele.onmousedown=function(){
                that.ele.onmousemove=function(e){
                    var ex=e.offsetX,ey=e.offsetY;
                    var sx=that.shadow.offsetWidth,sy=that.shadow.offsetTop;
                    var lefts=ex-sx,tops=ey-sy;
                    that.ele.style.left=lefts+'px';
                    that.ele.style.top=tops+'px';
                }
                that.ele.onmouseup=function(){
                    that.ele.onmouseup=null;
                    that.ele.onmousemove=null;
                }
            }*/
            //失去焦点
            that.ele.onblur=function(){
                that.ctx.font=that.font;
                that.ctx.textAlign=that.textAlign;
                that.ctx.textBaseline=that.textBaseline;
                //??????文字的位置不对
                that.ctx.fillText(that.ele.innerText,lefts,tops);
                this.parentNode.removeChild(this);
                that.ele=null;
            }
        }
    },
    cut:function(cutBox){
        let that=this;
        that.shadow.onmousedown=function(e){
            var sx=e.offsetX,sy=e.offsetY;
            var minx,miny,w,h;
            that.shadow.onmousemove=function(e){
                var ex=e.offsetX,ey=e.offsetY;
                //保证正反向都可以
                minx=ex>sx?sx:ex;
                miny=ey>sy?sy:ey;
                w=Math.abs(ex-sx);
                h=Math.abs(ey-sy);
                cutBox.style.cssText=`
                    width:${w}px;height:${h}px;left:${minx}px;top:${miny}px
                `;
            }
            that.shadow.onmouseup=function(){
                that.shadow.onmousemove=null;
                that.shadow.onmouseup=null;
                that.data=that.ctx.getImageData(minx,miny,w,h);//裁去指定区域大小
                that.ctx.clearRect(minx,miny,w,h);//清空指定区域大小
                that.history.push(that.ctx.getImageData(0,0,that.width,that.height));
                that.ctx.putImageData(that.data,minx,miny);//放回原位进行拖拽
                //调用拖拽函数
                that.drag(minx,miny,w,h,cutBox);
            }
        }
    },
    drag:function(x,y,w,h,cutBox){
        var that=this;
        that.shadow.onmousemove=function(e){
            var sx=e.offsetX,sy=e.offsetY;
                if(sx>x&&sx<x+w&&sy>y&&sy<y+h){
                    that.shadow.style.cursor='move';
                }else{
                    that.shadow.style.cursor='default';
                    return;
                }
        }
        that.shadow.onmousedown=function(e){
            var sX=e.offsetX,sY=e.offsetY;
            var X=sX-x,Y=sY-y;//鼠标点下去的位置距离裁剪框cutBox的位置
            if(sX>x&&sX<x+w&&sY>y&&sY<y+h){
                that.shadow.style.cursor='move';
            }else{
                that.shadow.style.cursor='default';
                return;
            }
            that.shadow.onmousemove=function(e){
                that.ctx.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                var ex=e.offsetX,ey=e.offsetY;
                var lefts=ex-X,tops=ey-Y;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>=that.width-w){
                    lefts=that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>=that.height-h){
                    tops=that.height-h;
                }
                cutBox.style.left=lefts+'px';
                cutBox.style.top=tops+'px';
                //裁剪框移动了  图片还在原位  接下来移动图片
                x=lefts;
                y=tops;
                that.ctx.putImageData(that.data,x,y);
            }
            that.shadow.onmouseup=function(){
                that.shadow.onmousemove=null;
                that.shadow.onmouseup=null;
                that.drag(x,y,w,h,cutBox);
            }
        }
    },
    built:function(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.history=[];
    },
    download:function(){
        var data=this.obj.toDataURL('images/png').replace('data:images/png','data:stream/octet');
        location.href=data;
    }
}
