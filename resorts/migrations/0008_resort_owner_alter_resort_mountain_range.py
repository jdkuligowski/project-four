# Generated by Django 4.0.5 on 2022-06-14 17:12

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('resorts', '0007_alter_resort_mountain_range'),
    ]

    operations = [
        migrations.AddField(
            model_name='resort',
            name='owner',
            field=models.ManyToManyField(blank=True, related_name='resorts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='resort',
            name='mountain_range',
            field=models.CharField(default=None, max_length=250),
        ),
    ]
