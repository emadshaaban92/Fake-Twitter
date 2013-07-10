from django.db import models
from django.contrib.auth.models import AbstractUser
from model_utils.models import TimeStampedModel


class Tweeter(AbstractUser) :
	following = models.ManyToManyField('self', symmetrical=False, related_name="followers")

	def get_tweets(self):
		return self.tweets.all()

class Tweet(TimeStampedModel):
	tweeter = models.ForeignKey(Tweeter, related_name='tweets')
	text = models.CharField(max_length=140)
	
	def __unicode__(self):
		return self.text