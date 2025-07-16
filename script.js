document.addEventListener("DOMContentLoaded", () => {
    const materias = [
        { nombre: "Introducción al Trabajo Social", año: 1 },
        { nombre: "Metodología del Trabajo Social", año: 1 },
        { nombre: "Trabajo Social, Teorías del Estado y Políticas Públicas", año: 1 },

        { nombre: "Práctica de Recursos de la Comunidad", año: 2, requiere: ["Introducción al Trabajo Social"] },
        { nombre: "Investigación Diagnóstica", año: 2, requiere: ["Introducción al Trabajo Social"] },
        { nombre: "Intervención Transformadora", año: 2, requiere: ["Investigación Diagnóstica"] },

        { nombre: "Trabajo Social Comunitario", año: 3, requiere: ["Intervención Transformadora"] },
        { nombre: "Práctica de Trabajo Social con Grupos", año: 3, requiere: ["Investigación Diagnóstica", "Intervención Transformadora"] },

        { nombre: "Familia I (Investigación Diagnóstica)", año: 4, requiere: ["Trabajo Social Comunitario"] },
        { nombre: "Práctica de Trabajo Social Comunitario", año: 4, requiere: ["Trabajo Social Comunitario"] }
    ];

    const contenedor = document.getElementById("malla");

    materias.forEach(m => {
        const div = document.createElement("div");
        div.className = "materia";
        div.innerHTML = `<strong>${m.nombre}</strong><br><span>Año ${m.año}</span>`;

        if (m.requiere) {
            div.classList.add("bloqueada");
            const reqs = m.requiere.join(", ");
            div.innerHTML += `<div class="info">🔒 Requiere: ${reqs}</div>`;
        } else {
            div.innerHTML += `<div class="info">✅ Sin correlativas</div>`;
        }

        div.addEventListener("click", () => {
            if (!div.classList.contains("bloqueada")) {
                div.classList.toggle("activa");
            }
        });

        contenedor.appendChild(div);
    });
});
