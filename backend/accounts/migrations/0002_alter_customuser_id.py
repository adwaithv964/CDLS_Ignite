# This migration is a no-op on MongoDB.
# The original AlterField(id -> BigAutoField) tried to rename MongoDB's _id
# field which is immutable. MongoDB manages _id natively via DEFAULT_AUTO_FIELD.
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = []  # No-op: MongoDB handles _id natively
