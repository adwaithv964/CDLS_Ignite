from django.urls import path
from .views import (
    ContactCreateView, InterestCreateView, InterestListView, 
    ContactListView, SubscriberCreateView, SubscriberListView,
    contact_create_mongo, contact_list_mongo, contact_delete_mongo,
    interest_create_mongo, interest_list_mongo, interest_delete_mongo,
    subscriber_create_mongo, subscriber_list_mongo, subscriber_delete_mongo,
    dashboard_stats_mongo,
    maintenance_status, maintenance_settings_detail, maintenance_settings_list, maintenance_init
)

urlpatterns = [
    # path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('contact/', contact_create_mongo, name='contact-create-mongo'),
    # path('interest/', InterestCreateView.as_view(), name='interest-create'),
    path('interest/', interest_create_mongo, name='interest-create-mongo'),
    # path('interest/list/', InterestListView.as_view(), name='interest-list'),
    path('interest/list/', interest_list_mongo, name='interest-list-mongo'),
    # path('contact/list/', ContactListView.as_view(), name='contact-list'),
    path('contact/list/', contact_list_mongo, name='contact-list-mongo'),
    # path('subscribe/', SubscriberCreateView.as_view(), name='subscribe-create'),
    path('subscribe/', subscriber_create_mongo, name='subscribe-create-mongo'),
    # path('subscribers/list/', SubscriberListView.as_view(), name='subscriber-list'),
    path('subscribers/list/', subscriber_list_mongo, name='subscriber-list-mongo'),
    path('contact/delete/<str:object_id>/', contact_delete_mongo, name='contact-delete-mongo'),
    path('interest/delete/<str:object_id>/', interest_delete_mongo, name='interest-delete-mongo'),
    path('subscribe/delete/<str:object_id>/', subscriber_delete_mongo, name='subscriber-delete-mongo'),
    path('dashboard/stats/', dashboard_stats_mongo, name='dashboard-stats-mongo'),
    
    # Maintenance mode endpoints
    path('maintenance/status/', maintenance_status, name='maintenance-status'),
    path('maintenance/settings/', maintenance_settings_list, name='maintenance-settings-list'),
    path('maintenance/settings/<str:page_key>/', maintenance_settings_detail, name='maintenance-settings-detail'),
    path('maintenance/init/', maintenance_init, name='maintenance-init'),
]
