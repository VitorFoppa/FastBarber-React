import { useEffect, useState } from "react";
import axios from "axios";
import "./ListaAgendamentos.css";

function ListaAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    function carregarAgendamentos() {
        axios
            .get("http://127.0.0.1:8000/agendamentos/")
            .then((response) => {
                setAgendamentos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }

    function deletarAgendamento(id) {
        const confirmar = window.confirm(
            "Deseja realmente excluir este agendamento?"
        );

        if (!confirmar) return;

        axios
            .delete(`http://127.0.0.1:8000/agendamentos/${id}`)
            .then(() => {
                alert("Agendamento excluído com sucesso!");
                carregarAgendamentos();
            })
            .catch((error) => {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir agendamento.");
            });
    }

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    return (
        <div className="lista-container">
            <div className="lista-card">
                <h1>Lista de Agendamentos</h1>
                <p className="subtitulo">
                    Visualize e gerencie todos os agendamentos da barbearia
                </p>

                <div className="tabela-wrapper">
                    <table className="tabela-agendamentos">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Barbeiro</th>
                                <th>Serviço</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {agendamentos.map((agendamento) => (
                                <tr key={agendamento.id}>
                            {/* Acessando o nome dentro do objeto cliente */}
                                <td>{agendamento.cliente?.nome}</td>

                            {/* Acessando o nome dentro do objeto barbeiro */}
                                <td>{agendamento.barbeiro?.nome}</td>

                            {/* Acessando o nome dentro do objeto servico */}
                                <td>{agendamento.servico?.nome}</td>

                            {/* Formatando a data para o padrão brasileiro */}
                                <td>
                            {new Date(agendamento.data_hora).toLocaleString("pt-BR", {
                                dateStyle: "short",
                            timeStyle: "short",
            })}
        </td>
        
        <td>
            <span className="status-badge">
                {agendamento.status}
            </span>
        </td>
        <td>
            <button
                className="btn-excluir"
                onClick={() => deletarAgendamento(agendamento.id)}
            >
                Excluir
            </button>
        </td>
    </tr>
))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListaAgendamentos;