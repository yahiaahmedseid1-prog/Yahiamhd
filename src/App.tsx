import { useState, useEffect, ReactNode } from "react";
import { 
  Tv, 
  Play, 
  Download, 
  Smartphone, 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Info, 
  ExternalLink, 
  Sparkles, 
  Share2, 
  Video, 
  Smartphone as PhoneIcon,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for structural clarity
interface Step {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  detail: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ApkDetails {
  name: string;
  fileName: string;
  size: string;
  version: string;
  url: string;
  role: string;
  color: string;
  icon: ReactNode;
}

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [downloadingApk, setDownloadingApk] = useState<ApkDetails | null>(null);
  const [downloadTimer, setDownloadTimer] = useState<number>(3);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timer effect for simulated secure redirection
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloadingApk && downloadTimer > 0) {
      interval = setInterval(() => {
        setDownloadTimer((prev) => prev - 1);
      }, 1000);
    } else if (downloadingApk && downloadTimer === 0) {
      // Open Mediafire link in new tab
      window.open(downloadingApk.url, "_blank", "noopener,noreferrer");
      setDownloadingApk(null);
    }
    return () => clearInterval(interval);
  }, [downloadingApk, downloadTimer]);

  const handleDownloadClick = (apk: ApkDetails) => {
    setDownloadingApk(apk);
    setDownloadTimer(3);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const apks: ApkDetails[] = [
    {
      name: "YAHIA TV",
      fileName: "Yahia_TV.apk",
      size: "31.32 ميجابايت",
      version: "v2.5 (الأحدث)",
      url: "https://www.mediafire.com/file/st0wz11ug19x3h2/Yahia_TV.apk/file",
      role: "التطبيق الرئيسي لمشاهدة القنوات والمباريات والأفلام",
      color: "from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 shadow-rose-900/40",
      icon: <Tv className="w-12 h-12 text-rose-500" />
    },
    {
      name: "YAHIA PLAYER",
      fileName: "YAHIA_Player.apk",
      size: "22.51 ميجابايت",
      version: "v1.8 (الأحدث)",
      url: "https://www.mediafire.com/file/m26e0ajh3hu2yb4/YAHIA_Player.apk/file",
      role: "المشغل الرسمي الإجباري لفك التشفير وتشغيل البث بدون تقطيع",
      color: "from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-orange-900/40",
      icon: <Play className="w-12 h-12 text-amber-500" />
    }
  ];

  const steps: Step[] = [
    {
      id: 1,
      title: "تنزيل الملفات",
      description: "قم بتحميل ملف تطبيق YAHIA TV وملف المشغل YAHIA PLAYER من أزرار التحميل المباشرة بالصفحة.",
      icon: <Download className="w-6 h-6 text-rose-500" />,
      detail: "تأكد من تنزيل كلا الملفين، حيث تبلغ مساحة التطبيق 31.32 ميجابايت ومساحة المشغل 22.51 ميجابايت."
    },
    {
      id: 2,
      title: "السماح بالتثبيت",
      description: "قم بتفعيل خيار 'التثبيت من مصادر غير معروفة' من إعدادات الحماية بهاتفك الأندرويد.",
      icon: <Settings className="w-6 h-6 text-amber-500" />,
      detail: "اذهب إلى الإعدادات > الحماية والخصوصية > تثبيت التطبيقات غير المعروفة > ثم اختر المتصفح أو مدير الملفات وقم بتفعيل السماح."
    },
    {
      id: 3,
      title: "تثبيت التطبيقات",
      description: "افتح مدير الملفات أو مجلد التنزيلات وتثبيت كلا الملفين اللذين قمت بتنزيلهما بالتتابع.",
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      detail: "ابدأ بتثبيت تطبيق YAHIA TV أولاً، ثم قم بعد ذلك مباشرة بتثبيت YAHIA PLAYER كمشغل مكمل."
    },
    {
      id: 4,
      title: "المشاهدة والاستمتاع",
      description: "افتح تطبيق YAHIA TV، واختر القناة أو البث المفضل لديك، وسيعمل تلقائياً عن طريق المشغل المدمج.",
      icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
      detail: "المشغل يعمل في الخلفية بشكل صامت وتلقائي لضمان بث عالي الجودة وبدون أي تقطيع أو إعلانات مزعجة."
    }
  ];

  const faqs: FaqItem[] = [
    {
      question: "لماذا لا يعمل تطبيق YAHIA TV بدون تطبيق YAHIA PLAYER؟",
      answer: "تطبيق YAHIA TV مبرمج ليعمل باستخدام مشغل ذكي متطور خاص به لفك تشفير البث المباشر للقنوات الرياضية والترفيهية بأعلى كفاءة. هذا المشغل يضمن لك حماية كاملة، تشغيل سريع، وتخفيف الضغط على ذاكرة الهاتف بالمقارنة مع المشغلات العامة."
    },
    {
      question: "هل ملفات التحميل APK آمنة على جهازي؟",
      answer: "نعم، الملفات آمنة بنسبة 100%. تم فحص الملفات عبر برامج الأمان وفحص الفيروسات لضمان سلامتها وخلوها من أي برمجيات ضارة. يمكنك تثبيتها على هاتفك بثقة تامة."
    },
    {
      question: "هل التطبيق متوافق مع شاشات التلفاز الذكية وأجهزة TV Box؟",
      answer: "نعم بالتأكيد! يدعم تطبيق YAHIA TV ومشغله العمل بشكل ممتاز على شاشات الأندرويد الذكية (Smart TV)، أجهزة Xiaomi Mi Box، وأجهزة Firestick. يمكنك نقل ملفات APK للشاشة وتثبيتها للاستمتاع بالمشاهدة على شاشة كبيرة."
    },
    {
      question: "كيف يمكنني حل مشكلة 'التطبيق ليس ثنائياً' أو مشاكل التثبيت المماثلة؟",
      answer: "تأكد من وجود مساحة تخزينية كافية لا تقل عن 100 ميجابايت على هاتفك، وتأكد أيضاً من تفعيل 'التثبيت من مصادر غير معروفة'. إذا واجهتك أي مشكلة، يرجى حذف أي نسخ قديمة وإعادة تثبيت الملفين معاً من هذه الصفحة الرسمية."
    },
    {
      question: "هل يستهلك التطبيق الكثير من باقة الإنترنت؟",
      answer: "يتميز التطبيق بتوفير خيارات بث متعددة الجودة (من جودة ضعيفة وموفرة للباقة SD حتى جودة فائقة FHD). يمكنك اختيار الجودة المناسبة لسرعة وحجم باقة الإنترنت الخاصة بك للتحكم في استهلاك البيانات."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white" id="main-container">
      {/* Dynamic Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-rose-900/10 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-900/10 blur-[150px]" />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-900/80 shadow-lg py-3" 
            : "bg-transparent py-5"
        }`}
        id="navbar"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 shadow-lg shadow-rose-600/20">
              <Tv className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-l from-white via-slate-100 to-rose-400 bg-clip-text text-transparent">YAHIA TV</span>
              <span className="block text-[10px] text-slate-400 font-medium">الموقع الرسمي للتحميل</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#download-section" className="hover:text-rose-400 transition-colors">تحميل التطبيق</a>
            <a href="#instructions-section" className="hover:text-rose-400 transition-colors">خطوات التثبيت</a>
            <a href="#features-section" className="hover:text-rose-400 transition-colors">مزايا التطبيق</a>
            <a href="#faq-section" className="hover:text-rose-400 transition-colors">الأسئلة الشائعة</a>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              id="share-btn"
              title="مشاركة رابط الموقع"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedLink ? "تم النسخ!" : "مشاركة الموقع"}</span>
            </button>
            <a 
              href="#download-section" 
              className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-l from-rose-600 to-red-600 hover:shadow-lg hover:shadow-rose-600/25 transition-all"
            >
              <span>تحميل الآن</span>
              <ArrowRight className="w-3 h-3 rotate-180" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 z-10 pt-24 pb-16">
        
        {/* Banner Alert */}
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-400">تنويه هام للتشغيل الصحيح</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                تطبيق <strong className="text-white">YAHIA TV</strong> لا يمكنه العمل نهائياً بدون المشغل الرسمي المكمل له <strong className="text-white">YAHIA PLAYER</strong>. يرجى التأكد من تحميلهما وتثبيتهما معاً لضمان فتح البث وتدفق القنوات بشكل سليم.
              </p>
            </div>
          </div>
        </div>

        {/* Hero & Intro Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Top Side: Text and Download CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right" id="hero-text-block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-rose-400 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>الموقع الرسمي والوحيد لتحميل التطبيق مجاناً</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              شاهد قنواتك المفضلة مجاناً مع <br className="hidden sm:inline"/>
              <span className="bg-gradient-to-l from-rose-500 via-red-500 to-amber-400 bg-clip-text text-transparent">YAHIA TV</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              أفضل تطبيق أندرويد متكامل لمتابعة البث المباشر للقنوات التلفزيونية والمباريات الرياضية الكبرى والأفلام العربية والعالمية بجودات متعددة وبدون أي تقطيع.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-sm max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-1 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ملفات تثبيت APK نظيفة وبأحدث إصدار لعام 2026</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                جميع روابط التحميل مباشرة من ميديا فاير (MediaFire) سريعة وموثوقة وصالحة لجميع الأجهزة الذكية وشاشات الأندرويد.
              </p>
            </div>

            {/* Quick stats panel */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/60 text-center">
                <span className="block text-xl font-bold text-white">31.3MB</span>
                <span className="text-[11px] text-slate-400">حجم التطبيق</span>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/60 text-center">
                <span className="block text-xl font-bold text-white">22.5MB</span>
                <span className="text-[11px] text-slate-400">حجم المشغل</span>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/60 text-center">
                <span className="block text-xl font-bold text-emerald-400">مجاني</span>
                <span className="text-[11px] text-slate-400">ترخيص التطبيق</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#download-section"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-l from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl shadow-lg shadow-rose-950/40 hover:shadow-rose-600/20 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>انتقل إلى روابط التحميل المباشرة</span>
              </a>
              <a 
                href="#instructions-section"
                className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>شرح خطوات التثبيت</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </a>
            </div>
          </div>

          {/* Right / Bottom Side: Interactive Phone & TV App Mockup using CSS */}
          <div className="lg:col-span-5 flex justify-center" id="hero-visual-block">
            <div className="relative w-full max-w-[320px] aspect-[9/18] bg-slate-950 rounded-[48px] border-[6px] border-slate-800 p-2.5 shadow-2xl shadow-slate-900/90 overflow-hidden">
              {/* Speaker / Notch */}
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-2 border border-slate-800" />
              </div>

              {/* Screen Content Wrapper */}
              <div className="w-full h-full rounded-[38px] bg-slate-900 overflow-hidden relative flex flex-col pt-6 font-sans">
                {/* Simulated App Header */}
                <div className="px-4 py-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
                      <Tv className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-white">YAHIA TV</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[8px] font-bold">بث مباشر</span>
                </div>

                {/* Simulated Banner/Slider */}
                <div className="px-3 pt-3">
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-3 h-28 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-slate-950/40" />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[8px] font-bold">مباراة اليوم</div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-center text-[10px] text-slate-300 font-bold">
                        <span>ريال مدريد</span>
                        <span className="text-amber-400 font-mono text-xs">21:00</span>
                        <span>برشلونة</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="w-2/3 h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Categories */}
                <div className="px-3 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 block mb-2">أقسام القنوات المفضلة</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-semibold">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 flex flex-col items-center gap-1 hover:border-rose-500/30 transition-colors">
                      <Video className="w-4 h-4 text-rose-500" />
                      <span>قنوات رياضية</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 flex flex-col items-center gap-1 hover:border-amber-500/30 transition-colors">
                      <Layers className="w-4 h-4 text-amber-500" />
                      <span>باقة ترفيهية</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 flex flex-col items-center gap-1 hover:border-emerald-500/30 transition-colors">
                      <Tv className="w-4 h-4 text-emerald-500" />
                      <span>قنوات عربية</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 flex flex-col items-center gap-1 hover:border-blue-500/30 transition-colors">
                      <Play className="w-4 h-4 text-blue-500" />
                      <span>سينما وأفلام</span>
                    </div>
                  </div>
                </div>

                {/* Active Player Stream Simulation */}
                <div className="p-3 mt-auto">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                        <Play className="w-4 h-4 fill-amber-500/20" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-white block">YAHIA PLAYER</span>
                        <span className="text-[8px] text-slate-400 block">مشغل بجودة FHD نشط الآن</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] text-emerald-400 font-bold font-mono">متصل</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent shadow elements */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none rounded-[48px]" />
            </div>
          </div>
        </section>

        {/* Download Section containing APK Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24" id="download-section">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">روابط تحميل التطبيق والمشغل المباشرة</h2>
            <p className="text-sm text-slate-400 mt-2">
              انقر فوق أزرار التحميل أدناه لبدء تنزيل الملفات مباشرة من خوادم ميديا فاير الآمنة والسريعة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {apks.map((apk, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900/80 transition-all duration-300 shadow-xl"
              >
                {/* Badge specifying App/Player */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    index === 0 
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {index === 0 ? "التطبيق الرئيسي" : "المشغل الإلزامي"}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                    {apk.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">{apk.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{apk.fileName}</p>
                    <p className="text-xs text-slate-300 pt-1 font-medium">{apk.role}</p>
                  </div>
                </div>

                {/* APK Specifications */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950/60 rounded-xl p-3 border border-slate-800/50 mb-6 text-xs text-slate-400">
                  <div>
                    <span className="block text-[10px] text-slate-500">الحجم الكلي:</span>
                    <strong className="text-white font-mono">{apk.size}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">الإصدار المتاح:</span>
                    <strong className="text-white font-mono">{apk.version}</strong>
                  </div>
                </div>

                {/* Primary Button */}
                <button
                  onClick={() => handleDownloadClick(apk)}
                  className={`w-full py-3.5 px-6 bg-gradient-to-l ${apk.color} text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer transform group-hover:scale-[1.01]`}
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>تحميل ملف APK المباشر</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-slate-900/30 max-w-2xl mx-auto rounded-xl p-4 border border-slate-800/60">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
              <Info className="w-3.5 h-3.5 text-rose-500" />
              <span>مجموع حجم الملفين المراد تحميلهما معاً هو تقريباً</span>
              <strong className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">53.83 ميجابايت</strong>
            </p>
          </div>
        </section>

        {/* Detailed Interactive Installation Guide */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24 border-t border-slate-900" id="instructions-section">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">خطوات تثبيت وتشغيل التطبيق بالتفصيل</h2>
            <p className="text-sm text-slate-400 mt-2">
              يرجى اتباع هذه الخطوات الأربع البسيطة لضمان تشغيل البث المباشر والقنوات بنجاح على هاتفك أو شاشتك الذكية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Selection Accordions / Tabs (Left Column) */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-right p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    activeStep === step.id
                      ? "bg-gradient-to-l from-slate-900 to-slate-950 border-rose-500/40 shadow-md"
                      : "bg-slate-900/30 border-slate-900/60 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      activeStep === step.id 
                        ? "bg-rose-500 text-white" 
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {step.id}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${activeStep === step.id ? "text-rose-400" : "text-white"}`}>
                        {step.title}
                      </h4>
                    </div>
                  </div>
                  {step.icon}
                </button>
              ))}
            </div>

            {/* Expanded Detailed View for Selected Step (Right Column) */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 min-h-[280px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/20">
                      الخطوة {activeStep} من 4
                    </span>
                    <h3 className="text-xl font-bold text-white">{steps[activeStep - 1].title}</h3>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed pt-2">
                    {steps[activeStep - 1].description}
                  </p>

                  <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 leading-relaxed flex gap-2 items-start">
                    <Info className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{steps[activeStep - 1].detail}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quick controls to toggle steps */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 transition-all cursor-pointer"
                >
                  السابق
                </button>
                
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <span 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeStep === i ? "bg-rose-500 w-3" : "bg-slate-800"
                      }`} 
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                  disabled={activeStep === 4}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 transition-all cursor-pointer"
                >
                  التالي
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic App Features Bento Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24 border-t border-slate-900" id="features-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">لماذا تختار تطبيق YAHIA TV لبث القنوات؟</h2>
            <p className="text-sm text-slate-400 mt-2">
              اكتشف أهم الخصائص والمميزات التي تجعل هذا التطبيق الخيار الأول لملايين المستخدمين لمشاهدة البث المباشر.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">سرعة عالية وتوفير بيانات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                يتميز بنظام ضغط عالي الدقة، مما يمكنك من مشاهدة القنوات بجودة ممتازة بدون استهلاك كبير لحزمة الإنترنت وبدون تشغيل بطيء للمكالمات.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">قنوات متنوعة مصنفة بعناية</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                يحتوي التطبيق على تصنيفات منظمة تشمل القنوات الرياضية العالمية والعربية، باقات الأفلام والمسلسلات، وباقات الأطفال والبرامج الوثائقية.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700/80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">تحديث ومتابعة مستمرة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                نقوم بتحديث روابط القنوات والسيرفرات بشكل يومي لضمان استمرار البث المباشر وتفادي حدوث انقطاع أثناء المباريات الرياضية الهامة.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24 border-t border-slate-900" id="faq-section">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex p-2 rounded-xl bg-slate-900 text-rose-500 mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">الأسئلة الشائعة حول تثبيت وتشغيل التطبيق</h2>
            <p className="text-sm text-slate-400 mt-2">
              تصفح الإجابات الشافية عن أبرز استفسارات المستخدمين المتعلقة بالتحميل والتثبيت.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-900/30 border border-slate-900 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-right p-5 flex items-center justify-between gap-4 font-bold text-sm text-white hover:bg-slate-900/50 transition-colors cursor-pointer"
                >
                  <span className={openFaq === index ? "text-rose-400" : ""}>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-950/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-10 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-right">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-md text-white">YAHIA TV & PLAYER</span>
              <p className="text-[10px] text-slate-500">موقع رسمي مخصص للتحميل الفوري المجاني 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#download-section" className="hover:text-rose-400 transition-colors">تنزيل التطبيق والمشغل</a>
            <a href="#instructions-section" className="hover:text-rose-400 transition-colors">دليل التثبيت</a>
            <a href="#features-section" className="hover:text-rose-400 transition-colors">مزايا التطبيق</a>
            <a href="#faq-section" className="hover:text-rose-400 transition-colors">الأسئلة الشائعة</a>
          </div>

          <div className="text-center md:text-left text-[11px] text-slate-500">
            جميع الحقوق محفوظة للمطور يحيى © 2026. <br className="md:hidden" /> الروابط آمنة ويتم فحصها باستمرار.
          </div>
        </div>
      </footer>

      {/* Animated Redirection Modal / Download Simulator */}
      <AnimatePresence>
        {downloadingApk && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDownloadingApk(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl z-10"
              id="download-modal"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-rose-500/10 text-rose-400 animate-pulse">
                  <Download className="w-8 h-8" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">جاري الانتقال لصفحة التحميل المباشر</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                أنت الآن على وشك تنزيل <strong className="text-white font-mono">{downloadingApk.name}</strong> ({downloadingApk.size}) برابط مباشر من موقع ميديا فاير.
              </p>

              {/* Timer Progress */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                <span className="block text-xs text-slate-500 mb-1">سيتم فتح الرابط تلقائياً في غضون:</span>
                <span className="text-3xl font-black text-rose-500 font-mono">{downloadTimer}</span>
                <span className="block text-[10px] text-slate-400 mt-1">ثوانٍ... يرجى الانتظار</span>
              </div>

              {/* Quick instructions inside modal */}
              <div className="text-right p-3 rounded-lg bg-slate-950/40 border border-slate-800/50 mb-4 text-xs">
                <span className="font-bold text-amber-400 block mb-1">💡 تذكير لتثبيت ناجح:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pr-2">
                  <li>قم بتنزيل كلا التطبيقين وتثبيتهما ليعمل البث.</li>
                  <li>اسمح بالتثبيت من مصادر غير معروفة عند الطلب.</li>
                </ul>
              </div>

              {/* Instant Redirect Link */}
              <div className="flex gap-2">
                <a 
                  href={downloadingApk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>اضغط هنا للانتقال فوراً</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => setDownloadingApk(null)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
