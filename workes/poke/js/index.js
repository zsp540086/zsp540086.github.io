$(document).ready(function(){
    var poke=[];
    //红桃 heart,方块 diamond,黑桃 spade,club 梅花；
    var color=['h','d','s','c'];
    var biao={};
    for(var i=0;i<52;i++){
        var yanse=color[Math.floor(Math.random()*4)];
        var shuzi=Math.floor(Math.random()*13+1);
        while(biao[yanse+"_"+shuzi]){
            yanse=color[Math.floor(Math.random()*4)];
            shuzi=Math.floor(Math.random()*13+1);
        }
        biao[yanse+"_"+shuzi]=true;
        poke.push({yanse,shuzi});
    }
    //发牌
    var table=$('.table');
    var index=0;
    for(var i=0;i<=6;i++){
        for(var j=0;j<=i;j++){
            var item=poke[index];
            index++;
            //url('images/s1.png')
            var src="url(images/"+item.yanse+item.shuzi+".png)";
            $('<div>')
                .addClass('poke')
                .prop('id',`${i}_${j}`)
                .data('num',`${item.shuzi}`)
                .html(`${item.shuzi}`)
                .css('backgroundImage',src)
                .delay(index*40)
                .animate({left:300-50*i+100*j,top:60*i,opacity:1})
                .appendTo(table);
        }
    }
    for(;index<poke.length;index++){
        var item=poke[index];
        var src="url(images/"+item.yanse+item.shuzi+".png)";
        $('<div>')
            .addClass('poke zuo')
            .data('num',`${item.shuzi}`)
            .css('backgroundImage',src)
            .delay(index*40)
            .animate({left:100,top:500,opacity:1})
            .appendTo(table);
    }
    //操作poke  声明一个数字 存储纸牌的数字
    var first=null;
    $('.poke').click(function(){
        var coordinate=$(this).prop('id').split('_');
        //按照坐标找对应元素  id查找  `#&{parseInt(coordinate[0])+1}_${parseInt(coordinate[1])}`
        var ele=$(`#${parseInt(coordinate[0])+1}_${parseInt(coordinate[1])}`);
        var ele1=$(`#${parseInt(coordinate[0])+1}_${parseInt(coordinate[1])+1}`);
        if(ele.length==1||ele1.length==1){
            return;
        }
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $(this).animate({top:'-=20'});
        }else{
            $(this).animate({top:'+=20'});
        }
        if(!first){
            first=this;
            if(parseInt($(first).data('num'))==13){
                $('.active').delay(300).animate({left:600,top:0},function(){
                    $(this).remove();
                    first=null;
                })
            }
        }else{
            var sum=parseInt($(first).data('num'))+parseInt($(this).data('num'));
            if(sum==13){
                $('.active').delay(300).animate({left:600,top:0},function(){
                    $(this).remove();
                })
            }else{
                $('.active').removeClass('active').animate({top:'+=20'});
            }
            first=null;
        }
    })
    //操作下面左边的纸牌
    var z=0
    $('.right').click(function(){
        z++;
        $('.zuo:last')
            .css('zIndex',z)
            .animate({left:'+=400'})
            .addClass('you')
            .removeClass('zuo')
    })
    $('.left').on('click',function(){
        var you=$('.you');
        for(var i=you.length-1;i>=0;i--){
            $(you[i])
                .delay(200*i)
                .animate({left:'-=400'},function(){
                    $(this).css('zIndex',0);
                })
                .addClass('zuo')
                .removeClass('you')
        }
    })
})