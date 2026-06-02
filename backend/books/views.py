from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Book
import json
from django.views.decorators.csrf import csrf_exempt

# Usamos csrf_exempt temporalmente para permitir que Angular mande datos sin bloqueo de seguridad
@csrf_exempt
def book_list(request):
    if request.method == 'GET':
        # LEER: Obtenemos todos los libros y los mandamos a Angular
        books = list(Book.objects.values())
        return JsonResponse(books, safe=False)

    elif request.method == 'POST':
        # CREAR: Angular nos manda un nuevo libro y lo guardamos
        data = json.loads(request.body)
        new_book = Book.objects.create(
            title=data['title'],
            author=data['author'],
            category=data['category'],
            status=data['status']
        )
        # Devolvemos el libro recién creado (con su ID generado)
        return JsonResponse({
            'id': new_book.id,
            'title': new_book.title,
            'author': new_book.author,
            'category': new_book.category,
            'status': new_book.status
        }, status=201)

@csrf_exempt
def book_detail(request, book_id):
    if request.method == 'DELETE':
        # BORRAR (Se queda igual)
        try:
            book = Book.objects.get(id=book_id)
            book.delete()
            return JsonResponse({'message': 'Libro eliminado correctamente'})
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Libro no encontrado'}, status=404)
            
    elif request.method == 'PUT':
        # ACTUALIZAR: Buscamos el libro y le cambiamos los datos
        try:
            book = Book.objects.get(id=book_id)
            data = json.loads(request.body)
            
            # Actualizamos el estado (y cualquier otro dato que nos manden)
            book.status = data.get('status', book.status)
            book.title = data.get('title', book.title)
            book.author = data.get('author', book.author)
            book.category = data.get('category', book.category)
            
            book.save() # Guardamos los cambios en MySQL
            
            return JsonResponse({
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'category': book.category,
                'status': book.status
            })
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Libro no encontrado'}, status=404)