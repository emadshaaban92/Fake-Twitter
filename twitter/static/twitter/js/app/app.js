var c = window.location.href.search("#");
if(c > 1) {

	var h = window.location.href.split("#")[0];
	//window.location.href = h;
	window.location.assign("");
	//window.location.reload();

}

var Fetcher = "ON"



$(document).ready(function() {

	Backbone.Tastypie.csrfToken = $.cookie( 'csrftoken' );

	tweets = new Tweets();
	var tv = new TweetsView({collection : tweets});
	tweets.fetch({
		success : function(){
			
			$("#tweets").html(tv.el);
		},
		error : function() {
			window.location.reload();
		}
	});

	//alert(window.location.href);
	

	$("#tweet-input").focus();

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