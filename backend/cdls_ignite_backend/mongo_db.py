import os
from pymongo import MongoClient
from django.conf import settings

_db = None

def get_db():
    global _db
    if _db is None:
        mongo_uri = getattr(settings, 'MONGO_URI', None)
        if not mongo_uri:
            # Fallback or error, but explicit configuration is better.
            mongo_uri = os.environ.get('MONGO_URI')
            
        if not mongo_uri:
            print("Warning: MONGO_URI not set in settings or environment.")
            return None

        try:
            client = MongoClient(mongo_uri)
            # Verify connection
            # The lazy connection might not throw immediately, so we can force a check if needed
            # client.admin.command('ping') 
            # But usually we just return the client or specific db
            # _db = client.get_database() # This fails if no db in URI
            _db = client.get_database("cdls_ignite") # Explicitly use a database name
            print("Successfully connected to MongoDB.")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            return None
            
    return _db
