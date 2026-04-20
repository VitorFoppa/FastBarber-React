import { useEffect, useState } from "react";
import api from "../services/api";

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        preco: "",
        duracao_minutos: ""
    });

    async function carregarServicos() {
        const response = await api.get("/servicos/");
        setServicos(response.data);
    }

    async function cadastrarServico(e) {
        e.preventDefault();
        try {
            await api.post("/servicos/", form);
            setForm({ nome: "", preco: "", duracao_minutos: "" });
            carregarServicos();
        } catch (error) {
            alert("Erro ao cadastrar serviço.");
        }
    }

    async function deletarServico(id) {
        if (window.confirm("Deseja remover este serviço?")) {
            try {
                await api.delete(`/servicos/${id}`);
                setServicos(servicos.filter(s => s.id !== id));
            } catch (error) {
                alert("Erro ao excluir serviço.");
            }
        }
    }

    useEffect(() => {
        carregarServicos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Tabela de Serviços</h1>
                    <p className="text-gray-500 mt-2 text-lg">Defina os preços e tempos de execução.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Formulário */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Novo Serviço</h2>
                            <form onSubmit={cadastrarServico} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Nome do serviço (ex: Corte)"
                                    value={form.nome}
                                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                    className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-amber-500 outline-none border"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Preço (R$)"
                                    value={form.preco}
                                    onChange={(e) => setForm({ ...form, preco: e.target.value })}
                                    className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-amber-500 outline-none border"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Duração (minutos)"
                                    value={form.duracao_minutos}
                                    onChange={(e) => setForm({ ...form, duracao_minutos: e.target.value })}
                                    className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-amber-500 outline-none border"
                                    required
                                />
                                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-100">
                                    Salvar Serviço
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista */}
                    <div className="lg:col-span-2">
                        <div className="grid gap-4">
                            {servicos.map((servico) => (
                                <div key={servico.id} className="group bg-white p-6 rounded-2xl flex justify-between items-center border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center font-bold text-xl">
                                            R$
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">{servico.nome}</p>
                                            <div className="flex gap-4 text-sm font-medium">
                                                <span className="text-green-600">R$ {servico.preco.toFixed(2)}</span>
                                                <span className="text-gray-400">⏱ {servico.duracao_minutos} min</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deletarServico(servico.id)}
                                        className="opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-600 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Servicos;