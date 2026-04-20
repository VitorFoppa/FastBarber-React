import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Barbeiros from "./pages/Barbeiros";
import Servicos from "./pages/Servicos";
import Agendamento from "./pages/Agendamento";
import ListaAgendamentos from "./pages/ListaAgendamentos";
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/barbeiros" element={<Barbeiros />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/agendamento" element={<Agendamento />} />
                <Route path="/lista-agendamentos" element={<ListaAgendamentos />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;