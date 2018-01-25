(function(mw, $){
	var CO = Object.create(null);
	CO.every = function(object, fn){
		var val = null;
		if (Array.isArray(object)){
			for (var i = 0, len = object.length; i < len; i++){
				var value = object[i],
					stored = fn.apply(this, [value, i, object]);
				if (typeof stored !== 'boolean') continue;
				val = stored;
			}
		} else {
			for (var k in object){
				var value = object[k],
					stored = fn.apply(this, [value, k, object]);
				if (typeof stored !== 'boolean') continue;
				val = stored;
			}
		}
		return val;
	};
	CO.map = function(object, fn){
		var fin = [];
		if (Array.isArray(object)){
			for (var i = 0, len = object.length; i < len; i++){
				var value = object[i],
					result = fn.apply(this, [value, i, object]);
				if (typeof result === 'undefined') continue;
				fin[fin.length] = result;
			}
		} else {
			for (var k in object){
				var value = object[k],
					result = fn.apply(this, [value, k, object]);
				if (typeof result === 'undefined') continue;
				fin[fin.length] = result;
			}
		}
		return fin;
	};
	CO.mapUntil = function(object, index, fn){
		var fin = [];
		if (Array.isArray(object)){
			if (isNaN(index)) return;
			else index = parseInt(index);
			for (var i = 0, len = (index < object.length && index > -1) ? index : object.length; i < len; i++){
				var value = object[i],
					result = fn.apply(this, [value, i, object]);
				if (typeof result === 'undefined') continue;
				fin[fin.length] = result;
			}
		} else {
			var keys = Object.keys(object),
				targetKeyIndex = keys.indexOf(index);
			targetKeyIndex = targetKeyIndex < keys.length && targetKeyIndex > -1 ? targetKeyIndex : keys.length;
			var targetKey = keys[targetKeyIndex];
			for (var k in object){
				if (k === targetKey) break;
				var value = object[k],
					result = fn.apply(this, [value, k, object]);
				if (typeof result === 'undefined') continue;
				fin[fin.length] = result;
			}
		}
		return fin;
	};
	CO.matchesObject = function(obj1, obj2){
		var val1 = null, val2 = null, queue;
		if (Array.isArray(obj1) && Array.isArray(obj2)){
			queue = [];
			for (var i = 0; i < obj1.length; i++){
				val1 = obj1[i];
				val2 = obj2[i];
				queue[queue.length] = val1 === val2;
			}
			return CO.every(queue, function(value){
				return value === true;
			});
		} else {
			queue = {};
			for (var k in obj1){
				val1 = obj1[k];
				val2 = obj2[k];
				queue[k] = val1 === val2;
			}
			return CO.every(queue, function(value){
				return value === true;
			});
		}
	};
	window.CO = CO;
}(this.mediaWiki, this.jQuery));
