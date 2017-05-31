'use strict';
window.onload=function(){
	//我的淘宝、收藏夹、商家支持、网站导航
	let topr=document.getElementsByClassName('top-r')
	let taobao=document.getElementsByClassName('taobao');
	let item=topr[0].getElementsByClassName('item');
	let sanjiao=topr[0].getElementsByClassName('sanjiao');
	for(let i=0;i<taobao.length;i++){
		taobao[i].onmouseover=function(){
		item[i].style.display='block';
		sanjiao[i].style.transform='rotateZ(180deg)';
		}
	taobao[i].onmouseout=function(){
		item[i].style.display='none';
		sanjiao[i].style.transform='rotateZ(0deg)';
		}
	}
	//banner 猫头
	let text2=document.getElementsByClassName('text-2');
	let text2Li=text2[0].getElementsByTagName('li');
	let text2Img=text2[0].getElementsByTagName('img');
	for(let i=0;i<text2Li.length;i++){
		text2Li[i].onmouseover=function(){
			text2Img[i].style.display='block';
		}
		text2Li[i].onmouseout=function(){
			text2Img[i].style.display='none';
		}
	}
	//banner 导航
	let back=document.getElementsByClassName('back');
	let backLi=back[0].getElementsByClassName('li');
	let backItem=back[0].getElementsByClassName('item');
	for(var i=0;i<backLi.length;i++){
		backLi[i].zsp=i;
		backLi[i].onmouseover=function(){
			this.style.background='#fff';
			backItem[this.zsp].style.display='block';
		}
		backLi[i].onmouseout=function(){
			this.style.background='#EEE5E7';
			backItem[this.zsp].style.display='none';
		}
	}
	// banner 右边
	/*let imgBox1=document.getElementsByClassName('imgbox1');
	imgBox1[0].onmouseover=function(){
		this.style.background='#fff';
	}
	imgBox1[0].onmouseout=function(){
		this.style.background='transparent';
	}
	let imgBox2=document.getElementsByClassName('imgbox2');
	imgBox2[0].onmouseover=function(){
		this.style.background='#fff';
	}
	imgBox2[0].onmouseout=function(){
		this.style.background='transparent';
	}*/
	//第一层
	let floor1=document.querySelectorAll('.floor1 .ssfloor1');
	let floor1Shadow=document.querySelectorAll('.floor1 .ssfloor1 .ssfloor1-s');
	for(let i=0;i<floor1.length-1;i++){
		floor1[i].onmouseover=function(){
			floor1Shadow[i].id='show';
		}
		floor1[i].onmouseout=function(){
			floor1Shadow[i].id='hiddden';
		}
	}
	//最后一个 换一批
	// let lastFloor1=document.querySelector('.floor1 .ssfloor1 .icon-xuanzhuan2');
	// floor1[23].onmouseover=function(){
	// 	lastFloor1.style.color='#fff';
	// 	lastFloor1.style.transform='rotateZ(180deg)';
	// }
	// console.log(floor1[23],lastFloor1);
	//轮播图
	let imgBox=$('.imgBox');
	let yuandian=$('.yuandian');
	let yuandianLi=$('li',yuandian[0]);
	let imgBoxLi=$('li',imgBox[0]);
	let banner1=$('.banner1')[0];
	let index=0;
	let pause=setInterval(time,2000);
	//鼠标移入
	banner1.onmouseenter=function(){
		clearInterval(pause);
	}
	banner1.onmouseleave=function(){
		pause=setInterval(time,2000);
	}
	//按钮
	for(let i=0;i<yuandianLi.length;i++){
		yuandianLi[i].onmouseenter=function(){
			for(let j=0;j<yuandianLi.length;j++){
				imgBoxLi[j].style.displpay='none';
				yuandianLi[j].id='';
			}
			imgBoxLi[i].style.display='block';
			this.id='hot';
			index=i;
		}
	}
	//自动轮播
	function time(){
		index++;
		if(index==imgBoxLi.length){
			index=0;
		}
		for(let i=0;i<imgBoxLi.length;i++){
			imgBoxLi[i].style.display='none';
			yuandianLi[i].id=' ';
		}
		imgBoxLi[index].style.display='block';
		yuandianLi[index].id='hot';
	}
	//按需加载
	var win=window.innerHeight;//窗口高度
	var floor4=document.querySelectorAll('.floor4');
	var leftAside=document.querySelector('.left-aside');//侧边栏
	var lis=document.querySelectorAll('.left-aside ul #floor');
	console.log(lis);
	var floor11=document.querySelector('.floor1');
	var top1=floor11.offsetTop;//第一层的top
	var dhShow=document.querySelector('#dh-show');
	var fanhui=document.querySelector('#fanhui');
	var floor14=document.querySelectorAll('.floor14');
	var like=document.querySelector('#floor14');
	console.log(floor14,like);//猜你喜欢楼层
	var arr=[],tops,flag=true,flag1=true,arr1=[];
	floor4.forEach(function(value,index){
		arr.push(value.offsetTop);
	});
	// 遍历floor14
	floor14.forEach(function(value,index){
		arr1.push(value.offsetTop);
	});
	console.log(arr,arr1);
	window.onscroll=function(){
		if(!flag){
			return;
		}
		//获取 滚动距离
		tops=document.body.scrollTop;
		//侧边栏隐藏
		leftAside.style.display='none';
		//侧边栏显示
		if(win+tops>top1+200){
			dhShow.style.background='red';
			leftAside.style.display='block';
		}
		//楼层显示 floor4
		arr.forEach(function(value,index){
			if(tops+win>value+100){
				let floors=document.getElementsByClassName('floor4');
				let imgs=floors[index].getElementsByTagName('img');
				for(let i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].title;
				}
				for(let j=0;j<lis.length;j++){
					lis[j].style.background='';
				}
				lis[index].style.background='#EA5F8D';
			}
		});
		//楼层显示 猜你喜欢 部分
		like.style.background='';
		arr1.forEach(function(value,index){
			if(tops+win>value+100){
				let floors1=document.getElementsByClassName('floor14');
				let imgs1=floors1[index].getElementsByTagName('img');
				for(let i=0;i<imgs1.length;i++){
					imgs1[i].src=imgs1[i].title;
				}
				like.style.background='black';
				lis[5].style.background='';
			}
		});
		//顶部搜索框显示
		let zspSearch=document.querySelector('.zsp-search');
		if(tops>=500){
			if(flag1){
				flag1=false;
				animate(zspSearch,{top:0});
			}
		}else if(tops<500){
			if(!flag1){
				flag1=true;
				animate(zspSearch,{top:-100});
			}
		}
		//右边返回顶部
		if(tops>0){
			fanhui.style.display='block';
		}else{
			fanhui.style.display='none';
		}
	}
	//左侧边栏点击事件
	let n=0;
	for(let i=0;i<lis.length;i++){
		lis[i].onclick=function(){
			//不让楼层显示中的按钮变颜色
			flag=false;
			lis[n].style.background='';
			//让对应的楼层显示，加入动画
			animate(document.body,{scrollTop:floor4[i-1].offsetTop+450},function(){flag=true;});
			lis[i].style.background='#EA5F8D';
			n=i;
		}
	}
	//点击喜欢，让猜你喜欢楼层显示
	lis[5].style.background='block';
	like.onclick=function(){
		let fl=document.querySelector('.floor14');
		animate(document.body,{scrollTop:fl.offsetTop-300},function(){
			lis[5].style.background='';
		});
	}
}
