let students = [
    {
        id: 1,
        name: "Juan Pérez",
        grade: 20,
        age: 23,
        email: "juan.perez@ejemplo.com",
        phone: "+51 987654321",
        enrollmentNumber: "2025001",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Algoritmos", "Bases de Datos", "Redes"],
        gpa: 3.8,
        status: "Activo",
        admissionDate: "2022-03-01"
    },
    {
        id: 2,
        name: "María López",
        grade: 16,
        age: 22,
        email: "maria.lopez@ejemplo.com",
        phone: "+51 912345678",
        enrollmentNumber: "2025002",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Programación", "Matemática", "Arquitectura"],
        gpa: 3.6,
        status: "Inactivo",
        admissionDate: "2021-09-15"
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        grade: 18,
        age: 24,
        email: "carlos.ruiz@ejemplo.com",
        phone: "+51 934567890",
        enrollmentNumber: "2025003",
        course: "Diseño y Desarrollo de Software C24",
        year: 3,
        subjects: ["Redes", "Diseño Web", "Base de Datos"],
        gpa: 3.5,
        status: "Activo",
        admissionDate: "2023-01-10"
    }
];

const REQUIRED_FIELDS = ["name", "email", "course", "phone"];

function validateRequiredFields(student) {
    const missing = REQUIRED_FIELDS.filter(field => {
        return !student[field] || String(student[field]).trim() === "";
    });

    if (missing.length > 0) {
        throw new Error(`Faltan campos obligatorios: ${missing.join(", ")}`);
    }
}

function getAll() {
    return students;
}

function getById(id) {
    return students.find(student => student.id === id);
}

function create(student) {
    if (!student || typeof student !== "object") {
        throw new Error("Faltan campos obligatorios: name, email, course, phone");
    }

    validateRequiredFields(student);

    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name: student.name,
        grade: student.grade ?? 0,
        age: student.age ?? 0,
        email: student.email,
        phone: student.phone,
        enrollmentNumber: student.enrollmentNumber ?? "",
        course: student.course,
        year: student.year ?? 0,
        subjects: Array.isArray(student.subjects) ? student.subjects : [],
        gpa: student.gpa ?? 0,
        status: student.status ?? "Activo",
        admissionDate: student.admissionDate ?? ""
    };

    students.push(newStudent);
    return newStudent;
}

function update(id, updateData) {
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        students[index] = { ...students[index], ...updateData };
        return students[index];
    }

    return null;
}

function remove(id) {
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        return students.splice(index, 1)[0];
    }

    return null;
}

function listByStatus(status) {
    return students.filter(student => {
        return student.status && student.status.toLowerCase() === String(status).trim().toLowerCase();
    });
}

function listByGrade(grade) {
    const targetGrade = Number(grade);

    return students.filter(student => Number(student.grade) === targetGrade);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    listByStatus,
    listByGrade
};