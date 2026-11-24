# 🥬 Horti-Fruti do Jão

Sistema web de gestão de catálogo e estoque para um horti-fruti delivery, desenvolvido como projeto integrado das disciplinas de Programação de Sítios Internet (PSI) e Servidores e Sistemas Operacionais (SSO) da FATEC São Roque.

---

## 📋 Sobre o Projeto

O Horti-Fruti do Jão é uma aplicação web desenvolvida para gerenciamento e exibição de produtos de um horti-fruti delivery.

O sistema permite que clientes visualizem os produtos disponíveis através de um catálogo online, enquanto administradores podem cadastrar, editar, excluir produtos e controlar o estoque utilizando um painel administrativo integrado.

---

## 🚀 Funcionalidades

### 👨‍🌾 Catálogo de Produtos

- Exibição dinâmica dos produtos
- Informações completas dos itens
- Modal de detalhes
- Exibição de preço
- Exibição de estoque
- Exibição do status de disponibilidade

### 🔎 Busca e Filtros

- Pesquisa por nome do produto
- Filtro por categorias:
  - Frutas
  - Verduras
  - Legumes
  - Tubérculos

### 📦 Controle de Estoque

- Visualização da quantidade em estoque
- Status de disponibilidade
- Atualização de estoque através do painel administrativo

### ⚙️ Painel Administrativo

- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Controle de estoque
- Atualização automática da API

### 🖼️ Gerenciamento de Imagens

- Imagens hospedadas no Cloudinary
- URLs públicas armazenadas na API

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Back-end/API

- JSON Server
- Render

### Armazenamento de Imagens

- Cloudinary

### Versionamento

- Git
- GitHub

---

## 📡 Integração com API

O sistema consome uma API hospedada no Render utilizando requisições HTTP.

### Endpoints utilizados

```http
GET /produtos
POST /produtos
PUT /produtos/:id
DELETE /produtos/:id

GET /estoque
POST /estoque
PUT /estoque/:id
DELETE /estoque/:id