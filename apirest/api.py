from tastypie.resources import ModelResource, ALL
from tastypie.authorization import Authorization
from tastypie.authentication import SessionAuthentication

from .Auth import UserObjectsOnlyAuthorization

from twitter.models import Tweet, Tweeter


class TweetResource(ModelResource):
    class Meta:
        queryset = Tweet.objects.all()
        resource_name = 'tweet'
        always_return_data = True

        authentication = SessionAuthentication()
        #authorization = Authorization()
        authorization = UserObjectsOnlyAuthorization()

    def hydrate(self, bundle):
    	#bundle.obj.id = max(Tweet.objects.all(),key = lambda x : x.id).id+1
    	bundle.obj.tweeter_id = bundle.request.user.id
    	return bundle

    def dehydrate(self, bundle):
        # Include the request IP in the bundle.
        bundle.data['editable'] = (bundle.obj.tweeter_id == bundle.request.user.id)
        return bundle

class TweeterResource(ModelResource):
    class Meta:
        queryset = Tweeter.objects.all()
        resource_name = 'tweeter'
        always_return_data = True

        authorization = Authorization()
