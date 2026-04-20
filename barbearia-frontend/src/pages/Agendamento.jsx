import { useState, useEffect } from "react";
import api from "../services/api";

function Agendamento() {
    const [clienteId, setClienteId] = useState("");
    const [barbeiroId, setBarbeiroId] = useState("");
    const [servicoId, setServicoId] = useState("");
    const [dataHora, setDataHora] = useState("");
    const [clientes, setClientes] = useState([]);
    const [barbeiros, setBarbeiros] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [mensagem, setMensagem] = useState({ tipo: "", texto: "" }); // Objeto para cores diferentes

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const [c, b, s] = await Promise.all([
                api.get("/clientes/"),
                api.get("/barbeiros/"),
                api.get("/servicos/")
            ]);
            setClientes(c.data);
            setBarbeiros(b.data);
            setServicos(s.data);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post("/agendamentos/", {
                cliente_id: Number(clienteId),
                barbeiro_id: Number(barbeiroId),
                servico_id: Number(servicoId),
                data_hora: dataHora,
                status: "agendado"
            });

            setMensagem({ tipo: "sucesso", texto: "Agendamento realizado com sucesso!" });
            
            // Resetar campos
            setClienteId(""); setBarbeiroId(""); setServicoId(""); setDataHora("");
            
            // Esconder mensagem após 3 segundos
            setTimeout(() => setMensagem({ tipo: "", texto: "" }), 3000);

        } catch (error) {
            setMensagem({ tipo: "erro", texto: "Erro ao realizar agendamento. Verifique a disponibilidade." });
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Banner de Topo (Opcional, dá um toque premium) */}
                <div className="bg-neutral-900 h-32 flex items-center justify-center px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-white uppercase tracking-widest">
                            Agendamento
                        </h1>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Seção: Identificação */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cliente</label>
                                <select
                                    value={clienteId}
                                    onChange={(e) => setClienteId(e.target.value)}
                                    required
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-neutral-900 outline-none border transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Selecione o Cliente</option>
                                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Barbeiro</label>
                                <select
                                    value={barbeiroId}
                                    onChange={(e) => setBarbeiroId(e.target.value)}
                                    required
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-neutral-900 outline-none border transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Selecione o Barbeiro</option>
                                    {barbeiros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Seção: Serviço */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Serviço Desejado</label>
                            <select
                                value={servicoId}
                                onChange={(e) => setServicoId(e.target.value)}
                                required
                                className="w-full border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-neutral-900 outline-none border transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Selecione o Serviço</option>
                                {servicos.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.nome} — R$ {s.preco.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Seção: Tempo */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Data e Horário</label>
                            <input
                                type="datetime-local"
                                value={dataHora}
                                onChange={(e) => setDataHora(e.target.value)}
                                required
                                className="w-full border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-neutral-900 outline-none border transition-all"
                            />
                        </div>

                        {/* Botão de Submissão */}
                        <button
                            type="submit"
                            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl active:scale-95 mt-4"
                        >
                            Finalizar Agendamento
                        </button>
                    </form>

                    {/* Alerta de Mensagem */}
                    {mensagem.texto && (
                        <div className={`mt-8 p-4 rounded-xl text-center font-bold text-sm border shadow-sm ${
                            mensagem.tipo === "sucesso" 
                            ? "bg-green-50 border-green-100 text-green-700" 
                            : "bg-red-50 border-red-100 text-red-700"
                        }`}>
                            {mensagem.texto}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Agendamento;