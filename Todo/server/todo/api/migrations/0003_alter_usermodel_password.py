# Generated by Django 5.1.6 on 2025-02-17 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_usermodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='password',
            field=models.TextField(max_length=100),
        ),
    ]
