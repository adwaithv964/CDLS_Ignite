import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cdls_ignite_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

try:
    User = get_user_model()
    email = 'admin@cdls.com'
    password = 'cdlskerala2025'
    username = 'admin'

    # Check if admin user already exists
    user = User.objects.filter(email=email).first()

    if not user:
        # First deploy — create the superuser fresh
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
            full_name='Admin User',
        )
        print(f"SUCCESS: Created superuser '{email}' with password '{password}'")
    else:
        # User already exists.
        # Use queryset .update() instead of instance .save() to avoid the
        # MongoDB "Cannot force an update with no primary key" bug that occurs
        # when the ObjectId isn't populated on the in-memory object after a query.
        hashed = make_password(password)
        updated = User.objects.filter(email=email).update(password=hashed)
        if updated:
            print(f"SUCCESS: Reset password for '{email}' to '{password}'")
        else:
            print(f"WARNING: filter().update() affected 0 rows for '{email}'")

except Exception as e:
    print(f"ERROR in create_admin.py: {str(e)}")
    raise  # Re-raise so Render build logs show the full traceback
