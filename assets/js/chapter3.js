const progressBar = document.querySelector('#progressBar');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`;
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

const intensities = [18,42,81,110,22,34,132,197,218,61,49,155,239,181,72,28,77,126,91,41,17,39,80,53,20,65,94,143,188,207,35,56,117,166,229,31,47,88,136,193,222,25,74,102,149,174,211,45,69,123,158,236,29,59,97,145,179,201,38,83,113,162,216,53,91,130,185,242,20,72,109,152,198,227,42,62,121,171,234];
const transformSelect = document.querySelector('#transformSelect');
const transformValue = document.querySelector('#transformValue');
const sliderTitle = document.querySelector('#sliderTitle');
const sliderValue = document.querySelector('#sliderValue');
const transformExplainer = document.querySelector('#transformExplainer');
const transformFormula = document.querySelector('#transformFormula');
const transformedImage = document.querySelector('#transformedImage');
const sampleValues = document.querySelector('#sampleValues');
const histogramChart = document.querySelector('#histogramChart');
const configs = {
  brightness: { title:'قيمة الإزاحة', min:-100, max:100, value:0, formula:'s = r + b', desc:'السطوع: إضافة أو طرح قيمة ثابتة من شدة كل بكسل.' },
  contrast: { title:'مقدار التباين', min:-90, max:150, value:0, formula:'s = a(r − 128) + 128', desc:'التباين: ضرب الفروق عن الوسط بمعامل؛ القيم الأعلى توسّع المدى.' },
  gamma: { title:'معامل جاما γ', min:-100, max:100, value:0, formula:'s = 255 (r / 255)ᵞ', desc:'تحويل غير خطي. جاما أقل من 1 تفتح الظلال؛ وأكبر من 1 تغمّقها.' },
  negative: { title:'عكس مستويات الشدة', min:0, max:0, value:0, formula:'s = L − 1 − r', desc:'السالب يعكس المستويات؛ قد يُظهر تفاصيل فاتحة دقيقة في خلفية داكنة، مثل تصوير الماموجرام.' },
  threshold: { title:'عتبة الفصل T', min:0, max:255, value:128, formula:'s = 255 if r ≥ T, else 0', desc:'العتبة تحول الرمادي إلى ثنائي. قد تكون عالمية مثل Otsu أو محلية بحسب المنطقة.' },
  bitplane: { title:'رقم مستوى البت', min:0, max:7, value:7, formula:'s = bitₖ(r) × 255', desc:'اعرض مستوى بت واحداً؛ البتات العليا MSB تحمل غالباً معلومات بصرية أكثر.' },
  stretch: { title:'قوة التوسيع', min:0, max:100, value:50, formula:'s = (r − rₘᵢₙ) · 255 / (rₘₐₓ − rₘᵢₙ)', desc:'توسيع التباين يمد مدى الشدة، مع إمكانية التحكم بدرجة التحويل.' },
  equalize: { title:'موازنة التوزيع', min:0, max:100, value:100, formula:'sₖ = (L − 1) · CDF(rₖ)', desc:'الموازنة تستخدم دالة التوزيع التراكمي CDF لإعادة توزيع قيم الشدة آلياً.' }
};
function transformPixel(raw, mode, amount) {
  let value = raw;
  if (mode === 'brightness') value = raw + amount;
  if (mode === 'contrast') value = 128 + (raw - 128) * (1 + amount / 100);
  if (mode === 'gamma') value = 255 * Math.pow(raw / 255, Math.pow(2, amount / 50));
  if (mode === 'negative') value = 255 - raw;
  if (mode === 'threshold') value = raw >= amount ? 255 : 0;
  if (mode === 'bitplane') value = ((raw >> amount) & 1) * 255;
  if (mode === 'stretch') value = 128 + (raw - 128) * (1 + amount / 35);
  if (mode === 'equalize') {
    const sorted = [...intensities].sort((a,b) => a-b);
    const rank = sorted.filter(n => n <= raw).length / sorted.length;
    value = raw * (1 - amount / 100) + rank * 255 * (amount / 100);
  }
  return Math.max(0, Math.min(255, Math.round(value)));
}
function buildHistogram(values, originalValues) {
  const buckets = 32;
  const count = (arr, index) => arr.filter(value => Math.min(buckets - 1, Math.floor(value / 256 * buckets)) === index).length;
  const maxCount = Math.max(1, ...Array.from({length:buckets}, (_,i) => Math.max(count(values,i), count(originalValues,i))));
  histogramChart.innerHTML = '';
  for (let i = 0; i < buckets; i++) {
    const wrap = document.createElement('span');
    wrap.style.setProperty('--base-height', `${Math.max(2, count(originalValues,i) / maxCount * 100)}%`);
    const after = document.createElement('i');
    after.style.setProperty('--after-height', `${Math.max(2, count(values,i) / maxCount * 100)}%`);
    wrap.append(after);
    histogramChart.append(wrap);
  }
}
function updateTransform() {
  const mode = transformSelect.value;
  const cfg = configs[mode];
  transformValue.min = cfg.min; transformValue.max = cfg.max; transformValue.value = cfg.value;
  sliderTitle.textContent = cfg.title;
  sliderValue.textContent = mode === 'gamma' ? '1.00' : cfg.value;
  transformValue.disabled = cfg.min === cfg.max;
  transformExplainer.textContent = cfg.desc;
  transformFormula.textContent = cfg.formula;
  renderTransform();
}
function renderTransform() {
  const mode = transformSelect.value;
  const amount = Number(transformValue.value);
  const transformed = intensities.map(value => transformPixel(value, mode, amount));
  sliderValue.textContent = mode === 'gamma' ? Math.pow(2, amount / 50).toFixed(2) : amount;
  const representative = intensities.slice(0, 8).map(value => transformPixel(value, mode, amount));
  sampleValues.innerHTML = representative.map(value => `<i>${value}</i>`).join('');
  buildHistogram(transformed, intensities);
  let brightness = 1, contrast = 1, invert = 0, grayscale = 0;
  if (mode === 'brightness') brightness = Math.max(.28, 1 + amount / 180);
  if (mode === 'contrast' || mode === 'stretch') contrast = Math.max(.35, 1 + amount / 80);
  if (mode === 'negative') invert = 1;
  if (mode === 'gamma') brightness = amount < 0 ? 1.28 : amount > 0 ? .7 : 1;
  if (mode === 'threshold') { contrast = 5; grayscale = 1; brightness = amount > 128 ? .8 : 1.2; }
  if (mode === 'bitplane') { contrast = 3.2; grayscale = 1; brightness = amount > 4 ? .9 : 1.18; }
  if (mode === 'equalize') contrast = 1.48;
  transformedImage.style.filter = `brightness(${brightness}) contrast(${contrast}) invert(${invert}) grayscale(${grayscale})`;
}
transformSelect.addEventListener('change', updateTransform);
transformValue.addEventListener('input', renderTransform);
updateTransform();

const filterData = {
  mean: { name:'MEAN FILTER', kernel:[1,1,1,1,1,1,1,1,1], divisor:9, desc:'متوسط حسابي لقيم الجوار؛ يخفف الضوضاء لكنه قد يطمس الحواف.', kind:'linear' },
  gaussian: { name:'GAUSSIAN FILTER', kernel:[1,2,1,2,4,2,1,2,1], divisor:16, desc:'أوزان جاوس تعطي البكسلات القريبة من المركز أثراً أكبر؛ σ يتحكم بقوة التنعيم.', kind:'linear' },
  median: { name:'MEDIAN FILTER', kernel:[0,0,0,0,1,0,0,0,0], desc:'يختار القيمة الوسيطة بعد ترتيب الجوار؛ فعال لضوضاء الملح والفلفل ويحفظ الحواف.', kind:'order' },
  min: { name:'MIN FILTER', kernel:[0,0,0,0,1,0,0,0,0], desc:'يستبدل المركز بأقل قيمة في النافذة؛ يفيد في توسيع المناطق الداكنة.', kind:'order' },
  max: { name:'MAX FILTER', kernel:[0,0,0,0,1,0,0,0,0], desc:'يستبدل المركز بأعلى قيمة في النافذة؛ يفيد في توسيع المناطق الفاتحة.', kind:'order' },
  laplacian: { name:'LAPLACIAN FILTER', kernel:[0,1,0,1,-4,1,0,1,0], desc:'مشتقة ثانية تستجيب للتغيرات في جميع الاتجاهات؛ تستخدم لتعزيز التفاصيل والحواف.', kind:'edge' },
  sobel: { name:'SOBEL Gₓ FILTER', kernel:[-1,0,1,-2,0,2,-1,0,1], desc:'قناع سوبل أفقي. يقارن تغير الشدة عبر الاتجاه؛ يرافقه قناع Gᵧ لحساب الاتجاه والسعة.', kind:'edge' }
};
const neighborhood = [52,61,58,67,245,72,54,63,60];
let selectedFilter = 'mean';
let convolution = false;
const kernelGrid = document.querySelector('#kernelGrid');
const kernelMini = document.querySelector('#kernelMini');
const neighborhoodValues = document.querySelector('#neighborhoodValues');
function shownKernel(data) {
  const values = [...data.kernel];
  return convolution ? [values[8],values[7],values[6],values[5],values[4],values[3],values[2],values[1],values[0]] : values;
}
function filterResult(key) {
  const data = filterData[key];
  if (data.kind === 'order') {
    const sorted = [...neighborhood].sort((a,b) => a-b);
    if (key === 'median') return sorted[4];
    if (key === 'min') return sorted[0];
    return sorted[8];
  }
  const weights = shownKernel(data);
  let result = neighborhood.reduce((sum,value,index) => sum + value * weights[index], 0);
  if (key === 'sobel') {
    const gy = [-1,-2,-1,0,0,0,1,2,1];
    const gx = neighborhood.reduce((sum,value,index) => sum + value * weights[index], 0);
    const vy = neighborhood.reduce((sum,value,index) => sum + value * gy[index], 0);
    result = Math.hypot(gx,vy);
  } else if (key === 'laplacian') result = Math.abs(result);
  else result /= data.divisor;
  return Math.round(result);
}
function renderFilter() {
  const data = filterData[selectedFilter];
  const values = shownKernel(data);
  kernelGrid.innerHTML = values.map(value => `<span>${value}</span>`).join('');
  kernelMini.innerHTML = values.map(value => `<span>${value}</span>`).join('');
  neighborhoodValues.innerHTML = neighborhood.map(value => `<span>${value}</span>`).join('');
  document.querySelector('#kernelName').textContent = data.name;
  document.querySelector('#filterDescription').textContent = data.desc;
  document.querySelector('#filterOutput').textContent = filterResult(selectedFilter);
  document.querySelector('#convolutionStatus').textContent = convolution ? 'التفاف · Convolution' : 'ارتباط · Correlation';
}
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  selectedFilter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('active', item === button));
  renderFilter();
}));
document.querySelector('#convolutionToggle').addEventListener('click', event => {
  convolution = !convolution;
  event.currentTarget.setAttribute('aria-pressed', String(convolution));
  renderFilter();
});
renderFilter();
