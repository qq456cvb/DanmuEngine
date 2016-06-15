/*---------------copyright by Neil, You, Shanghai Jiaotong University 2016, 5 ------------------*/

var BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

var ObjPool = {
    objects : [],
    Create : function() {
        var obj = {
            Destroy : function() {
                var index = ObjPool.objects.indexOf(this);
                ObjPool.objects.splice(index, 1);
            },
            absPos : function() {
                var absX = 0, absY = 0;

                if (this.hasOwnProperty("shape")) {
                    absX = this.shape.x;
                    absY = this.shape.y;
                } else {
                    absX = this.x;
                    absY = this.y;
                }
                var that = this;
                if (that.hasOwnProperty("parent")) {
                    var parent = that.parent;
                    absX += parent.x;
                    absY += parent.y;
                    //that = that.parent;
                }
                return {x:absX, y:absY};
            },
            __internal : {}
        };
        this.objects.push(obj);
        return obj;
    }
};

var Mouse = {
    target : null,
    Attach : function(obj) {
        this.target = obj;
    },
    Detach : function() {
        this.target = null;
    }
};

var EventManager = {
    currentMousePosition : {
        x : 0,
        y : 0
    },
    MouseUp : function(e) {
        for (i = 0; i < ObjPool.objects.length; ++i) {
            var obj = ObjPool.objects[i];
            if (obj.hasOwnProperty("onClicked")) {
                if (this.currentMousePosition.x > (obj.absPos()).x && this.currentMousePosition.x < (obj.absPos()).x + obj.shape.width
                    && this.currentMousePosition.y > (obj.absPos()).y && this.currentMousePosition.y < (obj.absPos()).y + obj.shape.height)
                    obj.onClicked();
            }
        }
    },
    MouseMove : function(e) {
        this.currentMousePosition.x = e.localX;
        this.currentMousePosition.y = e.localY;
        if (Mouse.target != null) {
            Mouse.target.shape.x = e.localX - Mouse.target.shape.width / 2;
            Mouse.target.shape.y = e.localY - Mouse.target.shape.height / 2;
        }
        for (i = 0; i < ObjPool.objects.length; ++i) {
            var obj = ObjPool.objects[i];

            if (this.currentMousePosition.x > (obj.absPos()).x && this.currentMousePosition.x < (obj.absPos()).x + obj.shape.width
                && this.currentMousePosition.y > (obj.absPos()).y && this.currentMousePosition.y < (obj.absPos()).y + obj.shape.height) {

                if((obj.__internal.catchMouse == null) || (obj.__internal.catchMouse == false)) {
                    obj.__internal.catchMouse = true;
                    if (obj.hasOwnProperty("onEntered")) {
                        obj.onEntered();
                    }
                }
            } else {
                if(obj.__internal.catchMouse == true) {
                    obj.__internal.catchMouse = false;
                    if (obj.hasOwnProperty("onLeaved")) {
                        obj.onLeaved();
                    }
                }
            }
        }
    }
};

/***********************************************************************/
function resetObject(object, param) {
    ScriptManager.popEl(object);
    if (param && param.parent) param.parent.addChild(object);
    else $.root.addChild(object);
    object.transform.matrix3D = null;
    return object;
}
/***********************************************************************/
function setParameters(object, param) {
    foreach(param,
        function(key, val) {
            if (object.hasOwnProperty(key)) object['' + key] = val;
        });
}
/***********************************************************************/
function eraseParameters(param, filter) {
    var newParam = {};
    foreach(param,
        function(key, val) {
            if (!filter.hasOwnProperty(key)) newParam['' + key] = val;
        });
    return newParam;
}

function argb2rgba(data) {
    var batch = [];
    batch.length = 4;
    for (var i = 0; i < data.length; i += 4) {

        batch[0] = data[i];
        batch[1] = data[i+1];
        batch[2] = data[i+2];
        batch[3] = data[i+3];

        var alpha = data[i+3];
        batch.unshift(alpha);
        batch.pop();
        data[i] = batch[0];
        data[i+1] = batch[1];
        data[i+2] = batch[2];
        data[i+3] = batch[3];
    }
    return data;
}

function extract(data) {
    var bmd = Bitmap.createBitmapData(1, 1);
    var output = bmd.getPixels(bmd.rect);
    output.clear();
    var dataBuffer = [];
    dataBuffer.length = 4;
    var outputBuffer = [];
    outputBuffer.length = 3;
    var cnt = 0;
    for (var i = 0; i < data.length; i += 4) {
        for (var j = 0; j < 4 && i + j < data.length; j++) {
            dataBuffer[j] = BASE64_CHARS.indexOf(data.charAt(i + j));
        }

        // attention, bgr to rgb convertion!
        outputBuffer[0] = (dataBuffer[0] << 2) + ((dataBuffer[1] & 0x30) >> 4);
        outputBuffer[1] = ((dataBuffer[1] & 0x0f) << 4) + ((dataBuffer[2] & 0x3c) >> 2);
        outputBuffer[2] = ((dataBuffer[2] & 0x03) << 6) + dataBuffer[3];
        for (var k = 0; k < outputBuffer.length; k++) {
            if (dataBuffer[k + 1] == 64) break;
            if (cnt >= 54) { // skip bmp header
                //if (cnt % 3 == 1) {
                //    output.writeByte(255); // add alpha channel
                //};
                output.writeByte(outputBuffer[k]);
            }
            cnt++;
        }
    }
    output = argb2rgba(output);
    output.position = 0;
    return output;
}

function loadBitmapData(width, height, raw) {
    var bmd = Bitmap.createBitmapData(width, height);
    //trace((extract(raw)).length);
    bmd.setPixels(bmd.rect, extract(raw));
    return bmd;
}

function createBitmap(bitmapData, lifeTime, scale, parent) {
    var bmp = Bitmap.createBitmap({
        bitmapData: bitmapData,
        lifeTime: lifeTime,
        parent: parent,
        scale: scale
    });
    return bmp;
}

function createBMPObj(width, height, type, lifetime, scale, parent) {
    var obj = ObjPool.Create();
    var raw = Global.RESOURCES.BITMAPS[type];
    var bmd;
    if (Global.CACHE.BMD.hasOwnProperty(raw)) {
        bmd = Global.CACHE.BMD[raw];
    } else {
        bmd = loadBitmapData(width, height, raw);
        Global.CACHE.BMD[raw] = bmd;
    }
    obj.shape = createBitmap(bmd, lifetime, scale, parent);
    obj.type = type;
    obj.parent = parent;
    return obj;
}
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/