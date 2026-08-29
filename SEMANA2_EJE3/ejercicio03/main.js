const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error("JSON inválido"));
            }
        });

        req.on("error", () => {
            reject(new Error("Error al leer el cuerpo de la solicitud"));
        });
    });
}

const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const { method, url } = req;

    try {
        // GET /students
        if (url === "/students" && method === "GET") {
            sendJson(res, 200, repo.getAll());
            return;
        }

        // GET /students/:id
        if (url.startsWith("/students/") && method === "GET") {
            const id = Number(url.split("/")[2]);
            const student = repo.getById(id);

            if (student) {
                sendJson(res, 200, student);
            } else {
                sendJson(res, 404, { error: "Estudiante no encontrado" });
            }
            return;
        }

        // POST /students
        if (url === "/students" && method === "POST") {
            const student = await readBody(req);
            const newStudent = repo.create(student);
            sendJson(res, 201, newStudent);
            return;
        }

        // PUT /students/:id
        if (url.startsWith("/students/") && method === "PUT") {
            const id = Number(url.split("/")[2]);
            const updateData = await readBody(req);
            const updated = repo.update(id, updateData);

            if (updated) {
                sendJson(res, 200, updated);
            } else {
                sendJson(res, 404, { error: "Estudiante no encontrado" });
            }
            return;
        }

        // DELETE /students/:id
        if (url.startsWith("/students/") && method === "DELETE") {
            const id = Number(url.split("/")[2]);
            const deleted = repo.remove(id);

            if (deleted) {
                sendJson(res, 200, deleted);
            } else {
                sendJson(res, 404, { error: "Estudiante no encontrado" });
            }
            return;
        }

        // POST /ListByStatus
        if (url === "/ListByStatus" && method === "POST") {
            const body = await readBody(req);

            if (!body.status || String(body.status).trim() === "") {
                sendJson(res, 400, { error: "Faltan campos obligatorios: status" });
                return;
            }

            const students = repo.listByStatus(body.status);
            sendJson(res, 200, students);
            return;
        }

        // POST /ListByGrade
        if (url === "/ListByGrade" && method === "POST") {
            const body = await readBody(req);

            if (body.grade === undefined || body.grade === null || String(body.grade).trim() === "") {
                sendJson(res, 400, { error: "Faltan campos obligatorios: grade" });
                return;
            }

            const students = repo.listByGrade(body.grade);
            sendJson(res, 200, students);
            return;
        }

        sendJson(res, 404, { error: "Ruta no encontrada" });
    } catch (error) {
        const message = error.message || "Error interno del servidor";

        if (message.startsWith("Faltan campos obligatorios")) {
            sendJson(res, 400, { error: message });
            return;
        }

        if (message === "JSON inválido") {
            sendJson(res, 400, { error: "JSON inválido" });
            return;
        }

        sendJson(res, 500, { error: message });
    }
});

server.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});