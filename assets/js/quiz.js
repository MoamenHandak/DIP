(() => {
  const text = (ar, en) => ({ ar, en });
  const question = (topic, qAr, qEn, options, correct, explainAr, explainEn) => ({
    topic: text(topic[0], topic[1]), q: text(qAr, qEn),
    options: options.map(([ar, en]) => text(ar, en)), correct,
    explain: text(explainAr, explainEn)
  });

  const fundamentals = [
    question(['تمثيل الصورة','Image representation'],'في التمثيل الرياضي للصورة الرقمية f(x, y)، ماذا تمثل قيمة الدالة عند نقطة؟','In the mathematical representation f(x, y), what does the function value at a point represent?',[
      ['الإحداثيات المكانية فقط','Only the spatial coordinates'],['شدة الصورة أو مستوى الرمادي','Image intensity or gray level'],['عدد البكسلات في الصف','The number of pixels in the row'],['نوع المستشعر','The sensor type']
    ],1,'تمثل x وy الموقع المكاني، بينما تمثل سعة f عند الموقع شدة الضوء أو مستوى الرمادي.','x and y denote spatial location; the amplitude of f at that location represents light intensity or gray level.'),
    question(['الرقمنة','Digitization'],'أي عملية ترقمن الإحداثيات المكانية (x, y)؟','Which operation digitizes the spatial coordinates (x, y)?',[
      ['التكميم','Quantization'],['المعاينة','Sampling'],['موازنة الهيستوجرام','Histogram equalization'],['الالتفاف','Convolution']
    ],1,'المعاينة تحدد مواقع العينات على شبكة مكانية منفصلة.','Sampling selects discrete spatial locations on a grid.'),
    question(['الرقمنة','Digitization'],'في تحويل الصورة المستمرة إلى رقمية، ما الذي يفعله التكميم؟','When converting a continuous image to digital form, what does quantization do?',[
      ['يحدد عدد الصفوف والأعمدة فقط','Sets only the number of rows and columns'],['يرقمن قيم السعة أو الشدة','Digitizes amplitude or intensity values'],['يكشف حدود الأجسام','Detects object boundaries'],['يقلب النواة 180 درجة','Rotates the kernel by 180 degrees']
    ],1,'التكميم يحول قيم السعة أو الشدة إلى مستويات رقمية محددة؛ أما المعاينة فترقمن الإحداثيات.','Quantization maps amplitude or intensity values to discrete levels; sampling digitizes the coordinates.'),
    question(['أنواع الصور','Image types'],'كم بتاً يحتاج البكسل الواحد في الصورة الثنائية الأساسية؟','How many bits does each pixel need in a basic binary image?',[
      ['بت واحد','One bit'],['4 بت','4 bits'],['8 بت','8 bits'],['24 بت','24 bits']
    ],0,'الصورة الثنائية لها حالتان فقط، أسود أو أبيض، ولذلك يكفي بت واحد لكل بكسل.','A binary image has two possible values, black or white, so one bit per pixel is sufficient.'),
    question(['أنواع الصور','Image types'],'في الصورة الرمادية المعتادة ذات 8 بت، ما مجال الشدة؟','What is the intensity range in a typical 8-bit grayscale image?',[
      ['0 إلى 1','0 to 1'],['0 إلى 127','0 to 127'],['0 إلى 255','0 to 255'],['1 إلى 256','1 to 256']
    ],2,'تستخدم الصورة الرمادية 8 بت 256 مستوى، عادة من 0 للأسود إلى 255 للأبيض.','An 8-bit grayscale image has 256 levels, typically from 0 (black) to 255 (white).'),
    question(['أنواع الصور','Image types'],'تتكون صورة RGB ذات 24 بت من:','A 24-bit RGB image consists of:',[
      ['قناة واحدة من 24 بت','One 24-bit channel'],['ثلاث قنوات، 8 بت لكل قناة','Three channels, 8 bits per channel'],['أربع قنوات، 6 بت لكل قناة','Four channels, 6 bits per channel'],['قناتين، 12 بت لكل قناة','Two channels, 12 bits per channel']
    ],1,'تخزن RGB ثلاث قنوات للأحمر والأخضر والأزرق، بثمانية بتات لكل قناة.','RGB stores red, green, and blue channels with eight bits per channel.'),
    question(['جوار البكسل','Pixel neighborhoods'],'ما الفرق بين N4(p) و N8(p)؟','What is the difference between N4(p) and N8(p)?',[
      ['N4 يتضمن القطر، وN8 يستبعده','N4 includes diagonals; N8 excludes them'],['N4 أفقي ورأسي، وN8 يضيف الجيران القطريين','N4 is horizontal/vertical; N8 also includes diagonals'],['N4 للصورة الملونة فقط','N4 is only for color images'],['لا يوجد فرق','There is no difference']
    ],1,'يتكون N4 من الجيران الأفقيين والرأسيين الأربعة؛ ويضيف N8 الجيران القطريين الأربعة.','N4 contains the four horizontal and vertical neighbors; N8 adds the four diagonal neighbors.'),
    question(['المجاورة','Adjacency'],'لماذا نستخدم m-adjacency بدلاً من 8-adjacency في بعض الحالات؟','Why use m-adjacency instead of 8-adjacency in some cases?',[
      ['لتقليل عدد مستويات الرمادي','To reduce the number of gray levels'],['لتجنب بعض المسارات الملتبسة الناتجة عن الاتصال القطري','To avoid ambiguous paths caused by diagonal connections'],['لتحويل الصورة إلى RGB','To convert the image to RGB'],['لزيادة حجم الصورة','To increase image size']
    ],1,'تضبط المجاورة المختلطة الاتصال القطري لتقليل المسارات المتعددة والالتباس الذي قد يظهر في 8-adjacency.','Mixed adjacency constrains diagonal connections to reduce multiple paths and ambiguity that can occur with 8-adjacency.'),
    question(['الاتصال والمناطق','Connectivity & regions'],'ما الوصف الأدق للحدود (boundary) لمنطقة؟','Which statement best describes the boundary of a region?',[
      ['كل البكسلات خارج الصورة','All pixels outside the image'],['بكسلات داخل المنطقة لها جار واحد على الأقل خارجها','Pixels inside the region with at least one neighbor outside it'],['مركز الصورة فقط','Only the image center'],['كل البكسلات ذات القيمة صفر','All zero-valued pixels']
    ],1,'حد المنطقة هو مجموعة بكسلاتها التي تلامس خارج المنطقة وفق علاقة الجوار المستخدمة.','A region boundary consists of region pixels that touch the outside under the chosen neighborhood relation.'),
    question(['مقاييس المسافة','Distance measures'],'إذا كان p=(1,2) و q=(4,6)، فما مسافة City-block D4؟','If p=(1,2) and q=(4,6), what is the City-block distance D4?',[
      ['3','3'],['4','4'],['5','5'],['7','7']
    ],3,'D4 = |1−4| + |2−6| = 3 + 4 = 7.','D4 = |1−4| + |2−6| = 3 + 4 = 7.'),
    question(['مقاييس المسافة','Distance measures'],'للنقطتين p=(1,2) وq=(4,6)، ما المسافة الإقليدية De؟','For p=(1,2) and q=(4,6), what is the Euclidean distance De?',[
      ['4','4'],['5','5'],['7','7'],['25','25']
    ],1,'De = √((4−1)²+(6−2)²) = √(9+16) = 5.','De = √((4−1)²+(6−2)²) = √(9+16) = 5.'),
    question(['الاستشعار والالتقاط','Sensing & acquisition'],'ما التسلسل المعتاد لتحويل الطاقة الملتقطة إلى بيانات رقمية؟','What is the usual sequence for turning captured energy into digital data?',[
      ['مستشعر → إشارة فولتية → رقمنة','Sensor → voltage signal → digitization'],['رقمنة → مستشعر → إضاءة','Digitization → sensor → illumination'],['هيستوجرام → مستشعر → معاينة','Histogram → sensor → sampling'],['تكميم → عدسة → انعكاس','Quantization → lens → reflection']
    ],0,'يستجيب المستشعر للطاقة ويولد إشارة كهربائية، غالباً فولتية، ثم تُرقمن الاستجابة.','A sensor responds to incoming energy with an electrical signal, often a voltage, which is then digitized.')
  ];

  const spatial = [
    question(['المجال المكاني','Spatial domain'],'ما المقصود بمعالجة النقطة؟','What is point processing?',[
      ['تحويل كل بكسل اعتماداً على قيمته وحدها','Transforming each pixel using its own value'],['استخدام نافذة 3×3 فقط','Using only a 3×3 window'],['تغيير ترتيب صفوف الصورة','Reordering image rows'],['ضغط الصورة دون تعديل القيم','Compressing the image without changing values']
    ],0,'في معالجة النقطة، يطبق التحويل على كل بكسل منفرداً، مثل إضافة ثابت إلى شدته.','In point processing, a transform is applied independently to each pixel, such as adding a constant to its intensity.'),
    question(['السطوع والتباين','Brightness & contrast'],'أي عملية تزيد السطوع بإضافة ثابت b إلى كل قيمة شدة r؟','Which operation increases brightness by adding a constant b to each intensity r?',[
      ['s = r + b','s = r + b'],['s = r × b','s = r × b'],['s = 255 − r','s = 255 − r'],['s = max(r,b)','s = max(r,b)']
    ],0,'إضافة ثابت إلى قيم البكسلات تحرك مستويات الشدة نحو الأعلى أو الأسفل.','Adding a constant shifts pixel intensities upward or downward.'),
    question(['سالب الصورة','Image negative'],'لصورة 8-bit، إذا r=45 فما قيمة السالب s=255−r؟','For an 8-bit image, if r=45, what is the negative value s=255−r?',[
      ['45','45'],['200','200'],['210','210'],['255','255']
    ],2,'s = 255 − 45 = 210. يعكس السالب الشدة وقد يبرز التفاصيل الفاتحة داخل مناطق داكنة.','s = 255 − 45 = 210. The negative reverses intensity and can reveal bright detail within dark regions.'),
    question(['تحويل جاما','Gamma transform'],'تحويل جاما هو تحويل:','Gamma correction is a:',[
      ['خطي ثابت دائماً','Always-linear transform'],['غير خطي لتعديل السطوع والعلاقة بين قيم الشدة','Nonlinear transform that adjusts brightness and intensity response'],['لجوار البكسل فقط','Neighborhood-only operation'],['لترميز RGB إلى ثنائي','Conversion from RGB to binary']
    ],1,'تحويل القوة s=c·r^γ غير خطي؛ قيمة γ تتحكم بكيفية إعادة توزيع الشدة.','The power-law transform s=c·r^γ is nonlinear; γ controls how intensities are remapped.'),
    question(['العتبة','Thresholding'],'أي عبارة تصف الفرق بين العتبة العالمية والمحلية؟','Which statement describes the difference between global and local thresholding?',[
      ['العالمية تستخدم حداً واحداً للصورة، والمحلية تستخدم خصائص المناطق','Global uses one threshold for the image; local uses regional properties'],['العالمية للصور الملونة فقط','Global is only for color images'],['المحلية لا تنتج صورة ثنائية','Local never produces a binary image'],['لا يوجد فرق رياضي','There is no mathematical difference']
    ],0,'العتبة العالمية تطبق قيمة واحدة على كامل الصورة؛ والمحلية تتكيف مع خصائص الجوار أو المنطقة.','Global thresholding applies one threshold to the whole image; local thresholding adapts to neighborhood or regional properties.'),
    question(['الهيستوجرام','Histogram'],'ماذا يوضح هيستوجرام الصورة الرمادية؟','What does a grayscale image histogram show?',[
      ['عدد البكسلات عند كل مستوى رمادي','The number of pixels at each gray level'],['ترتيب البكسلات المكاني','The spatial ordering of pixels'],['اتجاه كل حافة','The direction of every edge'],['عدد قنوات RGB فقط','Only the number of RGB channels']
    ],0,'الهيستوجرام يبين تكرار كل مستوى شدة في الصورة، ولا يحفظ مواقع البكسلات.','A histogram shows the frequency of each intensity level; it does not preserve pixel locations.'),
    question(['توسيع التباين','Contrast stretching'],'ما الهدف الأساسي من توسيع التباين؟','What is the main goal of contrast stretching?',[
      ['تقليل أبعاد الصورة','Reduce image dimensions'],['تمديد مدى الشدة الديناميكي لتحسين التباين','Expand the intensity dynamic range to improve contrast'],['إزالة جميع الحواف','Remove all edges'],['تحويل كل البكسلات إلى الأبيض','Turn every pixel white']
    ],1,'ينشر توسيع التباين قيم الشدة على مجال أوسع، ما قد يكشف تفاصيل إضافية.','Contrast stretching spreads intensity values over a wider range, which can reveal additional detail.'),
    question(['موازنة الهيستوجرام','Histogram equalization'],'تعتمد موازنة الهيستوجرام أساساً على:','Histogram equalization is based primarily on:',[
      ['دالة التوزيع التراكمي CDF','The cumulative distribution function (CDF)'],['قيمة أكبر بكسل فقط','Only the maximum pixel value'],['قناع الوسيط','The median mask'],['دوران النواة','Kernel rotation']
    ],0,'تستخدم الموازنة التوزيع التراكمي لربط مستويات الشدة بمدى أوسع تلقائياً.','Equalization uses the cumulative distribution to remap intensity levels across a broader range automatically.'),
    question(['مرشحات التنعيم','Smoothing filters'],'كيف يحسب مرشح المتوسط قيمة البكسل الجديدة؟','How does an average filter calculate the new pixel value?',[
      ['بأخذ متوسط قيم الجوار','By averaging neighborhood values'],['باختيار أكبر قيمة فقط','By selecting only the maximum'],['بعكس قيمة المركز','By inverting the center value'],['بحساب مجموع القنوات اللونية','By summing color channels']
    ],0,'مرشح المتوسط يجمع قيم نافذة الجوار ويقسمها على عددها؛ وهو مرشح منخفض التمرير للتنعيم.','The mean filter sums values in the neighborhood window and divides by their count; it is a low-pass smoothing filter.'),
    question(['الارتباط والالتفاف','Correlation & convolution'],'كيف يختلف الالتفاف عن الارتباط عند تطبيق القناع؟','How does convolution differ from correlation when applying a mask?',[
      ['يقلب القناع 180 درجة قبل تحريكه','It rotates the mask by 180° before sliding it'],['يحوّل الصورة إلى RGB','It converts the image to RGB'],['يستخدم المركز فقط','It uses only the center pixel'],['يرتب الجوار تصاعدياً','It sorts the neighborhood in ascending order']
    ],0,'الالتفاف يستخدم آلية الارتباط نفسها بعد قلب نواة الترشيح بمقدار 180 درجة.','Convolution uses the correlation operation after rotating the filter kernel by 180°.'),
    question(['مرشح الوسيط','Median filter'],'أي مرشح مناسب عادةً لإزالة ضوضاء الملح والفلفل مع الحفاظ على الحواف؟','Which filter is commonly suited to salt-and-pepper noise while preserving edges?',[
      ['مرشح المتوسط','Mean filter'],['مرشح الوسيط','Median filter'],['موازنة الهيستوجرام','Histogram equalization'],['سالب الصورة','Image negative']
    ],1,'يختار مرشح الوسيط القيمة الوسطى بعد ترتيب قيم الجوار، ولذلك يقاوم القيم الشاذة المنفردة.','The median filter selects the middle value after sorting the neighborhood, making it robust to isolated outliers.'),
    question(['مرشحات الترتيب','Order-statistic filters'],'ماذا يفعل مرشحا Min وMax في نافذة الجوار؟','What do Min and Max filters do within a neighborhood window?',[
      ['يختاران أصغر أو أكبر قيمة على الترتيب','Select the smallest or largest value, respectively'],['يحسبان دائماً المتوسط','Always calculate the mean'],['يبدلان الأحمر والأزرق','Swap red and blue'],['يحسبان CDF','Calculate the CDF']
    ],0,'مرشح Min يستبدل القيمة بأصغر قيمة في النافذة، وMax بأكبر قيمة.','The Min filter replaces a value with the smallest in the window; Max uses the largest.'),
    question(['كشف الحواف','Edge detection'],'ما الذي تنتجه أقنعة Sobel الأفقية والرأسية معاً؟','What do horizontal and vertical Sobel masks provide together?',[
      ['تقديراً لمركبتي التدرج ومنهما سعة الحافة واتجاهها','Estimates of gradient components, used to find edge magnitude and direction'],['عدد مستويات الرمادي','The number of gray levels'],['مصفوفة RGB','An RGB matrix'],['عتبة Otsu فقط','Only an Otsu threshold']
    ],0,'تقدر أقنعة Sobel مركبتي التدرج Gx وGy؛ ومنهما تحسب سعة الحافة واتجاهها.','Sobel masks estimate gradient components Gx and Gy, from which edge magnitude and direction are computed.'),
    question(['مستويات البت','Bit planes'],'أي مستويات البت تحمل غالباً قدراً أكبر من المعلومات البصرية؟','Which bit planes usually carry more visual information?',[
      ['LSB فقط','Only the LSB'],['MSB أو البتات الأعلى رتبة','The MSB or higher-order planes'],['كل المستويات متطابقة','All planes are identical'],['لا يحمل أي مستوى معلومات','No plane carries information']
    ],1,'تؤثر البتات الأعلى رتبة بقوة أكبر في قيم الشدة، لذلك تحمل عادةً تفاصيل بنيوية أوضح.','Higher-order bits have greater influence on intensity values and usually carry clearer structural information.'),
    question(['لابلاس والحدة','Laplacian & sharpening'],'ما الخاصية الأساسية لمرشح Laplacian؟','What is a key property of the Laplacian filter?',[
      ['مشتقة مكانية ثانية تستجيب للتفاصيل في جميع الاتجاهات','A second spatial derivative that responds to detail in all directions'],['مرشح ترتيب لاخطي','A nonlinear order-statistic filter'],['مرشح لتصغير الصورة','A filter for image downsampling'],['قناة لونية إضافية','An additional color channel']
    ],0,'لابلاس مشتقة مكانية من الدرجة الثانية وتبرز تغيرات الشدة والحواف في الاتجاهات كافة.','The Laplacian is a second-order spatial derivative that emphasizes intensity changes and edges in all directions.')
  ];

  const exams = [
    {id:'fundamentals',number:'01',title:text('الأساسيات والتمثيل','Fundamentals & Representation'),description:text('مفاهيم معالجة الصور، الاستشعار والرقمنة، أنواع الصور، الجوار والمسافة.','Image processing concepts, sensing and digitization, image types, neighborhoods, and distance.'),topics:[text('الفصل 1','Chapter 1'),text('الفصل 2','Chapter 2')],questions:fundamentals},
    {id:'spatial',number:'02',title:text('المعالجة المكانية','Spatial Processing'),description:text('تحويلات الشدة والهيستوجرام والترشيح المكاني والتنعيم وكشف الحواف.','Intensity transforms, histograms, spatial filtering, smoothing, and edge detection.'),topics:[text('الفصلان 3 و4','Chapters 3 & 4')],questions:spatial},
    {id:'comprehensive',number:'03',title:text('اختبار شامل','Comprehensive Exam'),description:text('مراجعة شاملة لمفاهيم الفصول الأربعة في نموذج واحد.','A comprehensive review of all four chapters in one exam.'),topics:[text('الفصول 1–4','Chapters 1–4')],questions:[...fundamentals,...spatial]}
  ];
  const ui = {
    eyebrow:text('تدريب ذاتي','SELF-PRACTICE'), choose:text('اختر نموذج الاختبار','Choose an exam'), chooseIntro:text('تغطي النماذج موضوعات المحاضرات 1 إلى 4. ستظهر لك الإجابة الصحيحة وسببها بعد كل سؤال.','These exams cover lectures 1–4. After each question, you’ll see the correct answer and why it is correct.'),
    count:text('سؤالاً','questions'), start:text('ابدأ الاختبار','Start exam'), note:text('هذه أسئلة تدريبية أصلية أُعدّت من موضوعات المحاضرات، وليست أسئلة منقولة من بنك اختبار رسمي.','These original practice questions were written from the lecture topics; they are not copied from an official exam bank.'),
    back:text('كل الاختبارات','All exams'), question:text('السؤال','QUESTION'), select:text('اختر إجابة واحدة','Choose one answer'), check:text('تحقق من الإجابة','Check answer'), next:text('السؤال التالي','Next question'), previous:text('السابق','Previous'), finish:text('عرض النتيجة','See results'),
    correct:text('إجابة صحيحة','Correct'), wrong:text('ليست هذه الإجابة الصحيحة','Not quite'), explanation:text('التفسير','Explanation'), result:text('نتيجتك','Your result'), score:text('درجة','score'), correctCount:text('إجابات صحيحة','Correct answers'), review:text('مراجعة الإجابات','Answer review'), yourAnswer:text('إجابتك:','Your answer:'), correctAnswer:text('الصحيحة:','Correct:'), retake:text('إعادة الاختبار','Retake exam'), chooseAgain:text('اختيار اختبار آخر','Choose another exam'), excellent:text('ممتاز!','Excellent work!'), good:text('أداء جيد','Good work'), reviewMore:text('راجع النقاط التي تحتاج إلى تقوية.','Review the topics that need more practice.'),
    scoreLine:(score,total) => text(`أجبت إجابة صحيحة عن ${score} من ${total} سؤالاً.`,`You answered ${score} of ${total} questions correctly.`),
    progress:(n,total) => text(`السؤال ${n} من ${total}`,`Question ${n} of ${total}`),
    item:(n,total) => text(`السؤال ${String(n).padStart(2,'0')} / ${String(total).padStart(2,'0')}`,`QUESTION ${String(n).padStart(2,'0')} / ${String(total).padStart(2,'0')}`)
  };

  const app = document.querySelector('#quizApp');
  let language = document.documentElement.lang === 'en' ? 'en' : 'ar';
  let screen = 'select';
  let activeExam = null;
  let currentQuestion = 0;
  let selections = [];
  let checked = [];
  const t = item => item[language] || item.ar;

  function renderSelect() {
    screen = 'select'; activeExam = null;
    app.innerHTML = `<div class="quiz-shell"><div class="quiz-screen-heading"><div><span class="section-kicker">${t(ui.eyebrow)}</span><h2>${t(ui.choose)}</h2></div><p>${t(ui.chooseIntro)}</p></div><div class="exam-grid">${exams.map(exam => `<article class="exam-card"><div class="exam-card-top"><span class="exam-id">EXAM / ${exam.number}</span><span class="exam-question-count">${exam.questions.length} ${t(ui.count)}</span></div><h3>${t(exam.title)}</h3><p>${t(exam.description)}</p><div class="exam-topics">${exam.topics.map(topic => `<span>${t(topic)}</span>`).join('')}</div><button class="exam-start" data-exam="${exam.id}">${t(ui.start)} <i>↙</i></button></article>`).join('')}</div><div class="quiz-note"><i class="note-dot"></i><span>${t(ui.note)}</span></div></div>`;
    app.querySelectorAll('[data-exam]').forEach(button => button.addEventListener('click', () => startExam(button.dataset.exam)));
  }
  function startExam(id) {
    activeExam = exams.find(exam => exam.id === id);
    if (!activeExam) return renderSelect();
    screen = 'quiz'; currentQuestion = 0;
    selections = new Array(activeExam.questions.length).fill(null);
    checked = new Array(activeExam.questions.length).fill(false);
    renderQuestion();
  }
  function renderQuestion() {
    if (!activeExam) return renderSelect();
    const total = activeExam.questions.length;
    const item = activeExam.questions[currentQuestion];
    const selected = selections[currentQuestion];
    const isChecked = checked[currentQuestion];
    const isCorrect = selected === item.correct;
    const progressPercent = ((currentQuestion + 1) / total) * 100;
    app.innerHTML = `<div class="quiz-shell"><div class="quiz-topline"><button class="quiz-back" id="backToExams">← ${t(ui.back)}</button><div class="quiz-progress-block"><div class="quiz-progress-info"><span>${activeExam.number} / ${activeExam.id.toUpperCase()}</span><span>${t(ui.progress(currentQuestion + 1,total))}</span></div><div class="quiz-progress-track"><span style="width:${progressPercent}%"></span></div></div><span class="question-counter">${currentQuestion + 1} / ${total}</span></div><article class="quiz-question-card"><div class="question-meta"><span>${t(ui.item(currentQuestion + 1,total))}</span><span class="question-topic">${t(item.topic)}</span></div><h2 class="question-text" dir="auto">${t(item.q)}</h2><div class="answer-list">${item.options.map((option,index) => {
      const classes = ['answer-option'];
      if (selected === index) classes.push('selected');
      if (isChecked && index === item.correct) classes.push('correct');
      if (isChecked && selected === index && !isCorrect) classes.push('incorrect');
      if (isChecked && selected !== index && index !== item.correct) classes.push('muted');
      return `<button class="${classes.join(' ')}" data-option="${index}" ${isChecked?'disabled':''} dir="auto"><span class="option-letter">${String.fromCharCode(65+index)}</span><span>${t(option)}</span></button>`;
    }).join('')}</div>${isChecked?`<div class="answer-feedback ${isCorrect?'is-correct':'is-wrong'}"><span class="feedback-mark">${isCorrect?'✓':'!'}</span><div><b>${isCorrect?t(ui.correct):t(ui.wrong)}</b><span>${t(item.explain)}</span></div></div>`:''}<div class="quiz-actions"><button class="quiz-action-button" id="previousQuestion" ${currentQuestion===0?'disabled':''}>${t(ui.previous)}</button><div class="quiz-action-group">${!isChecked?`<button class="quiz-action-button primary" id="checkAnswer" ${selected===null?'disabled':''}>${t(ui.check)}</button>`:''}<button class="quiz-action-button primary" id="nextQuestion" ${!isChecked?'disabled':''}>${currentQuestion===total-1?t(ui.finish):t(ui.next)}</button></div></div></article></div>`;
    app.querySelector('#backToExams').addEventListener('click',renderSelect);
    app.querySelectorAll('[data-option]').forEach(button => button.addEventListener('click', () => {
      if (checked[currentQuestion]) return;
      selections[currentQuestion] = Number(button.dataset.option);
      renderQuestion();
    }));
    app.querySelector('#previousQuestion').addEventListener('click', () => {
      if (currentQuestion > 0) { currentQuestion--; renderQuestion(); }
    });
    const checkButton = app.querySelector('#checkAnswer');
    if (checkButton) checkButton.addEventListener('click', () => {
      if (selections[currentQuestion] === null) return;
      checked[currentQuestion] = true;
      renderQuestion();
    });
    app.querySelector('#nextQuestion').addEventListener('click', () => {
      if (!checked[currentQuestion]) return;
      if (currentQuestion === total - 1) renderResult();
      else { currentQuestion++; renderQuestion(); }
    });
  }
  function renderResult() {
    screen = 'result';
    const total = activeExam.questions.length;
    const score = activeExam.questions.reduce((sum,item,index) => sum + (selections[index] === item.correct ? 1 : 0),0);
    const percent = Math.round(score / total * 100);
    const headline = percent >= 85 ? t(ui.excellent) : percent >= 60 ? t(ui.good) : t(ui.reviewMore);
    app.innerHTML = `<div class="quiz-result"><section class="result-hero"><div class="score-ring"><strong>${score}/${total}</strong><span>${percent}%</span></div><div class="result-copy"><span class="section-kicker">${t(ui.result)} / ${activeExam.number}</span><h2>${headline}</h2><p>${t(ui.scoreLine(score,total))}</p><div class="result-stats"><span>${score} ${t(ui.correctCount)}</span><span>${total-score} ${language==='ar'?'غير صحيحة':'incorrect'}</span></div></div></section><div class="review-heading"><h3>${t(ui.review)}</h3><span>${total} ${t(ui.count)}</span></div><div class="review-list">${activeExam.questions.map((item,index) => {
      const right = selections[index] === item.correct;
      return `<article class="review-item ${right?'is-correct':'is-wrong'}"><span class="review-number">${String(index+1).padStart(2,'0')}</span><div><div class="review-question" dir="auto">${t(item.q)}</div><div class="review-answer" dir="auto">${t(ui.yourAnswer)} ${t(item.options[selections[index]])}${right?'':` · ${t(ui.correctAnswer)} ${t(item.options[item.correct])}`}</div></div><span class="review-mark">${right?'✓':'×'}</span></article>`;
    }).join('')}</div><div class="result-actions"><button class="quiz-action-button primary" id="retakeExam">${t(ui.retake)}</button><button class="quiz-action-button" id="selectAnother">${t(ui.chooseAgain)}</button></div></div>`;
    app.querySelector('#retakeExam').addEventListener('click', () => startExam(activeExam.id));
    app.querySelector('#selectAnother').addEventListener('click', renderSelect);
  }
  window.addEventListener('languagechange', event => {
    language = event.detail?.language === 'en' ? 'en' : 'ar';
    if (screen === 'select') renderSelect();
    else if (screen === 'quiz') renderQuestion();
    else renderResult();
  });
  renderSelect();
})();
