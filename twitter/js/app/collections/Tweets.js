var Tweets = Backbone.Collection.extend({
        urlRoot: '/api/rest/v1/tweet/',
        model: function(attrs, options) {
    		return Tweet.create(attrs, options);
  		},

  		initialize: function(){
			this.on('remove', this.hideModel);
		},
		hideModel: function(model){
      if(model.get("editable")){
			 model.trigger('hide');
      }
		}
    });