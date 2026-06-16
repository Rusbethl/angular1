from django.db import models

class Book(models.Model):
    # El ID único se genera automáticamente en Django, no hace falta ponerlo
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='Pendiente')
    notes = models.TextField(blank=True, null=True) # <-- NUEVO CAMPO PARA APUNTES
    created_at = models.DateTimeField(auto_now_add=True) # Para saber cuándo se agregó

    def __str__(self):
        return self.title