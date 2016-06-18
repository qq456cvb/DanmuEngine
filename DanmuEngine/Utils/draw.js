var DEDraw = {
	createCanvas:function(param){
		var object = resetObject($.createCanvas({
			lifeTime: 0
		}), param);
		setParameters(object, eraseParameters(param, {
			parent: 0
		}));
		return object;
	},
	createText:function(str,param){
		var object = resetObject($.createComment(str, {
			lifeTime: 0
		}), param);
		object.defaultTextFormat = $.createTextFormat('Î¢ÈíÑÅºÚ', (param && param.size) || 14, (param && param.color != null) ? param.color: 0xFFFFFF, false, false, false);
		object.filters = [];
		object.text = str;
		setParameters(object, eraseParameters(param, {
			parent: 0,
			size: 0,
			color: 0
		}));
		return object;
	},
	fillRect:function(g, x, y, width, height, color){
		g.graphics.beginFill(color);
		g.graphics.drawRect(x, y, width, height);
		g.graphics.endFill();
	}
};

