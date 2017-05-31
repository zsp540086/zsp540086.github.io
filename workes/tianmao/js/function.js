'use strict';
function $(selector,ranger=document){
	let type=typeof selector;
	if(type=='string'){
		//获取
		let select=selector.trim();
		let slice=select.substring(1);
		let firstChar=select.charAt(0);
			if(firstChar=='.'){
				return ranger.getElementsByClassName(slice);
			}else if(firstChar=='#'){
				return document.getElementById(slice);
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
				return ranger.getElementsByTagName(select);
			}
		}else if(type=='function'){
		//添加
		window.onload=function(){
			selector();//把一个函数的指针作为另一个函数的参数
		}
	}
}
function getStyle(obj,attr){
	console.log(obj,attr);
	if(window.getComputedStyle){
		console.log(1);
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
function xiuGai(obj,content){
	console.log(obj,content);
	if(content){
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}
