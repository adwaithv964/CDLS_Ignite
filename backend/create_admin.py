import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cdls_ignite_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

try:
    User = get_user_model()
    email = 'admin@cdls.com'
    password = 'password123'
    
    if not User.objects.filter(email=email).exists():
        # Adjust arguments based on standard AbstractUser with email as USERNAME_FIELD
        # Usually create_superuser(username, email, password, **extra_fields)
        # But if USERNAME_FIELD is email, logic might vary slightly in custom managers.
        # Assuming standard behavior where we pass required fields.
        user = User.objects.create_superuser(
            username='admin', 
            email=email, 
            password=password, 
            full_name='Admin User'
        )
        print(f"SUCCESS: Created superuser '{email}' with password '{password}'")
    else:
        # Reset password to ensure they can login
        user = User.objects.get(email=email)
        user.set_password(password)
        user.save()
        print(f"SUCCESS: Updated password for '{email}' to '{password}'")

except Exception as e:
    print(f"ERROR: {str(e)}")
