from rest_framework import routers
from .api import TaskViewSet

router = routers.DefaultRouter()

router.register('api/task',TaskViewSet, 'tasks')

urlpatterns = router.urls
