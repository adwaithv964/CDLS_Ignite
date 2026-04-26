from django.urls import path
from .views import MemberListCreateView, MemberDetailView

urlpatterns = [
    path('', MemberListCreateView.as_view(), name='member-list'),
    path('<str:pk>/', MemberDetailView.as_view(), name='member-detail'),
]
