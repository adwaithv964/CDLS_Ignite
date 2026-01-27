from rest_framework import generics, permissions
from .models import Event, HostEventRequest
from .serializers import EventSerializer, HostEventRequestSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # potentially keep this authenticated or allow read only (default is IsAuthenticatedOrReadOnly)

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class HostEventCreateView(generics.CreateAPIView):
    queryset = HostEventRequest.objects.all()
    serializer_class = HostEventRequestSerializer
    permission_classes = [permissions.AllowAny]

class HostEventListView(generics.ListAPIView):
    queryset = HostEventRequest.objects.all()
    serializer_class = HostEventRequestSerializer
    permission_classes = [permissions.IsAdminUser]

# MongoDB Views
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from cdls_ignite_backend.mongo_db import get_db
import datetime
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def host_event_create_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    data = request.data
    # Basic validation
    if not data.get('event_title') or not data.get('email') or not data.get('name'):
         return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    data['created_at'] = datetime.datetime.utcnow()
    
    try:
        result = db.community_events.insert_one(data)
        return Response({"id": str(result.inserted_id), "message": "Event request submitted successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def host_event_list_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        events = list(db.community_events.find().sort('created_at', -1))
        for event in events:
            event['_id'] = str(event['_id'])
        return Response(events, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
