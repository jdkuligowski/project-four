# Generated by Django 4.0.5 on 2022-06-10 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resorts', '0004_alter_resort_mountain_detail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='resort',
            name='resort_image',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
    ]
