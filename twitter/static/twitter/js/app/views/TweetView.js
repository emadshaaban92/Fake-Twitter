var TweetView = Backbone.View.extend({
	className : 'alert alert-info alert-block',
	render : function(){
		
		var _template = "" +
			"{{#editable}}" +
			"<button type='button' class='close'>&times;</button>"+
			"<button type='button' class='close'>&times;</button>"+
			"{{/editable}}" +
			"<h3><strong>{{name}} </strong> : {{text}}</h3> " +
			"<span> From : " + moment(this.model.get("created")).add('hours',7).fromNow() + "</span>"
		
		rendered = Mustache.to_html(_template, this.model.toJSON());
		this.$el.html(rendered)

		var temp =	"<button type='button' class='close'>&times;</button>" +
			"<h1>" + this.model.get("text") + "</h1> " +
			"<span> From : " + moment(this.model.get("created")).add('hours',7).fromNow() + "</span>"
		
	},
	initialize: function(){
		this.model.on('hide', this.remove, this);
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		
	},
	events : {
		'click button' : function(){
			if(this.model.get("editable")){
				this.model.destroy();
			}
		}
	},
	remove: function(){
		if(this.model.get("editable")){
			this.$el.remove();
		}
	}
});

var TweetsView = Backbone.View.extend({
	initialize : function(){
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addAll, this);
	},

	render : function(){
		this.addAll();
		
	},
	addOne : function(tweet){
		tweetView = new TweetView({model : tweet});
		tweetView.render();
		this.$el.prepend(tweetView.el);
	},
	addAll : function(){
		this.$el.empty()
		this.collection.forEach(this.addOne, this );
	}
});
