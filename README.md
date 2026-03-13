# guarani_front_end_test
Teste Técnico Front-End: Formulário de Cadastro

Este projeto foi desenvolvido como solução para um teste técnico de Front-End cujo objetivo era avaliar a capacidade de construir um formulário completo utilizando **React com TypeScript**, incluindo validações robustas, máscaras de entrada, renderização condicional de campos e integração com APIs externas.

A aplicação simula um formulário de cadastro capaz de lidar com **Pessoa Física e Pessoa Jurídica**, validando os dados inseridos pelo usuário e preenchendo automaticamente algumas informações através de APIs públicas.

O foco durante o desenvolvimento foi manter o código **organizado, legível e fácil de manter**, além de garantir uma experiência de uso simples e clara para quem estiver utilizando o formulário.

---

# Objetivo do teste

O objetivo deste teste técnico é avaliar a habilidade do candidato em criar um formulário de cadastro em **React com TypeScript** que interaja com APIs externas e implemente funcionalidades comuns em aplicações reais.

Entre os pontos avaliados estão:

- criação de componentes organizados
- uso correto de estado e props
- validação de formulários
- uso de máscaras de entrada
- renderização condicional de campos
- integração com APIs
- organização e qualidade do código
- usabilidade e experiência do usuário

O formulário precisa integrar com as seguintes APIs:

**ViaCEP**  
Para buscar automaticamente os dados de endereço a partir do CEP.

**ReceitaWS**  
Para buscar informações de empresas a partir do CNPJ.

---

# Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

React  
TypeScript  
Vite  
TailwindCSS  
React Hook Form  
Zod

Essas ferramentas foram escolhidas para permitir uma implementação moderna, com boa organização de código e validação robusta de dados.

---

# Instalação das dependências utilizadas

```properties
npm install react-hook-form zod @hookform/resolvers react-input-mask react-select   
npm install -D vite@^7.3.1 @vitejs/plugin-react@^5.1.4     
npm install -D tailwindcss @tailwindcss/vite
npm i -D @types/react-input-mask
```

---

# Considerações finais

O objetivo deste projeto foi demonstrar a implementação de um formulário completo utilizando React e TypeScript, aplicando boas práticas de organização, validação de dados e integração com APIs externas.

A aplicação implementa validações robustas, máscaras de entrada, preenchimento automático de endereço, renderização condicional de campos e tratamento de erros, simulando um cenário comum encontrado em aplicações reais.

---
