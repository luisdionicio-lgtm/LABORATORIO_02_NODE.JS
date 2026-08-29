const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3001;

const server = http.createServer((req, res) => {

    // Página principal
    if (req.url === "/") {

        const filePath = path.join(__dirname, "views", "home.hbs");

        fs.readFile(filePath, "utf8", (err, templateData) => {

            if (err) {
                res.statusCode = 500;
                res.end("Error interno del servidor");
                return;
            }

            const template = handlebars.compile(templateData);

            const data = {
                title: "Servidor con Handlebars 🚀",
                welcomeMessage: "Bienvenido al laboratorio de Node.js",
                day: new Date().toLocaleDateString("es-PE"),
                students: ["Ana", "Luis", "Pedro", "María"]
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });


    // Página About
    } else if (req.url === "/about") {

        const filePath = path.join(__dirname, "views", "about.hbs");

        fs.readFile(filePath, "utf8", (err, templateData) => {

            if (err) {
                res.statusCode = 500;
                res.end("Error interno del servidor");
                return;
            }

            const template = handlebars.compile(templateData);

            const data = {
                course: "Desarrollo de Aplicaciones Web Avanzado",
                teacher: "Edwin William Arévalo Sermeño",
                date: new Date().toLocaleDateString("es-PE")
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });


    // Página Students
    } else if (req.url === "/students") {

        const filePath = path.join(__dirname, "views", "students.hbs");

        fs.readFile(filePath, "utf8", (err, templateData) => {

            if (err) {
                res.statusCode = 500;
                res.end("Error interno del servidor");
                return;
            }

            const template = handlebars.compile(templateData);

            const students = [
                {
                    name: "Ana",
                    grade: 18,
                    highlight: true
                },
                {
                    name: "Luis",
                    grade: 14,
                    highlight: false
                },
                {
                    name: "Pedro",
                    grade: 16,
                    highlight: true
                },
                {
                    name: "María",
                    grade: 15,
                    highlight: false
                }
            ];

            const data = {
                students: students
            };

            const html = template(data);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });


    // Ruta no encontrada
    } else {

        res.statusCode = 404;
        res.end("<h1>404 - Página no encontrada</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});