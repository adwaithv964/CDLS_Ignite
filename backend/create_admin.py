import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cdls_ignite_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

try:
    User = get_user_model()
    email = 'admin@cdls.com'
    password = 'cdlskerala2025'
    username = 'admin'
    
    # Check if the user exists by username OR email
    user_by_email = User.objects.filter(email=email).first()
    user_by_username = User.objects.filter(username=username).first()
    
    user = user_by_email or user_by_username
    
    if not user:
        # User doesn't exist at all, create it
        user = User.objects.create_superuser(
            username=username, 
            email=email, 
            password=password, 
            full_name='Admin User'
        )
        print(f"SUCCESS: Created superuser '{email}' with password '{password}'")
    else:
        # User already exists in some form. Make sure the email is what we expect
        # so they can login (dj-rest-auth uses email as login method).
        if user.email != email:
            user.email = email
            user.save(update_fields=['email'])
            print(f"SUCCESS: Updated existing '{user.username}' email to '{email}'.")
        else:
            print(f"SUCCESS: Admin user '{email}' already exists.")
        
        # Reset password to ensure they can login with the known credentials
        user.set_password(password)
        user.save(update_fields=['password'])
        print(f"SUCCESS: Reset password for '{email}' to '{password}'.")

except Exception as e:
    print(f"ERROR: {str(e)}")
