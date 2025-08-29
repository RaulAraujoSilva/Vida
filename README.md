# Simulador de Ecossistema

Este é um simulador de ecossistema em tempo real implementado em HTML5, CSS3 e JavaScript puro. Simula a interação entre plantas, herbívoros e carnívoros em um ambiente virtual.

## 🚀 Como Executar

### 🌐 Deploy Online (Vercel)
O projeto está configurado para deploy automático no Vercel:

1. **Fork este repositório** no GitHub
2. **Conecte ao Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione este repositório
   - Clique em "Deploy"
3. **Acesse sua aplicação** na URL fornecida pelo Vercel

**URLs de acesso após deploy:**
- `/` - Página inicial com navegação
- `/simulador` - Acesso direto ao simulador
- `/debug` - Página de debug

### 💻 Execução Local

#### Opção 1: Servidor HTTP (Recomendado)
1. Certifique-se de ter Python instalado
2. Execute: `python -m http.server 8080`
3. Abra o navegador e acesse: `http://localhost:8080`

#### Opção 2: Abrir diretamente no navegador
- Abra o arquivo `index.html` diretamente no navegador
- Nota: Algumas funcionalidades podem não funcionar corretamente devido a restrições de CORS

## 🎮 Como Usar

### Controles Básicos
- **⏸️ Pausar/Continuar**: Para/pausa a simulação
- **🔄 Resetar**: Reinicia o ecossistema com configurações padrão
- **🎲 Aleatorizar**: Gera uma nova distribuição inicial de plantas

### Interação com o Mundo
- **Clique simples**: Adiciona plantas na posição clicada
- **Shift + Clique**: Adiciona herbívoros
- **Alt + Clique**: Adiciona carnívoros
- **Arraste**: "Pinta" plantas no mundo

### Controles Avançados
- **Velocidade da simulação**: Controla a velocidade da simulação (0.2x a 5x)
- **Crescimento das plantas**: Taxa de crescimento das plantas
- **Difusão/semeadura**: Taxa de propagação das plantas
- **Visão dos agentes**: Alcance de visão dos herbívoros e carnívoros
- **Metabolismo**: Taxa de consumo de energia
- **Energia por mordida/presa**: Eficiência alimentar
- **Limite máximo de agentes**: Número máximo de agentes no ecossistema

### Recursos Especiais
- **AI de equilíbrio**: Sistema automático que ajusta parâmetros para manter o ecossistema balanceado
- **Mostrar visão**: Exibe os campos de visão dos agentes
- **Testes automáticos**: Executa testes de validação do sistema

## 📊 Visualizações

### Populações & Indicadores
- Contadores em tempo real de herbívoros, carnívoros e biomassa vegetal
- Estatísticas de nascimentos, mortes e idade média
- Cobertura vegetal em porcentagem

### Séries Temporais
- **Gráfico de Populações**: Evolução temporal das populações de plantas, herbívoros e carnívoros
- **Gráfico de Taxas**: Nascimentos e mortes ao longo do tempo

### Elementos Visuais
- **Plantas**: Representadas por mapa de calor verde
- **Herbívoros**: Círculos azuis
- **Carnívoros**: Triângulos vermelhos apontando na direção do movimento
- **Campos de visão**: Círculos translúcidos (quando ativado)
 - **Indicador pós-caça**: Com "Mostrar visão" ativado, carnívoros em descanso pós-caça exibem um anel amarelo

## 🧬 Comportamentos

### Plantas
- Crescimento logístico natural
- Propagação por difusão
- Consumo pelos herbívoros

### Herbívoros
- Busca por plantas com melhor valor nutricional
- Sistema de medo para evitar predadores
- Reprodução baseada em energia e proximidade
- Metabolismo baseado em movimento

### Carnívoros
- Caça baseada na proximidade das presas
- Reprodução baseada em energia e proximidade
- Metabolismo baseado em movimento
 - Risco de ferimento ao atacar: chance aumenta com grupos de herbívoros próximos da presa e diminui com carnívoros aliados próximos; ferimentos reduzem energia e velocidade por alguns segundos
 - Janela pós-caça: após capturar uma presa, o carnívoro entra em um curto período (padrão: 5s) em que não busca novas presas e prioriza encontrar parceiros

## 🧪 Sistema de Testes

O simulador inclui testes automáticos que validam:
- Consumo correto de plantas
- Limites do mundo (wrap)
- Sistema de equilíbrio automático
- Cobertura vegetal
- Reprodução de herbívoros
- Caça de carnívoros
- Estabilidade do sistema de redimensionamento

## 🏗️ Arquitetura

- **HTML5 Canvas**: Renderização em tempo real
- **Utility AI**: Sistema de tomada de decisões baseado em utilidades
- **Grid de plantas**: Sistema de discretização para performance
- **ResizeObserver**: Adaptação automática ao tamanho da tela
- **RequestAnimationFrame**: Loop de animação otimizado

## 📈 Performance

- **Grid adaptativo**: 96x64 células para boa performance
- **Throttling de eventos**: Prevenção de sobrecarga
- **Canvas otimizado**: Renderização eficiente
- **Loop de simulação fixo**: 60 FPS com timestep fixo

## 🔧 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+ (Classes, Arrow Functions, Destructuring)
- Canvas 2D API

## 🔧 Depuração e Troubleshooting

### Ferramentas de Debug
- **Página de Debug**: `http://localhost:8080/debug.html`
- **Console do navegador**: Pressione F12 para ver logs detalhados
- **Script de debug**: Incluído automaticamente no simulador

### Problemas Comuns e Soluções

#### Simulação não inicia
1. **Verifique se o servidor está rodando**: `python -m http.server 8080`
2. **Abra o console** (F12) e verifique erros
3. **Use a página de debug** para diagnóstico
4. **Verifique se o canvas está visível** na página

#### Animação travada
1. **Verifique se `sim.running` é `true`**
2. **Execute `forceRedraw()` no console**
3. **Teste `testSimulation()`** para verificar se a lógica funciona
4. **Verifique se há erros no loop de animação**
5. **Use `checkArrays()`** para verificar integridade dos arrays
6. **Execute `cleanArrays()`** se encontrar elementos undefined

#### Performance baixa
- **Reduza a resolução** do grid de plantas
- **Diminua o número máximo de agentes**
- **Ajuste a velocidade da simulação**

### Logs de Debug
O simulador registra automaticamente:
- ✅ Inicialização bem-sucedida
- 🔄 Estado do loop de animação
- 📊 FPS e contagem de agentes
- ❌ Erros de canvas ou elementos DOM
- 🧹 Limpeza automática de arrays
- ⚠️ Avisos sobre elementos undefined

### Correções Implementadas
- **Correção de elementos undefined**: Sistema de limpeza automática de arrays
- **Iteração segura**: Uso de iteração reversa para evitar problemas de modificação
- **Verificações de integridade**: Validação de agentes antes da execução
- **Logs detalhados**: Melhor diagnóstico de problemas
- **Sistema de debug**: Ferramentas para análise em tempo real
 - **Maturidade e reprodução**: adultos priorizam acasalamento e têm maior raio de busca; raios de acasalamento levemente maiores ajudam populações baixas
 - **Defesa de presas em grupo**: ataques de carnívoros podem resultar em ferimentos conforme densidade local de herbívoros/carnívoros

## 📝 Notas de Desenvolvimento

Este simulador foi desenvolvido seguindo princípios de Clean Code e SOLID:
- **SRP**: Cada classe tem uma responsabilidade clara
- **OCP**: Sistema extensível sem modificar código existente
- **DIP**: Dependências abstraídas
- Nomes descritivos e funções pequenas
- Documentação clara e comentários explicativos

---

**Desenvolvido como projeto de demonstração de simulação de ecossistemas com JavaScript puro.**
