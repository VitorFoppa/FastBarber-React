import { useEffect, useState } from "react";
import api from "../services/api";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: ""
    });

    async function carregarClientes() {
        try {
            const response = await api.get("/clientes/");
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao carregar clientes", error);
        }
    }

    async function cadastrarCliente(e) {
        e.preventDefault();
        try {
            await api.post("/clientes/", form);
            setForm({ nome: "", email: "", telefone: "", senha: "" });
            carregarClientes();
        } catch (error) {
            alert("Erro ao cadastrar cliente.");
        }
    }

    async function deletarCliente(id) {
        if (window.confirm("Tem certeza que deseja remover este cliente?")) {
            try {
                await api.delete(`/clientes/${id}`);
                setClientes(clientes.filter(c => c.id !== id));
            } catch (error) {
                console.error("Erro ao deletar", error);
                alert("Erro ao remover cliente.");
            }
        }
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                {/* Cabeçalho */}
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Gestão de Clientes
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Administre a base de clientes da sua barbearia.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Lado Esquerdo: Formulário */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Novo Cadastro</h2>
                            <form onSubmit={cadastrarCliente} className="flex flex-col gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Nome do cliente"
                                        value={form.nome}
                                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all border"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all border"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Telefone</label>
                                    <input
                                        type="text"
                                        placeholder="(00) 00000-0000"
                                        value={form.telefone}
                                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                                        className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all border"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Senha</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.senha}
                                        onChange={(e) => setForm({ ...form, senha: e.target.value })}
                                        className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all border"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-95"
                                >
                                    Cadastrar Cliente
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lado Direito: Lista de Clientes */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Clientes Ativos</h2>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {clientes.length} Cadastrados
                            </span>
                        </div>

                        {clientes.length === 0 ? (
                            <div className="text-center p-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
                                <p className="text-lg">Nenhum cliente encontrado.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {clientes.map((cliente) => (
                                    <div
                                        key={cliente.id}
                                        className="group bg-white p-5 rounded-2xl flex justify-between items-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center gap-5">
                                            {/* Avatar com cores baseadas no nome */}
                                            <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                                {cliente.nome.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-900">{cliente.nome}</p>
                                                <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        📧 {cliente.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        📞 {cliente.telefone || "Não informado"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => deletarCliente(cliente.id)}
                                            className="opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                            title="Excluir cliente"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export default Clientes;