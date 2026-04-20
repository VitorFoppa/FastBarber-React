import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [resumo, setResumo] = useState({
        total_agendamentos: 0,
        faturamento_previsto: 0,
        agendamentos: []
    });
    const [erro, setErro] = useState(null);

    async function carregarDashboard() {
        try {
            const response = await api.get("/agendamentos/dashboard/hoje");
            setResumo(response.data);
            setErro(null);
        } catch (err) {
            console.error("Erro ao carregar dashboard:", err);
            setErro("Não foi possível carregar os dados. Verifique se o servidor está online.");
        }
    }

    useEffect(() => {
        carregarDashboard();
    }, []);

    if (erro) {
        return <div className="p-10 text-red-500 font-bold">{erro}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500">Visão geral para {new Date().toLocaleDateString()}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Agendamentos Hoje</p>
                            <h3 className="text-4xl font-black text-gray-900">{resumo.total_agendamentos || 0}</h3>
                        </div>
                        <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">📅</div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Faturamento Previsto</p>
                            <h3 className="text-4xl font-black text-green-600">
                                R$ {Number(resumo.faturamento_previsto || 0).toFixed(2)}
                            </h3>
                        </div>
                        <div className="h-16 w-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl">💰</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Próximos Clientes</h2>
                        <button onClick={carregarDashboard} className="text-sm text-blue-600 font-bold hover:underline">Atualizar</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">Horário</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Barbeiro</th>
                                    <th className="px-6 py-4">Serviço</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(!resumo.agendamentos || resumo.agendamentos.length === 0) ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">
                                            Nenhum agendamento para hoje.
                                        </td>
                                    </tr>
                                ) : (
                                    resumo.agendamentos.map((ag) => (
                                        <tr key={ag.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {ag.data_hora ? new Date(ag.data_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "--:--"}
                                            </td>
                                            {/* Uso do ?. para não quebrar se os dados demorarem a chegar */}
                                            <td className="px-6 py-4 text-gray-600">{ag.cliente?.nome || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-600">{ag.barbeiro?.nome || "N/A"}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                                                    {ag.servico?.nome || "Serviço"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-black uppercase tracking-tighter text-blue-500">
                                                    ● {ag.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;