/**
 * Created by Administrator on 2017/5/10.
 */
function Game(){
    this.charArr=[
        ['A','images/1.png'],
        ['B','images/2.png'],
        ['C','images/3.png'],
        ['D','images/4.png'],
        ['E','images/5.png'],
        ['F','images/6.png'],
        ['G','images/7.png'],
        ['H','images/8.png'],
        ['I','images/9.png'],
        ['J','images/10.png'],
        ['K','images/11.png'],
        ['L','images/12.png'],
        ['M','images/13.png'],
        ['N','images/14.png'],
        ['O','images/15.png'],
        ['P','images/16.png'],
        ['Q','images/17.png'],
        ['R','images/18.png'],
        ['S','images/19.png'],
        ['T','images/20.png'],
        ['U','images/21.png'],
        ['V','images/22.png'],
        ['W','images/23.png'],
        ['X','images/24.png'],
        ['Y','images/25.png'],
        ['Z','images/26.png']
    ];
    this.charLen=5;
    this.cw=window.innerWidth;
    this.position=[];
    this.colorArr=['1','3','4','5,','6','7','8','9','a','c','d','b','e'];
    this.eleArr=[];
    this.speed=10;
    this.time=500;
    this.scores=0;
    this.passes=1;
    this.num=10;
    this.lifes=10;
    this.guanQia=10;
    this.score=document.querySelector('.score>span');
    this.pass=document.querySelector('.pass>span');
    this.life=document.querySelector('.sm');
    console.log(this.pass,this.life)
}
Game.prototype={
    /*getChar:function(){
        let arr=[];
        for(let i=65;i<91;i++){
            arr.push(String.fromCharCode(i));
        }
        return arr;
    },*/
    start:function(){
        this.getEles(this.charLen);
        this.drop();
        this.key();
    },
    checkRepeat:function(index){
        return this.eleArr.some(function(value){
            return value.innerText==index;
        });
    },
    getEles:function(len){
        for(let i=0;i<len;i++){
            let index=Math.floor(Math.random()*this.charArr.length);
            //查重
            while(this.checkRepeat(this.charArr[index][0])){
                index=Math.floor(Math.random()*this.charArr.length);
            }
            let ele=document.createElement('div');
            let lefts,tops;
            ele.innerText= this.charArr[index][0];
            ele.style.cssText=`
                width:50px;height:50px;background:#fff;background-image:url(${this.charArr[index][1]});
                background-size:contain;background-repeat:no-repeat;background-position:center;position:absolute;
                left:0px;top:0px;font-size:0px
            `;
            ele.style.color=this.getColor();
            do {
                lefts = Math.random() * (this.cw - 400) + 200;
                tops = Math.random() * 50;
            }while(this.getPos(lefts,tops));
            this.position.push({lefts,tops});
            ele.style.left=lefts+'px';
            ele.style.top=tops+'px';
            document.body.appendChild(ele);
            this.eleArr.push(ele);
        }
    },
    getPos:function(l,t){
        return this.position.some(function (value, index) {
            //条件为真，进行循环
            return l + 50 > value.lefts && l < value.lefts + 50 && t + 50 > value.tops && t < value.tops + 50;
        });
    },
    getColor:function(){
        let col='#';
        for(let i=0;i<3;i++){
            let num=Math.floor(Math.random()*this.colorArr.length);
            col+=this.colorArr[num];
        }
        return col;
    },
    drop:function(){
        let that=this;
        that.t=setInterval(function(){
            for(let i=0;i<that.eleArr.length;i++){
                let tops=that.eleArr[i].offsetTop+that.speed;
                that.eleArr[i].style.top=tops+'px';
                if(tops>500){
                    document.body.removeChild(that.eleArr[i]);
                    //生命减少
                    that.lifes--;
                    that.life.style.width=that.lifes/that.guanQia*100+'%';
                    that.eleArr.splice(i,1);
                    that.position.splice(i,1);
                    that.getEles(1);
                    if(that.lifes<=0){
                        //重新开始还是取消游戏？
                        let flag=window.confirm('是否重新开始游戏？');
                        if(flag){
                            that.restart();
                        }else{
                            close();
                        }
                    }
                }
            }
        },that.time);
    },
    key:function(){
        document.body.onkeydown=function(e){
            let code=String.fromCharCode(e.keyCode);
            this.eleArr.forEach(function(value,index){
                if(code==value.innerText){
                    document.body.removeChild(value);
                    this.eleArr.splice(index,1);
                    this.position.splice(index,1);
                    this.scores++;
                    this.getEles(1);
                    this.score.innerText=this.scores;
                    if(this.scores>=this.num){
                        //进入下一关
                        this.next();
                    }
                }
            }.bind(this))
        }.bind(this)
    },
    restart:function(){
        //暂停下移
        clearInterval(this.t);
        //清除页面元素
         for(let i=0;i<this.eleArr.length;i++){
            document.body.removeChild(this.eleArr[i]);
        }
        //清空数组
        this.eleArr=[];
        this.position=[];
        //重置所有初始值
        this.life.style.width='100%';
        this.scores=0;
        this.num=10;
        this.charLen=5;
        this.score.innerText=this.scores;
        this.passes=1;
        this.pass.innerText=this.passes;
        //从新开始
        this.start();
    },
    next:function(){
        clearInterval(this.t);
        this.eleArr.forEach(function(value){
            document.body.removeChild(value);
        });
        this.eleArr=[];
        this.position=[];
        //设置初始值
        this.charLen++;
        this.speed++;
        this.time+=10;
        this.passes++;
        this.num+=10;
        this.pass.innerText=this.passes;
        this.life.style.width='100%';
        //开始
        this.start();
    }
}