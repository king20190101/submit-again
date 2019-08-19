
//面向对象编程思想：
//类：轮播图

function Banner(boxDom,width,height,imgs,douIsCircle,douSize,douColor,douHighColor,douPostion,timeSpace){
	this.boxDom = boxDom;
	this.imgDoms = [];//存放所有图片的dom，img标签
	this.width = width;
	this.height = height;
	// this.left = left;
	// this.top = top1;
	this.imgs = imgs;//要播放的图片路径数组;如:['img/1.jpg','img/2.jpg']
	this.douIsCircle = douIsCircle;//豆豆是不是圆。
	this.douSize = douSize;//豆豆的大小
	// this.douSpace = douSpace;//豆豆的间隔
	this.douColor = douColor;
	this.douHighColor = douHighColor;//高亮
	this.douPostion = douPostion;//豆豆的位置，上，右，下，左
	this.timeSpace = timeSpace;
	this.myTimer = null;//轮播图的定时器

	this.currOrd = 0;
	this.createUI();
	this.addEvent();
	this.autoPlay();
}


//创建轮播图中所有的DOM元素
Banner.prototype.createUI = function(){
	//1、创建所有图片
	for(let i in this.imgs){
		let imgDom = document.createElement("img");
		imgDom.src = this.imgs[i];
		imgDom.style.cssText = `position: absolute;
				left:0px;
				top:0px;
				width: ${this.width}px;
				height: ${this.height}px;
				opacity: 0;`;
		if(i=="0"){
			imgDom.style.opacity = 1;
		}
		this.boxDom.appendChild(imgDom);
		this.imgDoms.push(imgDom);
	}

	//2、创建豆豆
	//1）、豆豆的ul
	let ulDom = document.createElement("ul");
	ulDom.style.cssText =`
				margin:0;
				padding:0;
				position: absolute;
				list-style: none;
				z-index: 3;`;

	switch(this.douPostion){
		case "上":{
			ulDom.style.top = this.height*0.05+"px";
			ulDom.style.left = (this.width-(this.douSize*2*this.imgs.length))/2 +"px";
		}break;
		case "下":{
			ulDom.style.bottom = this.height*0.05+"px";			
			ulDom.style.left = (this.width-(this.douSize*2*this.imgs.length))/2+"px";
		}break;
		case "左":ulDom.style.left = this.width*0.05+"px";break;
		case "右":ulDom.style.right = this.width*0.05+"px";break;
	}
	this.boxDom.appendChild(ulDom);

	//2）、豆豆 li
	for(let i in this.imgs){
		let liDom = document.createElement('li');

		liDom.style.cssText =`
				margin:0;
				padding:0;
				float:left;
				width:${this.douSize}px;
				height: ${this.douSize}px;
				margin-right: ${this.douSize/2}px;
				margin-left: ${this.douSize/2}px;
				background-color: ${this.douColor};`;
		if(this.douIsCircle){
			liDom.style.borderRadius = '50%';
		}
		if(i=="0"){
			liDom.style.backgroundColor = this.douHighColor;
		}
		ulDom.appendChild(liDom);
	}
}		

Banner.prototype.autoPlay = function(){
	let liDoms = this.boxDom.lastElementChild.children;
	if(this.myTimer!=null){
		return;
	}
	this.myTimer = setInterval(()=>{
		//一、数据处理
		//淡出的图片序号
		let outOrd = this.currOrd;		
		this.currOrd++;

		if(this.currOrd>this.imgs.length-1){
			this.currOrd = 0;
		}

		//二、改变外观

		fadeInOut(this.imgDoms[this.currOrd],this.imgDoms[outOrd],1000);
		//变豆豆
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].style.backgroundColor = this.douColor;
		}
		liDoms[this.currOrd].style.backgroundColor = this.douHighColor;		
	},this.timeSpace);
}

Banner.prototype.stopPlay=function(){
	clearInterval(this.myTimer);
	this.myTimer = null;
}

Banner.prototype.goImg=function(ord){
	let liDoms = this.boxDom.lastElementChild.children;
	
	//一、数据处理
	//淡出的图片序号
	let outOrd = this.currOrd;

	this.currOrd = ord;

	if(this.currOrd>this.imgs.length-1){
		this.currOrd = 0;
	}

	//二、改变外观

	fadeInOut(this.imgDoms[this.currOrd],this.imgDoms[outOrd],500);
	//变豆豆
	for(let i=0;i<liDoms.length;i++){
		liDoms[i].style.backgroundColor = this.douColor;
	}
	liDoms[this.currOrd].style.backgroundColor = this.douHighColor;
}

Banner.prototype.addEvent = function(){
	// //2、鼠标放在轮播图的盒子里，停止播放
	this.boxDom.onmouseenter = ()=>{
		this.stopPlay();
	}

	// //3、鼠标离开轮播图的盒子，继续播放
	this.boxDom.onmouseleave = ()=>{
		this.autoPlay();
	}

	// //4、点击某个豆豆，跳转到对应的图片上
	let liDoms = this.boxDom.lastElementChild.children;
	for(let i=0;i<liDoms.length;i++){
		liDoms[i].onclick = ()=>{
			this.goImg(i);
		};
	}

}