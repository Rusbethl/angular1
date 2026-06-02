import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: string | number; // El ID lo genera MySQL automáticamente
  title: string;
  author: string;
  category: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // URL de tu API de Django corriendo en Docker
  private apiUrl = 'http://localhost:8000/api/books/';

  constructor(private http: HttpClient) {}

  // LEER: Obtener toda la lista desde la base de datos
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // ALTA (CREAR): Enviar un libro nuevo al backend
  addBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, bookData);
  }

  // BAJA (ELIMINAR): Mandar la orden de borrar a Django
  deleteBook(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  // ACTUALIZAR (UPDATE): Mandar cambios a Django
  updateBook(id: string | number, updatedData: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}${id}/`, updatedData);
  }
}