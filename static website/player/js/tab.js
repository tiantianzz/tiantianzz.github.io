define(function(require,exports,module){
	
	var getByClass=require('common.js').getByClass
	
	exports.tab=function(oWrap){
		
		if(typeof oWrap =='string'){
			var oWrap=document.getElementById(oWrap);
		}
		
		var aHead=oWrap.children[0].getElementsByTagName('li');
		var aContent=oWrap.children[1].children;
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onclick=function(){
					for(var i=0;i<aHead.length;i++){
						aHead[i].className='';
						aContent[i].style.display='none';	
					}
					this.className='active';
					aContent[index].style.display='block';
				};	
			})(i);
		}
	};		
	exports.tabAll=function(sClass){
		var aCard=getByClass(document,sClass);
		for(var i=0;i<aCard.length;i++){
			exports.tab(aCard[i]);
		}
	}
	
});