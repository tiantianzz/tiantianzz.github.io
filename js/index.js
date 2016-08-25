// JavaScript Document
window.onload=window.resize=function(){
	var oBigBox=document.querySelector('.bigbox');
	var oSnak=document.querySelector('.snak');
	var oHead=document.getElementById('header');
	var oAudio=document.getElementById('au');
	var oLogo=document.querySelector('.logo');
	var oI=document.querySelector('.audio');
	
	var oList=document.querySelector('.list');
	var aLi1=oList.children;
	var oBox=aLi1[aLi1.length-1];
	
	var oTel=document.querySelector('.tel');
	var oP=document.querySelector('.tel p');
	var oWeixin=document.querySelector('.weixin');
	var oImg=document.querySelector('.tel img');
	
	var aScreen=document.querySelectorAll('.screen');
	var oText=document.querySelector('#content .screen-one .text');
	var oSnowWrap=document.querySelector('.snow-wrap');
	var aImg=oSnowWrap.children;
	var oClock=document.querySelector('#content .screen-one .clock');
	var oCenter=document.querySelector('#content .screen-one .clock .center');
	
	var aCss=document.querySelectorAll('#content .screen-two .cssList a');
	var aLi2=document.querySelectorAll('#content .screen-two .cssList li');
	var aTooltip=document.querySelectorAll('#content .screen-two .cssList li .tooltip');
	var aTwoCode=document.querySelectorAll('#content .screen-two .cssList .two_code');
	
	var oUl=document.querySelector('#content .screen-three .jsList');
	var aLi3=oUl.children;
	var aAchar=oUl.getElementsByTagName('a');
	var aH2=oUl.getElementsByTagName('h2');
	var aBottom=document.querySelectorAll('#content .screen-three .bottom span');
	var aTooltip2=document.querySelectorAll('#content .screen-three .jsList li .tooltip');
	
	var nowPos=0;
	var now=0;
	var onClick=false;
	var H=document.documentElement.clientHeight;
	var W=document.documentElement.clientWidth;
	
	var oPrev = document.getElementById('prev');
	var oNext = document.getElementById('next');
	var aLi4 = document.querySelectorAll('#content .screen-four ul li');
	
	var oAchar=document.querySelector('#content .screen-five a');
	oBigBox.style.height=H+'px';
	//导航条运动
	function moveImg(obj){
		move(obj,{marginTop:-now*H},{duration:500,easing:Tween.Sine.easeIn,complete:function(){
			onClick=false;
		}})
	};
	move(oHead,{top:0},{duration:800,easing:Tween.Bounce.easeOut})
	for(var i=0;i<aLi1.length-1;i++){
		aLi1[i].onmouseover=function(){
			move(oBox,{left:this.offsetLeft},{duration:800,easing:Tween.Elastic.easeOut})
		};
		aLi1[i].onmouseout=function(){
			move(oBox,{left:nowPos},{duration:800,easing:Tween.Elastic.easeOut})
		};
		(function(index){
			aLi1[i].onclick=function(){
				if(onClick)return;
				onClick=true;
				nowPos=this.offsetLeft;
				now=index;
				moveImg(oSnak);
				clockChange();
				for(var j=0;j<aScreen.length;j++){
					aScreen[j].style.WebkitTransition=null;
					aScreen[j].style.msTransition=null;
					aScreen[j].style.transition=null;
					aScreen[j].style.WebkitTransform='perspective(800px) rotateX(0deg)';
					aScreen[j].style.msTransform='perspective(800px) rotateX(0deg)';
					aScreen[j].style.transform='perspective(800px) rotateX(0deg)';
				}
				if(index==1){
					for(var i=0;i<aLi2.length;i++){
						move1(aLi2[i],0);
					}
				}
				if(index==2){
					for(var i=0;i<aLi3.length;i++){
						move1(aLi3[i],0);
					}
				}
			};	
		})(i)	
	}
	//五页一起设置样式
	for(var i=0;i<aScreen.length;i++){
		aScreen[i].style.height=H+'px';
	};	
	//第一页
	//创建文字
	(function(){
		var writeStr = '欢迎访问tiantian的个人网站，我是一名前端工程师，热衷于学习前端各种新技术，每天不是在找bug，就是在去找bug的路上...';
		for(var i=0;i<writeStr.length;i++){
			var oSpan=document.createElement('span');
			oSpan.innerHTML=writeStr.charAt(i);
			oText.appendChild(oSpan);
		}
		var aSpan=oText.children;
		var timer=null;
		var i=0;
		timer=setInterval(function(){
			aSpan[i].className = "active";
			i++;
			if(i==aSpan.length){
				clearInterval(timer);
			}
		},40);
	})();
	//雪花效果
	for(var i=0;i<aImg.length;i++){
		aImg[i].style.left=rnd(0,W)+'px';
		aImg[i].src='img/flower'+Math.floor(rnd(1,7))+'.png';
	}
	var time=null;
	//旋转时钟
	clock();
	var timer=null;
	timer=setInterval(clock,1000);
	function clock(){
		var d=new Date();
		var iHour=d.getHours();
		var iMin=d.getMinutes();
		var iS=d.getSeconds();
		var str=addZero(iHour)+':'+addZero(iMin)+':'+addZero(iS);
		oCenter.innerHTML=str;
	};
	//滚轮事件
	addMouseWheel(document,function(down){
		if(onClick)return;
		onClick=true;
		if(down){
			now++;
			if(now>aLi1.length-2)
			now=aLi1.length-2;			
		}else{
			now--;
			if(now<0)
			now=0;
		}
		clockChange();
		tab();
		moveImg(oSnak);
		nowPos=now*aLi1[0].offsetWidth;
		move(oBox,{left:now*aLi1[0].offsetWidth},{duration:800,easing:Tween.Elastic.easeOut})		
		if(now==1){
			for(var i=0;i<aLi2.length;i++){
				move1(aLi2[i],0);
			}			
		}
		if(now==2){
			for(var i=0;i<aLi3.length;i++){
				move1(aLi3[i],0);
			}			
		}		
	});
	//时钟优化
	function clockChange(){
		if(now>0){
			clearInterval(timer);		
			oClock.style.WebkitAnimationPlayState='paused';			
			oClock.style.msAnimationPlayState='paused';
			oClock.style.animationPlayState='paused';
		}else{
			clearInterval(timer);	
			timer=setInterval(clock,1000);
			oClock.style.WebkitAnimationPlayState=null;
			oClock.style.msAnimationPlayState=null;
			oClock.style.animationPlayState=null;
		}	
	}	
	//页面旋转
	function tab(){
		for(var i=0;i<aScreen.length;i++){
			for(var j=0;j<aScreen.length;j++){				
				aScreen[j].style.WebkitTransform='perspective(800px) rotateX(0deg)';
				aScreen[j].style.mstransform='perspective(800px) rotateX(0deg)';
				aScreen[j].style.transform='perspective(800px) rotateX(0deg)';
			}
			if(now>0){
				aScreen[now-1].style.WebkitTransition='0.5s all ease';
				aScreen[now-1].style.msTransition='0.5s all ease';
				aScreen[now-1].style.transition='0.5s all ease';
				aScreen[now-1].style.WebkitTransform='perspective(800px) rotateX(-45deg)';
				aScreen[now-1].style.msTransform='perspective(800px) rotateX(-45deg)';
				aScreen[now-1].style.transform='perspective(800px) rotateX(-45deg)';
			}
			if(now<aScreen.length-1){
				aScreen[now+1].style.WebkitTransition='0.5s all ease';
				aScreen[now+1].style.msTransition='0.5s all ease';
				aScreen[now+1].style.transition='0.5s all ease';
				aScreen[now+1].style.WebkitTransform='perspective(800px) rotateX(45deg)';	
				aScreen[now+1].style.msTransform='perspective(800px) rotateX(45deg)';	
				aScreen[now+1].style.transform='perspective(800px) rotateX(45deg)';				
			}
		}
	};
	
	//屏幕二
	var arr1=['static website/meilishuo/meilishuo.html','static website/aiqiyi/aiqiyi.html','static website/player/player.html'];	
	for(var i=0;i<aLi2.length;i++){
		aLi2[i].style.background='url(img/css_'+(i+1)+'.jpg) no-repeat';
		aLi2[i].style.WebkitBackgroundSize='100% 100%';
		aLi2[i].style.msBackgroundSize='100% 100%';
		aLi2[i].style.backgroundSize='100% 100%';
		(function(index){
			aLi2[i].onmouseover=function(){
				move(aTooltip[index],{bottom:0},{duration:600,easing:Tween.Linear.easeIn});
			};
			aLi2[i].onmouseout=function(){
				move(aTooltip[index],{bottom:-71},{duration:600,easing:Tween.Linear.easeIn});
			};
		})(i);	
	};
	for(var i=0;i<aCss.length;i++){
		(function(index){
			aCss[i].onclick=function(){
				this.href=arr1[index];
			};
		})(i);			
	}
	
	//二维码	
	for(var i=0;i<aTwoCode.length;i++){
		aTwoCode[i].onOff=true;		
		aTwoCode[i].onclick=function(){
			if(this.onOff){
				move(this,{opacity:1},{duration:600,easing:Tween.Linear.easeIn});
			}else{
				move(this,{opacity:0},{duration:600,easing:Tween.Linear.easeIn});
			}
			this.onOff=!this.onOff;
		};		
	}
	
	//屏幕三
	
	//布局转换
	var aPos=[];
	for(var i=0;i<aLi3.length;i++){
		aPos.push({
			left:aLi3[i].offsetLeft,
			top:aLi3[i].offsetTop,
			width:260,
			height:178,
			opacity:1
		});
		aLi3[i].style.left=aPos[i].left+'px';
		aLi3[i].style.top=aPos[i].top+'px';		
	};
	for(var i=0;i<aLi3.length;i++){
		aLi3[i].style.position='absolute';
		aLi3[i].style.margin=0;
		aLi3[i].style.background='url(img/js_'+(i+1)+'.jpg) no-repeat';
		aLi3[i].style.WebkitBackgroundSize='100% 100%';
		aLi3[i].style.msBackgroundSize='100% 100%';
		aLi3[i].style.backgroundSize='100% 100%';
	}
	
	//分页效果
	var ready=true;
	var nowBottom=null;
	for(var i=0;i<aBottom.length;i++){
		(function(index){
			aBottom[i].onclick=function(){
				if(!ready)return;
				ready=false;
				onClick=true;
				for(var i=0;i<aBottom.length;i++){
					aBottom[i].className='';
				}
				aBottom[index].className='active';
				nowBottom=index;
				down(nowBottom);
			};
		})(i);
	}
	
	function down(now){
		var i=aLi3.length-1;
		var timer=setInterval(function(){
			(function(index){
				move(aLi3[i],{
					left:oUl.offsetWidth/2,
					top:oUl.offsetHeight,
					opacity:0,
					width:0,
					height:0
				},{complete:function(){
					if(index==0){
						switch(nowBottom){
							case 0:
								imgChange(1);
								break;
							case 1:
								imgChange(7);
								break;
							case 2:
								imgChange(13);
								break;
						}
						up();
					}
				}});
			})(i);
			i--;
			if(i==-1){
				clearInterval(timer);
			}
		},100);
	};
	
	var arr2=['3D图片环','爆炸、翻转、翻页效果','video','时钟','屏保','绘画板','桌面图标','应用商店','无缝滚动','拖拽图片栏','手风琴','幻灯片','模拟手机翻页',
	'快乐星球','3D立体效果','瀑布流','日照效果','报表'];
	var arr3=['js stroe/3D图片环.html','js stroe/爆炸、翻转、翻页效果.html','js stroe/video.html','js stroe/时钟.html','js stroe/屏保.html','js stroe/绘画板.html',
	'js stroe/桌面图标.html','js stroe/应用商店.html','js stroe/无缝滚动.html','js stroe/拖拽图片栏.html','js stroe/手风琴.html','js stroe/幻灯片.html',
	'js stroe/模拟手机翻页.html','js stroe/快乐星球.html','js stroe/3D立体效果.html','js stroe/瀑布流.html','js stroe/日照效果.html','js stroe/报表.html'];
	function imgChange(n){
		for(var i=0;i<aLi3.length;i++){
			aLi3[i].style.background='url(img/js_'+(i+n)+'.jpg) no-repeat';
			aH2[i].innerHTML=arr2[i+n-1];
			aAchar[i].href=arr3[i+n-1];
			aLi3[i].style.WebkitBackgroundSize='100% 100%';
			aLi3[i].style.msBackgroundSize='100% 100%';
			aLi3[i].style.backgroundSize='100% 100%';
		};
	};
	
	function up(){
		var i=aLi3.length-1;
		var timer=setInterval(function(){
			(function(index){
				move(aLi3[i],aPos[i]);
			})(i);
			i--;
			if(i==-1){
				ready=true;
				onClick=false;
				clearInterval(timer);
			}
		},100);
	};

	for(var i=0;i<aLi3.length;i++){
		(function(index){
			aLi3[i].onmouseover=function(){
				move(aTooltip2[index],{bottom:0},{duration:600,easing:Tween.Linear.easeIn});
			};
			aLi3[i].onmouseout=function(){
				move(aTooltip2[index],{bottom:-71},{duration:600,easing:Tween.Linear.easeIn});
			};
		})(i);	
	};
	//屏幕四
	var aClass = [];
	var bOk = false;
	for(var i=0;i<aLi4.length;i++){
		aClass[i] = aLi4[i].className;
	}
	oPrev.onclick=function(){
		if(bOk)return;
		bOk = true;
		aClass.push(aClass.shift());
		tab2();
	};
	oNext.onclick=function(){
		if(bOk)return;
		bOk = true;
		aClass.unshift(aClass.pop());
		tab2();
	};
	function tab2(){
		var oCur = document.querySelector('.cur');
		for(var i=0;i<aLi4.length;i++){
			aLi4[i].className = aClass[i];
		}
		function tranEnd(){
			oCur.removeEventListener('transitionend',tranEnd,false);
			bOk = false;
		}
		oCur.addEventListener('transitionend',tranEnd,false);
	}

	//屏幕五
	document.onmousemove=function(ev){
		var x1 = ev.pageX;
		var y1 = ev.pageY;
		var x2 = oAchar.offsetLeft+oAchar.offsetWidth/2;
		var y2 = oAchar.offsetTop+oAchar.offsetHeight/2;
		var disX = (x2-x1);
		var disY = (y2-y1);
		var dis = Math.sqrt(disX*disX+disY*disY)/20;
		oAchar.style.textShadow = disX+'px '+disY+'px '+dis+'px #fff';
	};

};