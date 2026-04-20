import { useState, useEffect } from "react";
import api from "../services/api";

function Barbeiros() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [nome, setNome] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    async function carregarBarbeiros() {
        const response = await api.get("/barbeiros/");
        setBarbeiros(response.data);
    }

    async function cadastrarBarbeiro(e) {
        e.preventDefault();

        await api.post("/barbeiros/", {
            nome,
            especialidade
        });

        setNome("");
        setEspecialidade("");

        carregarBarbeiros();
    }

    async function deletarBarbeiro(id) {
    if (window.confirm("Deseja realmente remover este barbeiro?")) {
        try {
            await api.delete(`/barbeiros/${id}`);
            
            setBarbeiros(barbeiros.filter(b => b.id !== id));
            
            alert("Barbeiro removido com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Não foi possível excluir o barbeiro.");
            }
        }
    }

    useEffect(() => {
        carregarBarbeiros();
    }, []);

    return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12">
        <div className="max-w-4xl mx-auto">
            {/* Header com estilo */}
            <header className="mb-10 border-b border-gray-200 pb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Gestão de Barbeiros
                </h1>
                <p className="text-gray-500 mt-2">Cadastre e gerencie os profissionais da sua unidade.</p>
            </header>

            {/* Container principal (Form e Lista) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Lado Esquerdo: Formulário */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Profissional</h2>
                        <form onSubmit={cadastrarBarbeiro} className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="w-full border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all border"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Especialidade</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Degradê / Barba"
                                    value={especialidade}
                                    onChange={(e) => setEspecialidade(e.target.value)}
                                    className="w-full border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all border"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-95"
                            >
                                Adicionar Barbeiro
                            </button>
                        </form>
                    </div>
                </div>

                {/* Lado Direito: Lista */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Equipe Atual</h2>
                    
                    {barbeiros.length === 0 ? (
                        <div className="text-center p-10 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                            Nenhum barbeiro cadastrado no momento.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {barbeiros.map((barbeiro) => (
                                <div
                                    key={barbeiro.id}
                                    className="group bg-white p-5 rounded-xl flex justify-between items-center border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Avatar Simbolizado */}
                                        <div className="h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase">
                                            {barbeiro.nome.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">{barbeiro.nome}</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {barbeiro.especialidade}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deletarBarbeiro(barbeiro.id)}
                                        className="opacity-0 group-hover:opacity-100 bg-white text-red-500 border border-red-100 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                                        title="Excluir profissional"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    </div>
);
}

export default Barbeiros;