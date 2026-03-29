import urllib.request
import urllib.error
import json

url = 'https://cdls-ignite-backend.onrender.com/api/core/interest/list/'
print("Fetching from", url)
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        print("Status", response.status)
        print("Body", response.read().decode())
except urllib.error.HTTPError as e:
    print("HTTPError", e.code)
    print("Error Body", e.read().decode())
except Exception as e:
    print("Other Error", e)
