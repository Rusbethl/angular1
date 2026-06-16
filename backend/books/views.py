from django.shortcuts import render
from django.http import JsonResponse
from .models import Book
import json
from django.views.decorators.csrf import csrf_exempt

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
            status=data.get('status', 'Pendiente'),
            notes=data.get('notes', '') # <-- RECIBIMOS LOS APUNTES AL CREAR
        )
        return JsonResponse({
            'id': new_book.id,
            'title': new_book.title,
            'author': new_book.author,
            'category': new_book.category,
            'status': new_book.status,
            'notes': new_book.notes # <-- DEVOLVEMOS LOS APUNTES
        }, status=201)

@csrf_exempt
def book_detail(request, book_id):
    if request.method == 'DELETE':
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
            
            # Actualizamos los datos
            book.status = data.get('status', book.status)
            book.title = data.get('title', book.title)
            book.author = data.get('author', book.author)
            book.category = data.get('category', book.category)
            book.notes = data.get('notes', book.notes) # <-- ACTUALIZAMOS LOS APUNTES
            
            book.save() # Guardamos los cambios en MySQL
            
            return JsonResponse({
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'category': book.category,
                'status': book.status,
                'notes': book.notes # <-- DEVOLVEMOS LOS APUNTES ACTUALIZADOS
            })
        except Book.DoesNotExist:
            return JsonResponse({'error': 'Libro no encontrado'}, status=404)