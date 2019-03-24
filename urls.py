# -*- coding: utf-8 -*-
from django.urls import re_path

from . import APP_NAME
from .views import IndexView,ConfigView

app_name = APP_NAME
urlpatterns = [
    re_path('^$', IndexView.as_view(), name='{}_index'.format(APP_NAME)),
	re_path('^config$', ConfigView.as_view()),
]
