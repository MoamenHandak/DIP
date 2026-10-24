const progressBar = document.querySelector('#progressBar');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  let activeId = sections[0]?.id;
  for (const section of sections) if (section.getBoundingClientRect().top <= 140) activeId = section.id;
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);
updatePageState();

const neighborGrid = document.querySelector('#neighborGrid');
const neighborCells = [...neighborGrid.querySelectorAll('span')];
const neighborModes = [...document.querySelectorAll('.neighbor-mode')];
function setNeighborMode(mode) {
  neighborCells.forEach((cell, i) => {
    cell.classList.remove('is-center', 'is-neighbor');
    if (i === 4) cell.classList.add('is-center');
    else {
      const row = Math.floor(i / 3) - 1;
      const col = (i % 3) - 1;
      const cardinal = Math.abs(row) + Math.abs(col) === 1;
      const diagonal = Math.abs(row) === 1 && Math.abs(col) === 1;
      // The m-mode example keeps the top-left diagonal while excluding its
      // two shared orthogonal neighbors, so that diagonal satisfies m-adjacency.
      const mixedExample = (row === 1 && col === 0) || (row === 0 && col === 1) || (diagonal && row === -1 && col === -1);
      if ((mode === '4' && cardinal) || (mode === '8') || (mode === 'm' && mixedExample)) cell.classList.add('is-neighbor');
    }
  });
  neighborModes.forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
}
neighborModes.forEach(button => button.addEventListener('click', () => setNeighborMode(button.dataset.mode)));
setNeighborMode('4');

const inputIds = ['px', 'py', 'qx', 'qy'];
const coordinateInputs = inputIds.map(id => document.getElementById(id));
const distanceGrid = document.querySelector('#distanceGrid');
const clamp = value => Math.max(0, Math.min(9, Number.isFinite(value) ? value : 0));
function refreshDistances() {
  const [px, py, qx, qy] = coordinateInputs.map(input => clamp(Number(input.value)));
  coordinateInputs.forEach(input => {
    input.value = clamp(Number(input.value));
  });
  const dx = Math.abs(px - qx);
  const dy = Math.abs(py - qy);
  document.querySelector('#euclideanResult').textContent = Math.hypot(dx, dy).toFixed(2).replace(/\.00$/, '');
  document.querySelector('#cityResult').textContent = String(dx + dy);
  document.querySelector('#chessResult').textContent = String(Math.max(dx, dy));
  distanceGrid.querySelectorAll('.distance-point,.distance-route').forEach(el => el.remove());
  const point = (x, y, kind, label) => {
    const node = document.createElement('span');
    node.className = `distance-point ${kind}`;
    node.style.left = `${x * 100 / 9}%`;
    node.style.top = `${(9 - y) * 100 / 9}%`;
    node.title = `${label} = (${x}, ${y})`;
    node.setAttribute('aria-label', node.title);
    distanceGrid.append(node);
  };
  point(px, py, 'point-p', 'p');
  point(qx, qy, 'point-q', 'q');
  const route = document.createElement('div');
  route.className = 'distance-route';
  const x1 = px * 100 / 9, x2 = qx * 100 / 9;
  const y1 = (9 - py) * 100 / 9, y2 = (9 - qy) * 100 / 9;
  route.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#879b70" stroke-width="0.8" stroke-dasharray="2 2"/><polyline points="${x1},${y1} ${x2},${y1} ${x2},${y2}" fill="none" stroke="#b0c28f" stroke-width="0.8"/></svg>`;
  distanceGrid.append(route);
}
coordinateInputs.forEach(input => input.addEventListener('input', refreshDistances));
refreshDistances();
