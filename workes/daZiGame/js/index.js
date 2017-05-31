/**
 * Created by Administrator on 2017/5/11.
 */
$(function(){
    var easy=$('.easy')[0];
    var middle=$('.middle')[0];
    var top=$('.top')[0];
    var close=$('.close')[0];
    var music=$('.music')[0];
    var start=$('.start')[0];
    var set=$('.set1')[0];
    document.body.onclick=function(e){
        let btn=e.target;
        if(btn==easy){
            btn.style.opacity=0.8;
        }
    }
})