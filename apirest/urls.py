from django.conf.urls.defaults import *
from tastypie.api import Api
from api import *


v1_api = Api(api_name='v1')
v1_api.register(TweetResource())
v1_api.register(TweeterResource())

urlpatterns = patterns('',
    (r'^', include(v1_api.urls)),
)
