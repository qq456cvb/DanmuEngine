var DEEntity = {
    create: function (obj, type) {
        obj.entityData = this.datas[type];
        return obj;
    },
    initEntities:function(entities){
        for (var i = 0; i < entities.length; i++) {
            var type = entities[i].Type;
            this.datas[type] = entities[i];
        }
    },
    move: function (obj, dir, steps) {
        type = obj.entityData.Type;
        if (!this.checkCollisionBox()) return;
        switch (dir) {
            case "right":
                obj.shape.x += this.datas[type].MoveSpeed;
                break;
            case "left":
                obj.shape.x -= this.datas[type].MoveSpeed;
                break;
            case "up":
                obj.shape.y -= this.datas[type].MoveSpeed;
                break;
            case "down":
                obj.shape.y += this.datas[type].MoveSpeed;
                break;
        };
        if (steps > 0) {
            steps--;
            var _this = this;
            timer(function () { _this.move(obj, dir, steps); }, 100);
        };
    },
    checkCollisionBox:function(){
        return true;
    },
    datas: {
        /*
            Monster:{
            Health:100,
            Damage:100,
            MoveSpeed:100,
            Type:"Monster"
            }
        */
    }
};