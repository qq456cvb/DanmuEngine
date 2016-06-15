var DEResourse = {
	loadImage:function(image){
        var data = {
            width:image.width,
            height:image.height,
            Base64Code:image.Base64Code
        };
        var name = image.name;
        DEGlobal.RESOURCES.IMAGES[name] = data;

	},
	createImage:function(image){
		var name = image.name;
		var TargetImg = DEGlobal.RESOURCES.IMAGES[name];
        var bmd;
        var raw = TargetImg.Base64Code;
        if (DEGlobal.CACHE.BMD.hasOwnProperty(raw)) {
            bmd = DEGlobal.CACHE.BMD[raw];
        } else {
            bmd = DEBitmapLoader.loadBitmapData(TargetImg.width, TargetImg.height, TargetImg.Base64Code);
            DEGlobal.CACHE.BMD[raw] = bmd;
        }
        var obj = {};
		obj.shape = DEBitmapLoader.createBitmap(bmd, image.lifeTime, (image.scale) ? image.scale:1, image.parent);
		obj.shape.x = image.x;
		obj.shape.y = image.y;
		obj.shape.alpha = (image.alpha) ? image.alpha:1;
		return obj;
	},
	moveImage:function(obj,dir,distance,steps){
		switch(dir){
			case "up" :
				obj.shape.y -= distance;
				break;
			case "down" :
				obj.shape.y += distance;
				break;
			case "right" :
				obj.shape.x += distance;
				break;
			case "left" :
				obj.shape.x -= distance;
				break;
		}
		if(steps > 0){
			var _this = this;
			steps--;
			timer(function(){_this.moveImage(obj,dir,distance,steps);},100);
		}
		return;
	}
};
//loadImage用法：DEResourse.loadImage({name:"图片昵称",width:图片的宽度,height:图片的高度,Base64Code:"图片的Base64码"});
//createImage用法：DEResourse.createImage({name:"图片昵称",x:图片相对于父元素的横坐标,y:图片相对于父元素的纵坐标,scale:图片缩放比例,默认为1,lifeTime:图片持续时间,parent:图片的父元素,alpha:选填，图片透明度0为透明1为不透明，0.5为半透明});
//moveImage用法：DEResourse.moveImage(createImage返回的对象,"方向",每步的距离,步数);
