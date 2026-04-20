import { Link } from "react-router-dom";

function Home() {
    const modulos = [
        {
            titulo: "Dashboard",
            descricao: "Visão geral, faturamento e atendimentos do dia.",
            rota: "/dashboard",
            icone: "",
            corIcone: "bg-indigo-100 text-indigo-600",
            destaque: true 
        },
        {
            titulo: "Agendamentos",
            descricao: "Controle todos os atendimentos com praticidade.",
            rota: "/agendamento", 
            icone: "",
            corIcone: "bg-blue-100 text-blue-600",
            destaque: false
        },
        {
            titulo: "Clientes",
            descricao: "Cadastre e acompanhe o histórico dos clientes.",
            rota: "/clientes",
            icone: "",
            corIcone: "bg-emerald-100 text-emerald-600",
            destaque: false
        },
        {
            titulo: "Barbeiros",
            descricao: "Gerencie os profissionais e suas agendas.",
            rota: "/barbeiros",
            icone: "",
            corIcone: "bg-amber-100 text-amber-600",
            destaque: false
        },
        {
            titulo: "Serviços",
            descricao: "Organize cortes, barba, tratamentos e valores.",
            rota: "/servicos",
            icone: "",
            corIcone: "bg-rose-100 text-rose-600",
            destaque: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-slate-100">
                
                {/* Header da Página */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Sistema de <span className="text-blue-600">Barbearia</span>
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                        O painel de controle completo para gerenciar seu salão de forma simples, rápida e organizada.
                    </p>
                </header>

                {/* Grid Dinâmico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {modulos.map((modulo, index) => (
                        <Link 
                            key={index} 
                            to={modulo.rota} 
                            className={`block group ${modulo.destaque ? 'md:col-span-2' : ''}`}
                        >
                            <div className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform ${modulo.corIcone}`}>
                                    {modulo.icone}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {modulo.titulo}
                                    </h2>
                                    <p className="text-slate-500 mt-1 leading-relaxed text-sm">
                                        {modulo.descricao}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer do Card */}
                <div className="mt-12 text-center pt-6 border-t border-slate-100">
                    <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
                        Versão 1.0 • Gestão Profissional
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Home;