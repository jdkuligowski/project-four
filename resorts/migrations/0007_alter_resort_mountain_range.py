# Generated by Django 4.0.5 on 2022-06-14 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resorts', '0006_resort_mountain_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resort',
            name='mountain_range',
            field=models.CharField(blank=True, default=None, max_length=250),
        ),
    ]
