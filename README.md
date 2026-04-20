BarberShop Manager - Sistema de Gestão de Barbearia

O **BarberShop Manager** é uma aplicação Full Stack moderna desenvolvida para simplificar o dia a dia de barbearias. O sistema permite o controle total de clientes, profissionais, serviços e agendamentos, contando com uma dashboard inteligente para visão financeira e operacional em tempo real.

-----

##  Tecnologias Utilizadas

### **Frontend**

  * **React 19:** Biblioteca principal para interfaces reativas.
  * **Vite 8:** Ferramenta de build de ultra velocidade.
  * **Tailwind CSS 4:** Estilização moderna com a nova engine Oxide.
  * **Axios:** Consumo de APIs REST.
  * **React Router Dom:** Gerenciamento de navegação.

### **Backend**

  * **Python 3.12+**
  * **FastAPI:** Framework web de alta performance.
  * **SQLAlchemy:** ORM para comunicação com o banco de dados.
  * **SQLite:** Banco de dados relacional (desenvolvimento).
  * **Pydantic:** Validação de dados e Schemas.

-----

##  Funcionalidades Principais

  * **Dashboard Inteligente:** Resumo diário de agendamentos e faturamento previsto.
  * **Gestão de Agendamentos:** Criação e listagem de horários com validação automática.
  * **Regras de Negócio:** Sistema que impede conflitos de horário para o mesmo barbeiro.
  * **CRUD Completo:** Gerenciamento de Clientes, Barbeiros e Serviços.
  * **Interface Responsiva:** Totalmente adaptado para Desktop e dispositivos móveis.

-----

##  Como Executar o Projeto

### 1\. Clonar o repositório
```bash
git clone [https://github.com/VitorFoppa/FastBarber-React](https://github.com/VitorFoppa/FastBarber-React)
cd FastBarber-React



## Configurar o Backend:

cd barbearia-api
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

API estará disponível em: http://127.0.0.1:8000
Documentação Swagger: http://127.0.0.1:8000/docs



## Configurar o Frontend

cd barbearia-frontend
npm install
npm run dev

O painel estará disponível em: http://localhost:5173


##  Estrutura do Projeto

BARBEARIA/
├── barbearia-api/          # Backend FastAPI
│   ├── app/                # Lógica da aplicação
│   ├── barbearia.db        # Banco SQLite
│   └── requirements.txt    # Dependências Python
├── barbearia-frontend/     # Frontend React
│   ├── src/                # Componentes e Páginas
│   ├── package.json        # Dependências Node
│   └── tailwind.config.js  # Configurações de estilo
└── .gitignore              # Proteção de arquivos sensíveis
