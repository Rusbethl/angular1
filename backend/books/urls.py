from django.urls import path
from .views import book_list, book_detail

urlpatterns = [
    # Para ver todos los libros (GET) y crear uno nuevo (POST)
    path('', book_list, name='book_list'),
    
    # Para actualizar (PUT) o borrar (DELETE) un libro específico por su ID
    path('<int:book_id>/', book_detail, name='book_detail'),
]