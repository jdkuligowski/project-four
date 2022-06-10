# Generated by Django 4.0.5 on 2022-06-08 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resort',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resort', models.CharField(default=None, max_length=50)),
                ('country', models.CharField(default=None, max_length=50)),
                ('total_length', models.PositiveIntegerField(default=None)),
                ('base', models.PositiveIntegerField(default=None)),
                ('peak', models.PositiveIntegerField(default=None)),
                ('size_range', models.PositiveIntegerField(default=None)),
                ('beginner', models.PositiveIntegerField(default=None)),
                ('intermediate', models.PositiveIntegerField(default=None)),
                ('expert', models.PositiveIntegerField(default=None)),
                ('mountain_range', models.CharField(default=None, max_length=250)),
            ],
        ),
    ]