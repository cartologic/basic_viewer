from django.views.generic.base import TemplateView

from . import APP_NAME


class IndexView(TemplateView):

    template_name = "{}/index.html".format(APP_NAME)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class ConfigView(TemplateView):

    template_name = "{}/config.html".format(APP_NAME)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context