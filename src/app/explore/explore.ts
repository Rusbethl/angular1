import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common'; // <-- 1. Descomentado
import { FormsModule } from '@angular/forms';
import { Layout } from '../layout/layout';
import { SearchBar } from '../search-bar/search-bar';
import { BookService, Book } from '../book'; 

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, Layout, SearchBar, FormsModule], // <-- 2. Agregado CommonModule aquí
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore implements OnInit {
  books: Book[] = []; 
  filteredBooks: Book[] = []; 

  newTitle: string = '';
  newAuthor: string = '';
  newCategory: string = 'Ficción';

  // --- VARIABLES PARA EL MODAL DE APUNTES ---
  isNotesModalOpen: boolean = false;
  selectedBookForNotes: Book | null = null;
  notesDraft: string = '';

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
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al cargar los libros desde el servidor:', err);
      }
    });
  }

  onDelete(id: string | number | undefined) {
    if (id === undefined) return; 

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
    if (this.newTitle.trim() === '' || this.newAuthor.trim() === '') return;

    const newBookData = {
      title: this.newTitle,
      author: this.newAuthor,
      category: this.newCategory,
      status: 'Pendiente',
      notes: '' // Inicializamos sin apuntes
    };

    this.bookService.addBook(newBookData).subscribe({
      next: (libroCreado) => {
        this.books = [...this.books, libroCreado];
        this.filteredBooks = [...this.filteredBooks, libroCreado];

        this.newTitle = '';
        this.newAuthor = '';
        this.newCategory = 'Ficción';
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al intentar guardar el libro:', err);
      }
    });
  }

  onToggleStatus(book: Book) {
    if (book.id === undefined) return;

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
    this.cdr.detectChanges(); 
  }

  // --- FUNCIONES DEL MODAL DE APUNTES ---

  openNotes(book: Book) {
    this.selectedBookForNotes = book;
    
    this.notesDraft = book.notes || ''; // Cargamos los apuntes previos o dejamos en blanco
    this.isNotesModalOpen = true;
    this.cdr.detectChanges(); // <-- 3. Agregado para que abra rápido
  }

  closeNotes() {
    this.isNotesModalOpen = false;
    this.selectedBookForNotes = null;
    this.notesDraft = '';
    this.cdr.detectChanges(); // <-- 4. Agregado para que cierre rápido
  }

  saveNotes() {
    if (!this.selectedBookForNotes || this.selectedBookForNotes.id === undefined) return;

    this.bookService.updateBook(this.selectedBookForNotes.id, { notes: this.notesDraft }).subscribe({
      next: () => {
        // Actualizamos visualmente el libro sin recargar todo
        this.selectedBookForNotes!.notes = this.notesDraft;
        this.closeNotes();
      },
      error: (err) => {
        console.error('Error al guardar los apuntes:', err);
      }
    });
  }
}