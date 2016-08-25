// JavaScript Document
//随机数
function rnd(n,m){
	return Math.random()*(m-n)+n;
};
//补0
function addZero(n){
	return n<10?'0'+n:''+n;
};
//滚轮事件
function addMouseWheel(obj,fn){
	var firefox=window.navigator.userAgent.toLowerCase().indexOf('firefox');
	if(firefox!=-1){
		console.log('ok');
		obj.addEventListener('DOMMouseScroll',fnWheel,false);	
	}
	else{		
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		var down=false;
		if(oEvt.wheelDelta){
			down = oEvt.wheelDelta<0?true:false;
		}else if(oEvt.detail){
			down =	 oEvt.detail>0?true:false;
		}
		fn&&fn(down);
		if(oEvt.preventDefault){
			oEvt.preventDefault();
		}
		return false;
	};
};
