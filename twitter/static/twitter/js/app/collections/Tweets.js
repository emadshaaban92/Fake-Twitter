var Tweets = Backbone.Collection.extend({
      urlRoot: '/api/rest/v1/tweet?offset=0&limit=100&format=json',
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
      urlRoot: '/api/rest/v1/tweeter?offset=0&limit=100',
      model: Tweeter

      
});

