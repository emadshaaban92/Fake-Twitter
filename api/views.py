# Create your views here.

from twitter.models import Tweet, Tweeter

from django.views.generic import View
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.list import MultipleObjectMixin
from braces.views import JSONResponseMixin

class TweetsAPIView(JSONResponseMixin, MultipleObjectMixin, View):
	model = Tweet

	def get(self,*agrs):
		data = self.get_queryset()

		return self.render_json_object_response(data)


class TweetAPIView(JSONResponseMixin, SingleObjectMixin, View):
	model = Tweet

	def get(self, *agrs, **kwargs):
		data = self.get_object()

		return self.render_json_object_response([data])