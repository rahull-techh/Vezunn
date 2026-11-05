from . import consumers
from django.urls import path


ws_pattern = [
    path('ws/sc/',consumers.MySync.as_asgi(),name="SyncWS"),
    path('ws/asc/',consumers.MyAsync.as_asgi(),name="ASyncWS"),
]