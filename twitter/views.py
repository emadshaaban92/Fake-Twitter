from django.views.generic import DetailView
from .models import Tweet, Tweeter
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
	return render(request,'twitter/home.html')

class TweetDetailView(DetailView):
	model = Tweet

class TweeterDetailView(DetailView):
	model = Tweeter