import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importamos ChangeDetectorRef
import { FormsModule } from '@angular/forms';
import { Layout } from '../layout/layout';
import { SearchBar } from '../search-bar/search-bar';
import { BookService, Book } from '../book'; 

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [Layout, SearchBar, FormsModule],
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore implements OnInit {
  books: Book[] = []; 
  filteredBooks: Book[] = []; 

  newTitle: string = '';
  newAuthor: string = '';
  newCategory: string = 'Ficción';

  // <-- 2. Inyectamos 'cdr' en el constructor
  constructor(
    private bookService: BookService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = [...this.books]; 
        this.cdr.detectChanges(); // <-- Avisamos a la pantalla que redibuje los libros cargados
      },
      error: (err) => {
        console.error('Error al cargar los libros desde el servidor:', err);
      }
    });
  }

  onDelete(id: string | number | undefined) {
    if (id === undefined) {
      return; 
    }

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks(); 
      },
      error: (err) => {
        console.error('Error al intentar borrar el libro:', err);
      }
    });
  }

  onAddBook() {
    if (this.newTitle.trim() === '' || this.newAuthor.trim() === '') {
      return;
    }

    const newBookData = {
      title: this.newTitle,
      author: this.newAuthor,
      category: this.newCategory,
      status: 'Pendiente'
    };

    this.bookService.addBook(newBookData).subscribe({
      next: (libroCreado) => {
        // <-- 3. Creamos nuevas referencias de arreglos (ayuda a Angular a notar el cambio)
        this.books = [...this.books, libroCreado];
        this.filteredBooks = [...this.filteredBooks, libroCreado];

        // Limpiamos el formulario
        this.newTitle = '';
        this.newAuthor = '';
        this.newCategory = 'Ficción';
        
        // <-- 4. Forzamos la actualización visual inmediata en el HTML
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al intentar guardar el libro:', err);
      }
    });
  }

  onToggleStatus(book: Book) {
    if (book.id === undefined) {
      return;
    }

    const newStatus = book.status === 'Pendiente' ? 'Leído' : 'Pendiente';

    this.bookService.updateBook(book.id, { status: newStatus }).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (err) => {
        console.error('Error al intentar cambiar el estado del libro:', err);
      }
    });
  }

  onSearch(searchTerm: string) {
    const term = searchTerm.toLowerCase(); 
    
    this.filteredBooks = this.books.filter(book => 
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term)
    );
    this.cdr.detectChanges(); // <-- Asegura que el filtrado de búsqueda también reaccione al instante
  }
}