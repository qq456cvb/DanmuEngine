var DEEntity = {
    entities: [],
    create: function (type, x, y, lifeTime, scale, parent, alpha) {
        EntityData = this.datas[type];
        var obj = {
            Health: EntityData.Health,
            Damage: EntityData.Damage,
            Type: EntityData.Type,
            MoveSpeed: EntityData.MoveSpeed,
            ImageName: EntityData.ImageName,
            move: function (dir, steps) {
                DEEntity.move(this, dir, steps);
            },
            remove: function () {
                ScriptManager.popEl(this.image);
                delete this;
            }
        };
        obj.attribute = EntityData;
        obj.image = DEResourse.createImage({ name: this.datas[type].ImageName, x: x, y: y, parent: parent, alpha: alpha, scale: scale, lifeTime: lifeTime });
        this.entities.push(obj);
        return obj;
    },
    initEntities: function (entities) {
        for (var i = 0; i < entities.length; i++) {
            var type = entities[i].Type;
            this.datas[type] = entities[i];
        }
    },
    move: function (obj, dir, steps) {
        var type = obj.Type;
        switch (dir) {
            case "right":
                obj.image.shape.x += obj.MoveSpeed;
                break;
            case "left":
                obj.image.shape.x -= obj.MoveSpeed;
                break;
            case "up":
                obj.image.shape.y -= obj.MoveSpeed;
                break;
            case "down":
                obj.image.shape.y += obj.MoveSpeed;
                break;
        };
        if (!this.checkCollisionBox()) {
            //写碰撞事件在这里
        }
        if (steps > 0) {
            steps--;
            var _this = this;
            timer(function () { _this.move(obj, dir, steps); }, 100);
        };
    },
    checkCollisionBox: function () {
        for (var i = 0; i < this.entities.length; i++) {
            var imgname = this.entities[i].ImageName;
            model = {
                x1: this.entities[i].image.shape.x,
                x2: this.entities[i].image.shape.x + DEGlobal.RESOURCES.IMAGES[imgname].width,
                y1: this.entities[i].image.shape.y,
                y2: this.entities[i].image.shape.y + DEGlobal.RESOURCES.IMAGES[imgname].height
            };
            for (var o = i + 1; o < this.entities.length;o++){
                model2 = {
                    x1: this.entities[o].image.shape.x,
                    x2: this.entities[o].image.shape.x + DEGlobal.RESOURCES.IMAGES[imgname].width,
                    y1: this.entities[o].image.shape.y,
                    y2: this.entities[o].image.shape.y + DEGlobal.RESOURCES.IMAGES[imgname].height
                };
                if (((model.x1 > model2.x1 && model.x1 < model2.x2) || (model.x2 > model2.x1 && model.x2 < model2.x2) || (model.x1 < model2.x1 && model.x2 > model2.x2) || (model.x1 >= model2.x1 && model.x2 <= model2.x2)) && ((model.y1 < model2.y1 && model.y2 > model2.y1) || (model.y1 < model2.y2 && model.y2 > model2.y2) || (model.y1 >= model2.y1 && model.y2 <= model2.y2))) return false;
                else return true;
            };
        };
        return true;
    },
    datas: {
        /*
            Monster:{
            Health:100,
            Damage:100,
            MoveSpeed:100,
            Type:"Monster",
            ImageName:"MonsterImage"
            }
        */
    }
};