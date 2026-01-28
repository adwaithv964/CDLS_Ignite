from rest_framework import generics, permissions
from .models import ContactMessage, InterestExpression, Subscriber
from .serializers import ContactMessageSerializer, InterestExpressionSerializer, SubscriberSerializer

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

class InterestCreateView(generics.CreateAPIView):
    queryset = InterestExpression.objects.all()
    serializer_class = InterestExpressionSerializer
    permission_classes = [permissions.AllowAny]

class InterestListView(generics.ListAPIView):
    queryset = InterestExpression.objects.all()
    serializer_class = InterestExpressionSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ['category']

class ContactListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAdminUser]

class SubscriberCreateView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [permissions.AllowAny]

class SubscriberListView(generics.ListAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [permissions.IsAdminUser]

# MongoDB Views
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from cdls_ignite_backend.mongo_db import get_db
import datetime
from django.views.decorators.csrf import csrf_exempt
from bson import ObjectId

@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def contact_delete_mongo(request, object_id):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        result = db.inquiries.delete_one({'_id': ObjectId(object_id)})
        if result.deleted_count == 1:
            return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def contact_create_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    data = request.data
    # Basic validation
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Add timestamp
    data['created_at'] = datetime.datetime.utcnow()
    
    try:
        result = db.inquiries.insert_one(data)
        return Response({"id": str(result.inserted_id), "message": "Inquiry submitted successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([permissions.AllowAny]) # Changing to AllowAny for dev, should be IsAdmin for prod
def contact_list_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        inquiries = list(db.inquiries.find().sort('created_at', -1))
        # Convert ObjectId to string for JSON serialization
        for inquiry in inquiries:
            inquiry['_id'] = str(inquiry['_id'])
        return Response(inquiries, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def interest_create_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    data = request.data
    # Basic validation
    if not data.get('name') or not data.get('email') or not data.get('category'):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    data['created_at'] = datetime.datetime.utcnow()
    
    try:
        # We can store all interests in one collection or separate. 
        # Using 'interests' collection and filtering by category is standard.
        result = db.interests.insert_one(data)
        return Response({"id": str(result.inserted_id), "message": "Interest submitted successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def interest_list_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    category = request.query_params.get('category')
    query = {}
    if category:
        query['category'] = category

    try:
        interests = list(db.interests.find(query).sort('created_at', -1))
        for item in interests:
            item['_id'] = str(item['_id'])
        return Response(interests, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def subscriber_create_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    data = request.data
    if not data.get('email'):
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    data['created_at'] = datetime.datetime.utcnow()
    
    try:
        # Check for duplicate email?
        existing = db.subscribers.find_one({"email": data['email']})
        if existing:
             return Response({"message": "Already subscribed"}, status=status.HTTP_200_OK)

        result = db.subscribers.insert_one(data)
        return Response({"id": str(result.inserted_id), "message": "Subscribed successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def subscriber_list_mongo(request):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        subscribers = list(db.subscribers.find().sort('created_at', -1))
        for sub in subscribers:
            sub['_id'] = str(sub['_id'])
        return Response(subscribers, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def interest_delete_mongo(request, object_id):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        result = db.interests.delete_one({'_id': ObjectId(object_id)})
        if result.deleted_count == 1:
            return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(['DELETE'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def subscriber_delete_mongo(request, object_id):
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        result = db.subscribers.delete_one({'_id': ObjectId(object_id)})
        if result.deleted_count == 1:
            return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def dashboard_stats_mongo(request):
    """
    Optimized endpoint that returns all dashboard statistics in a single API call.
    This reduces the number of requests from 4 to 1, improving performance 
    especially for cold-start scenarios with free-tier hosting.
    """
    db = get_db()
    if db is None:
        return Response({"error": "Database connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        # Fetch all data in parallel using MongoDB
        events = list(db.community_events.find().sort('created_at', -1))
        interests = list(db.interests.find().sort('created_at', -1))
        inquiries = list(db.inquiries.find().sort('created_at', -1))
        subscribers = list(db.subscribers.find().sort('created_at', -1))
        
        # Calculate stats
        total_events = len(events)
        active_members = len([i for i in interests if i.get('category') in ['coworker', 'startup']])
        pending_requests = len(inquiries)
        total_subscribers = len(subscribers)
        
        # Prepare recent activity (top 10 most recent across all categories)
        activities = []
        
        # Add events
        for event in events:
            activities.append({
                '_id': str(event['_id']),
                'type': 'Event Request',
                'description': f"New event request: \"{event.get('event_title', 'N/A')}\" by {event.get('name', 'Unknown')}",
                'created_at': event.get('created_at').isoformat() if event.get('created_at') else None,
                'color': 'text-blue-500'
            })
        
        # Add interests
        for interest in interests:
            activities.append({
                '_id': str(interest['_id']),
                'type': 'Interest',
                'description': f"New {interest.get('category', 'unknown')} interest from {interest.get('name', 'Unknown')}",
                'created_at': interest.get('created_at').isoformat() if interest.get('created_at') else None,
                'color': 'text-green-500'
            })
        
        # Add inquiries
        for inquiry in inquiries:
            message_preview = inquiry.get('message', '')[:30] + '...' if len(inquiry.get('message', '')) > 30 else inquiry.get('message', 'N/A')
            activities.append({
                '_id': str(inquiry['_id']),
                'type': 'Inquiry',
                'description': f"New inquiry from {inquiry.get('name', 'Unknown')}: \"{message_preview}\"",
                'created_at': inquiry.get('created_at').isoformat() if inquiry.get('created_at') else None,
                'color': 'text-orange-500'
            })
        
        # Add subscribers
        for subscriber in subscribers:
            activities.append({
                '_id': str(subscriber['_id']),
                'type': 'Subscriber',
                'description': f"New subscriber: {subscriber.get('email', 'Unknown')}",
                'created_at': subscriber.get('created_at').isoformat() if subscriber.get('created_at') else None,
                'color': 'text-purple-500'
            })
        
        # Sort by created_at descending and take top 10
        activities.sort(key=lambda x: x['created_at'] or '', reverse=True)
        recent_activity = activities[:10]
        
        # Return aggregated response
        return Response({
            'stats': {
                'total_events': total_events,
                'active_members': active_members,
                'pending_requests': pending_requests,
                'subscribers': total_subscribers
            },
            'recent_activity': recent_activity
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

