var TweetView = Backbone.View.extend({
	className : 'well row',//'alert alert-info alert-block',
	render : function(){
		
		var _template = "" +
			"<div class='span8'>" +
			"<h3><b>{{name}} </b> : {{text}}</h3> " +
			"<span> From : " + moment(this.model.get("created")).add('hours',7).fromNow() + "</span>"+
			"</div>" +
			"{{#editable}}" +
			"<div class='span1 offset2 btn-group'>"+
			"<button id='edit-button' class='badge badge-info inline'>Edit</button>"+
			"<button id='delete-button' class='badge badge-important inline'>x</button>"+
			"</div>"+
			"{{/editable}}"
			
		
		this._render(_template);

	},
	_render : function(_template){
		rendered = Mustache.to_html(_template, this.model.toJSON());
		this.$el.html(rendered);

	},
	initialize: function(){
		this.model.on('hide', this.remove, this);
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		
	},
	events : {
		'click #delete-button' : function(){
			if(this.model.get("editable")){
				this.model.destroy();
			}
		},
		'click #edit-button' : function(){
			if(this.model.get("editable")){
				Fetcher = "OFF"
				var _template = "" +
				"<div class='span8'>" +
				"<h3><b>{{name}} </b> : <input type = 'text' id='edit-tweet' class='span7' value = '{{text}}'/> </h3> " +
				"<span> From : " + moment(this.model.get("created")).add('hours',7).fromNow() + "</span>" +
				"</div>" +
				"{{#editable}}" +
				"<div class='span1 offset2 btn-group'>"+
				"<button id='save-button' class='badge badge-success'>Save</button>"+
				"<button id='delete-button' class='badge badge-important'>x</button>"+
				"</div>"+
				"{{/editable}}"
				
				this._render(_template);
				this.$el.find('#edit-tweet').focus();
			}
		},
		'click #save-button' : function(){
			if(this.model.get("editable")){
				this.model.set("text", this.$el.find('#edit-tweet').val());
				this.model.save();
				Fetcher = "ON"
				tweets.fetch();
			}
		},
		'keypress #edit-tweet' : function(e){
			if(this.model.get("editable") && e.which == 13){
				
				this.$el.find('#save-button').click();
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
	appendOne : function(tweet){
		tweetView = new TweetView({model : tweet});
		tweetView.render();
		this.$el.append(tweetView.el);
	},
	addAll : function(){
		this.$el.empty()
		var c = this.collection
		_.each(c.last(c.length).reverse(), this.appendOne, this);
		//this.collection.forEach(this.appendOne, this );
	}
});
