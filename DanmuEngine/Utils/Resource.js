// Dependency : BitmapLoader.js

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
        var obj = ObjPool.Create();
		obj.shape = DEBitmapLoader.createBitmap(bmd, image.lifeTime, (image.scale) ? image.scale:1, image.parent);
		obj.shape.x = image.x;
		obj.shape.y = image.y;
		obj.shape.alpha = (image.alpha) ? image.alpha:1;
		return obj;
	}
};
//loadImage用法：DEResourse.loadImage({name:"图片昵称",width:图片的宽度,height:图片的高度,Base64Code:"图片的Base64码"});
//createImage用法：DEResourse.createImage({name:"图片昵称",x:图片相对于父元素的横坐标,y:图片相对于父元素的纵坐标,scale:图片缩放比例,默认为1,lifeTime:图片持续时间,parent:图片的父元素,alpha:选填，图片透明度0为透明1为不透明，0.5为半透明});
//moveImage用法：DEResourse.moveImage(createImage返回的对象,"方向",每步的距离,步数);


/******************************* TEST CODE *******************************/
DEInit();
var raw1 = "Qk3aBQAAAAAAADYAAAAoAAAAEwAAAO3///8BACAAAAAAAKQFAADEDgAAxA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP9MTEz/TExM/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP9MTEz/TExM/0xMTP9MTEz/TExM/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP9MTEz/TExM/0xMTP9MTEz/TExM/0xMTP9MTEz/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM/0xMTP9MTEz/TExM/0xMTP9MTEz/TExM/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP9MTEz/TExM/0xMTP9MTEz/TExM/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM/0xMTP9MTEz/TExM/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAA/wAAAP9MTEz/TExM/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
DEResourse.loadImage({ name: "HelloWorld", width: 19, height: 19, Base64Code: raw1 });
//----------EntityExample----------//
var entities = {
    Player: {
        Health: 100,
        MoveSpeed: 5,
        Damage: 100,
        ImageName: "HelloWorld"
    }
};
var entity1 = DEEntity.create("HelloWorld", 50, 50, 100, 1, 0, 1);
var entity2 = DEEntity.create("HelloWorld", 50, 70, 100, 1, 0, 1);
entity1.onKeyDown = function () {
    this.shape.y += 10;
};
entity1.onKeyS = function () {
    this.shape.y += 10;
};
entity1.onKeyUp = function () {
    this.shape.y -= 10;
};
entity1.onKeyW = function () {
    this.shape.y -= 10;
};
entity1.onCollision = function (obj) {
    trace("collide");
};
/******************************* TEST CODE *******************************/