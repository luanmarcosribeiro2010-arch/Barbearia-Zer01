const horariosFixos = [
    "9:00","9:30","10:00","10:30","11:00","11:30",
    "14:00","14:30","15:00","15:30","16:00","16:30",
    "17:00","17:30","18:00","18:30","19:00","19:30"
];

let agendamentos = [];

function carregarHorarios() {
    const lista = document.getElementById("horarios");
    lista.innerHTML = "";

    horariosFixos.forEach(h => {
        const ocupado = agendamentos.some(a => a.horario === h);
        const div = document.createElement("div");

        div.className = ocupado ? "horario ocupado" : "horario";
        div.innerText = h;

        if (!ocupado) {
            div.onclick = () => selecionarHorario(h);
        }

        lista.appendChild(div);
    });
}

function selecionarHorario(h) {
    document.getElementById("horarioSelecionado").value = h;
    alert("Horário selecionado: " + h);
}

document.getElementById("form-agendamento").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const horario = document.getElementById("horarioSelecionado").value;

    if (!horario) {
        alert("Selecione um horário primeiro!");
        return;
    }

    agendamentos.push({ nome, servico, horario });
    atualizarPainel();
    carregarHorarios();

    alert("Agendado com sucesso!");
    this.reset();
});

function atualizarPainel() {
    const lista = document.getElementById("lista-agendamentos");
    lista.innerHTML = "";

    agendamentos.forEach(a => {
        const li = document.createElement("li");
        li.textContent = `${a.horario} — ${a.nome} (${a.servico})`;
        lista.appendChild(li);
    });
}

carregarHorarios();
