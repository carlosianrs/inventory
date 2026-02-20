# 🏭 Sistema de Produção de Produtos

Sistema completo para **gerenciamento de estoque voltado à produção**, onde cada produto é composto por matérias-primas e sua fabricação depende da disponibilidade em estoque.

---

## 🚀 Stack do Projeto

### 🔙 Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- Banco de dados relacional (Oracle)
- Paginação com Pageable
- DTO Pattern
- Tratamento global de exceções

### 🔜 Frontend
- Next.js 14+
- React
- TailwindCSS
- Integração via REST API
- Toast notifications

### 🟢 Ambiente
- Node.js v24

---

## 🧠 Regra de Negócio

Cada **Produto Final**:

- Possui código, nome e preço
- Contém uma lista de matérias-primas
- Define a quantidade necessária de cada matéria-prima

### 📌 Processo de Produção

1. Solicita produção do produto
2. Sistema verifica estoque das matérias-primas
3. Se houver quantidade suficiente:
   - Debita do estoque das matérias-primas
   - Incrementa a quantidade do produto final
4. Se não houver:
   - Retorna erro informando estoque insuficiente

---

## 🏗️ Arquitetura

Frontend (Next.js)
↓
REST API
↓
Backend (Spring Boot)
↓
Banco de Dados


Separação clara de responsabilidades:

- Controller → Camada de entrada HTTP
- Service → Regras de negócio
- Repository → Acesso a dados
- DTOs → Comunicação segura com o frontend

---

## 📦 Funcionalidades

- ✅ Cadastro de matérias-primas
- ✅ Controle de estoque
- ✅ Cadastro de produtos finais
- ✅ Associação de matérias-primas ao produto
- ✅ Produção automática com verificação de estoque
- ✅ Paginação e busca
- ✅ Tratamento de erros padronizado
