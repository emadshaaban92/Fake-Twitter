var Tweets = Backbone.Collection.extend({
      urlRoot: '/api/rest/v1/tweet/',
      model: Tweet,

  	initialize: function(){
			this.on('remove', this.hideModel);
		},
		hideModel: function(model){
			if(model.get("editable")){
       model.trigger('hide');
      }
		}
});


var Tweeters = Backbone.Collection.extend({
      urlRoot: '/api/rest/v1/tweeter/',
      model: Tweeter

      
});

