import os
from django.apps import AppConfig


class AccountsConfig(AppConfig):
    name = 'accounts'
    default_auto_field = (
        'django_mongodb_backend.fields.ObjectIdAutoField'
        if os.environ.get('USE_LOCAL_DB', 'False') != 'True' and os.environ.get('MONGO_URI')
        else 'django.db.models.BigAutoField'
    )

    def ready(self):
        """
        Disconnect the create_permissions post_migrate signal on MongoDB.

        django-mongodb-backend has a bug where ContentType objects created via
        get_or_create() don't have their ObjectId pk set back on the Python
        instance after INSERT. This causes:
            TypeError: Model instances without primary key value are unhashable
        in create_permissions() during the post_migrate signal.

        This application uses Token authentication with a React admin panel,
        so Django's object-level permission system is not needed.
        """
        mongo_uri = os.environ.get('MONGO_URI', '')
        if mongo_uri:
            try:
                from django.db.models.signals import post_migrate
                post_migrate.disconnect(
                    dispatch_uid='django.contrib.auth.management.create_permissions'
                )
            except Exception:
                pass
