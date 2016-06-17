# DanmuEngine
Danmu Engine, nothing is impossible

弹幕游戏引擎，一切皆有可能

# API：
图片部分
-----------------
* DEResourse.loadImage(params:Object):void;<br>
 {name:"helloWorld",width:30,height:30,Base64Code:"blahblahblah"}<br>
 使用说明：加载图片，name可以自己取名，width和height必须和图片的尺寸对应，Base64Code可以去"http://tool.css-js.com/base64.html"<br>
 注：图片必须为32位bmp，翻转行序<br><br>
* DEResourse.createImage(params:Object):ImageElement;<br>
 {name:"helloWorld",x:10,y:10,lifeTime:0,parent:0,alpha:1}<br>
 使用说明：在指定位置创建图片，x与y请填写图片的坐标，name请填加载时起的名字，lifeTime为存在时间，0为永久，1为一秒，以此类推。parent为父元素，不懂得可以填0，alpha为透明度，1为完全不透明，0为完全透明，不填默认为1。scale为缩放比例，不懂得可以不填<br><br>
* ImageElement.move(dir:String,distance:Number = 0,steps:Number = 0):void;<br>
 使用说明：移动图片,dir处填写"right"或"left"或"up"或"down",distance处请填写每步的距离，steps请填写步数<br>
 Example:<br>
>> myImage = DEResourse.createImage({name:"helloWorld",x:10,y:10,lifeTime:0,parent:0});<br>
>> myImage.move("right",2,20);<br><br>
* ImageElement.remove():void;<br>
 使用说明：移除已创建的图片<br>
 Example:<br>
>> myImage = DEResourse.createImage({name:"helloWorld",x:10,y:10,lifeTime:0,parent:0});<br>
>> myImage.remove();<br><br>

图形部分
-------------------
* DEDraw.createCanvas(params:Object):Canvas<br>
 {x:0,y:0,lifeTime:0,parent:0}<br>
 使用说明：创建画布，x与y为相对于父元素的坐标，lifeTime为存在时间0为永久，parent为父元素<br><br>
* DEDraw.fillRect(g,x,y,width,height,color):void<br>
 使用说明：在g画布指定xy位置创建一个宽为width高为height颜色为color的矩形。<br><br>
