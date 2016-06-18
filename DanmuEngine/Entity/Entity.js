var DEEntity = {
    create: function (imageName, x, y, lifeTime, scale, parent, alpha) {
        var obj = {};
        obj = DEResourse.createImage({ name: imageName, x: x, y: y, parent: parent, alpha: alpha, scale: scale, lifeTime: lifeTime });
        return obj;
    }
};
