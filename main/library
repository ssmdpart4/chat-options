(function(mw, $){
	var CO = Object.create(null);
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
}(this.mediaWiki, this.jQuery));
