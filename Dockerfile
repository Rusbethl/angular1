FROM python:3.11-slim

# Instalar dependencias del sistema necesarias para compilar mysqlclient en Ubuntu
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Configurar directorio de trabajo
WORKDIR /app

# Copiar e instalar requerimientos de Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código del backend
COPY ./backend /app/

# Exponer el puerto por defecto de Django
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]