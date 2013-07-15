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
	
	tweeter = new Tweeter({id:USERID});
	tweeterFormView = new TweeterFormView({model : tweeter});
	tweeter.fetch({
	    success : function(){
	        tweeterFormView.render();
	        $('#personalInfoTab').html(tweeterFormView.el);
	    }
	});
	
	$('#save_personal_info_btn').click(function(){
	    $('#save_profile_info_btn').click();
	});

	tweets = new Tweets();
	var tv = new TweetsView({collection : tweets});
	tweets.fetch({
		success : function(){
		    tts = tweets.clone();
		    editable = tweets.filter(function(model) { return model.get("editable") });
    	
			
			$("#tweets").html(tv.el);
			//tweets.forEach(function(model) {model.trigger("refresh")});
		},
		error : function() {
			window.location.reload();
		}
	});

	//alert(window.location.href);
	$('input[type=file]').bootstrapFileInput();
    $('.file-inputs').bootstrapFileInput();
	

	$("#tweet-input").focus();

	$("#tweet-btn").click(function(){
		//alert($("#tweet-input").val())
		var tweet = new Tweet({text : $("#tweet-input").val()});
		tweet.save();
		tweets.add(tweet);
		editable.push(tweet);
		$("#tweet-input").val("");
	});

	$("#tweet-input").keypress(function(e) {
        if(e.which == 13) {
            $("#tweet-btn").click();
        }
    });
    
    
    $('#changeAvatarForm').ajaxForm(function() { 
         var oldImageItems = $.find("[alt='"+ USERNAME +"']");
         var newImageURL = $('#changeAvatarForm').find('a.active img').attr("src");
         $(oldImageItems).each(function(){
            $(this).attr("src", newImageURL);
         });
         
    }); 
    
    ajaxifychangeAvatarForm();
    ajaxifyUploadForm();
    
    
});


setInterval(function(){ 
    //code goes here that will be run every 5 seconds. 
    if(Fetcher === "ON"){
        tts.fetch();
        var updatable = tts.filter(function(model) { return !model.get("editable") });
        tweets.update(editable.concat(updatable));
    	//tweets.forEach(function(model) {model.trigger("refresh")}); 
	}
}, 5000);

setInterval(function(){ 
        tweets.forEach(function(model) {model.trigger("refresh")}); 
}, 60000);


function refresh_avatar_after_upload() { 
     //alert($("#id_avatar").val());
     var newImageName = _.last($("#id_avatar").val().split("\\"));
     var oldImageItems = $.find("[alt='"+ USERNAME +"']");
     var imageItem = $(oldImageItems[0]);
     var oldImageURL = imageItem.attr("src");
     var oldImageName = _.last(oldImageURL.split("/"));
     var newImageURL = oldImageURL.replace(oldImageName, newImageName);
     $(oldImageItems).each(function(){
        $(this).attr("src", newImageURL);
     });
     $("#id_avatar").val("");
     $.get('/',function(data){
        var home = $($.parseHTML(data));
        $('#avatarTab').html(home.find('#avatarTab').html());
        $('input[type=file]').bootstrapFileInput();
        $('.file-inputs').bootstrapFileInput();
        ajaxifyUploadForm();
        ajaxifychangeAvatarForm();
     });
}
    
function ajaxifychangeAvatarForm(){
    $('#changeAvatarForm a').on('click',function() {
        $(this).button('toggle');
        $('#changeAvatarInput').val($(this).attr("av-id"));
        $('#changeAvatarForm').ajaxSubmit(function() { 
             var oldImageItems = $.find("[alt='"+ USERNAME +"']");
             var newImageURL = $('#changeAvatarForm').find('a.active img').attr("src");
             $(oldImageItems).each(function(){
                $(this).attr("src", newImageURL);
             });
        }); 
    
    });
}


function ajaxifyUploadForm(){
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    
    $('#uploadAvatarForm').ajaxForm({
        beforeSend: function() {
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            //refresh_avatar_after_upload();
        },
	    complete: function(xhr) {
		    refresh_avatar_after_upload();
	    }
    }); 

}




