# Generated by Django 3.2.9 on 2022-04-01 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0010_auto_20220328_1608'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to='images/'),
        ),
    ]
