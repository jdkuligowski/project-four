# Generated by Django 4.0.5 on 2022-06-08 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mountains', '0002_lunch'),
    ]

    operations = [
        migrations.AddField(
            model_name='mountain',
            name='mountain_lunch',
            field=models.ManyToManyField(related_name='mountains', to='mountains.lunch'),
        ),
    ]