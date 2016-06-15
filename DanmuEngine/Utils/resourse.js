var DEResourse = {
	loadImage:function(Image){
			var data = {
				width:Image.width,
				height:Image.height,
				Base64Code:Image.Base64Code
			};
			DEGlobal.RESOURCES.IMAGE[Image.name] = data;
	}
	createImage:function(Image){
		var TargetImg = DEGlobal.RESOURCES.IMAGE[Image.name]
		bmd = loadBitmapData(TargetImg.width, TargetImg.height, TargetImg.Base64Code);
		obj = createBitmap(bmd, Image.lifeTime, Image.parent);
		obj.shape.x = Image.x;
		obj.shape.y = Image.y;
		obj.shape.alpha = (Image.alpha) ? 1:Image.alpha;
		return obj;
	}
};
//loadImage�÷���DEResourse.loadImage({name:"ͼƬ�ǳ�",width:ͼƬ�Ŀ��,height:ͼƬ�ĸ߶�,Base64Code:"ͼƬ��Base64��"});
//createImage�÷���DEResourse.createImage({name:"ͼƬ�ǳ�",x:ͼƬ����ڸ�Ԫ�صĺ�����,y:ͼƬ����ڸ�Ԫ�ص�������,lifeTime:ͼƬ����ʱ��,parent:ͼƬ�ĸ�Ԫ��,alpha:ѡ�ͼƬ͸����0Ϊ͸��1Ϊ��͸����0.5Ϊ��͸��});