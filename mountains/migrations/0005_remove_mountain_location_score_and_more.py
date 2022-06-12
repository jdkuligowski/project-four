# Generated by Django 4.0.5 on 2022-06-11 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mountains', '0004_alter_mountain_mountain_lunch'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mountain',
            name='location_score',
        ),
        migrations.AddField(
            model_name='mountain',
            name='blue_bird_score',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='bus_score',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='car_score',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='overcast_score',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='weather_comment',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='mountain',
            name='white_out_score',
            field=models.PositiveIntegerField(default=None, null=True),
        ),
    ]