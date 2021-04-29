
 	var app=new Vue({
		el:'#app',
		data:{
				items:[],
				border:false,
				img:'a',
				timer:null,
				time:null,
				itemTimer:null,
				itemTime:null,
				timeTitle:'0/8',
				opacity:false,
				aBtn:'重置',
				bestTime:'',
				mp3:true
		},
		computed:{
				
		},
		methods:{
				puzzle:function(){
					var array=[1,2,3,4,5,6,7,8];
					// items.sort(function(){ return 0.5 - Math.random() });
					// items.push('');
					// return items;
					 var arrlength=array.length;//获取数组长度
				   var tmparr;
				   var tmparray= new Array;
				   for(var i=0;i<arrlength;i++){
				   var tid1 = parseInt(array.length*Math.random());//获取从0到数组长度的随机值
				  var tid2 = parseInt(array.length*Math.random());//获取从0到数组长度的随机值
				  while(tid1==tid2)
				  {tid2 = parseInt(array.length*Math.random());}//不能交换同一个数
				     tmparr = array[tid1];//交换数组
				     array[tid1] = array[tid2];
				     array[tid2] = tmparr;
				       }
				       array.push('');
				   return array;
				},
				moveFn:function(index){
					var currNum=this.items[index];
					var leftNum=this.items[index-1];
					var rightNum=this.items[index+1];
					var topNum=this.items[index-3];
					var bottomNum=this.items[index+3];
					if(leftNum===''&&index%3){
						this.$set(this.items,index-1,currNum);
						this.$set(this.items,index,'');
					}
					else if(rightNum===''&&2!==index%3){
						this.$set(this.items,index+1,currNum);
						this.$set(this.items,index,'');
					}
					else if(topNum===''){
						this.$set(this.items,index-3,currNum);
						this.$set(this.items,index,'');
					}
					else if(bottomNum===''){
						this.$set(this.items,index+3,currNum);
						this.$set(this.items,index,'');
					}
					this.finsishFn();
				},
				finsishFn:function(){
					var THIS=this;
					var arr=this.items;
					var arr2=[];
					if(arr[arr.length-1]===''){
						arr=arr.slice(0,8);
						var qq=false;
						for(var i=0;i<arr.length;i++){
							if(arr[i]===i+1){
								arr2[i]=true
							}
							else{
								arr2[i]=false
							}
						}
						if(arr2.indexOf(false)==-1){
								THIS.border=true
								THIS.items[8]=9;
								console.log(THIS);
								THIS.$refs.li[8].style.backgroundImage='url(puzzleGame/'+THIS.img+'9.jpg)';
								imgArr.splice(imgIndex,1);
								clearInterval(THIS.itemTimer);
								clearInterval(THIS.timer);
								if(imgArr.length>0){
									setCookie('imgArr',imgArr,7);
									setCookie('time',parseInt(THIS.time),7);
									THIS.timeTitle=8-imgArr.length+'/8';
									THIS.aBtn='下一图片';
								}
								else{
									delCookie('imgArr');
									delCookie('time');
									if(!getCookie('bestTime')){
										setCookie(' bestTime',parseInt(THIS.time),7);
									}else{
										parseInt(THIS.time)<getCookie('bestTime')?setCookie('bestTime',parseInt(THIS.time),7):setCookie('bestTime',getCookie('bestTime'),7);
									}
									THIS.aBtn='游戏结束';
									THIS.timeTitle='8/8';
									clearInterval(THIS.timer);
									
								}
						}
						else{
							this.border=false;
						}
					}
					
				},
				styles:function(index){
					console.log(this);
					var qq=null;
					if(index!=='')
					qq='background-image:url(puzzleGame/'+this.img+index+'.jpg)'
					else{
					qq='background-image:url(puzzleGame/hui.jpg)'
					}
					return qq
				},
				reset:function(){
					if(imgArr.length<=0){
						return 
					}
					this.aBtn='重置';
					this.border=false;
					var This=this;
					imgIndex=Math.floor((Math.random()*imgArr.length));
					this.img=imgArr[imgIndex];
					this.items=this.puzzle();
					var time=new Date();
					clearInterval(This.itemTimer);
					clearInterval(this.timer);
					this.itemTimer=setInterval(function(){
						var now =new Date();
						This.itemTime=Math.floor(((+now)- (+time))/1000);
						This.opacity=(This.itemTime>50);
					},100)
					var seconds=parseInt(This.time);
					this.timer=setInterval(function(){
						var now =new Date();
						This.time=(Math.floor(((+now)- (+time))/1000)+seconds)+'秒';
					},100)

				},
				mp3Fn:function(){
					this.mp3=!this.mp3;
					console.log(this.$refs.audio)
					if(this.mp3){
						this.$refs.audio.play();
					}
					else{
						this.$refs.audio.pause();
					}
				}	
		},
		mounted:function(){
			var cookieImgArr=getCookie('imgArr');
			if(cookieImgArr){
				cookieImgArr=cookieImgArr.split(',');
			}
			if(getCookie('bestTime')){
				this.bestTime='最佳成绩:'+getCookie('bestTime')+'秒';
			}
			imgArr=cookieImgArr||['a','b','c'];
			this.timeTitle=8-imgArr.length+'/8'
			var seconds=getCookie('time')?+getCookie('time'):0;
			this.reset();
			var This=this;
			// this.$refs.app.style.lineHeight=document.documentElement.clientHeight+'px';
			clearInterval(this.timer);
			var time=new Date();
			this.timer=setInterval(function(){
						var now =new Date();
						This.time=(Math.floor(((+now)- (+time))/1000)+seconds)+'秒';
					},100)
			
		}
	});

	//Create cookie
    function setCookie(name, value, expireday) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expireday * 24 * 60 * 60 * 1000); //设置cookie的期限
        document.cookie = name + "=" + escape(value) + "; expires" + "=" + exp.toGMTString(); //创建cookie
    }
    //Get Cookie Value
    function getCookie(name) {
        var cookieStr = document.cookie;
        if (cookieStr.length > 0) {
            var cookieArr = cookieStr.split(";"); //将cookie信息转换成数组
            for (var i = 0; i < cookieArr.length; i++) {
                var cookieVal = cookieArr[i].split("="); //将每一组cookie(cookie名和值)也转换成数组
                if (cookieVal[0].trim() == name) {
                    return unescape(cookieVal[1]); //返回需要提取的cookie值
                }
            }
        }
    }
    function delCookie(name)
       {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }