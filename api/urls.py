try:
    from django.conf.urls import *
except ImportError:  # django < 1.4
    from django.conf.urls.defaults import *

from .views import TweetsAPIView, TweetAPIView

# place app url patterns here

urlpatterns = patterns('',
    url(r'^tweets', TweetsAPIView.as_view()),
    url(r'^tweet/(?P<pk>\d+)/$', TweetAPIView.as_view()),
    
)