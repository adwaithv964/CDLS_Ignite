import requests
import sys

BASE_URL = "http://localhost:8000/api"

endpoints = [
    "/core/interest/list/",
    "/core/contact/list/",
    "/core/subscribers/list/",
    "/events/host/list/"
]

def check_endpoints():
    print(f"Checking endpoints at {BASE_URL}...")
    success = True
    for ep in endpoints:
        url = f"{BASE_URL}{ep}"
        try:
            print(f"GET {url}", end=" ... ")
            response = requests.get(url, timeout=5)
            print(f"Status: {response.status_code}")
            if response.status_code != 200:
                print(f"  Response: {response.text}")
                success = False
            else:
                print(f"  Data items: {len(response.json())}")
        except Exception as e:
            print(f"FAILED: {e}")
            success = False
    
    return success

if __name__ == "__main__":
    if check_endpoints():
        print("\nAll endpoints working correctly.")
    else:
        print("\nSome endpoints failed.")
