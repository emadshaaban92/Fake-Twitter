var TweetView = Backbone.View.extend({
	className : 'well row',//'alert alert-info alert-block',
	render : function(){
		
		var _template = "" +
			"<div class='span8'>" +
			this.model.get("avatar_url") +
			"<span class='lead'>  {{text}}</span><br /> " +
			"<span><span class='time'>" + moment(this.model.get("created")).add('hours',7).fromNow() + "</span> by : <b class='{{ident}}{{tweeter_id}}'>{{name}}</b></span>" +"</div>" +
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
		this.model.on('refresh', this.refresh, this);
		
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
				this.model.get("avatar_url") +
				"<span class='lead'>  <input type = 'text' id='edit-tweet' class='span7' value = '{{text}}'/> </span> <br />" +
				"<span><span class='time'>" + moment(this.model.get("created")).add('hours',7).fromNow() + "</span> by : <b>{{name}}</b></span>" +
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
				//tweets.fetch();
			}
		},
		'keypress #edit-tweet' : function(e){
			if(this.model.get("editable") && e.which == 13){
				
				this.$el.find('#save-button').click();
			}
		}
	},
	remove: function(){
			this.$el.remove();
	},
	refresh: function(){
	    var timeFromNow = moment(this.model.get("created")).add('hours',7).fromNow();
	    var spanEl = this.$el.find('.time')[0];
	    $(spanEl).text(timeFromNow);
	}
});

var TweetsView = Backbone.View.extend({
        initialize : function(){
		    this.collection.on('add', this.addOne, this);
		    this.collection.on('reset', this.render, this);
	    },

	    render : function(){
		    this.$el.empty()
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
		    this.collection.forEach(this.appendOne, this );
	    }
});


var TweeterFormView = Backbone.View.extend({
    initialize : function(){
	    this.model.on('reset', this.render, this);
	    this.model.on('change', this.render, this);
	},
    render : function(){
		
		var _template = ""+
		                "<div class='row-fluid'>" +
		                "<div class='span3'> <label>Full Name :</label> </div>" +
		                "<div class='span9'> <fieldset class='form-inline'> " +
		                "<input type='text' id='new_first_name' value='{{first_name}}' class='input-small' />" +
		                "<input type='text' id='new_last_name' value='{{last_name}}' class='input-small' />" +
		                "</fieldset> </div> </div> <br />" +
		                "<div class='row-fluid'>" +
		                "<div class='span3'> <label>Email :</label> </div>" +
		                "<div class='span9'> <input type='email' id='new_email' value='{{email}}'  />  " +
		                "</div> </div>" +
		                "<div class='row-fluid'>" +
		                "<div class='span3'> <label>Username :</label> </div>" +
		                "<div class='span9'> <input type='text' id='new_username' value='{{username}}' />  " +
		                "<button id='save_profile_info_btn' class='hide' /> </div> </div>";
		                
			
		
		this._render(_template);

	},
	_render : function(_template){
	    //alert(_template);
		rendered = Mustache.to_html(_template, this.model.toJSON());
		this.$el.html(rendered);

	},
	events : {
		'click #save_profile_info_btn' : function(){
			var new_first_name = $('#new_first_name').val();
			var new_last_name = $('#new_last_name').val();
			var new_email = $('#new_email').val();
			var new_username = $('#new_username').val();
			var old_model = this.model.toJSON();
			this.model.set("first_name", new_first_name);
			this.model.set("last_name", new_last_name);
			this.model.set("email", new_email);
			this.model.set("username",new_username);
			this.model.save();
			
			$('.first_name').each(function(){
			    $(this).html(new_first_name);
			});
			
			$('.username'+USERID).each(function(){
			    $(this).html(new_username);
			});
			
			$('.full_name'+USERID).each(function(){
			    $(this).html(new_first_name + " " + new_last_name);
			});
			
		}
	}

});
