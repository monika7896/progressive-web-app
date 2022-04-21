from django.urls import path
from . import views
from todos.views import *

app_name='todos'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:todo_id>/delete', views.delete, name='delete'),
    path('<int:todo_id>/update', views.update, name='update'),
    path('add/', views.add, name='add'),
    path('base_layout',views.base_layout,name='base_layout'),
    # path('getdata',views.getdata,name='getdata')
    path('create/', CreateTodo.as_view()),
    path('getdataapi',views.getdataapi,name='getdataapi')


]