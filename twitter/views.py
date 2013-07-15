from django.views.generic import DetailView
from .models import Tweet, Tweeter
from django.http import HttpResponse
from django.shortcuts import render

from avatar.forms import PrimaryAvatarForm, DeleteAvatarForm, UploadAvatarForm
from avatar.views import _get_avatars

def home(request):
    if request.user.is_authenticated() :
        avatar, avatars = _get_avatars(request.user)
        upload_avatar_form = UploadAvatarForm(user=request.user)
        primary_avatar_form = PrimaryAvatarForm(request.POST or None,
            user=request.user, avatars=avatars)
        
        return render(request,'twitter/home.html',{ 'avatar': avatar,
                  'avatars': reversed(avatars),
                  'avatars_count' : avatars.count,
                  'upload_avatar_form': upload_avatar_form,
                  'primary_avatar_form': primary_avatar_form, }
            )
    else :
        return render(request, 'twitter/home.html')
        
        
class TweetDetailView(DetailView):
    model = Tweet

class TweeterDetailView(DetailView):
    model = Tweeter
