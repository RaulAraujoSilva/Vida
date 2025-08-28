// Script de debug para o simulador de ecossistema
// Use no console do navegador para diagnosticar problemas

console.log('🔍 === DIAGNÓSTICO DO SIMULADOR ===');

// Verificar se elementos DOM existem
console.log('1. Verificando elementos DOM...');
const worldCanvas = document.getElementById('world');
const chartPop = document.getElementById('chartPop');
const chartRates = document.getElementById('chartRates');
const toggleRun = document.getElementById('toggleRun');

console.log('   - Canvas mundo:', worldCanvas ? '✅' : '❌');
console.log('   - Canvas população:', chartPop ? '✅' : '❌');
console.log('   - Canvas taxas:', chartRates ? '✅' : '❌');
console.log('   - Botão pausar:', toggleRun ? '✅' : '❌');

// Verificar se objeto sim existe
console.log('2. Verificando objeto simulador...');
console.log('   - window.ecoSim:', window.ecoSim ? '✅' : '❌');

// Verificar canvas context
console.log('3. Verificando contexto canvas...');
if(worldCanvas) {
  const ctx = worldCanvas.getContext('2d');
  console.log('   - Contexto 2D:', ctx ? '✅' : '❌');
  console.log('   - Dimensões canvas:', worldCanvas.width + 'x' + worldCanvas.height);
} else {
  console.log('   - Canvas não encontrado');
}

// Verificar se simulação está rodando
console.log('4. Verificando estado da simulação...');
if(window.ecoSim) {
  console.log('   - Simulação rodando:', window.ecoSim.running ? '✅' : '❌');
  console.log('   - Agentes herbívoros:', window.ecoSim.herb.length);
  console.log('   - Agentes carnívoros:', window.ecoSim.carn.length);
  console.log('   - Células de plantas:', window.ecoSim.grid.length);
  console.log('   - FPS atual:', window.ecoSim.fps);
}

// Função para forçar redesenho
window.forceRedraw = function() {
  console.log('🔄 Forçando redesenho...');
  if(window.ecoSim && worldCanvas) {
    const ctx = worldCanvas.getContext('2d');
    // Limpar canvas
    ctx.clearRect(0, 0, worldCanvas.width, worldCanvas.height);

    // Desenhar plantas
    const cellW = worldCanvas.width / window.ecoSim.gridW;
    const cellH = worldCanvas.height / window.ecoSim.gridH;
    for(let y = 0; y < window.ecoSim.gridH; y++) {
      for(let x = 0; x < window.ecoSim.gridW; x++) {
        const v = window.ecoSim.grid[y * window.ecoSim.gridW + x];
        if(v > 0) {
          const g = Math.floor(16 + v * 164);
          ctx.fillStyle = `rgba(${Math.floor(g*0.3)}, ${g}, ${Math.floor(g*0.5)}, 0.85)`;
          ctx.fillRect(x * cellW, y * cellH, Math.ceil(cellW), Math.ceil(cellH));
        }
      }
    }

    // Desenhar agentes
    for(const h of window.ecoSim.herb) {
      ctx.beginPath();
      ctx.fillStyle = '#60a5fa';
      ctx.arc(h.x, h.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    for(const c of window.ecoSim.carn) {
      ctx.beginPath();
      ctx.fillStyle = '#f87171';
      ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    console.log('✅ Redesenho forçado concluído');
  }
};

// Função para verificar arrays
window.checkArrays = function() {
  console.log('🔍 Verificando arrays...');
  if(window.ecoSim) {
    let undefinedHerb = 0, undefinedCarn = 0, invalidHerb = 0, invalidCarn = 0;

    for(const h of window.ecoSim.herb) {
      if(h === undefined) undefinedHerb++;
      else if(!h || typeof h.energy !== 'number') invalidHerb++;
    }

    for(const c of window.ecoSim.carn) {
      if(c === undefined) undefinedCarn++;
      else if(!c || typeof c.energy !== 'number') invalidCarn++;
    }

    console.log(`📊 Status dos arrays:`);
    console.log(`   Herbívoros: ${window.ecoSim.herb.length} total, ${undefinedHerb} undefined, ${invalidHerb} inválidos`);
    console.log(`   Carnívoros: ${window.ecoSim.carn.length} total, ${undefinedCarn} undefined, ${invalidCarn} inválidos`);

    if(undefinedHerb > 0 || undefinedCarn > 0) {
      console.warn('⚠️ Arrays com elementos undefined encontrados!');
      return false;
    } else {
      console.log('✅ Arrays limpos');
      return true;
    }
  }
};

// Função para limpar arrays manualmente
window.cleanArrays = function() {
  console.log('🧹 Limpando arrays...');
  if(window.ecoSim) {
    const beforeHerb = window.ecoSim.herb.length;
    const beforeCarn = window.ecoSim.carn.length;

    window.ecoSim.herb = window.ecoSim.herb.filter(h => h !== undefined && h !== null && typeof h.energy === 'number');
    window.ecoSim.carn = window.ecoSim.carn.filter(c => c !== undefined && c !== null && typeof c.energy === 'number');

    const afterHerb = window.ecoSim.herb.length;
    const afterCarn = window.ecoSim.carn.length;

    console.log(`✅ Arrays limpos: Herbívoros ${beforeHerb}→${afterHerb}, Carnívoros ${beforeCarn}→${afterCarn}`);
  }
};

// Função para testar simulação
window.testSimulation = function() {
  console.log('🧪 Testando simulação...');
  if(window.ecoSim) {
    const before = {
      herb: window.ecoSim.herb.length,
      carn: window.ecoSim.carn.length,
      time: window.ecoSim.time
    };

    // Executar um passo
    if(typeof step === 'function') {
      step(0.016); // ~60fps
    }

    const after = {
      herb: window.ecoSim.herb.length,
      carn: window.ecoSim.carn.length,
      time: window.ecoSim.time
    };

    console.log('Antes:', before);
    console.log('Depois:', after);
    console.log('✅ Simulação testada');
  }
};

console.log('🔍 === DIAGNÓSTICO CONCLUÍDO ===');
console.log('💡 Comandos disponíveis:');
console.log('   - forceRedraw() - Força redesenho do canvas');
console.log('   - testSimulation() - Testa um passo da simulação');
console.log('   - checkArrays() - Verifica integridade dos arrays');
console.log('   - cleanArrays() - Limpa arrays manualmente');
console.log('   - window.ecoSim - Acessa objeto do simulador');
