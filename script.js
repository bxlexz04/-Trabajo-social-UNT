document.addEventListener("DOMContentLoaded", () => {
    const materiasData = [
        // PRIMER AÑO
        { id: "TS1_1", nombre: "Introducción al Trabajo Social", año: 1, requiere: [] },
        { id: "TS1_2", nombre: "Metodología del Trabajo Social", año: 1, requiere: [] },
        { id: "TS1_3", nombre: "Trabajo Social y Problemática Filosófica", año: 1, requiere: [] },
        { id: "TS1_4", nombre: "Trabajo Social y Antropología Social y Cultural", año: 1, requiere: [] },
        { id: "TS1_5", nombre: "Trabajo Social e Historia Social Argentina y Latinoamericana", año: 1, requiere: [] },
        { id: "TS1_6", nombre: "Trabajo Social, Teorías del Desarrollo, Teorías del Estado y Políticas Públicas", año: 1, requiere: [] },

        // SEGUNDO AÑO
        { id: "TS2_1", nombre: "Trabajo Social con Grupos: Investigación Diagnóstica", año: 2, requiere: ["TS1_1"] }, // Asumo Introd.
        { id: "TS2_2", nombre: "Trabajo Social con Grupos: Intervención Transformadora", año: 2, requiere: ["TS2_1"] },
        { id: "TS2_3", nombre: "Planeamiento y Evaluación en Trabajo Social", año: 2, requiere: [] },
        { id: "TS2_4", nombre: "Trabajo Social e Investigación Social I", año: 2, requiere: ["TS1_2"] }, // Asumo Metodología
        { id: "TS2_5", nombre: "Trabajo Social y Teoría Social Clásica", año: 2, requiere: [] },
        { id: "TS2_6", nombre: "Trabajo Social y Psicología Social", año: 2, requiere: [] },
        { id: "TS2_7", nombre: "Práctica de Recursos de la Comunidad", año: 2, requiere: ["TS1_2"] }, // Confirmado por el usuario: Metodología
        
        // TERCER AÑO
        { id: "TS3_1", nombre: "Trabajo Social Comunitario", año: 3, requiere: ["TS2_2"] }, // Asumo Intervención Transformadora
        { id: "TS3_2", nombre: "Trabajo Social e Investigación Social II", año: 3, requiere: ["TS2_4"] }, // Asumo Inv. Social I
        { id: "TS3_3", nombre: "Trabajo Social y Teoría Social Contemporánea", año: 3, requiere: ["TS2_5"] }, // Asumo Teoria Social Clásica
        { id: "TS3_4", nombre: "Trabajo Social y Sociedades Complejas y Campesinas", año: 3, requiere: [] },
        { id: "TS3_5", nombre: "Trabajo Social y Salud Pública", año: 3, requiere: [] },
        { id: "TS3_6", nombre: "Lengua y Comunicación", año: 3, requiere: [] },
        { id: "TS3_7", nombre: "Práctica de Trabajo Social con Grupos", año: 3, requiere: ["TS2_2"] }, // Asumo Intervención Transformadora

        // CUARTO AÑO
        { id: "TS4_1", nombre: "Trabajo Social Familiar: Investigación Diagnóstica", año: 4, requiere: ["TS3_1"] }, // Asumo Trabajo Social Comunitario
        { id: "TS4_2", nombre: "Trabajo Social y Problemática Social Argentina", año: 4, requiere: [] },
        { id: "TS4_3", nombre: "Trabajo Social, Economía Social y Políticas Económicas", año: 4, requiere: [] },
        { id: "TS4_4", nombre: "Trabajo Social y Sistemas de Protección Social", año: 4, requiere: [] },
        { id: "TS4_5", nombre: "Trabajo Social, Psicología Evolutiva y Profunda", año: 4, requiere: [] },
        { id: "TS4_6", nombre: "Práctica de Trabajo Social Comunitario", año: 4, requiere: ["TS3_1"] }, // Asumo Trabajo Social Comunitario
        { id: "TS4_7", nombre: "Lengua Extranjera Nivel I", año: 4, requiere: [] },

        // QUINTO AÑO
        { id: "TS5_1", nombre: "Trabajo Social Familiar: Intervención Transformadora", año: 5, requiere: ["TS4_1"] }, // Asumo Familiar Inv. Diagnóstica
        { id: "TS5_2", nombre: "Seminario de Integración Metodológica en Trabajo Social", año: 5, requiere: ["TS3_2"] }, // Asumo Inv. Social II
        { id: "TS5_3", nombre: "Asignatura Electiva - Seminario de Tesis en Trabajo Social", año: 5, requiere: ["TS5_2"] }, // Asumo Seminario de Integración Metodológica
        { id: "TS5_4", nombre: "Administración y Gerenciamiento de Organizaciones y Servicios Sociales", año: 5, requiere: [] },
        { id: "TS5_5", nombre: "Lengua Extranjera Nivel II", año: 5, requiere: ["TS4_7"] }, // Asumo Lengua Extranjera Nivel I
        { id: "TS5_6", nombre: "Tesis de Licenciatura", año: 5, requiere: ["TS5_3"] }, // Asumo Seminario de Tesis
        { id: "TS5_7", nombre: "Práctica de Trabajo Social Familiar", año: 5, requiere: ["TS5_1"] } // Asumo Familiar Intervención Transformadora
    ];

    let materiasAprobadas = new Set(JSON.parse(localStorage.getItem('materiasAprobadas')) || []);
    let currentFilterYear = 'all';

    const mallaContainer = document.getElementById("malla");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderMalla() {
        mallaContainer.innerHTML = '';
        const materiasPorId = new Map(materiasData.map(m => [m.id, m]));

        materiasData.forEach(materia => {
            if (currentFilterYear !== 'all' && materia.año !== parseInt(currentFilterYear)) {
                return; // Saltar si no coincide con el filtro
            }

            const div = document.createElement("div");
            div.className = "materia";
            div.dataset.id = materia.id;
            div.dataset.year = materia.año;

            const isAprobada = materiasAprobadas.has(materia.id);
            if (isAprobada) {
                div.classList.add("aprobada");
            }

            // Determinar si la materia está bloqueada
            let isBloqueada = false;
            let statusText = "Sin correlativas";
            const requisitosPendientes = [];

            if (materia.requiere && materia.requiere.length > 0) {
                const correlativasFaltantes = materia.requiere.filter(reqId => !materiasAprobadas.has(reqId));
                if (correlativasFaltantes.length > 0) {
                    isBloqueada = true;
                    correlativasFaltantes.forEach(reqId => {
                        const reqMateria = materiasPorId.get(reqId);
                        if (reqMateria) {
                            requisitosPendientes.push(reqMateria.nombre);
                        }
                    });
                    statusText = `Requiere: ${requisitosPendientes.join(", ")}`;
                } else {
                    statusText = "Correlativas cumplidas";
                }
            }

            if (isBloqueada && !isAprobada) { // Solo bloquear si no está ya aprobada
                div.classList.add("bloqueada");
            }

            div.innerHTML = `
                <div class="materia-header">
                    <h3>${materia.nombre}</h3>
                    <span>Año ${materia.año}</span>
                </div>
                <div class="materia-status">${statusText}</div>
                <button class="mark-btn">${isAprobada ? 'Aprobada ✅' : 'Marcar como aprobada'}</button>
            `;

            const markBtn = div.querySelector(".mark-btn");
            if (!isAprobada) { // Si no está aprobada, se puede marcar/desmarcar
                if (!isBloqueada) { // Solo si no está bloqueada, se habilita el botón
                    markBtn.addEventListener("click", () => {
                        toggleAprobada(materia.id);
                    });
                }
            }

            mallaContainer.appendChild(div);
        });

        // Actualizar el estado visual de los botones de marcar en caso de cambios
        updateMateriaStates();
    }

    function toggleAprobada(id) {
        if (materiasAprobadas.has(id)) {
            materiasAprobadas.delete(id);
        } else {
            // Verificar si la materia está bloqueada antes de permitir aprobarla
            const materia = materiasData.find(m => m.id === id);
            let isBlocked = false;
            if (materia.requiere && materia.requiere.length > 0) {
                const correlativasFaltantes = materia.requiere.filter(reqId => !materiasAprobadas.has(reqId));
                if (correlativasFaltantes.length > 0) {
                    isBlocked = true;
                }
            }
            
            if (!isBlocked) { // Solo permitir aprobar si no está bloqueada
                materiasAprobadas.add(id);
            } else {
                alert("¡No puedes aprobar esta materia aún! Primero debes aprobar sus correlativas.");
                return; // Salir de la función si está bloqueada
            }
        }
        localStorage.setItem('materiasAprobadas', JSON.stringify(Array.from(materiasAprobadas)));
        renderMalla(); // Re-renderizar para actualizar estados
    }

    function updateMateriaStates() {
        const materiasPorId = new Map(materiasData.map(m => [m.id, m]));
        materiasData.forEach(materia => {
            const div = document.querySelector(`.materia[data-id="${materia.id}"]`);
            if (!div) return; // Materia no visible en el filtro actual

            const isAprobada = materiasAprobadas.has(materia.id);
            div.classList.toggle("aprobada", isAprobada);

            let isBloqueada = false;
            let statusText = "Sin correlativas";
            const requisitosPendientes = [];

            if (materia.requiere && materia.requiere.length > 0) {
                const correlativasFaltantes = materia.requiere.filter(reqId => !materiasAprobadas.has(reqId));
                if (correlativasFaltantes.length > 0) {
                    isBloqueada = true;
                    correlativasFaltantes.forEach(reqId => {
                        const reqMateria = materiasPorId.get(reqId);
                        if (reqMateria) {
                            requisitosPendientes.push(reqMateria.nombre);
                        }
                    });
                    statusText = `Requiere: ${requisitosPendientes.join(", ")}`;
                } else {
                    statusText = "Correlativas cumplidas";
                }
            }

            if (isBloqueada && !isAprobada) {
                div.classList.add("bloqueada");
                div.querySelector(".mark-btn").style.opacity = 0.3;
                div.querySelector(".mark-btn").style.pointerEvents = "none";
            } else {
                div.classList.remove("bloqueada");
                div.querySelector(".mark-btn").style.opacity = 1;
                div.querySelector(".mark-btn").style.pointerEvents = "auto";
            }
            div.querySelector(".materia-status").textContent = statusText;
            div.querySelector(".mark-btn").textContent = isAprobada ? 'Aprobada ✅' : 'Marcar como aprobada';
            div.querySelector(".mark-btn").style.backgroundColor = isAprobada ? '#4caf50' : '#ff80ab';
        });
    }


    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentFilterYear = button.dataset.year;
            renderMalla();
        });
    });

    renderMalla(); // Renderiza la malla inicial al cargar la página
});

