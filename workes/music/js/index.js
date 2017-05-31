$(function(){
    var pre=$('.icon-tushujiemianshangyiqu40')[0],
        play=$('.icon-zanting')[0],
        next=$('.icon-tushujiemianxiayiqu40')[0],
        volume=$('.icon-yinliang')[0],
        begin=$('.left')[0],
        allTime=$('.right')[0],
        move=$('.move')[0],
        audio=$('audio')[0],
        songName=$('.song')[0],
        author=$('.author')[0],
        lyrics=$('.lyrics')[0],
        img=$('img')[0],
        infor=$('.infor')[0],
        infor1=$('.infor1')[0],
        volumePress=$('.volume-press')[0],
        volumeBtn=$('.volume-btn')[0],
        volumeBox=$('.volume')[0],
        control=$('.control')[0],
        like=$('.icon-xin'),
        index=0,i=0,m=0;
    //***********************************************************************************//
    play.onclick=function(){
        if(audio.paused){
            audio.play();
            this.classList.toggle('icon-zanting1');
        }else{
            audio.pause();
            this.classList.toggle('icon-zanting1');
        }
    }
    //***********************************************************************************//
    pre.onclick=function(){
        if(index<0){
            index=database.length;
        }
        index--;
        render(database[index]);
        audio.play();
        play.classList.add('icon-zanting1');
    }
    //*************************************************************************************//
    next.onclick=function(){
        index++;
        if(index>database.length){
            index=0;
        }
        render(database[index]);
        audio.play();
        play.classList.add('icon-zanting1');
    }
    render(database[index]);
    //id: "0", songs: "阴天", name: "莫文蔚", src: "music/阴天.mp3",
    // alltime:"04:02", photo: "images/mww.jpg", lyrics:[]
    //****************************************************************************************//
    function render(obj){
        let string='';
        songName.innerText=obj.songs;
        author.innerText=obj.name;
        infor.innerText=`歌名:${obj.songs}`;
        infor1.innerText=`歌手:${obj.name}`;
        audio.src=obj.src;
        img.src=obj.photo;
        allTime.innerText=obj.alltime;
        obj.lyrics.forEach(function(value){
            string+=`
                <li>${value.lyric}</li>
            `;
        })
        lyrics.innerHTML='';
        lyrics.innerHTML=string;
    }
    //*****************************************************************************************//
    audio.ontimeupdate=function(){
        //显示时间
        var cTime=Time(audio.currentTime);
        begin.innerText=cTime;
        //进度条
        var widths=(audio.currentTime/audio.duration)*100+'%';
        move.style.width=widths;
        //歌词对应显示
        let string='';
        database[index]['lyrics'].forEach(function(value,count){
            if(cTime==value.time){
                m=i=count;
            }
        })
        if(m<3){
            m=0;
        }else{
            i=m-3;
        }
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==m){
                string+=`
                <li id="hot">${database[index]['lyrics'][j].lyric}</li>
            `;
            }else{
                string+=`
                <li>${database[index]['lyrics'][j].lyric}</li>
            `;
            }
        }
        lyrics.innerHTML='';
        lyrics.innerHTML=string;
    }
    //***************************************************************************************//
    function Time(time){
        var m=Math.floor(time/60)<10?'0'+Math.floor(time/60):Math.floor(time/60),
            s=Math.floor(time%60)<10?'0'+Math.floor(time%60):Math.floor(time%60);
        return `${m}:${s}`;
    }
    //*******************************************************************************************//
    audio.onended=function(){
        if(index>database.length){
            index=0;
        }
        index++;
        render(database[index]);
        audio.play();
        play.classList.add('icon-zanting1');
    }
    //**************************************************************************************//
    volume.onclick=function(){
        if(audio.muted){
            this.classList.toggle('icon-jingyin1');
        }else{
            this.classList.toggle('icon-jingyin1');
        }
    }
    //************************************音量**********************************************//
    var offsetV=volumeBox.offsetLeft,offsetC=control.offsetLeft;
    var offsetL=offsetC+offsetV;
    volumeBtn.onmousedown=function(e){
        document.onmousemove=function(e){
            var cx=e.clientX;
            var lefts=cx-offsetL;
            if(lefts>=100){
                lefts=100;
            }
            if(lefts<=0){
                lefts=0;
            }
            volumeBtn.style.left=lefts -7.5 +'px';
            volumePress.style.width=lefts+'px';
            audio.volume=lefts/100;
        }
        document.onmouseup=function(){
            this.onmousemove=null;
            this.onmouseup=null;
        }
    }
    //***********************************收藏************************************************//
})
