Backbone.Tastypie.csrfToken = $.cookie( 'csrftoken' );
var Fetcher = "ON"

var tweets = new Tweets();
var tv = new TweetsView({collection : tweets});
tweets.fetch({
	success : function(){
		
		$("#tweets").html(tv.el);
	}
});


$(document).ready(function() {

	$("#tweet-btn").click(function(){
		//alert($("#tweet-input").val())
		var tweet = new Tweet({text : $("#tweet-input").val()});
		tweet.save();
		tweets.add(tweet);
		$("#tweet-input").val("");
	});

	$("#tweet-input").keypress(function(e) {
    if(e.which == 13) {
        $("#tweet-btn").click();
    }
});

});


setInterval(function(){ 
    //code goes here that will be run every 5 seconds. 
    if(Fetcher === "ON"){
    	tweets.fetch();  
	}
}, 5000);