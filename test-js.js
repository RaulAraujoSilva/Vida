// Teste básico das funções utilitárias
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const rand = (a, b) => a + Math.random() * (b - a);
const dist2 = (a, b) => { const dx = a.x - b.x, dy = a.y - b.y; return dx * dx + dy * dy };
const lerp = (a, b, t) => a + (b - a) * t;

console.log('=== Testes do Simulador ===');

// Teste 1: clamp
const clampTest = clamp(5, 0, 10) === 5 && clamp(-5, 0, 10) === 0 && clamp(15, 0, 10) === 10;
console.log('clamp:', clampTest ? 'PASS' : 'FAIL');

// Teste 2: rand
const r = rand(0, 1);
const randTest = r >= 0 && r <= 1;
console.log('rand:', randTest ? 'PASS' : 'FAIL');

// Teste 3: dist2
const p1 = {x: 0, y: 0}, p2 = {x: 3, y: 4};
const distTest = dist2(p1, p2) === 25;
console.log('dist2:', distTest ? 'PASS' : 'FAIL');

// Teste 4: lerp
const lerpTest = lerp(0, 10, 0.5) === 5;
console.log('lerp:', lerpTest ? 'PASS' : 'FAIL');

console.log('=== Testes concluídos ===');
console.log('Simulador: http://localhost:8080/simulador-ecossistema.html');
