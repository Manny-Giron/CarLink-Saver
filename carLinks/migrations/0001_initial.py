# Generated by Django 5.1.2 on 2025-01-02 23:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="CarLink",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("cost", models.IntegerField()),
                ("url", models.URLField()),
                ("imgURL", models.URLField()),
                ("notes", models.TextField(max_length=200)),
                ("timeFetched", models.DateTimeField(auto_now_add=True)),
                ("listedDate", models.CharField(max_length=200)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
