# Sistema de Votação de Refeições para Escolas - Plataforma Web e Mobile
Link Visualização n meu linkedin: https://www.linkedin.com/posts/iago-silva-7a6a90241_javascript-reactjs-reactnative-activity-7112272113461342209-vG0O?utm_source=share&utm_medium=member_desktop

Este projeto tem como objetivo desenvolver um sistema de votação de refeições para escolas, acessível tanto na plataforma web quanto na plataforma mobile. A finalidade é permitir que os alunos façam suas escolhas para o café da manhã e o almoço do dia através de um processo de votação. As opções disponíveis são fornecidas por um responsável da unidade escolar, tornando possível um controle eficaz das escolhas dos alunos e, consequentemente, a redução do desperdício de alimentos.

## Plataforma Web e Mobile

### Plataforma Web

Na plataforma web, os responsáveis têm acesso a uma tela "master", na qual podem inserir e visualizar as votações dos alunos. O acesso à plataforma é realizado por meio do Registro Acadêmico (R.A.) do aluno, permitindo a seleção das refeições oferecidas naquele dia. Todas as votações são registradas e exibidas na tela "master", garantindo uma gestão eficiente das escolhas dos alunos.

### Plataforma Mobile (React Native)

A plataforma mobile foi desenvolvida em React Native, utilizando o mesmo servidor que a plataforma web. Ela permite que os alunos façam suas escolhas de refeições de forma rápida e conveniente.

**Funcionalidades Exclusivas:**

- Quando não há opções disponíveis para votação, o aluno não pode acessar a aplicação, evitando qualquer inconveniência.
- Se houver apenas a opção de café da manhã disponível, o aluno será direcionado automaticamente para a tela de café da manhã, concluindo o processo de votação sem a necessidade de visualizar a tela de almoço.
- Da mesma forma, se houver apenas a opção de almoço disponível, o aluno será redirecionado diretamente para a tela de almoço.

## Tecnologias Utilizadas

### Plataforma Web:

- Front-end: ReactJS
- Back-end: NodeJS e ExpressJS
- Banco de dados: MySQL

### Plataforma Mobile (React Native):

- Utiliza o mesmo servidor que a plataforma web.

## Funcionalidade a ser Inserida Futuramente

Estou planejando adicionar uma funcionalidade que impedirá o usuário de votar mais de uma vez no mesmo dia. Isso tem o objetivo de evitar a manipulação das votações por parte de um único usuário. No entanto, essa funcionalidade está atualmente em fase de teste e não foi incluída na versão inicial do sistema.

