/**
 * Created by qq456cvb on 6/15/16.
 */

var DEGlobal = {
    CACHE : {
        BMD : {}
    },
    RESOURCES : {
        BITMAPS :{

        },
        IMAGES : {

        }
    }
};

var Bindings = {
    87 : "onKeyW",
    38 : "onKeyUp",
    83 : "onKeyS",
    40 : "onKeyDown",
    65 : "onKeyA",
    37 : "onKeyLeft",
    68 : "onKeyD",
    39 : "onKeyRight"
};

function keyDown(key) {
    trace("here");
    for (var i = 0; i < ObjPool.objects.length; ++i) {
        var obj = ObjPool.objects[i];
        if (obj.hasOwnProperty(Bindings[key])) {
            obj[Bindings[key]]();
        }
    }
}

var ObjPool = {
    objects : [],
    Create : function() {
        var obj = {
            Destroy : function() {
                var index = ObjPool.objects.indexOf(this);
                var o = ObjPool.objects[index];
                if (o.hasOwnProperty("shape")) {
                    ScriptManager.popEl(o.shape);
                }
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
            __internal : {
                collidedObjects : []
            }
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
        for (var i = 0; i < ObjPool.objects.length; ++i) {
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
    },
    EnterFrame : function () {
        for (var i = 0; i < ObjPool.objects.length; ++i) {
            var obj = ObjPool.objects[i];
            if (obj.hasOwnProperty("onFrame")) {
                obj.onFrame();
            }
            if (obj.hasOwnProperty("onCollision")) {
                for (var j = 0; j < ObjPool.objects.length; ++j) {
                    // TODO(Neil): check pixel collision
                    var anotherObj = ObjPool.objects[j];
                    if (anotherObj == obj) continue;

                    // first one
                    var x1min = (obj.absPos()).x;
                    var x1max = (obj.absPos()).x + obj.shape.width;
                    var y1min = (obj.absPos()).y;
                    var y1max = (obj.absPos()).y + obj.shape.height;

                    // second one
                    var x2min = (anotherObj.absPos()).x;
                    var x2max = (anotherObj.absPos()).x + anotherObj.shape.width;
                    var y2min = (anotherObj.absPos()).y;
                    var y2max = (anotherObj.absPos()).y + anotherObj.shape.height;

                    // check
                    if (x1max > x2min && x1min < x2max && y1max > y2min && y1min < y2max) {
                        // collided
                        if (obj.__internal.collidedObjects.indexOf(anotherObj) != -1) {
                            // already in
                            continue;
                        }
                        obj.__internal.collidedObjects.push(anotherObj);
                        obj.onCollision(anotherObj);
                    } else {
                        // lost
                        var index = obj.__internal.collidedObjects.indexOf(anotherObj);
                        if (index != -1) {
                            // already in
                            obj.__internal.collidedObjects.splice(index, 1);
                        }
                    }
                }
            }
        }
    }
};

function DEInit() {
    Player.keyTrigger(function(key){
        keyDown(key);
    }, 1<<31 -1);

    $.frameRate = 30;
    $.root.addEventListener("enterFrame", function () {
        EventManager.EnterFrame();
    });

    $.root.mouseEnabled = true;
    $.root.addEventListener("mouseMove", function (e) {
        EventManager.MouseMove(e);
    });
    $.root.addEventListener("mouseUp", function (e) {
        EventManager.MouseUp(e);
    });
}
