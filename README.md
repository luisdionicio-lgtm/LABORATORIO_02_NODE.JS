# LABORATORIO 02 - Node.js

Proyecto con varios ejercicios de Node.js. El ejercicio 3 contiene una API REST simple usando solo `http` y datos en memoria.

## Ejercicio 3

### Puerto

```txt
http://localhost:4000
```

### Endpoints principales

- `GET /students`
- `GET /students/:id`
- `POST /students`
- `PUT /students/:id`
- `DELETE /students/:id`
- `POST /ListByStatus`
- `POST /ListByGrade`

### Datos de ejemplo

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "grade": 20,
  "age": 23,
  "email": "juan.perez@ejemplo.com",
  "phone": "+51 987654321",
  "enrollmentNumber": "2025001",
  "course": "Diseño y Desarrollo de Software C24",
  "year": 3,
  "subjects": ["Algoritmos", "Bases de Datos", "Redes"],
  "gpa": 3.8,
  "status": "Activo",
  "admissionDate": "2022-03-01"
}
```

### Validación

Para crear un estudiante, los campos obligatorios son:

- `name`
- `email`
- `course`
- `phone`

Si faltan, la API responde con:

```json
{
  "error": "Faltan campos obligatorios: name, email, course, phone"
}
```

### Ejecutar

```bash
cd "C:/Users/Luis Angel/LABORATORIO_02_NODE.JS/SEMANA2_EJE3/ejercicio03"
node main.js
```

### Importante

- Los datos se guardan en memoria.
- Se reinician al detener el servidor.
- El repositorio usa `.gitignore` para excluir `node_modules`, `.env`, `.vscode`, `.idea` y archivos locales.

