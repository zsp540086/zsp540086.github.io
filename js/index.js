$(function(){
    $('#content').fullpage({
        verticalCentered:false,
        resize:true,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        menu: '#menu',
    });
    setInterval(function(){
       $.fn.fullpage.moveSlideRight();
   }, 3000);
    //���ڿ��С��1024���ֹ�����
    $(window).resize(function(){
        autoScrolling();
    });
    function autoScrolling(){
        var widths = $(window).width();
        if(widths < 1024){
            $.fn.fullpage.setAutoScrolling(false);
        } else {
            $.fn.fullpage.setAutoScrolling(true);
        }
    }
    autoScrolling();

    //������
    var can1=$('.can1')[0];
    skillProgress(can1,90,200,200,90);
    var can2=$('.can2')[0];
    skillProgress(can2,85,200,200,90);
    var can3=$('.can3')[0];
    skillProgress(can3,80,200,200,90);
    var can4=$('.can4')[0];
    skillProgress(can4,80,200,200,90);
    var can1=$('.can5')[0];
    skillProgress(can1,90,200,200,90);
    var can2=$('.can6')[0];
    skillProgress(can2,85,200,200,90);
    var can3=$('.can7')[0];
    skillProgress(can3,80,200,200,90);
    var can4=$('.can8')[0];
    skillProgress(can4,80,200,200,90);
    function skillProgress(obj,num,w,h,r){
        var ctx=obj.getContext('2d');
        var num=num,n=0,t;
        ctx.lineWidth=10;
        ctx.strokeStyle='red';
        ctx.lineCap='round';
        ctx.font='bold 30px sans-serif';
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        t=setInterval(move,50);
        function move(){
            n++;
            if(n==num){
                clearInterval(t);
            }
            ctx.clearRect(0,0,w,h);
            ctx.beginPath();
            var deg=(n*360/100-90)*Math.PI/180;
            ctx.arc(w/2,h/2,r,-Math.PI/2,deg,false);
            ctx.stroke();
            ctx.fillText(`${n}%`,w/2,h/2);
        }
    }
    //��ϵ����
    window.requestAnimFrame = ( function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ) {
                window.setTimeout( callback, 1000 / 60 );
            };
    })();

    var can=$('.back-can')[0];
    var cxt=can.getContext('2d');
    var cw = can.clientWidth;
    var ch = can.clientHeight;


    can.width = cw;
    can.height = ch;
    var circles = [];//Բ�����Ӽ���
    var rects = [];//���������Ӽ���
    var  triangles = [];//���������Ӽ���
    var i = 0;
    var x = 0;
    var y = 0;
    //Բ�����Ӷ���
    function Circle(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        //�ٶȣ��ٶ�ֵ ����
        this.speed = Math.random()*0.5+0.1;
        this.direction = Math.random()*Math.PI*2;
    }
    //�ƶ�Բ������
    Circle.prototype.update = function(){
        this.x += Math.cos(this.direction)*this.speed;
        this.y += Math.sin(this.direction)*this.speed;
        if (this.x <= this.r)
        {
            this.x = this.r;
            this.direction = Math.PI - this.direction;
        }else if (this.x >= cw-this.r)
        {
            this.x = cw-this.r;
            this.direction = Math.PI - this.direction;
        }
        if (this.y <= this.r)
        {
            this.y = this.r;
            this.direction = this.direction-Math.PI/2;
        }else if (this.y >= ch-this.r)
        {
            this.y =  ch-this.r;
            this.direction = this.direction-Math.PI/2;
        }
    }
    //����Բ������
    var mark = false;
    var a = 0.4;
    var timer = null;
    var mark1 = false;
    function addA(){
        timer = setInterval(function(){
            if (a >= 1)
            {
                a = 1;
                clearInterval(timer);
            }else{
                a += 0.01;
            }
        },50);

    }
    Circle.prototype.draw = function(){
        cxt.beginPath();
        cxt.arc(this.x,this.y,this.r,0,360,false);
        cxt.closePath();
        cxt.fillStyle = "#ff6";
        if (mark)
        {
            if (mark1)
            {
                addA();mark1 = false;
            }
        }
        else if (this.x >= x-50 && this.x <= x+50 && this.y >= y-50 && this.y <= y+50 )
        {
            cxt.globalAlpha = 1;
        }else{
            cxt.globalAlpha = 0.4;
        }
        cxt.fill();
    }


    //���������Ӷ���
    function Rect(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //�����ε����������ʼֵ
        this.x0 = Math.random()*cw;
        this.y0 = Math.random()*ch;
        this.speed = Math.random()*0.5+0.1;
        this.direction = Math.random()*Math.PI*2;
        this.r = Math.sqrt(Math.pow(this.w/2,2)+Math.pow(this.h/2,2));
    }
    Rect.prototype.update = function(){
        this.x0 += Math.cos(this.direction)*this.speed;
        this.y0 += Math.sin(this.direction)*this.speed;
        if (this.x0 <= this.r)
        {
            this.x0 = this.r;
            this.direction = Math.PI - this.direction;
        }else if (this.x0 >= cw-this.r)
        {
            this.x0 = cw-this.r;
            this.direction = Math.PI - this.direction;
        }
        if (this.y0 <= this.r)
        {
            this.y0 = this.r;
            this.direction = this.direction - Math.PI;
        }else if (this.y0 >= ch-this.r)
        {
            this.y0 =  ch-this.r;
            this.direction = this.direction - Math.PI;
        }
    }
    //���Ƴ�����������
    Rect.prototype.draw = function(){
        cxt.save();
        cxt.translate(this.x0,this.y0);
        cxt.rotate(i*Math.PI/180);
        cxt.fillStyle = "#60c";
        if (this.x0 >= x-50 && this.x0 <= x+50&& this.y0 >= y-50&&this.y0 <= y+50 )
        {
            cxt.globalAlpha = 1;
        }else{
            cxt.globalAlpha = 0.4;
        }
        cxt.beginPath();
        cxt.fillRect(this.x,this.y,this.w,this.h);
        cxt.closePath();
        cxt.restore();
    }

    //���������Ӷ���
    function  Triangle(x1,y1,x2,y2,x3,y3){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        //�����ε���������
        this.x0 = Math.random()*cw;
        this.y0 = Math.random()*ch;
        this.speed = Math.random()*0.5+0.1;
        this.direction = Math.random()*Math.PI*2;
        this.angle = Math.random()*Math.PI;
        this.r = distance(this.x1,this.y1,this.x2,this.y2)/2/Math.cos(Math.PI/6);
    }
    //��ת����������
    Triangle.prototype.update = function(){
        this.x1 = this.x0 + Math.cos(this.angle)*this.r;
        this.y1 = this.y0 + Math.sin(this.angle)*this.r;
        this.x2 = this.x0 + Math.cos(this.angle+Math.PI*2/3)*this.r;
        this.y2 = this.y0 + Math.sin(this.angle+Math.PI*2/3)*this.r;
        this.x3 = this.x0 + Math.cos(this.angle+Math.PI*4/3)*this.r;
        this.y3 = this.y0 + Math.sin(this.angle+Math.PI*4/3)*this.r;
        this.angle += Math.PI/100;
        this.x0 += Math.cos(this.direction)*this.speed;
        this.y0 += Math.sin(this.direction)*this.speed;
        if (this.x0 <= this.r)
        {
            this.x0 = this.r;
            this.direction = Math.PI - this.direction;
        }else if (this.x0 >= cw-this.r)
        {
            this.x0 = cw-this.r;
            this.direction = Math.PI - this.direction;
        }
        if (this.y0 <= this.r)
        {
            this.y0 = this.r;
            this.direction = this.direction - Math.PI;
        }else if (this.y0 >= ch-this.r)
        {
            this.y0 =  ch-this.r;
            this.direction = this.direction - Math.PI;
        }
    }
    //��������������
    Triangle.prototype.draw = function(){
        cxt.beginPath();
        cxt.moveTo(this.x1,this.y1);
        cxt.lineTo(this.x2,this.y2);
        cxt.lineTo(this.x3,this.y3);
        cxt.closePath();
        if (this.x0 >= x-50&& this.x0 <= x+50&& this.y0 >= y-50&&this.y0 <= y+50 )
        {
            cxt.globalAlpha = 1;
        }else{
            cxt.globalAlpha = 0.4;
        }
        cxt.fillStyle = "#f40";
        cxt.fill();
    }
    //������Ӹ���
    function addParticles(){
        var counts = 100;
        while (counts--)
        {
            var w = Math.random()*cw;
            var h = Math.random()*ch;
            //���Բ�����Ӷ���
            circles.push(new Circle(w,h,5));
            rects.push(new Rect(5,-5,10,10));
            triangles.push(new Triangle(w,h,w+10,h,w+5,h-5*Math.tan(Math.PI/3)));
        }
    }

    //���ɶ�����㳤��
    function distance(sx,sy,tx,ty){
        var x = tx - sx, y = ty - sy;
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
    //�������λ��
    document.onmousemove = function(ev){
        var ev = ev || window.event;
        x = ev.pageX;
        y = ev.pageY;
    }
    function loop(){
        requestAnimFrame(loop);
        //��ʾ������Ƶ�Ԫ��
        i++;
        if (i>10000)
        {
            i = 0;
        }
        cxt.globalCompositeOperation = 'destination-out';
        cxt.fillStyle = 'rgba(0, 0, 0, 1)';
        //͸����
        cxt.globalAlpha = 1;
        cxt.fillRect( 0, 0, cw, ch );
        //��ʾ�ص�����
        cxt.globalCompositeOperation = 'lighter';
        cxt.globalAlpha = a;
        var n = circles.length;
        while (n--)
        {
            circles[n].draw();
            circles[n].update();
        }
        var n = rects.length;
        while (n--)
        {
            rects[n].draw();
            rects[n].update();
        }
        var n = triangles.length;
        while (n--)
        {
            triangles[n].draw();
            triangles[n].update();
        }
    }
    addParticles();
    loop();
    window.onresize = function(){
        cw = can.clientWidth;
        ch = can.clientHeight;
        can.width = cw;
        can.height = ch;
        circles.length = 0;
        rects.length = 0;
        triangles.length = 0;
        addParticles();
    }
})
