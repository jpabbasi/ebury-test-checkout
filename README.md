# Ebury Test Checkout

Este projeto é parte do desafio técnico para a posição de Frontend na Ebury. O objetivo do desafio é implementar um fluxo de checkout funcional e responsivo, com validação de campos, chamada de API mockada, e testes automatizados.

- **Preview**:

  - O projeto foi deployado no Vercel e pode ser acessado através do seguinte link: [production](https://ebury-test-checkout.vercel.app)

## Funcionalidades

- **Funcionalidades do Checkout**:
  - Divido em etapas.
  - Cartão customizado com a bandeira.
  - Exibe um indicador visual para o progresso no checkout.
- **Validação de Campos**:
  - Todos os campos do formulário são validados conforme os requisitos do protótipo fornecido.
- **Chamada de API**:

  - Mock da chamada de API `/pagar` no final do processo de checkout para simulação de pagamento.
  - A chamada é mockada de forma na qual possamos testar. Cartões terminados com digito 5 tem seu pagamento aprovado. Diferente disso, os pagamentos são recusados.

- **(Cartão falso) Exemplo de sucesso**:

  - 378282246310005

- **(Cartão falso) Exemplo de falha**:

  - 4111111111111111

- **Responsividade**:

  - O layout é totalmente responsivo e se adapta a diferentes tamanhos de tela (desktop, tablet e mobile).

- **Acessibilidade**:

  - Utilização de HTML semântico (adaptado ao layout) e ícones SVG com textos alternativos ocultos para melhorar a acessibilidade.

- **Testes Automatizados**:

  - Testes para os componentes chave utilizando Jest e Testing Library, com foco em:
    - Renderização correta dos componentes.
    - Comportamento adequado do fluxo de checkout.
    - Verificação de ícones e estados de progresso.

- **Análise Estática**:
  - Uso de **ESLint/Prettier** para formatação automática do código.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção do frontend.
- **Typescript**: Utilizado para adicionar tipagem estática e melhorar a qualidade do código.
- **Axios**: Para realizar as chamadas de API mockadas.
- **Jest & Testing Library**: Para escrever e rodar testes automatizados.
- **ESLint & Prettier**: Para garantir a consistência e qualidade do código.
- **React Icons**: Ícones SVG para melhorar a experiência visual.

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/jpabbasi/ebury-test-checkout.git
   cd ebury-test-checkout

   ```

2. **Instale as dependências**:

   ```bash
   npm install

   ```

3. **Rodar o projeto localmente**:

   ```bash
   npm start

   ```

4. **Rodar os testes**:

   ```bash
   npm test

   ```

5. **Rodar o Prettier**:
   ```bash
   npm run format
   ```
