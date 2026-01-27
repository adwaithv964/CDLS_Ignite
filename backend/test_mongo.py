import os
import sys
import django
from pathlib import Path

# Add backend to path so we can import settings/modules
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Load .env file manually
env_path = BASE_DIR.parent / '.env'
if env_path.exists():
    print(f"Loading .env from {env_path}")
    with open(env_path, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                try:
                    key, val = line.split('=', 1)
                    os.environ[key] = val
                    if key == 'MONGO_URI':
                        print("Found MONGO_URI in .env")
                except ValueError:
                    continue # Skip invalid lines

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cdls_ignite_backend.settings')

# Initialize Django
django.setup()

try:
    from cdls_ignite_backend.mongo_db import get_db
    
    print("Attempting to connect to MongoDB...")
    db = get_db()
    
    if db is not None:
        print("Connection successful! (Client created)")
        # Try a ping
        db.command('ping')
        print("Ping successful!")
    else:
        print("Connection failed: get_db() returned None (Check your MONGO_URI in .env)")

except Exception as e:
    print(f"Test failed with error: {e}")
