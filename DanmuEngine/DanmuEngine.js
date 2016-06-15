/*---------------copyright by Neil, You, Shanghai Jiaotong University 2016, 5 ------------------*/




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



function createBMPObj(width, height, type, lifetime, scale, parent) {
    var obj = ObjPool.Create();
    var raw = DEGlobal.RESOURCES.BITMAPS[type];
    var bmd;
    if (DEGlobal.CACHE.BMD.hasOwnProperty(raw)) {
        bmd = DEGlobal.CACHE.BMD[raw];
    } else {
        bmd = loadBitmapData(width, height, raw);
        DEGlobal.CACHE.BMD[raw] = bmd;
    }
    obj.shape = createBitmap(bmd, lifetime, scale, parent);
    obj.type = type;
    obj.parent = parent;
    return obj;
}

/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
