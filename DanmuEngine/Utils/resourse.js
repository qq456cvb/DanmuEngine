var DEResourse = {
	loadImage:function(Image){
			var data = {
				width:Image.width,
				height:Image.height,
				Base64Code:Image.Base64Code
			};
			DEGlobal.RESOURCES.IMAGES[Image.name] = data;
	},
	createImage:function(Image){
		var TargetImg = DEGlobal.RESOURCES.IMAGES[Image.name]
		bmd = loadBitmapData(TargetImg.width, TargetImg.height, TargetImg.Base64Code);
		obj = createBitmap(bmd, Image.lifeTime, Image.parent);
		obj.shape.x = Image.x;
		obj.shape.y = Image.y;
		obj.shape.alpha = (Image.alpha) ? 1:Image.alpha;
		return obj;
	}
};
//loadImage用法：DEResourse.loadImage({name:"图片昵称",width:图片的宽度,height:图片的高度,Base64Code:"图片的Base64码"});
//createImage用法：DEResourse.createImage({name:"图片昵称",x:图片相对于父元素的横坐标,y:图片相对于父元素的纵坐标,lifeTime:图片持续时间,parent:图片的父元素,alpha:选填，图片透明度0为透明1为不透明，0.5为半透明});
