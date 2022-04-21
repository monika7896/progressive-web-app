from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.core import serializers
from django.http import HttpResponse ,JsonResponse
import json
from .models import Todo
from django.http import HttpResponseRedirect
from .serializers import *
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
import json as simplejson
from django.core import serializers
from django.core.serializers import serialize
# import requests
from types import SimpleNamespace
from django.views.decorators.csrf import csrf_protect , csrf_exempt
from django.views.decorators.csrf import csrf_exempt

# to fetch data from database
class IndexView(generic.ListView):
    template_name = 'todos/index.html'
    context_object_name = 'todo_list'

    def get_queryset(self):
        """Return all the latest todos."""
        return Todo.objects.order_by('-id')

from django.core.files.storage import FileSystemStorage
import base64

@csrf_exempt
def add(request):
    print("Enter add fn")
    if request.method == 'POST': 

        print("Enter POST")
                  
        try:
            print("Enter Try")
            # title = request.POST['title'] 
            # print("title", title)
            image = request.FILES['image']
            # doc_name = image['filename']


            # image = request.FILES['image']
            print("image", image ,doc_name)
            # image = request.FILES.get("file")
            # fss = FileSystemStorage()
            # filename = fss.save(image.name , image)
            # url = fss.url(filename)
            # print(title , image )
            # Todo.objects.create(title=title , image=image ) 
        
        except KeyError:
                print("Enter Keyerror")
                body_unicode = request.body.decode('utf-8')                
                print("body_unicode" ,body_unicode)
                body = json.loads(body_unicode)
                print("body", body)
                title = body['title']
                image = body['image']

        # body_unicode = request.body.decode('utf-8')
        # print("1")
        # body = json.loads(body_unicode)
        # print("2")
        # title = body['title']

        Todo.objects.create(title=title) 
        Todo.objects.create(image=image)         
        

        return JsonResponse({'saved':True })
        # return HttpResponse("Success!") # Sending an success response
    return redirect('todos:index')



def delete(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    todo.delete()
    return redirect('todos:index')

def update(request, todo_id):
    todo = get_object_or_404(Todo, pk=todo_id)
    isCompleted = request.POST.get('isCompleted', False)
    if isCompleted == 'on':
        isCompleted = True
    
    todo.isCompleted = isCompleted
    todo.save()
    return redirect('todos:index')

def base_layout(request):
    return render(request,'todos/base.html')   


@api_view(['GET', 'POST', 'DELETE'])
def getdataapi(request):
  
    if request.method == 'GET':
        todo=Todo.objects.all()
        title = request.query_params.get('title', None)


        if title is not None:
            todo = todo.filter(title__icontains=title)

        todo_serializer = TodoSerializer(todo, many=True)
        # jsondata = todo_serializer.data
        # jsondata = json.dumps(jsondata_list ,indent=4)

        # return HttpResponse(jsondata)
        return JsonResponse(todo_serializer.data ,safe=False) 


    elif request.method == 'POST':
        todo_data = JSONParser().parse(request)
        todo_serializer = TodoSerializer(data=todo_data)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return JsonResponse(todo_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# creating one
class CreateTodo(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer




# def submit_form(request):

#     if request.method=='POST':
#         payload =json.loads(request.POST['data'])


#         title = request.POST['title']
#         Todo.objects.create(title=title)
#     return redirect('todos:index')
        