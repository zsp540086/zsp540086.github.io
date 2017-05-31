/**
 * Created by Administrator on 2017/5/18.
 */
window.onload=function(){
    //获取画布
    var canvas=document.querySelector('canvas'),
        ctx=canvas.getContext('2d'),
        shadow=document.querySelector('.shadow'),
        //获取直线
        line=document.querySelector('.line'),
        //获取铅笔
        pencil=document.querySelector('.pencil'),
        //获取多边形
        poly=document.querySelector('.poly'),
        //获取矩形
        rect=document.querySelector('.rect'),
        //获取圆角矩形
        rectangle=document.querySelector('.rectangle'),
        //获取圆
        circle=document.querySelector('.circle'),
        //获取虚线
        dashed=document.querySelector('.dashed'),
        //获取三角
        triangle=document.querySelector('.triangle'),
        //五角星
        star=document.querySelector('.star'),
        //获取填充
        fill=document.querySelector('.fill'),
        fillColor=document.querySelector('.fill-color'),
        //获取描边
        stroke=document.querySelector('.stroke'),
        strokeColor=document.querySelector('.stroke-color'),
        //获取线宽
        lineWidth=document.querySelector('.line-width'),
        //获取橡皮 文字 裁剪
        eraser=document.querySelector('.eraser'),
        eraserBtn=document.querySelector('.eraser-button'),
        text=document.querySelector('.text'),
        cut=document.querySelector('.cut'),
        cutBox=document.querySelector('.cut-box'),
        //获取 新建 保存 撤销  下载 插入图片 放大镜 全屏
        built=document.querySelector('.new'),
        save=document.querySelector('.save'),
        cancel=document.querySelector('.cancel'),
        download=document.querySelector('.download'),
        insert=document.querySelector('.insert'),
        //large=document.querySelector('.large'),
        //screen=document.querySelector('.screen'),
        file=document.querySelector('.file'),
        saveData=document.querySelector('.save-data'),
        //获取所有li
        lis=document.querySelectorAll('li');
//******************************************工具栏****************************************************************//
    //实例化画板
    var palette=new Palette(canvas,ctx,shadow);
    //画直线
    line.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('line');
    }
    //铅笔
    pencil.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.pencil();
    }
    //多边形
    poly.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('poly');
    }
    //距形
    rect.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('rect');
    }
    //圆角距形
    rectangle.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('rectangle');
    }
    //圆形
    circle.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('circle');
    }
    //虚线
    dashed.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('dashed');
    }
    //三角形
    triangle.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('triangle');
    }
    star.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.draw('star');
    }
//******************************************操作区 橡皮 文字 裁剪**************************************//
    eraser.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        var value=prompt('请输入橡皮的大小',40);
        eraserBtn.style.width=value+'px';
        eraserBtn.style.height=value+'px';
        palette.eraser(eraserBtn,value,value);
    }
    text.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.text();
    }
    cut.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.cut(cutBox);
    }
//******************************************操作区  填充  描边 颜色   线宽********************************//
    fill.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.stroke='fill';
    }
    fillColor.onchange=function(){
        palette.fillStyle=fillColor.value;
    }
    stroke.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        palette.stroke='stroke';
    }
    strokeColor.onchange=function(){
        palette.strokeStyle=strokeColor.value;
    }
    lineWidth.onclick=function(){
        for(var i=0;i<lis.length;i++){
            lis[i].id='';
        }
        this.id='hot';
        var width=prompt('请设置线宽',2);
        palette.lineWidth=width;
    }
//******************************************功能区 新建 保存 返回 下载**************************************//
    built.onclick=function(){
        var width=prompt('请输入画板大小',600);
        canvas.width=width;
        canvas.height=width;
        palette.built();
    }
    cancel.onclick=function(){
        palette.cancel();
    }
    document.body.onkeydown=function(e){
        if(e.ctrlKey&&e.keyCode==90){
            palette.cancel();
        }
    }
    //引入图片
    insert.onclick=function(){
        file.style.display='block';
        file.onchange=function(){
            var files=this.files[0];
            palette.insert(files);
        }
    }
    //保存
    save.onclick=function(){
        var result=confirm('是否保存');
        if(result){
            //保存
            palette.save(saveData);
        }else{
            //不保存
        }
    }
    //下载
    download.onclick=function(){
        palette.download();
    }
}