# Generated by Django 4.0.5 on 2022-06-12 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mountains', '0005_remove_mountain_location_score_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mountain',
            name='car_park',
        ),
        migrations.AddField(
            model_name='mountain',
            name='black_runs',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='blue_runs',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='image_1',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='image_2',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='red_runs',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
    ]
