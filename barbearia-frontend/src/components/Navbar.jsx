import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-black text-white p-4 flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/barbeiros">Barbeiros</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/agendamento">Agendamento</Link>
            <Link to="/lista-agendamentos">Lista Agendamentos</Link>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    );
}

export default Navbar;