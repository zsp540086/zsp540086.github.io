'use strict';
$(function(){
	let topr=document.getElementsByClassName('topr');
	let toprLi=topr[0].getElementsByTagName('li');
	let toprBuy=topr[0].getElementsByClassName('buy');
	toprLi[3].onmouseover=function(){
		toprBuy[0].style.height='100px';
	}
	toprLi[3].onmouseout=function(){
		toprBuy[0].style.height=0; 
	}
	//导航
	let mnav=document.getElementsByClassName('mnav');
	let mnavLi=mnav[0].getElementsByTagName('li');
	let zspItem=mnav[0].getElementsByClassName('zsp-item');
	let zspBack=$('.zsp-back')[0];
	mnav[0].onmouseenter=function(){
		zspBack.style.height='230px';
	}
	mnav[0].onmouseleave=function(){
		zspBack.style.height=0;
	}
	for(let i=0;i<mnavLi.length;i++){
		mnavLi[i].onmouseover=function(){
			if(i==7||i==8){
				zspBack.style.transition='';
				zspBack.style.height=0;
			}
			zspItem[i].style.opacity='1';
			zspItem[i].style.visibility='visible';
		}
		mnavLi[i].onmouseout=function(){
			if(i==7||i==8){
				zspBack.style.transition='';
				zspBack.style.height=0;
			}
			zspItem[i].style.opacity='0';
			zspItem[i].style.visibility='hidden';
		}
	}
	//banner导航nav
	let lbanner=document.getElementsByClassName('lbanner');
	let lbannerLi=lbanner[0].getElementsByTagName('li');
	let item=lbanner[0].getElementsByClassName('item');
	for(let i=0;i<lbannerLi.length;i++){
		lbannerLi[i].onmouseover=function(){
			item[i].id='show';
		}
		lbannerLi[i].onmouseout=function(){
			item[i].id='hidden';
		}
	}
	// 轮播图1
	/*let banner=$('.banner')[0];
	let imgBox=$('.imgBox')[0];
	let imgBoxLi=$('li',imgBox);
	let hotbox=document.getElementsByClassName('hotbox');
	let hotboxLi=hotbox[0].getElementsByTagName('li');
	let index=0;
	let pause=setInterval(time,2000);
	let btnl=$('.btnl')[0];
	let btnr=$('.btnr')[0];
	console.log(btnl,btnr);*/
	//左右按钮点击
	/*btnl.onclick=function(){
		moveDown();
	}
	btnr.onclick=function(){
		time();
	}
	function moveDown(){
		index--;
		if(index<0){
			index=imgBoxLi.length-1;
		}
		for(let i=0;i<imgBoxLi.length;i++){
			imgBoxLi[i].style.display='none';
			hotboxLi[i].id='yanse1';
		}
		imgBoxLi[index].style.display='block';
		hotboxLi[index].id='yanse';

	}*/
	//鼠标移入停止自动轮播
	/*banner.onmouseover=function(){
		clearInterval(pause);
	}
	banner.onmouseout=function(){
		pause=setInterval(time,2000);
	}	*/
	// 图片自动轮播
	/*function time(){
		index++;
		if(index==imgBoxLi.length){
			index=0;
		}
		for(let i=0;i<imgBoxLi.length;i++){
			imgBoxLi[i].style.display='none';
			hotboxLi[i].id='yanse1';
		}
		imgBoxLi[index].style.display='block';
		hotboxLi[index].id='yanse';
	}*/
	//轮播点
	/*for(let i=0;i<hotboxLi.length;i++){
		hotboxLi[i].onclick=function(){
			for(let j=0;j<hotboxLi.length;j++){
				imgBoxLi[j].style.display='none';
				hotboxLi[j].id='yanse1';
			}
			imgBoxLi[i].style.display='block';
			hotboxLi[i].id='yanse';
			index=i;
		}
	}*/
	//轮播图2
	let banner=$('.banner');
	let imgBox=$('.imgBox')[0];
	let lis=$('li',imgBox);
	let width=parseInt(getComputedStyle(lis[0],null).width);
	let current=0,next=0,flag=true;
	let hotbox=$('.hotbox')[0];
	let hotLi=$('li',hotbox);
	var btnl=$('.btnl')[0];
	var btnr=$('.btnr')[0];
	let t=setInterval(move,2000);
	//鼠标移入、移出
	banner[0].onmouseover=function(){
		clearInterval(t);
	}
	banner[0].onmouseout=function(){
		t=setInterval(move,2000);
	}
	//点击轮播点
	/*for(var i=0;i<hotLi.length;i++){
		hotLi[i].index=i;
		hotLi[i].onclick=function(){
			hotLi[current].id='yanse1';
			this.id='yanse';
			if(this.index==current){
				return;
			}
			if(this.index>current){
				lis[this.index].style.left=width+'px';
				animate(lis[current],{left:-width});
				animate(lis[this.index],{left:0});
			}else if(this.index<current){
				lis[this.index].style.left=-width+'px';
				animate(lis[current],{left:width});
				animate(lis[this.index],{left:0});
			}
			current=next=this.index;
		}
	}*/
	//利用数组的forEac遍历
	// console.log(hotLi instanceof Array);
	Array.from(hotLi).forEach(function(value,index,obj){
		value.onclick=function(){
			hotLi[current].id='yanse1';
			this.id='yanse';
			if(current==index){
				return;
			}
			if(current<index){
				lis[index].style.left=width+'px';
				animate(lis[current],{left:-width});
				animate(lis[index],{left:0});
			}else if(current>index){
				lis[index].style.left=-width+'px';
				animate(lis[current],{left:width});
				animate(lis[index],{left:0});
			}
			current=next=index;
		}
	});
	//转化数组
	//法2：
	Array(0).forEach.call(hotLi,function(value,index,obj){
		// console.log(value);
	})
	//法1：
	Array.from(hotLi)
	//左右按钮
	btnl.onclick=function(){
		if(flag){
			flag=false;
			moveDown()
		}
	}
	btnr.onclick=function(){
		if(!flag){
			return;
		}
		flag=false;
		move();
	}
	//图片
	for(let i=0;i<lis.length;i++){
		if(i==0){
			continue;
		}
		lis[i].style.left=width+'px';
	}
	function move(){
		next++;
		if(next==lis.length){
			next=0;
		}
		hotLi[current].id='yanse1';
		lis[next].style.left=width+'px';
		hotLi[next].id='yanse';
		animate(lis[next],{left:0},function(){
			flag=true;
		});
		animate(lis[current],{left:-width});
		current=next;
	}
	function moveDown(){
		next--;
		if(next<0){
			next=lis.length-1;
		}
		hotLi[current].id='yanse1';
		lis[next].style.left=-width+'px';
		hotLi[next].id='yanse';
		animate(lis[next],{left:0},function(){
			flag=true;
		});
		animate(lis[current],{left:width});
		current=next;
	}
	//第三层
	let picture=document.getElementsByClassName('picture');
	for(let i=0;i<picture.length;i++){
		picture[i].onmouseenter=function(){
			picture[i].style.boxShadow='1px 1px 20px 1px #abc';
		}
		picture[i].onmouseleave=function(){
			picture[i].style.boxShadow='0px 0px 0px #fff';
		}
	}
	//为你推荐
	//小米明星单品  
	var bigBox=$('.bigbox');
	for(let i=0;i<2;i++){
		star(bigBox[i]);
	}
	//封装函数
	function star(obj){
		var tip1=$('.tip1',obj)[0];
		var btnL=$('.btnl',obj)[0];
		var btnR=$('.btnr',obj)[0];
		var star=$('.star',obj)[0];
		var flag2=true;
		let t1=setInterval(move3,3000);
		//放上去停止移动
		obj.onmouseenter=function(){
			clearInterval(t1);
		}
		obj.onmouseleave=function(){
			t1=setInterval(move3,3000);
		}
		//按钮
		btnL.onclick=function(){
			if(!flag2){
				return;
			}
			move3();
			flag2=false;
		}
		btnR.onclick=function(){
			if(!flag2){
				return;
			}
			moveR3();
			flag2=false;
		}
		function move3(){
			animate(star,{left:-1214},function(){
				for(let i=0;i<5;i++){
					let first=getFirst(star);
					star.appendChild(first);
					star.style.left=0;
				}
				flag2=true;
			});
		}
		function moveR3(){
			for(let i=0;i<5;i++){
				let last=getLast(star);
				let first=getFirst(star);
				star.insertBefore(last,first);
				star.style.left=-i*248+'px';
				animate(star,{left:0},function(){
					flag2=true;
				});
			}
		}
	}
	//搭配  配件  周边
	var dec=$('.dec');
	for(let i=0;i<3;i++){
		dapei(dec[i]);
	}
	function dapei(obj){
		var dapei=$('.dapei-tip',obj)[0];
		var zspHot1=$('.zsp-hot',obj);
		var box2=$('.box2',obj);
		var box22=$('.box22',obj);
		Array.from(zspHot1).forEach(function(value,index){
			value.onmouseenter=function(){
				for(let i=0;i<zspHot1.length;i++){
					box2[i].style.display='none';
					box22[i].style.display='none';
					zspHot1[i].style.color='';
					zspHot1[i].style.textDecoration='';
				}
				box2[index].style.display='block';
				this.style.textDecoration='underline';
				box22[index].style.display='block';
				this.style.color='orange';
			}
		});
	}
	//内容
	var imgBox1=$('.img-box');
	for(let i=0;i<imgBox1.length;i++){
		pic(imgBox1[i]);
	}
	function pic(obj){
		var pics=$('.p1',obj);
		var widths=parseInt(getStyle(pics[0],'width'));
		var buttons=$('a',obj);
		var btnL=$('.btn-left',obj)[0];
		var btnR=$('.btn-right',obj)[0];
		var next1=0,current1=0,flag3=true;
		for(let i=0;i<pics.length;i++){
			if(i==0){
				continue;
			}
			pics[i].style.left=widths+'px';
		}
		btnR.onclick=function(){
			if(!flag3){
				return;
			}
			fn1();
			flag3=false;
		}
		btnL.onclick=function(){
			if(!flag3){
				return;
			}
			fn();
			flag3=false;
		}
		function fn(){
			next1++;
			if(next1==pics.length){
				next1=0;
			}
			buttons[current1].id='';
			buttons[next1].id='zsp';
			pics[next1].style.left=widths+'px';
			animate(pics[next1],{left:0},function(){
				flag3=true;
			});
			animate(pics[current1],{left:-widths});
			current1=next1;
		}
		function fn1(){
			next1++;
			if(next1==pics.length){
				next1=0;
			}
			buttons[current1].id='';
			buttons[next1].id='zsp';
			pics[next1].style.left=-widths+'px';
			animate(pics[next1],{left:0},function(){
				flag3=true;
			});
			animate(pics[current1],{left:widths});
			current1=next1;
		}
		for(let i=0;i<buttons.length;i++){
			buttons[i].onclick=function(){
				buttons[current1].id='';
				this.id='zsp';
				if(current1==i){
					return;
				}
				pics[i].style.left=widths+'px';
				animate(pics[current1],{left:-widths});
				animate(pics[i],{left:0});
				current1=i;
			}
		}
	}
});