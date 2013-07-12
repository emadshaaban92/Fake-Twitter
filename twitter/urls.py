from django.conf.urls import patterns, include, url
from .views import TweetDetailView, TweeterDetailView
from django.contrib.auth.views import login, logout
from django.views.generic import RedirectView
import settings
from django.contrib import admin
admin.autodiscover()

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
	url(r'^$', 'twitter.views.home', name='home'),
    # url(r'^twitter/', include('twitter.foo.urls')),
 	url(r'^tweets/(?P<pk>\d+)/$', TweetDetailView.as_view()),
    url(r'^tweeters/(?P<pk>\d+)/$', TweeterDetailView.as_view()),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^api/rest/', include('apirest.urls')),
    #(r'^accounts/login/$',  login),
    #(r'^accounts/logout/$', logout, {'next_page': '/'}),
    (r'^accounts/profile/$', RedirectView.as_view(url='/')),
    (r'^accounts/', include('registration.backends.default.urls')),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    
)
