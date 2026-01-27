from django.urls import path
from .views import (
    EventListCreateView, EventDetailView, HostEventCreateView, HostEventListView,
    host_event_create_mongo, host_event_list_mongo, host_event_delete_mongo,
    EventRegistrationCreateView, EventRegistrationListView
)

urlpatterns = [
    path('', EventListCreateView.as_view(), name='event-list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('register/', EventRegistrationCreateView.as_view(), name='event-register'),
    path('registrations/<int:event_id>/', EventRegistrationListView.as_view(), name='event-registrations'),
    # path('host/', HostEventCreateView.as_view(), name='host-event-create'),
    path('host/', host_event_create_mongo, name='host-event-create-mongo'),
    # path('host/list/', HostEventListView.as_view(), name='host-event-list'),
    path('host/list/', host_event_list_mongo, name='host-event-list-mongo'),
    path('host/delete/<str:object_id>/', host_event_delete_mongo, name='host-event-delete-mongo'),
]
