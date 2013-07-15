var Tweets = Backbone.Collection.extend({
      urlRoot: '/api/rest/v1/tweet/',//?offset=0&limit=100&format=json',
      model: Tweet,

      initialize: function(){
			this.on('remove', this.hideModel);
		},
      hideModel: function(model){
			    model.trigger('hide');
	  },
      contains : function(model){
	               n = model.get("id");
	               return this.any(function(m) { return m.get("id") === n });
	  },
     intersect : function(col2){
	         return this.filter(function(model) { return col2.contains(model) });
	 },
    difference : function(col2){
	        return this.filter(function(model) {return !col2.contains(model) });
	},
    fetchUpdate : function(){
	        var tts = this.clone();
	        tts.fetch();
	        this.update(tts.models);
	}
});


var Tweeters = Backbone.Collection.extend({
      urlRoot: '/api/rest/v1/tweeter/',
      model: Tweeter

      
});

