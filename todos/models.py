from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=100 ,null=True, blank=True)
    image = models.ImageField(upload_to='images/' ,default='default.jpg' , blank=True)
    attachment = models.FileField(upload_to="attachments" ,blank=True , null=True)


    # created_at = models.DateTimeField('Created', auto_now_add=True)
    # update_at = models.DateTimeField('Updated', auto_now=True)
    # isCompleted = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.title
