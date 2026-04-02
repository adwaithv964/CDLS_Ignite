#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --no-input

# Fake-apply the 0002_alter_*_id migrations.
# These try to rename MongoDB's _id field which is immutable — it cannot be done.
# Faking them tells Django they're "done" without touching the database.
# Safe: DEFAULT_AUTO_FIELD=ObjectIdAutoField in settings.py already ensures
# ObjectId is used for all new documents in MongoDB.
python manage.py migrate accounts 0002 --fake 2>/dev/null || true
python manage.py migrate core 0002 --fake 2>/dev/null || true
python manage.py migrate events 0002 --fake 2>/dev/null || true
python manage.py migrate members 0002 --fake 2>/dev/null || true

# Apply all remaining migrations normally
python manage.py migrate

python create_admin.py
