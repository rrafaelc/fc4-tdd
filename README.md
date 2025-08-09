# Sistema de Reservas - TDD

Este projeto é um exemplo simplificado de um sistema de reservas de propriedades, inspirado em plataformas como o Airbnb, desenvolvido utilizando práticas de **Test-Driven Development (TDD)**.

## 📋 Sobre o Projeto

O sistema permite aos usuários:

- **Reservar propriedades** para períodos específicos
- **Cancelar reservas** com base em políticas de reembolso
- **Verificar disponibilidade** de propriedades
- **Validar número de hóspedes** conforme capacidade da propriedade

### 🚀 Funcionalidades Principais

#### 1. Realizar Reservas
- ✅ Verificação de disponibilidade da propriedade
- ✅ Validação do número de hóspedes (não pode exceder a capacidade)
- ✅ Cálculo automático do preço total
- ✅ Desconto de 10% para reservas de 7+ noites
- ✅ Bloqueio da propriedade para o período reservado

#### 2. Cancelar Reservas
- ✅ **Mais de 7 dias antes:** Reembolso total (100%)
- ✅ **1-7 dias antes:** Reembolso parcial (50%)
- ✅ **Menos de 1 dia antes:** Sem reembolso (0%)
- ✅ Liberação da propriedade para novas reservas
- ✅ Prevenção de cancelamento duplicado

#### 3. Validações
- ✅ Número de hóspedes > 0
- ✅ Propriedade existe
- ✅ Usuário existe
- ✅ Período disponível

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **Jest** - Framework de testes
- **Express** - Framework web
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco de dados
- **UUID** - Geração de IDs únicos

## 📁 Estrutura do Projeto

```
src/
├── domain/                    # Camada de domínio (entidades e regras de negócio)
│   ├── entities/              # Entidades do domínio
│   ├── repositories/          # Interfaces dos repositórios
│   ├── value_objects/         # Objetos de valor
│   └── cancelation/           # Regras de cancelamento
├── application/               # Camada de aplicação (casos de uso)
│   ├── services/              # Serviços da aplicação
│   └── dtos/                  # Data Transfer Objects
└── infrastructure/            # Camada de infraestrutura
    ├── persistence/           # Entidades e mappers do banco
    ├── repositories/          # Implementações dos repositórios
    └── web/                   # Controllers web
```

## ⚡ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 22 ou superior)
- **npm** (geralmente vem com o Node.js)
- **Git** (para clonar o repositório)

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/rrafaelc/fc4-tdd.git
cd fc4-tdd
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute todos os testes
```bash
npm test
```

## 🧪 Executando Testes Específicos

### Executar testes de uma categoria específica:

#### Testes de Domínio (Entidades)
```bash
npm test src/domain/entities/
```

#### Testes de Serviços da Aplicação
```bash
npm test src/application/services/
```

#### Testes de Repositórios
```bash
npm test src/infrastructure/repositories/
```

#### Testes End-to-End (Controllers)
```bash
npm test src/infrastructure/web/
```

### Executar teste de um arquivo específico:

#### Teste do Serviço de Reservas
```bash
npm test src/application/services/booking_service.test.ts
```

#### Teste da Entidade Booking
```bash
npm test src/domain/entities/booking.test.ts
```

#### Teste das Regras de Cancelamento
```bash
npm test src/domain/cancelation/refund_rule_factory.test.ts
```

### Executar testes com relatório de cobertura:
```bash
npm test -- --coverage
```

### Executar testes em modo watch (re-executa ao salvar arquivos):
```bash
npm test -- --watch
```

## 📊 Comandos Úteis para Desenvolvimento

### Executar testes com output detalhado:
```bash
npm test -- --verbose
```

### Executar apenas testes que falharam na última execução:
```bash
npm test -- --onlyFailures
```

### Executar testes que correspondem a um padrão:
```bash
npm test -- --testNamePattern="deve criar uma reserva"
```

## 🏗️ Arquitetura e Padrões

O projeto segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**:

### Camadas:
1. **Domain**: Regras de negócio puras, sem dependências externas
2. **Application**: Casos de uso e coordenação entre domínio e infraestrutura
3. **Infrastructure**: Implementações técnicas (banco, web, etc.)

### Padrões Utilizados:
- **Repository Pattern**: Abstração do acesso a dados
- **Factory Pattern**: Criação de regras de reembolso
- **Strategy Pattern**: Diferentes políticas de cancelamento
- **DTO Pattern**: Transferência de dados entre camadas

## 📋 Casos de Teste Implementados

### BookingService
- ✅ Criar reserva com sucesso
- ✅ Erro quando propriedade não encontrada
- ✅ Erro quando usuário não encontrado
- ✅ Erro para período indisponível
- ✅ Cancelar reserva existente
- ✅ Erro ao cancelar reserva inexistente

### Entidade Booking
- ✅ Criação de reserva válida
- ✅ Cálculo de preço total
- ✅ Aplicação de desconto para 7+ noites
- ✅ Validação de número de hóspedes
- ✅ Cancelamento de reserva

### Regras de Cancelamento
- ✅ Reembolso total (7+ dias antes)
- ✅ Reembolso parcial (1-7 dias antes)
- ✅ Sem reembolso (< 1 dia antes)

## 🐛 Solução de Problemas

### Erro "Module not found"
```bash
# Limpe o cache do npm e reinstale
npm clean-install
```

### Testes falhando após mudanças
```bash
# Execute os testes em modo verbose para mais detalhes
npm test -- --verbose
```

### Problemas com TypeScript
```bash
# Verifique a configuração do TypeScript
npx tsc --noEmit
```

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

---

**Desenvolvido com ❤️ usando Test-Driven Development (TDD)**
