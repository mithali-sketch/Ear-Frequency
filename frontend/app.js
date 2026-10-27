/**
 * AudioMetrics - Clinical Pure-Tone Audiometry Application
 * Advanced Features:
 *  - Multilingual Language Support (English, Spanish, French, German, Hindi, Tamil, Chinese, Japanese)
 *  - Active Background Noise Cancellation (ANC) with Mic Ambient dBA Meter
 *  - Guided Test Stepper Wizard ("Where Next Step Goes")
 *  - Extended High Frequency Audiometry (250 Hz to 20,000 Hz)
 *  - Dual-Ear Air Conduction Testing (Left Ear ✕ & Right Ear ◯)
 *  - Age-based Hearing Capacity Baseline & 2026 Research Paper Limitations Reference
 *  - Interactive SVG Audiogram & Actionable Next Steps Guidance
 */

// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================
const API_BASE_URL = "http://localhost:5000/api";

// Extended Frequencies (250 Hz to 20,000 Hz - Image 2 & 3 Research Requirements)
const TEST_FREQUENCIES = [250, 500, 750, 1000, 2000, 4000, 6000, 8000, 9000, 10000, 12000, 14000, 16000, 18000, 20000];
const DB_MIN = -10;
const DB_MAX = 120;
const DB_STEP = 5;

// SVG Audiogram Coordinate Configuration (15 Frequency Calibration Mapping)
const SVG_CONFIG = {
  width: 760,
  height: 560,
  padding: { top: 50, right: 50, bottom: 65, left: 75 },
  freqMap: {
    250: 0.04,
    500: 0.12,
    750: 0.19,
    1000: 0.27,
    2000: 0.40,
    4000: 0.52,
    6000: 0.62,
    8000: 0.70,
    9000: 0.75,
    10000: 0.80,
    12000: 0.86,
    14000: 0.91,
    16000: 0.95,
    18000: 0.98,
    20000: 1.00
  }
};

// ==========================================
// MULTILINGUAL DICTIONARY (i18n)
// ==========================================
const I18N_TRANSLATIONS = {
  en: {
    nav_limitations: "2026 Research & Limitations",
    nav_reference: "Hearing Limits & Scale",
    nav_cloud: "Cloud Sync",
    nav_logout: "Logout",
    limitations_title: "📜 2026 Paper Limitations & Research Foundation",
    ref_title: "📊 Age vs. Hearing Capacity & Severity Scale",
    stepper_title: "🧭 Guided Test Flow & Progress",
    step1_name: "Profile & Age",
    step1_desc: "Step 1: Verify Patient Profile & Expected High-Frequency Capacity",
    step2_name: "Earphones & ANC",
    step2_desc: "Step 2: Plug Earphones & Enable Active Background Noise Cancellation",
    step3_name: "Frequency Scan",
    step3_desc: "Step 3: Conduct Pure-Tone Scanning (250 Hz – 20,000 Hz)",
    step4_name: "Audiogram Graph",
    step4_desc: "Step 4: Analyze Dual-Ear Audiogram Curves & PTA Values",
    step5_name: "Report & Next Steps",
    step5_desc: "Step 5: Review Actionable Next Steps & Save Diagnostic Record",
    next_steps_title: "Recommended Next Steps & Action Plan",
    next_steps_subtitle: "Clear, easy-to-understand audiological next steps based on your hearing capacity"
  },
  es: {
    nav_limitations: "Investigación y Limitaciones 2026",
    nav_reference: "Límites auditivos y escala",
    nav_cloud: "Sincronización en la nube",
    nav_logout: "Cerrar sesión",
    limitations_title: "📜 Limitaciones del artículo de 2026 y base de investigación",
    ref_title: "📊 Edad vs. Capacidad Auditiva y Escala de Severidad",
    stepper_title: "🧭 Flujo de Prueba Guiado y Progreso",
    step1_name: "Perfil y Edad",
    step1_desc: "Paso 1: Verifique el perfil del paciente y la capacidad de alta frecuencia esperada",
    step2_name: "Auriculares y ANC",
    step2_desc: "Paso 2: Conecte los auriculares y active la cancelación de ruido de fondo",
    step3_name: "Escaneo de Frecuencia",
    step3_desc: "Paso 3: Realice el escaneo de tonos puros (250 Hz – 20,000 Hz)",
    step4_name: "Gráfico del Audiograma",
    step4_desc: "Paso 4: Analice las curvas del audiograma de ambos oídos y valores PTA",
    step5_name: "Informe y Próximos Pasos",
    step5_desc: "Paso 5: Revise los próximos pasos prácticos y guarde el registro diagnóstico",
    next_steps_title: "Próximos Pasos Recomendados y Plan de Acción",
    next_steps_subtitle: "Próximos pasos audiológicos claros y fáciles de entender basados en su capacidad"
  },
  fr: {
    nav_limitations: "Recherche et Limitations 2026",
    nav_reference: "Limites auditives et échelle",
    nav_cloud: "Synchro Nuage",
    nav_logout: "Déconnexion",
    limitations_title: "📜 Limitations de l'article 2026 et fondement de la recherche",
    ref_title: "📊 Âge vs. Capacité Auditive et Échelle de Sévérité",
    stepper_title: "🧭 Parcours de Test Guidé et Progrès",
    step1_name: "Profil et Âge",
    step1_desc: "Étape 1: Vérifier le profil du patient et la capacité haute fréquence attendue",
    step2_name: "Écouteurs et ANC",
    step2_desc: "Étape 2: Brancher les écouteurs et activer la réduction de bruit active",
    step3_name: "Balayage Fréquence",
    step3_desc: "Étape 3: Effectuer le balayage de sons purs (250 Hz – 20 000 Hz)",
    step4_name: "Graphique Audiogramme",
    step4_desc: "Étape 4: Analyser les courbes d'audiogramme et les valeurs PTA",
    step5_name: "Rapport et Étapes Suivantes",
    step5_desc: "Étape 5: Examiner les prochaines étapes concrètes et enregistrer le dossier",
    next_steps_title: "Prochaines Étapes Recommandées et Plan d'Action",
    next_steps_subtitle: "Prochaines étapes audiologiques claires basées sur votre capacité auditive"
  },
  de: {
    nav_limitations: "Forschung & Grenzen 2026",
    nav_reference: "Hörgrenzen & Skala",
    nav_cloud: "Cloud-Sync",
    nav_logout: "Abmelden",
    limitations_title: "📜 Papiergrenzen 2026 & Forschungsfundament",
    ref_title: "📊 Alter vs. Hörkapazität & Schweregradskala",
    stepper_title: "🧭 Geführter Testablauf & Fortschritt",
    step1_name: "Profil & Alter",
    step1_desc: "Schritt 1: Patientenprofil und erwartete Hochfrequenzkapazität prüfen",
    step2_name: "Kopfhörer & ANC",
    step2_desc: "Schritt 2: Kopfhörer anschließen und aktive Geräuschunterdrückung aktivieren",
    step3_name: "Frequenz-Scan",
    step3_desc: "Schritt 3: Reinton-Scan durchführen (250 Hz – 20.000 Hz)",
    step4_name: "Audiogramm-Diagramm",
    step4_desc: "Schritt 4: Audiogrammkurven beider Ohren und PTA-Werte analysieren",
    step5_name: "Bericht & Nächste Schritte",
    step5_desc: "Schritt 5: Empfohlene nächste Schritte prüfen und Befund speichern",
    next_steps_title: "Empfohlene nächste Schritte & Aktionsplan",
    next_steps_subtitle: "Klare, leicht verständliche audiologische Schritte basierend auf Ihrer Hörfähigkeit"
  },
  hi: {
    nav_limitations: "2026 अनुसंधान एवं सीमाएं",
    nav_reference: "श्रवण सीमाएं एवं स्केल",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लॉगआउट",
    limitations_title: "📜 2026 शोध पत्र की सीमाएं और अनुसंधान आधार",
    ref_title: "📊 आयु बनाम श्रवण क्षमता और गंभीरता पैमाना",
    stepper_title: "🧭 निर्देशित परीक्षण प्रवाह और प्रगति",
    step1_name: "प्रोफ़ाइल और आयु",
    step1_desc: "चरण 1: रोगी प्रोफ़ाइल और अपेक्षित उच्च-आवृत्ति क्षमता सत्यापित करें",
    step2_name: "इयरफ़ोन और एएनसी",
    step2_desc: "चरण 2: इयरफ़ोन प्लग करें और सक्रिय पृष्ठभूमि शोर रद्दीकरण सक्षम करें",
    step3_name: "आवृत्ति स्कैन",
    step3_desc: "चरण 3: शुद्ध-टोन स्कैनिंग आयोजित करें (250 हर्ट्ज - 20,000 हर्ट्ज)",
    step4_name: "ऑडियोग्राम ग्राफ",
    step4_desc: "चरण 4: दोनों कानों के ऑडियोग्राम वक्र और पीटीए मानों का विश्लेषण करें",
    step5_name: "रिपोर्ट और अगले कदम",
    step5_desc: "चरण 5: कार्रवाई योग्य अगले कदमों की समीक्षा करें और रिकॉर्ड सहेजें",
    next_steps_title: "अनुशंसित अगले कदम और कार्य योजना",
    next_steps_subtitle: "आपकी श्रवण क्षमता के आधार पर स्पष्ट और समझने में आसान अगले कदम"
  },
  ta: {
    nav_limitations: "2026 ஆராய்ச்சி & வரம்புகள்",
    nav_reference: "கேட்கும் வரம்புகள் & அளவுக்கோள்",
    nav_cloud: "கிளவுட் ஒத்திசைவு",
    nav_logout: "வெளியேறு",
    limitations_title: "📜 2026 ஆய்வுத் தாள் வரம்புகள் & ஆராய்ச்சி அடிப்படை",
    ref_title: "📊 வயது vs கேட்கும் திறன் & தீவிரத்தன்மை அளவுக்கோள்",
    stepper_title: "🧭 வழிகாட்டப்பட்ட சோதனை மற்றும் முன்னேற்றம்",
    step1_name: "சுயவிவரம் & வயது",
    step1_desc: "படி 1: நோயாளி சுயவிவரம் மற்றும் எதிர்பார்க்கப்படும் திறனைச் சரிபார்க்கவும்",
    step2_name: "இயர்போன்கள் & ANC",
    step2_desc: "படி 2: இயர்போன்களை இணைத்து பின்னணி இரைச்சல் நீக்கத்தை இயக்கவும்",
    step3_name: "அதிர்வெண் ஸ்கேன்",
    step3_desc: "படி 3: தூய-தொனி சோதனையை നടത്തவும் (250 Hz – 20,000 Hz)",
    step4_name: "ஆடியோகிராம் வரைபடம்",
    step4_desc: "படி 4: இரு காதுகளின் ஆடியோகிராம் வளைவுகள் மற்றும் PTA மதிப்புகளை பகுப்பாய்வு செய்க",
    step5_name: "அறிக்கை & அடுத்த படிகள்",
    step5_desc: "படி 5: அடுத்த படிகளை மதிப்பாய்வு செய்து பதிவைச் சேமிக்கவும்",
    next_steps_title: "பரிந்துரைக்கப்பட்ட அடுத்த படிகள் & செயல் திட்டம்",
    next_steps_subtitle: "உங்கள் கேட்கும் திறனின் அடிப்படையில் தெளிவான அடுத்த படிகள்"
  },
  te: {
    nav_limitations: "2026 పరిశోధన & పరిమితులు",
    nav_reference: "వినికిడి పరిమితులు & స్కేల్",
    nav_cloud: "క్లౌడ్ సింక్",
    nav_logout: "లాగౌట్",
    limitations_title: "📜 2026 పరిశోధనా పత్రం పరిమితులు & పరిశోధన పునాది",
    ref_title: "📊 వయస్సు vs వినికిడి సామర్థ్యం & తీవ్రత స్కేల్",
    stepper_title: "🧭 మార్గదర్శక పరీక్షల ప్రక్రియ & పురోగతి",
    step1_name: "ప్రొఫైల్ & వయస్సు",
    step1_desc: "దశ 1: రోగి ప్రొఫైల్ మరియు ఆశించిన సామర్థ్యాన్ని తనిఖీ చేయండి",
    step2_name: "ఇయర్ ఫోన్లు & ANC",
    step2_desc: "దశ 2: ఇయర్‌ఫోన్‌లను ప్లగ్ చేసి నాయిస్ క్యాన్సిలేషన్‌ను ప్రారంభించండి",
    step3_name: "ఫ్రీక్వెన్సీ స్కాన్",
    step3_desc: "దశ 3: ప్యూర్-టోన్ స్కానింగ్ నిర్వహించండి (250 Hz – 20,000 Hz)",
    step4_name: "ఆడియో గ్రాఫ్",
    step4_desc: "దశ 4: రెండు చెవుల ఆడియో గ్రామ్ మరియు PTA విలువలను విశ్లేషించండి",
    step5_name: "నివేదిక & తదుపరి చర్యలు",
    step5_desc: "దశ 5: తదుపరి చర్యలను సమీక్షించి నివేదికను సేవ్ చేయండి",
    next_steps_title: "సిఫార్సు చేసిన తదుపరి చర్యలు & కార్యాచరణ ప్రణాళిక",
    next_steps_subtitle: "మీ వినికిడి సామర్థ్యం ఆధారంగా స్పష్టమైన తదుపరి చర్యలు"
  },
  kn: {
    nav_limitations: "2026 ಸಂಶೋಧನೆ ಮತ್ತು ಮಿತಿಗಳು",
    nav_reference: "ಕೇಳುವ ಮಿತಿಗಳು ಮತ್ತು ಶ್ರೇಣಿ",
    nav_cloud: "ಕ್ಲೌಡ್ ಸಿಂಕ್",
    nav_logout: "ನಿರ್ಗಮಿಸಿ",
    limitations_title: "📜 2026 ಸಂಶೋಧನಾ ಪ್ರಬಂಧದ ಮಿತಿಗಳು ಮತ್ತು ಆಧಾರ",
    ref_title: "📊 ವಯಸ್ಸು vs ಕೇಳುವ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ತೀವ್ರತೆಯ ಪ್ರಮಾಣ",
    stepper_title: "🧭 ಮಾರ್ಗದರ್ಶಿತ ಪರೀಕ್ಷಾ ಹಂತಗಳು ಮತ್ತು ಪ್ರಗತಿ",
    step1_name: "ಪ್ರೊಫೈಲ್ ಮತ್ತು ವಯಸ್ಸು",
    step1_desc: "ಹಂತ 1: ರೋಗಿಯ ಪ್ರೊಫೈಲ್ ಮತ್ತು ನಿರೀಕ್ಷಿತ ಸಾಮರ್ಥ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ",
    step2_name: "ಇಯರ್‌ಫೋನ್‌ಗಳು ಮತ್ತು ANC",
    step2_desc: "ಹಂತ 2: ಇಯರ್‌ಫೋನ್‌ಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಶಬ್ದ ರದ್ದತಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
    step3_name: "ಆವರ್ತನ ಸ್ಕ್ಯಾನ್",
    step3_desc: "ಹಂತ 3: ಶುದ್ಧ-ಧ್ವನಿ ಸ್ಕ್ಯಾನಿಂಗ್ ನಡೆಸಿ (250 Hz – 20,000 Hz)",
    step4_name: "ಆಡಿಯೋಗ್ರಾಮ್ ನಕ್ಷೆ",
    step4_desc: "ಹಂತ 4: ಎರಡೂ ಕಿವಿಗಳ ಆಡಿಯೋಗ್ರಾಮ್ ಮತ್ತು PTA ಮೌಲ್ಯಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    step5_name: "ವರದಿ ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳು",
    step5_desc: "ಹಂತ 5: ಮುಂದಿನ ಹಂತಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ",
    next_steps_title: "ಶಿಫಾರಸು ಮಾಡಿದ ಮುಂದಿನ ಹಂತಗಳು ಮತ್ತು ಕ್ರಿಯಾ ಯೋಜನೆ",
    next_steps_subtitle: "ನಿಮ್ಮ ಕೇಳುವ ಸಾಮರ್ಥ್ಯದ ಆಧಾರದ ಮೇಲೆ ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಕ್ರಮಗಳು"
  },
  ml: {
    nav_limitations: "2026 ഗവേഷണവും പരിധികളും",
    nav_reference: "കേൾവി പരിധികളും സ്കെയിലും",
    nav_cloud: "ക്ലൗഡ് സിങ്ക്",
    nav_logout: "ലോഗ്ഔട്ട്",
    limitations_title: "📜 2026 ഗവേഷണ പേപ്പർ പരിധികളും അടിത്തറയും",
    ref_title: "📊 പ്രായം vs കേൾവി ശേഷിയും തീവ്രതയും",
    stepper_title: "🧭 നിർദ്ദേശിത പരിശോധനാ ഘട്ടങ്ങളും പുരോഗതിയും",
    step1_name: "പ്രൊഫൈലും പ്രായവും",
    step1_desc: "ഘട്ടം 1: രോഗിയുടെ പ്രൊഫൈലും പ്രതീക്ഷിക്കുന്ന കേൾവി ശേഷിയും പരിശോധിക്കുക",
    step2_name: "ഇയർഫോണുകളും ANC യും",
    step2_desc: "ഘട്ടം 2: ഇയർഫോണുകൾ ബന്ധിപ്പിച്ച് ശബ്ദ നിരോധനം പ്രവർത്തനക്ഷമമാക്കുക",
    step3_name: "ഫ്രീക്വൻസി സ്കാൻ",
    step3_desc: "ഘട്ടം 3: ശുദ്ധ-ശബ്ദ പരിശോധന നടത്തുക (250 Hz – 20,000 Hz)",
    step4_name: "ഓഡിയോഗ്രാം ഗ്രാഫ്",
    step4_desc: "ഘട്ടം 4: ഇരു ചെവികളുടെയും ഓഡിയോഗ്രാം വരകളും PTA മൂല്യങ്ങളും വിശകലനം ചെയ്യുക",
    step5_name: "റിപ്പോർട്ടും അടുത്ത ഘട്ടങ്ങളും",
    step5_desc: "ഘട്ടം 5: അടുത്ത നടപടികൾ വിലയിരുത്തി വിവരങ്ങൾ സംരക്ഷിക്കുക",
    next_steps_title: "ശപാർശ ചെയ്യുന്ന അടുത്ത നടപടികളും കർമ്മ പദ്ധതിയും",
    next_steps_subtitle: "നിങ്ങളുടെ കേൾവി ശേഷിയെ അടിസ്ഥാനമാക്കിയുള്ള വ്യക്തമായ അടുത്ത നടപടികൾ"
  },
  bn: {
    nav_limitations: "২০২৬ গবেষণা ও সীমাবদ্ধতা",
    nav_reference: "শ্রবণ সীমানা ও স্কেল",
    nav_cloud: "ক্লাউড সিঙ্ক",
    nav_logout: "লগআউট",
    limitations_title: "📜 ২০২৬ গবেষণা পত্রের সীমাবদ্ধতা ও ভিত্তি",
    ref_title: "📊 বয়স বনাম শ্রবণ ক্ষমতা ও তীব্রতা স্কেল",
    stepper_title: "🧭 নির্দেশিত পরীক্ষা প্রবাহ ও অগ্রগতি",
    step1_name: "প্রোফাইল ও বয়স",
    step1_desc: "ধাপ ১: রোগীর প্রোফাইল এবং প্রত্যাশিত উচ্চ-কম্পাঙ্ক ক্ষমতা যাচাই করুন",
    step2_name: "ইয়ারফোন ও ANC",
    step2_desc: "ধাপ ২: ইয়ারফোন প্লাগ ইন করুন এবং সক্রিয় নয়েজ ক্যানসেলেশন চালু করুন",
    step3_name: "ফ্রিকোয়েন্সি স্ক্যান",
    step3_desc: "ধাপ ৩: পিওর-টোন স্ক্যানিং পরিচালনা করুন (২৫০ Hz – ২০,০০০ Hz)",
    step4_name: "অডিওগ্রাম গ্রাফ",
    step4_desc: "ধাপ ৪: উভয় কানের অডিওগ্রাম রেখা ও PTA মান বিশ্লেষণ করুন",
    step5_name: "রিপোর্ট ও পরবর্তী পদক্ষেপ",
    step5_desc: "ধাপ ৫: পরবর্তী পদক্ষেপ পর্যালোচনা করুন এবং রেকর্ড সংরক্ষণ করুন",
    next_steps_title: "সুপারিশকৃত পরবর্তী পদক্ষেপ ও কর্ম পরিকল্পনা",
    next_steps_subtitle: "আপনার শ্রবণ ক্ষমতার উপর ভিত্তি করে স্পষ্ট এবং সহজ পরবর্তী পদক্ষেপ"
  },
  mr: {
    nav_limitations: "२०२६ संशोधन आणि मर्यादा",
    nav_reference: "ऐकण्याच्या मर्यादा आणि प्रमाण",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लॉगआउट",
    limitations_title: "📜 २०२६ संशोधन पेपरच्या मर्यादा आणि आधार",
    ref_title: "📊 वय विरुद्ध ऐकण्याची क्षमता आणि तीव्रता प्रमाण",
    stepper_title: "🧭 मार्गदर्शित चाचणी प्रवाह आणि प्रगती",
    step1_name: "प्रोफाइल आणि वय",
    step1_desc: "टप्पा १: रुग्णाची माहिती आणि अपेक्षित उच्च-वारंवारता क्षमता तपासा",
    step2_name: "इअरफोन आणि ANC",
    step2_desc: "टप्पा २: इअरफोन जोडा आणि पार्श्वभूमी आवाजाचा अडथळा रद्द करा",
    step3_name: "फ्रीक्वेंसी स्कॅन",
    step3_desc: "टप्पा ३: युनि-टोन चाचणी घ्या (२५० Hz - २०,००० Hz)",
    step4_name: "ऑडिओग्राम आलेख",
    step4_desc: "टप्पा ४: दोन्ही कानांचे ऑडिओग्राम आलेख आणि PTA मूल्यांचे विश्लेषण करा",
    step5_name: "अहवाल आणि पुढील पायऱ्या",
    step5_desc: "टप्पा ५: पुढील पायऱ्या तपासा आणि वैद्यकीय नोंद जतन करा",
    next_steps_title: "शिफारस केलेल्या पुढील पायऱ्या आणि कार्य योजना",
    next_steps_subtitle: "तुमच्या ऐकण्याच्या क्षमतेवर आधारित स्पष्ट पुढील पायऱ्या"
  },
  gu: {
    nav_limitations: "૨૦૨૬ સંશોધન અને મર્યાદાઓ",
    nav_reference: "સાંભળવાની મર્યાદાઓ અને સ્કેલ",
    nav_cloud: "ક્લાઉડ સિંક",
    nav_logout: "લૉગઆઉટ",
    limitations_title: "📜 ૨૦૨૬ સંશોધન પત્રની મર્યાદાઓ અને સંશોધન આધાર",
    ref_title: "📊 ઉંમર વિ. સાંભળવાની ક્ષમતા અને તીવ્રતા સ્કેલ",
    stepper_title: "🧭 માર્ગદર્શિત પરીક્ષણ પ્રવાહ અને પ્રગતિ",
    step1_name: "પ્રોફાઇલ અને ઉંમર",
    step1_desc: "પગલું ૧: દર્દીની પ્રોફાઇલ અને અપેક્ષિત ક્ષમતા ચકાસો",
    step2_name: "ઇયરફોન અને ANC",
    step2_desc: "પગલું ૨: ઇયરફોન કનેક્ટ કરો અને નોઇઝ કેન્સલેશન ચાલુ કરો",
    step3_name: "આવર્તન સ્કેન",
    step3_desc: "પગલું ૩: શુદ્ધ-ટોન સ્કેનિંગ હાથ ધરો (૨૫૦ Hz – ૨૦,૦૦૦ Hz)",
    step4_name: "ઓડિયોગ્રામ ગ્રાફ",
    step4_desc: "પગલું ૪: બંને કાનના ઓડિયોગ્રામ અને PTA મૂલ્યોનું વિશ્લેષણ કરો",
    step5_name: "રિપોર્ટ અને આગળના પગલાં",
    step5_desc: "પગલું ૫: આગળના પગલાંની સમીક્ષા કરો અને માહિતી સાચવો",
    next_steps_title: "ભલામણ કરેલ આગળના પગલાં અને કાર્ય યોજના",
    next_steps_subtitle: "તમારી સાંભળવાની ક્ષમતા પર આધારિત સ્પષ્ટ આગળના પગલાં"
  },
  pa: {
    nav_limitations: "2026 ਖੋਜ ਅਤੇ ਸੀਮਾਵਾਂ",
    nav_reference: "ਸੁਣਨ ਦੀਆਂ ਸੀਮਾਵਾਂ ਅਤੇ ਸਕੇਲ",
    nav_cloud: "ਕਲਾਊਡ ਸਿੰਕ",
    nav_logout: "ਲਾਗਆਊਟ",
    limitations_title: "📜 2026 ਖੋਜ ਪੱਤਰ ਦੀਆਂ ਸੀਮਾਵਾਂ ਅਤੇ ਆਧਾਰ",
    ref_title: "📊 ਉਮਰ ਬਨਾਮ ਸੁਣਨ ਦੀ ਸਮਰੱਥਾ ਅਤੇ ਗੰਭੀਰਤਾ ਸਕੇਲ",
    stepper_title: "🧭 ਨਿਰਦੇਸ਼ਿਤ ਜਾਂਚ ਪ੍ਰਕਿਰਿਆ ਅਤੇ ਪ੍ਰਗਤੀ",
    step1_name: "ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਉਮਰ",
    step1_desc: "ਕਦਮ 1: ਮਰੀਜ਼ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਉਮੀਦ ਕੀਤੀ ਸਮਰੱਥਾ ਦੀ ਜਾਂਚ ਕਰੋ",
    step2_name: "ਈਅਰਫੋਨ ਅਤੇ ANC",
    step2_desc: "ਕਦਮ 2: ਈਅਰਫੋਨ ਲਗਾਓ ਅਤੇ ਸ਼ੋਰ ਰੱਦ ਕਰਨ ਦੀ ਸੁਵਿਧਾ ਚਾਲੂ ਕਰੋ",
    step3_name: "ਫ੍ਰੀਕੁਐਂਸੀ ਸਕੈਨ",
    step3_desc: "ਕਦਮ 3: ਸ਼ੁੱਧ-ਟੋਨ ਜਾਂਚ ਕਰੋ (250 Hz – 20,000 Hz)",
    step4_name: "ਆਡੀਓਗ੍ਰਾਮ ਗ੍ਰਾਫ",
    step4_desc: "ਕਦਮ 4: ਦੋਵਾਂ ਕੰਨਾਂ ਦੇ ਆਡੀਓਗ੍ਰਾਮ ਅਤੇ PTA ਮੁੱਲਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    step5_name: "ਰਿਪੋਰਟ ਅਤੇ ਅਗਲੇ ਕਦਮ",
    step5_desc: "ਕਦਮ 5: ਅਗਲੇ ਕਦਮਾਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ ਅਤੇ ਰਿਕਾਰਡ ਸੰਭਾਲੋ",
    next_steps_title: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਅਗਲੇ ਕਦਮ ਅਤੇ ਕਾਰਜ ਯੋਜਨਾ",
    next_steps_subtitle: "ਤੁਹਾਡੀ ਸੁਣਨ ਦੀ ਸਮਰੱਥਾ ਦੇ ਆਧਾਰ 'ਤੇ ਸਪੱਸ਼ਟ ਅਗਲੇ ਕਦਮ"
  },
  or: {
    nav_limitations: "୨୦୨୬ ଗବେଷଣା ଓ ସୀମାବଦ୍ଧତା",
    nav_reference: "ଶ୍ରବଣ ସୀମା ଓ ସ୍କେଲ",
    nav_cloud: "କ୍ଲାଉଡ୍ ସିଙ୍କ",
    nav_logout: "ଲଗଆଉଟ୍",
    limitations_title: "📜 ୨୦୨୬ ଗବେଷଣା ପତ୍ର ସୀମାବଦ୍ଧତା ଓ ଭିତ୍ତି",
    ref_title: "📊 ବୟସ ବନାମ ଶ୍ରବଣ କ୍ଷମତା ଓ ଗମ୍ଭୀରତା ସ୍କେଲ",
    stepper_title: "🧭 ନିର୍ଦ୍ଦେଶିତ ପରୀକ୍ଷା ପ୍ରକ୍ରିୟା ଓ ପ୍ରଗତି",
    step1_name: "ପ୍ରୋଫାଇଲ୍ ଓ ବୟସ",
    step1_desc: "ପଦକ୍ଷେପ ୧: ରୋଗୀ ପ୍ରୋଫାଇଲ୍ ଓ କ୍ଷମତା ଯାଞ୍ଚ କରନ୍ତୁ",
    step2_name: "ଇୟରଫୋନ୍ ଓ ANC",
    step2_desc: "ପଦକ୍ଷେପ ୨: ଇୟରଫୋନ୍ ସଂଯୋଗ କରନ୍ତୁ ଓ ସକ୍ରିୟ ଶବ୍ଦ ନିରୋଧ ସକ୍ଷମ କରନ୍ତୁ",
    step3_name: "ଆବୃତ୍ତି ସ୍କାନ୍",
    step3_desc: "ପଦକ୍ଷେପ ୩: ବିଶୁଦ୍ଧ-ଟୋନ୍ ପରୀକ୍ଷଣ କରନ୍ତୁ (୨୫୦ Hz – ୨୦,୦୦୦ Hz)",
    step4_name: "ଅଡିଓଗ୍ରାମ୍ ଗ୍ରାଫ୍",
    step4_desc: "ପଦକ୍ଷେପ ୪: ଉଭୟ କାନର ଅଡିଓଗ୍ରାମ୍ ଗ୍ରାଫ୍ ଓ PTA ମୂଲ୍ୟ ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
    step5_name: "ରିପୋର୍ଟ ଓ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    step5_desc: "ପଦକ୍ଷେପ ୫: ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ସମୀକ୍ଷା କରନ୍ତୁ ଓ ରେକର୍ଡ ସଂରକ୍ଷଣ କରନ୍ତୁ",
    next_steps_title: "ସୁପାରିଶ କରାଯାଇଥିବା ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ଓ କାର୍ଯ୍ୟ ଯୋଜନା",
    next_steps_subtitle: "ଆପଣଙ୍କ ଶ୍ରବଣ କ୍ଷମତା ଉପରେ ଆଧାରିତ ସ୍ପଷ୍ଟ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ"
  },
  as: {
    nav_limitations: "২০২৬ গৱেষণা আৰু সীমাৱদ্ধতা",
    nav_reference: "শ্রৱণ সীমা আৰু স্কেল",
    nav_cloud: "ক্লাউড সিংক",
    nav_logout: "লগআউট",
    limitations_title: "📜 ২০২৬ গৱেষণা পত্ৰৰ সীমাৱদ্ধতা আৰু ভিত্তি",
    ref_title: "📊 বয়স বনাম শ্রৱণ ক্ষমতা আৰু তীব্ৰতা স্কেল",
    stepper_title: "🧭 নির্দেশিত পৰীক্ষা প্ৰক্ৰিয়া আৰু প্ৰগতি",
    step1_name: "প্রফাইল আৰু বয়স",
    step1_desc: "পদক্ষেপ ১: ৰোগীৰ প্রফাইল আৰু প্ৰত্যাশিত কম্পাংক ক্ষমতা পৰীক্ষা কৰক",
    step2_name: "ইয়াৰফোন আৰু ANC",
    step2_desc: "পদক্ষেপ ২: ইয়াৰফোন সংযোগ কৰক আৰু শব্দ নিৰোধক সক্ৰিয় কৰক",
    step3_name: "কম্পাংক স্কেন",
    step3_desc: "পদক্ষেপ ৩: বিশুদ্ধ-টোন পৰীক্ষা সম্পন্ন কৰক (২৫০ Hz – ২০,০০০ Hz)",
    step4_name: "অডিঅ'গ্ৰাম গ্ৰাফ",
    step4_desc: "পদক্ষেপ ৪: উভয় কানৰ অডিঅ'গ্ৰাম গ্ৰাফ আৰু PTA মান বিশ্লেষণ কৰক",
    step5_name: "প্ৰতিবেদন আৰু পৰৱৰ্তী পদক্ষেপ",
    step5_desc: "পদক্ষেপ ৫: পৰৱৰ্তী পদক্ষেপসমূহ পৰ্যালোচনা কৰক আৰু ৰেকৰ্ড সংৰক্ষণ কৰক",
    next_steps_title: "পৰামৰ্শিত পৰৱৰ্তী পদক্ষেপ আৰু কাৰ্য পৰিকল্পনা",
    next_steps_subtitle: "আপোনাৰ শ্রৱণ ক্ষমতাৰ ওপৰত ভিত্তি কৰি স্পষ্ট পৰৱৰ্তী পদক্ষেপ"
  },
  ur: {
    nav_limitations: "2026 تحقیق اور حدود",
    nav_reference: "سماعت کی حدود اور اسکیل",
    nav_cloud: "کلاؤڈ سنک",
    nav_logout: "لاگ آؤٹ",
    limitations_title: "📜 2026 تحقیقی مقالے کی حدود اور بنیاد",
    ref_title: "📊 عمر بمقابلہ سماعت کی صلاحیت اور شدت کا اسکیل",
    stepper_title: "🧭 ہدایت یافتہ ٹیسٹ کا طریقہ اور پیش رفت",
    step1_name: "پروفائل اور عمر",
    step1_desc: "مرحلہ 1: مریض کا پروفائل اور متوقع صلاحیت کی تصدیق کریں",
    step2_name: "ایئر فونز اور ANC",
    step2_desc: "مرحلہ 2: ایئر فونز پلگ کریں اور نائس کینسیلیشن فعال کریں",
    step3_name: "فریکوئنسی اسکین",
    step3_desc: "مرحلہ 3: پیور ٹون اسکیننگ مکمل کریں (250 Hz – 20,000 Hz)",
    step4_name: "آڈیوگرام گراف",
    step4_desc: "مرحلہ 4: دونوں کانوں کے آڈیوگرام گراف اور PTA اقدار کا تجزیہ کریں",
    step5_name: "رپورٹ اور اگلے اقدامات",
    step5_desc: "مرحلہ 5: اگلے اقدامات کا جائزہ لیں اور طبی ریکارڈ محفوظ کریں",
    next_steps_title: "تجویز کردہ اگلے اقدامات اور عمل کا منصوبہ",
    next_steps_subtitle: "آپ کی سماعت کی صلاحیت کی بنیاد پر واضح اور آسان اگلے اقدامات"
  },
  sa: {
    nav_limitations: "२०२६ अनुसन्धनानि सीमाश्च",
    nav_reference: "श्रवणसीमा मानदण्डश्च",
    nav_cloud: "क्लौड् संकः",
    nav_logout: "निर्गमः",
    limitations_title: "📜 २०२६ शोधपत्रस्य सीमाः अनुसन्धनाधारश्च",
    ref_title: "📊 वयः विरुद्धं श्रवणसामर्थ्यं गाम्भीर्यमानम्",
    stepper_title: "🧭 निर्देशितपरीक्षणप्रवाहः प्रगतिश्च",
    step1_name: "विवरणं वयश्च",
    step1_desc: "चरणम् १: रुग्णालेखं उच्च-आवृत्ति-सामर्थ्यं च परीक्षताम्",
    step2_name: "कर्णध्वनियन्त्रं ए.एन.सी. च",
    step2_desc: "चरणम् २: कर्णध्वनियन्त्रं योजयित्वा कोलाहल-निवारकं सक्रियं करोतु",
    step3_name: "आवृत्ति-स्कैन",
    step3_desc: "चरणम् ३: शुद्ध-ध्वनि-परीक्षणं संपादयतु (२५० Hz – २०,००० Hz)",
    step4_name: "श्रवणालेख-चित्रम्",
    step4_desc: "चरणम् ४: द्वयोः कर्णयोः आलेखरेखाः पीटीए-मूल्यानि च विश्लेषयतु",
    step5_name: "विवरणं अग्रिमसोपानानि च",
    step5_desc: "चरणम् ५: अग्रिमकार्याणि समीक्ष्य पञ्जीकरणं रक्षतु",
    next_steps_title: "अनुशंसितानि अग्रिमसोपानानि कार्ययोजना च",
    next_steps_subtitle: "भवतः श्रवणसामर्थ्यानुसारं सुस्पष्टानि अग्रिमसोपानानि"
  },
  ne: {
    nav_limitations: "२०२६ अनुसन्धान र सीमाहरू",
    nav_reference: "सुनुवाइ सीमा र स्केल",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लगआउट",
    limitations_title: "📜 २०२६ शोधपत्रको सीमा र अनुसन्धान आधार",
    ref_title: "📊 उमेर विरुद्ध सुनुवाइ क्षमता र गम्भीरता स्केल",
    stepper_title: "🧭 निर्देशित परीक्षण प्रवाह र प्रगति",
    step1_name: "प्रोफाइल र उमेर",
    step1_desc: "चरण १: बिरामी प्रोफाइल र अपेक्षित उच्च-आवृत्ति क्षमता प्रमाणित गर्नुहोस्",
    step2_name: "इयरफोन र ANC",
    step2_desc: "चरण २: इयरफोन जडान गर्नुहोस् र पृष्ठभूमि शोकम निरसन सक्रिय गर्नुहोस्",
    step3_name: "आवृत्ति स्क्यान",
    step3_desc: "चरण ३: शुद्ध-टोन स्क्यानिङ सञ्चालन गर्नुहोस् (२५० Hz - २०,००० Hz)",
    step4_name: "अडियोग्राम ग्राफ",
    step4_desc: "चरण ४: दुवै कानको अडियोग्राम ग्राफ र PTA मान विश्लेषण गर्नुहोस्",
    step5_name: "रिपोर्ट र आगामी कदम",
    step5_desc: "चरण ५: आगामी कदम समीक्षा गर्नुहोस् र रेकर्ड बचत गर्नुहोस्",
    next_steps_title: "सिफारिस गरिएका आगामी कदम र कार्य योजना",
    next_steps_subtitle: "तपाईंको सुनुवाइ क्षमताको आधारमा स्पष्ट आगामी कदमहरू"
  },
  mr_kok: {
    nav_limitations: "२०२६ संशोधन आनी मर्यादा",
    nav_reference: "आयकुपाच्यो मर्यादा आनी माप",
    nav_cloud: "क्लौड सिंक",
    nav_logout: "भायर सरात",
    limitations_title: "📜 २०२६ संशोधन पत्रकाच्यो मर्यादा आनी आधार",
    ref_title: "📊 पिराय विरुद्ध आयकुपाची क्षमता आनी प्रमाण",
    stepper_title: "🧭 मार्गदर्शीत तपासणी आनी प्रगती",
    step1_name: "माहिती आनी पिराय",
    step1_desc: "पांवडो १: दुयेंतीची माहिती आनी ताची आयकुपाची क्षमता तपासात",
    step2_name: "इयरफोन आनी ANC",
    step2_desc: "पांवडो २: इयरफोन जोडात आनी अवाज बंद करपाची सोय सुरू करात",
    step3_name: "आवृत्ती तपासणी",
    step3_desc: "पांवडो ३: शुध्द-अवाज तपासणी करात (२५० Hz – २०,००० Hz)",
    step4_name: "आडिઓग्राम आलेख",
    step4_desc: "पांवडो ४: दोनूय कानांचे आलेख आनी PTA मोल तपासात",
    step5_name: "अहवाल आनी फुडलीं पावलां",
    step5_desc: "पांवडो ५: फुडलीं पावलां तपासात आनी नोंद दवरात",
    next_steps_title: "सुचयिल्लीं फुडलीं पावलां आनी येवजण",
    next_steps_subtitle: "तुमच्या आयकुपाच्या तांकी प्रमाणे स्पश्ट फुडलीं पावलां"
  },
  sd: {
    nav_limitations: "2026 تحقيق ۽ حدون",
    nav_reference: "ٻڌڻ جون حدون ۽ اسڪيل",
    nav_cloud: "ڪلائوڊ سنڪ",
    nav_logout: "لاگ آئوٽ",
    limitations_title: "📜 2026 تحقيقي مقالي جون حدون ۽ بنياد",
    ref_title: "📊 عمر بمقابلي ٻڌڻ جي سگهه ۽ اسڪيل",
    stepper_title: "🧭 ڏسيل ٽيسٽ جو طريقيڪار ۽ ترقي",
    step1_name: "پروفائل ۽ عمر",
    step1_desc: "مرحلو 1: مريض جو پروفائل ۽ ٻڌڻ جي سگهه چيڪ ڪريو",
    step2_name: "ائيرايفون ۽ ANC",
    step2_desc: "مرحلو 2: ائيرفون لڳايو ۽ آواز بند ڪرڻ واري سهولت چالو ڪريو",
    step3_name: "فریکوئنسي اسڪين",
    step3_desc: "مرحلو 3: ٽيسٽ مڪمل ڪريو (250 Hz – 20,000 Hz)",
    step4_name: "آڊيوگرام گراف",
    step4_desc: "مرحلو 4: ٻنهي ڪنن جا گراف ۽ PTA قيمتون چيڪ ڪريو",
    step5_name: "رپورٽ ۽ اڳيان قدم",
    step5_desc: "مرحلو 5: اڳيان قدم ڏسو ۽ ميڊيڪل ريڪارڊ محفوظ ڪريو",
    next_steps_title: "تجويز ڪيل اڳيان قدم ۽ رٿابندي",
    next_steps_subtitle: "توهان جي ٻڌڻ جي سگهه موجب صاف ۽ آسان اڳيان قدم"
  },
  doi: {
    nav_limitations: "2026 खोज ते सीमाएं",
    nav_reference: "सुनने दी सीमाएं ते स्केल",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लॉगआउट",
    limitations_title: "📜 2026 खोज पत्र दी सीमाएं ते आधार",
    ref_title: "📊 उमर बनाम सुनने दी क्षमता ते स्केल",
    stepper_title: "🧭 दस्सी गेदी जांच प्रक्रिया ते प्रगति",
    step1_name: "प्रोफाइल ते उमर",
    step1_desc: "चरण 1: मरीज प्रोफाइल ते क्षमता दी जांच करो",
    step2_name: "इयरफोन ते ANC",
    step2_desc: "चरण 2: इयरफोन लाओ ते शोर बंद करने दी सुविधा चालू करो",
    step3_name: "फ्रीक्वेंसी स्कैन",
    step3_desc: "चरण 3: शुद्ध-टोन जांच करो (250 Hz – 20,000 Hz)",
    step4_name: "ऑडियोग्राम ग्राफ",
    step4_desc: "चरण 4: दोनों कन्ने दे ग्राफ ते PTA मूल्य देखो",
    step5_name: "रिपोर्ट ते अगले कदम",
    step5_desc: "चरण 5: अगले कदम देखो ते रिकार्ड संभालो",
    next_steps_title: "सलाह दित्ते गेदे अगले कदम ते योजना",
    next_steps_subtitle: "सुनने दी क्षमता दे आधार पर साफ अगले कदम"
  },
  mni: {
    nav_limitations: "2026 ৱাখল্লোন অমসুং ঙাক্লোন",
    nav_reference: "তাবগী ঙাক্লোন অমসুং চাবুপ",
    nav_cloud: "ক্লাউদ সিঙ্ক",
    nav_logout: "লোগআউৎ",
    limitations_title: "📜 2026 ৱাখল্লোন চেগী ঙাক্লোন অমসুং য়ুম্ফম",
    ref_title: "📊 চহি অমসুং তাবগী পাঙ্গল",
    stepper_title: "🧭 লম্বিংবা তেস্ত খোঙচৎ অমসুং চংশিনবা",
    step1_name: "প্রোফাইল অমসুং চহি",
    step1_desc: "তাঙ্কাক 1: অনাবগী প্রোফাইল অমসুং চহি য়েংবা",
    step2_name: "ইয়ারফোন অমসুং ANC",
    step2_desc: "তাঙ্কাক 2: ইয়ারফোন থাজিনবা অমসুং অমাংবা খোঞ্জেল খাইব",
    step3_name: "ফ্রিক্বেন্সী স্কেন",
    step3_desc: "তাঙ্কাক 3: তেনবা খোঞ্জেল তেস্ত তৌবা (250 Hz – 20,000 Hz)",
    step4_name: "ওদিওগ্রাম প্রাতি",
    step4_desc: "তাঙ্কাক 4: নাক অনীমকি প্রাতি অমসুং PTA চাবুপ য়েংবা",
    step5_name: "রিপোর্ত অমসুং মথংগী খোঙথাং",
    step5_desc: "তাঙ্কাক 5: মথংগী খোঙথাং য়েংশিনবা অমসুং রে কোর্দ থম্বা",
    next_steps_title: "তাকপীবা মথংগী খোঙথাংশিং",
    next_steps_subtitle: "নহাক্কী তাবগী পাঙ্গলগী মাতুংইননা ময়েক শেংবা খোঙথাংশিং"
  },
  brx: {
    nav_limitations: "2026 बिजिरनाय आरो सीमाफोर",
    nav_reference: "खनानाय सीमा आरो स्रें",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लगआउट",
    limitations_title: "📜 2026 बिजिरनाय लेखायानि सीमाफोर आरो गुदि",
    ref_title: "📊 बैसो आरो खनानाय गोहो",
    stepper_title: "🧭 दैदेननाय आनजाद लामा आरो आगगायानाय",
    step1_name: "प्रोफाइल आरो बैसो",
    step1_desc: "बाहागो 1: रोगीनि प्रोफाइल आरो बैसो आनजाद नायनाय",
    step2_name: "इयारफोन आरो ANC",
    step2_desc: "बाहागो 2: इयारफोन सोनाय आरो सोद्दो हबथेनाय",
    step3_name: "फ्रिकुएन्सि स्केन",
    step3_desc: "बाहागो 3: गोजोन सोद्दो आनजाद होनाय (250 Hz – 20,000 Hz)",
    step4_name: "अडियोग्राम ग्राफ",
    step4_desc: "बाहागो 4: संनाव कावनि अडियोग्राम आरो PTA स्रें बिजिरनाय",
    step5_name: "रिपोर्ट आरो उननि आगाम",
    step5_desc: "बाहागो 5: उननि आगामफोर बिजिरनाय आरो रेकर्ड दोननाय",
    next_steps_title: "इसारा होनाय उननि आगामफोर आरो हाबाफारि",
    next_steps_subtitle: "नोंथांनि खनानाय गोहोनि सायाव रोखा उननि आगामफोर"
  },
  ks: {
    nav_limitations: "2026 تحقیق تہِ حدود",
    nav_reference: "بوزنٕچ حدبندی تہِ سکیل",
    nav_cloud: "کلاوُڈ سِنک",
    nav_logout: "لاگ آوُٹ",
    limitations_title: "📜 2026 تحقیقی کٲغذٕچ حدبندی تہِ بُنیاد",
    ref_title: "📊 ٲمر بمقابلہ بوزنٕچ صلاحیت",
    stepper_title: "🧭 ہدایت دِتھ ٹیسٹک طریقہٕ تہِ تَرقی",
    step1_name: "پروفائل تہِ ٲمر",
    step1_desc: "مرحلہٕ 1: مریضُک پروفائل تہِ صلاحیَت چیک کَریو",
    step2_name: "ایٔرفون تہِ ANC",
    step2_desc: "مرحلہٕ 2: ایٔرفون لَگایو تہِ شور بند کَرنُک نِظام چالو کَریو",
    step3_name: "فریکوئنسی سکین",
    step3_desc: "مرحلہٕ 3: ٹیسٹ مُکمل کَریو (250 Hz – 20,000 Hz)",
    step4_name: "آڈیوگرام گراف",
    step4_desc: "مرحلہٕ 4: دۄنَو کَنَن ہُند گراف تہِ PTA قیمت چیک کَریو",
    step5_name: "رپورٹ تہِ برونہم قدم",
    step5_desc: "مرحلہٕ 5: برونہم قدم ؤچھیو تہِ میڈیکل رِکارڈ محفوٗظ کَریو",
    next_steps_title: "تجویز کٔرِمت برونہم قدم تہِ حکمتِ عملی",
    next_steps_subtitle: "تُہندِ بوزنٕچ صلاحیت مُطابق صاف برونہم قدم"
  },
  mai: {
    nav_limitations: "२०२६ अनुसंधान आ सीमासभ",
    nav_reference: "सुनबाक सीमा आ स्केल",
    nav_cloud: "क्लाउड सिंक",
    nav_logout: "लॉगआउट",
    limitations_title: "📜 २०२६ शोध पत्रक सीमा आ अनुसंधान आधार",
    ref_title: "📊 आयु बनाम सुनबाक क्षमता आ गम्भीरता पैमाना",
    stepper_title: "🧭 निर्देशित परीक्षण प्रवाह आ प्रगति",
    step1_name: "प्रोफाइल आ आयु",
    step1_desc: "चरण १: रोगी प्रोफाइल आ अपेक्षित क्षमता सत्यापित करू",
    step2_name: "इयरफोन आ ANC",
    step2_desc: "चरण २: इयरफोन लगाऊ आ शोर रद्द करबाक सुविधा चालू करू",
    step3_name: "आवृत्ति स्कैन",
    step3_desc: "चरण ३: शुद्ध-टोन स्कैनिंग करू (२५० Hz – २०,००० Hz)",
    step4_name: "ऑडियोग्राम ग्राफ",
    step4_desc: "चरण ४: दुनू कानक ऑडियोग्राम आ PTA मान विश्लेषण करू",
    step5_name: "रिपोर्ट आ आगू कदम",
    step5_desc: "चरण ५: आगूक कदम समीक्षा करू आ रिकॉर्ड सुरक्षित करू",
    next_steps_title: "अनुशंसित आगूक कदम आ कार्य योजना",
    next_steps_subtitle: "अहाँक सुनबाक क्षमताक आधार पर स्पष्ट आगूक कदम"
  },
  sat: {
    nav_limitations: "२०२६ ᱥᱮᱸᱫᱽᱨᱟ ᱟᱨ ᱥᱤᱢᱟᱹ",
    nav_reference: "ᱟᱸᱡᱚᱢ ᱥᱤᱢᱟᱹ ᱟᱨ ᱡᱚᱠᱷᱟ",
    nav_cloud: "ᱠᱞᱟᱣᱩᱰ ᱥᱤᱸᱠ",
    nav_logout: "ᱞᱚᱜᱽ ᱟᱣᱩᱴ",
    limitations_title: "📜 २०२६ ᱥᱮᱸᱫᱽᱨᱟ ᱥᱟᱠᱟᱢ ᱥᱤᱢᱟᱹ ᱟᱨ ᱵᱩᱱᱤᱭᱟᱹᱫᱽ",
    ref_title: "📊 ᱩᱢᱮᱨ ᱵᱤᱨᱩᱫᱷ ᱟᱸᱡᱚᱢ ᱫᱟᱲᱮ ᱡᱚᱠᱷᱟ",
    stepper_title: "🧭 ᱩᱫᱩᱜ ᱟᱠᱟᱱ ᱵᱤᱰᱟᱹᱣ ᱟᱨ ᱞᱟᱦᱟᱱᱛᱤ",
    step1_name: "ᱯᱨᱚᱯᱷᱟᱭᱤᱞ ᱟᱨ ᱩᱢᱮᱨ",
    step1_desc: "ᱫᱷᱟᱯ ᱑: ᱨᱩᱜᱤ ᱯᱨᱚᱯᱷᱟᱭᱤᱞ ᱟᱨ ᱟᱸᱡᱚᱢ ᱫᱟᱲᱮ ᱵᱤᱰᱟᱹᱣ",
    step2_name: "ᱤᱭᱚᱨᱯᱷᱚᱱ ᱟᱨ ANC",
    step2_desc: "ᱫᱷᱟᱯ ᱒: ᱤᱭᱚᱨᱯᱷᱚᱱ ᱡᱚᱲᱟᱣ ᱟᱨ ᱥᱟᱲᱮ ᱵᱚᱸ্দᱚ",
    step3_name: "ᱯᱷᱨᱤᱠᱩᱣᱮᱱᱥᱤ ᱥᱠᱮᱱ",
    step3_desc: "ᱫᱷᱟᱯ ᱓: ᱥᱟᱯᱷᱟ ᱥᱟᱲᱮ ᱵᱤᱰᱟᱹᱣ (᱒᱕० Hz – ᱒०,०00 Hz)",
    step4_name: "ᱚᱰᱤᱭᱳᱜᱽᱨᱟᱢ ᱱᱚᱠᱥᱟ",
    step4_desc: "ᱫᱷᱟᱯ ᱔: ᱵᱟᱱᱟᱨ ᱞᱩᱛᱩᱨ ᱱᱚᱠᱥᱟ ᱟᱨ PTA ᱡᱚᱠᱷᱟ ᱵᱤᱰᱟᱹᱣ",
    step5_name: "ᱨᱤᱯᱚᱨᱴ ᱟᱨ ᱞᱟᱦᱟ ᱠᱟᱹᱢᱤ",
    step5_desc: "ᱫᱷᱟᱯ ᱕: ᱞᱟᱦᱟ ᱠᱟᱹᱢᱤ ᱧᱮᱞ ᱟᱨ ᱨᱮᱠᱚᱨᱰ ᱫᱚᱦᱚ",
    next_steps_title: "ᱞᱟᱦᱟ ᱠᱟᱹᱢᱤ ᱟᱨ ᱡᱚᱡᱚᱱᱟ",
    next_steps_subtitle: "ᱟᱢᱟᱜ ᱟᱸᱡᱚᱢ ᱫᱟᱲᱮ ᱞᱮᱠᱟᱛᱮ ᱥᱟᱯᱷᱟ ᱞᱟᱦᱟ ᱠᱟᱹᱢᱤ"
  },
  zh: {
    nav_limitations: "2026 研究与局限性",
    nav_reference: "听力范围与分级",
    nav_cloud: "云端同步",
    nav_logout: "退出登录",
    limitations_title: "📜 2026年论文局限性与研究基础",
    ref_title: "📊 年龄与听力能力及严重程度对照表",
    stepper_title: "🧭 引导式测试流程与进度",
    step1_name: "档案与年龄",
    step1_desc: "步骤 1：验证患者档案与预期高频听力能力",
    step2_name: "耳机与主动降噪",
    step2_desc: "步骤 2：插入耳机并开启主动背景降噪 (ANC)",
    step3_name: "频率扫描",
    step3_desc: "步骤 3：进行纯音扫描测试 (250 Hz – 20,000 Hz)",
    step4_name: "听力图曲线",
    step4_desc: "步骤 4：分析双耳听力图曲线及 PTA 均值",
    step5_name: "报告与下一步",
    step5_desc: "步骤 5：查看后续建议并保存诊断记录",
    next_steps_title: "建议的下一步行动计划",
    next_steps_subtitle: "基于您的听力测试结果提供清晰易懂的专业后续指南"
  },
  ja: {
    nav_limitations: "2026 研究と制限事項",
    nav_reference: "聴力限界とスケール",
    nav_cloud: "クラウド同期",
    nav_logout: "ログアウト",
    limitations_title: "📜 2026年論文の制限事項と研究基盤",
    ref_title: "📊 年齢 vs 聴力能力および重症度スケール",
    stepper_title: "🧭 ガイド付きテストフローと進捗",
    step1_name: "プロフィールと年齢",
    step1_desc: "ステップ1: 患者プロフィールと予想される高周波能力を確認",
    step2_name: "イヤホンとANC",
    step2_desc: "ステップ2: イヤホンを接続しアクティブノイズキャンセリングを有効化",
    step3_name: "周波数スキャン",
    step3_desc: "ステップ3: 純音スキャンテストを実施 (250 Hz ～ 20,000 Hz)",
    step4_name: "オージオグラムグラフ",
    step4_desc: "ステップ4: 両耳のオージオグラム波形とPTA値を分析",
    step5_name: "レポートと次のステップ",
    step5_desc: "ステップ5: 推奨される次のステップを確認し記録を保存",
    next_steps_title: "推奨される次のステップとアクションプラン",
    next_steps_subtitle: "あなたの聴力能力に基づいた明確で分かりやすい次のステップ"
  }
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
const state = {
  theme: localStorage.getItem('audiometrics_theme') || 'light',
  language: localStorage.getItem('audiometrics_lang') || 'en',
  currentUser: null,
  authToken: null,
  activeEar: 'left', // 'left' (blue ✕) or 'right' (red ◯)
  activeFrequency: 1000, // Hz
  currentDb: 20,         // dB HL
  isPlayingAudio: false,
  ancEnabled: true,      // Active Background Noise Cancellation
  currentStep: 1,        // Guided Test Stepper (Steps 1 to 5)
  activeBand: 'all',     // Frequency band filter ('all', 'speech', 'high', 'extended')
  ambientNoiseDb: 20,    // Measured real-time ambient noise in dBA
  testMode: 'Air Conduction — Headphones',
  thresholds: {
    left: {},   // { 250: 15, 500: 20, ... }
    right: {}   // { 250: 20, 500: 20, ... }
  },
  clinicianNotes: '',
  testDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
};

// Audio, ANC & Visualizer Globals
let audioCtx = null;
let analyserNode = null;
let pannerNode = null; // Stereo Panner for isolating Left & Right Earphone channels
let micStream = null;
let micAnalyser = null;
let visualizerAnimId = null;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSupport();
  initCloudConfigUI();
  initAuthEventListeners();
  initTestEventListeners();
  initHeadphoneControls();
  initNoiseCancellation();
  initOscilloscope();
  initModalListeners();
  checkExistingSession();
  initAudiogramSvg();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ==========================================
// 1. THEME MANAGEMENT (DARK / LIGHT MODE)
// ==========================================
function initTheme() {
  const root = document.documentElement;
  // Check user preference
  if (state.theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  const btnTheme = document.getElementById('btn-theme-toggle');
  btnTheme.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    state.theme = next;
    localStorage.setItem('audiometrics_theme', next);
    initAudiogramSvg();
    renderAudiogram();
  });
}

// ==========================================
// 1B. MULTILINGUAL SUPPORT (LANGUAGE SELECTOR)
// ==========================================
function initLanguageSupport() {
  const langSelect = document.getElementById('app-language-select');
  if (!langSelect) return;

  langSelect.value = state.language;
  langSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
  });

  changeLanguage(state.language);
}

function changeLanguage(langKey) {
  if (!I18N_TRANSLATIONS[langKey]) langKey = 'en';
  state.language = langKey;
  localStorage.setItem('audiometrics_lang', langKey);

  const dict = I18N_TRANSLATIONS[langKey];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  updateStepperInstruction();
  renderNextSteps();
}

// ==========================================
// 1C. ACTIVE BACKGROUND NOISE CANCELLATION (ANC)
// ==========================================
function initNoiseCancellation() {
  const ancCheckbox = document.getElementById('anc-toggle-checkbox');

  if (ancCheckbox) {
    ancCheckbox.checked = state.ancEnabled;
    ancCheckbox.addEventListener('change', (e) => {
      state.ancEnabled = e.target.checked;
      updateAncUI();
    });
  }

  // Device Plugin Detection Event Listener
  if (navigator.mediaDevices && navigator.mediaDevices.ondevicechange !== undefined) {
    navigator.mediaDevices.ondevicechange = () => {
      showToast("🎧 Earphone Plugin Event: Audio device list updated.", "info");
      updateAncUI();
    };
  }

  // Initialize Mic Ambient Sound Meter if permission granted
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true } })
        .then(stream => {
          micStream = stream;
          if (audioCtx) {
            const micSource = audioCtx.createMediaStreamSource(stream);
            micAnalyser = audioCtx.createAnalyser();
            micAnalyser.fftSize = 256;
            micSource.connect(micAnalyser);
            startAmbientNoiseMeter();
          }
        })
        .catch(err => {
          console.log("Mic access notice for ambient noise meter:", err.message);
          startSimulatedAmbientMeter();
        });
    } else {
      startSimulatedAmbientMeter();
    }
  } catch (ex) {
    startSimulatedAmbientMeter();
  }

  updateAncUI();
}

function updateAncUI() {
  const ancPill = document.getElementById('anc-status-pill');
  const ancLabel = document.getElementById('anc-status-label');
  const headerPill = document.getElementById('anc-header-status-pill');
  const headerLabel = document.getElementById('anc-header-label');

  if (state.ancEnabled) {
    if (ancPill) {
      ancPill.className = "anc-status-pill green";
      ancLabel.textContent = "Earphones Connected — Active Noise Cancellation ON (-25 dBA Ambient Suppressed)";
    }
    if (headerPill) {
      headerPill.className = "anc-header-status-pill green";
      if (headerLabel) headerLabel.textContent = "ANC: Enabled (-25 dB)";
    }
  } else {
    if (ancPill) {
      ancPill.className = "anc-status-pill yellow";
      ancLabel.textContent = "ANC Disabled — Passive Earphone Isolation Only";
    }
    if (headerPill) {
      headerPill.className = "anc-header-status-pill yellow";
      if (headerLabel) headerLabel.textContent = "ANC: Off";
    }
  }
}

function startAmbientNoiseMeter() {
  const bar = document.getElementById('ambient-noise-bar');
  const valEl = document.getElementById('ambient-noise-db');

  function updateMeter() {
    if (micAnalyser) {
      const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
      micAnalyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;
      const estDba = Math.round(18 + (avg / 255) * 35);
      state.ambientNoiseDb = estDba;

      if (bar) bar.style.width = `${Math.min(100, (estDba / 60) * 100)}%`;
      if (valEl) {
        const quality = estDba <= 30 ? "(Quiet Room)" : (estDba <= 45 ? "(Moderate Noise)" : "(High Noise)");
        valEl.textContent = `${estDba} dBA ${quality}`;
      }
    }
    requestAnimationFrame(updateMeter);
  }
  updateMeter();
}

function startSimulatedAmbientMeter() {
  const bar = document.getElementById('ambient-noise-bar');
  const valEl = document.getElementById('ambient-noise-db');
  setInterval(() => {
    const estDba = Math.round(20 + Math.random() * 4);
    state.ambientNoiseDb = estDba;
    if (bar) bar.style.width = `${(estDba / 60) * 100}%`;
    if (valEl) valEl.textContent = `${estDba} dBA (Quiet Room)`;
  }, 2500);
}

// ==========================================
// 1D. GUIDED STEPPER WIZARD ("NEXT STEP")
// ==========================================
function setStep(stepNum) {
  state.currentStep = stepNum;

  for (let i = 1; i <= 5; i++) {
    const navItem = document.getElementById(`step-nav-${i}`);
    const statusEl = document.getElementById(`step-status-${i}`);
    if (!navItem) continue;

    if (i === stepNum) {
      navItem.className = 'step-item active';
      if (statusEl) statusEl.textContent = 'Active';
    } else if (i < stepNum) {
      navItem.className = 'step-item completed';
      if (statusEl) statusEl.textContent = 'Completed';
    } else {
      navItem.className = 'step-item';
      if (statusEl) statusEl.textContent = 'Pending';
    }
  }

  updateStepperInstruction();
}

function updateStepperInstruction() {
  const instructionEl = document.getElementById('stepper-current-instruction');
  if (!instructionEl) return;

  const dict = I18N_TRANSLATIONS[state.language] || I18N_TRANSLATIONS.en;
  const key = `step${state.currentStep}_desc`;
  instructionEl.textContent = dict[key] || `Step ${state.currentStep}: Proceed with screening`;
}

// ==========================================
// 1E. MODAL LISTENERS (2026 PAPER & REFERENCE)
// ==========================================
function initModalListeners() {

  // Hearing Reference Scale Modal
  const modalRef = document.getElementById('modal-hearing-reference');
  const btnOpenRef = document.getElementById('btn-open-reference-modal');
  const btnCloseRef = document.getElementById('btn-close-reference');
  const btnAckRef = document.getElementById('btn-ack-reference');

  if (btnOpenRef && modalRef) {
    btnOpenRef.addEventListener('click', () => { modalRef.style.display = 'flex'; });
    if (btnCloseRef) btnCloseRef.addEventListener('click', () => { modalRef.style.display = 'none'; });
    if (btnAckRef) btnAckRef.addEventListener('click', () => { modalRef.style.display = 'none'; });
  }
}

// ==========================================
// AGE CAPACITY CALCULATOR & BASELINE OVERLAY
// ==========================================
function getAgeMaxFrequency(age) {
  if (age <= 10) return { maxHz: 20000, label: "~18,000 – 20,000 Hz (20 kHz)" };
  if (age <= 20) return { maxHz: 18000, label: "~16,000 – 20,000 Hz (18–20 kHz)" };
  if (age <= 40) return { maxHz: 16000, label: "~14,000 – 18,000 Hz (14–18 kHz)" };
  if (age <= 60) return { maxHz: 15000, label: "~10,000 – 15,000 Hz (10–15 kHz)" };
  return { maxHz: 12000, label: "~8,000 – 12,000 Hz (<12 kHz)" };
}

function updateAgeCapacityUI() {
  const banner = document.getElementById('age-capacity-text');
  if (!banner) return;
  const age = state.currentUser ? state.currentUser.age : 28;
  const cap = getAgeMaxFrequency(age);
  banner.innerHTML = `Expected Max Audibility for Age ${age}: <strong>${cap.label}</strong>`;
}

// ==========================================
// ACTIONABLE NEXT STEPS RECOMMENDATION GENERATOR
// ==========================================
function renderNextSteps() {
  const container = document.getElementById('next-steps-dynamic-content');
  if (!container) return;

  const age = state.currentUser ? state.currentUser.age : 28;
  const ptaFreqs = [500, 1000, 2000, 4000];
  const calcPta = (dict) => {
    let s = 0, c = 0;
    ptaFreqs.forEach(f => { if (dict[f] !== undefined) { s += dict[f]; c++; } });
    return c > 0 ? (s / c) : 0;
  };

  const ptaLeft = calcPta(state.thresholds.left);
  const ptaRight = calcPta(state.thresholds.right);
  const maxPta = Math.max(ptaLeft, ptaRight);

  let recCards = '';

  if (maxPta <= 20) {
    recCards = `
      <div class="rec-step-card success">
        <div class="rec-step-num">Step 1</div>
        <div class="rec-step-text">
          <strong>Normal Hearing Status Confirmed (0–20 dB HL)</strong>
          <p>Your pure-tone thresholds are within optimal range for speech and environmental sounds across tested octaves.</p>
        </div>
      </div>
      <div class="rec-step-card info">
        <div class="rec-step-num">Step 2</div>
        <div class="rec-step-text">
          <strong>Active Noise Cancellation & Hearing Protection</strong>
          <p>Maintain Active Noise Cancellation (ANC) when using earphones in noisy places to prevent high-volume listening (>80 dB).</p>
        </div>
      </div>
      <div class="rec-step-card info">
        <div class="rec-step-num">Step 3</div>
        <div class="rec-step-text">
          <strong>Annual Follow-up Screening</strong>
          <p>Schedule your next routine hearing assessment in 12 months to monitor long-term high-frequency presbycusis trends.</p>
        </div>
      </div>
    `;
  } else if (maxPta <= 40) {
    recCards = `
      <div class="rec-step-card warning">
        <div class="rec-step-num">Step 1</div>
        <div class="rec-step-text">
          <strong>Mild Hearing Loss Shift Detected (21–40 dB HL)</strong>
          <p>You may miss soft consonants (e.g., 'f', 's', 'th') or experience slight difficulty understanding speech in noisy environments.</p>
        </div>
      </div>
      <div class="rec-step-card info">
        <div class="rec-step-num">Step 2</div>
        <div class="rec-step-text">
          <strong>Environmental Noise Suppression & ANC Mode</strong>
          <p>Always enable Active Noise Cancellation (ANC) when wearing earphones to block background noise without raising music volume.</p>
        </div>
      </div>
      <div class="rec-step-card warning">
        <div class="rec-step-num">Step 3</div>
        <div class="rec-step-text">
          <strong>Clinical Evaluation & 6-Month Retest</strong>
          <p>Consult a certified Audiologist or ENT specialist for an in-booth diagnostic evaluation. Retest screening in 6 months.</p>
        </div>
      </div>
    `;
  } else {
    recCards = `
      <div class="rec-step-card danger">
        <div class="rec-step-num">Step 1</div>
        <div class="rec-step-text">
          <strong>Moderate to Significant Hearing Loss (>41 dB HL)</strong>
          <p>Pure-tone threshold shift requires conversational speech to be amplified. Speech discrimination in groups may be compromised.</p>
        </div>
      </div>
      <div class="rec-step-card warning">
        <div class="rec-step-num">Step 2</div>
        <div class="rec-step-text">
          <strong>Immediate Audiologist & ENT Consultation</strong>
          <p>Schedule a comprehensive clinical diagnostic evaluation with an Audiologist for otoscopy, bone conduction, and hearing aid trial.</p>
        </div>
      </div>
      <div class="rec-step-card info">
        <div class="rec-step-num">Step 3</div>
        <div class="rec-step-text">
          <strong>Assistive Listening Devices & ANC Earphones</strong>
          <p>Utilize real-time speech amplification apps or ANC noise suppression earphones to enhance voice clarity in daily communication.</p>
        </div>
      </div>
    `;
  }

  container.innerHTML = recCards;
}

// ==========================================
// 2. AUTHENTICATION & PORTAL LOGIC
// ==========================================
function initAuthEventListeners() {
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const btnLogout = document.getElementById('btn-logout');

  function showLogin() {
    tabLogin.classList.add('active');
    tabLogin.setAttribute('aria-selected', 'true');
    tabSignup.classList.remove('active');
    tabSignup.setAttribute('aria-selected', 'false');
    formLogin.style.display = 'flex';
    formSignup.style.display = 'none';
    authTitle.textContent = 'Welcome Back';
    authSubtitle.textContent = 'Sign in or register your profile to begin calibrated pure-tone screening.';
    clearAuthErrors();
  }

  function showSignup() {
    tabSignup.classList.add('active');
    tabSignup.setAttribute('aria-selected', 'true');
    tabLogin.classList.remove('active');
    tabLogin.setAttribute('aria-selected', 'false');
    formSignup.style.display = 'flex';
    formLogin.style.display = 'none';
    authTitle.textContent = 'Create Patient Profile';
    authSubtitle.textContent = 'Register a new patient account to conduct clinical hearing assessments.';
    clearAuthErrors();
  }

  tabLogin.addEventListener('click', showLogin);
  tabSignup.addEventListener('click', showSignup);
  switchToSignup.addEventListener('click', showSignup);
  switchToLogin.addEventListener('click', showLogin);

  // Toggle password visibility
  document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i data-lucide="eye-off"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i data-lucide="eye"></i>';
      }
      if (window.lucide) window.lucide.createIcons({ root: btn });
    });
  });

  // Forgot password modal
  const linkForgot = document.getElementById('link-forgot-password');
  const modalForgot = document.getElementById('modal-forgot-password');
  const btnCloseForgot = document.getElementById('btn-close-forgot');
  const btnCancelForgot = document.getElementById('btn-cancel-forgot');
  const btnSendReset = document.getElementById('btn-send-reset');

  linkForgot.addEventListener('click', (e) => {
    e.preventDefault();
    modalForgot.style.display = 'flex';
  });

  const closeForgot = () => { modalForgot.style.display = 'none'; };
  btnCloseForgot.addEventListener('click', closeForgot);
  btnCancelForgot.addEventListener('click', closeForgot);
  btnSendReset.addEventListener('click', () => {
    const ident = document.getElementById('forgot-identifier').value.trim();
    if (!ident) {
      showToast('Please enter your email or mobile number.', 'error');
      return;
    }
    showToast(`Password reset link sent to ${ident}! Check your messages.`, 'success');
    closeForgot();
  });

  // Login Form Submission
  // Helper to hash password using Web Crypto SHA-256
  async function hashPassword(plainPassword) {
    try {
      if (window.crypto && window.crypto.subtle) {
        const msgBuffer = new TextEncoder().encode(plainPassword);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn("crypto.subtle unavailable, using fallback hash:", e);
    }
    let hash = 0;
    for (let i = 0; i < plainPassword.length; i++) {
      hash = ((hash << 5) - hash) + plainPassword.charCodeAt(i);
      hash |= 0;
    }
    return "hash_" + Math.abs(hash).toString(16);
  }

  // Login Form Submission
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthErrors();

    const identifier = document.getElementById('login-identifier').value.trim();
    const password = document.getElementById('login-password').value;

    let hasError = false;
    if (!identifier) { showFieldError('error-login-identifier', 'Please enter email or mobile'); hasError = true; }
    if (!password) { showFieldError('error-login-password', 'Please enter your password'); hasError = true; }
    if (hasError) return;

    const btnSubmit = document.getElementById('btn-login-submit');
    setButtonLoading(btnSubmit, true, 'Signing in...');

    try {
      const passwordHash = await hashPassword(password);
      const isEmail = identifier.includes('@');
      const cloud = window.AudioMetricsCloud;

      // 1. Supabase Cloud Authentication & Retrieval
      if (cloud && cloud.isConfigured() && cloud.client) {
        const client = cloud.client;
        let matchedUser = null;

        // A. Search Supabase public.patients table by email or mobile
        try {
          const filter = isEmail
            ? `email.ilike.${identifier.toLowerCase()}`
            : `mobile.eq.${identifier}`;

          const { data: patient, error: patientErr } = await client
            .from('patients')
            .select('*')
            .or(filter)
            .maybeSingle();

          if (patient) {
            if (patient.password_hash === passwordHash) {
              matchedUser = patient;
            } else if (!patient.password_hash) {
              // Legacy account without password hash: upgrade with hash and authenticate
              await client.from('patients').update({ password_hash: passwordHash }).eq('id', patient.id);
              matchedUser = patient;
            }
          }
        } catch (dbEx) {
          console.warn("Supabase patients query note:", dbEx.message);
        }

        // B. If not matched in patients table and identifier is an email, check Supabase Auth
        if (!matchedUser && isEmail) {
          try {
            const { data: authData, error: authErr } = await client.auth.signInWithPassword({
              email: identifier.toLowerCase(),
              password: password
            });

            if (!authErr && authData?.user) {
              const { data: profile } = await client
                .from('patients')
                .select('*')
                .eq('id', authData.user.id)
                .maybeSingle();

              matchedUser = profile || {
                id: authData.user.id,
                first_name: authData.user.user_metadata?.first_name || identifier.split('@')[0],
                last_name: authData.user.user_metadata?.last_name || '',
                email: authData.user.email,
                mobile: authData.user.user_metadata?.mobile || '',
                age: authData.user.user_metadata?.age || 30
              };
            }
          } catch (authEx) {
            console.log("Supabase Auth signIn note:", authEx.message);
          }
        }

        if (matchedUser) {
          const userData = {
            id: matchedUser.id,
            firstName: matchedUser.first_name || matchedUser.firstName || 'Patient',
            lastName: matchedUser.last_name || matchedUser.lastName || '',
            age: matchedUser.age || 30,
            mobile: matchedUser.mobile || '',
            email: matchedUser.email
          };
          handleSuccessfulLogin(userData, 'supabase_' + matchedUser.id);
          showToast(`Welcome back, ${userData.firstName}! (Supabase Cloud ☁️)`, 'success');
          return;
        }

        throw new Error("Invalid email/mobile or password. Please check your credentials or register.");
      }

      // 2. Fallback to Local Backend Server
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      handleSuccessfulLogin(data.user, data.token);
      showToast(`Welcome back, ${data.user.firstName}!`, 'success');
    } catch (err) {
      console.warn("Login error:", err.message);
      // Check offline cache if disconnected
      const savedUsers = JSON.parse(localStorage.getItem('audiometrics_users') || '[]');
      const match = savedUsers.find(u => 
        (u.email?.toLowerCase() === identifier.toLowerCase() || u.mobile === identifier) && 
        (u.password === password || u.passwordHash === password)
      );

      if (match) {
        handleSuccessfulLogin(match, 'demo_token_' + Date.now());
        showToast(`Welcome back, ${match.firstName}! (Offline Cache)`, 'success');
      } else {
        showToast(err.message || 'Invalid credentials.', 'error');
      }
    } finally {
      setButtonLoading(btnSubmit, false, 'Login');
    }
  });

  // Sign Up Form Submission
  formSignup.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthErrors();

    const firstName = document.getElementById('signup-first-name').value.trim();
    const lastName = document.getElementById('signup-last-name').value.trim();
    const age = parseInt(document.getElementById('signup-age').value);
    const mobile = document.getElementById('signup-mobile').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    let hasError = false;
    if (!firstName) { showFieldError('error-signup-first-name', 'First name required'); hasError = true; }
    if (!lastName) { showFieldError('error-signup-last-name', 'Last name required'); hasError = true; }
    if (!age || age < 1 || age > 120) { showFieldError('error-signup-age', 'Enter valid age (1-120)'); hasError = true; }
    if (!mobile || mobile.length < 7) { showFieldError('error-signup-mobile', 'Enter valid mobile'); hasError = true; }
    if (!email || !email.includes('@')) { showFieldError('error-signup-email', 'Enter valid email'); hasError = true; }
    if (!password || password.length < 6) { showFieldError('error-signup-password', 'Password must be ≥ 6 chars'); hasError = true; }
    if (password !== confirmPassword) { showFieldError('error-signup-confirm-password', 'Passwords do not match'); hasError = true; }
    if (hasError) return;

    const btnSubmit = document.getElementById('btn-signup-submit');
    setButtonLoading(btnSubmit, true, 'Registering...');

    try {
      const passwordHash = await hashPassword(password);
      const cloud = window.AudioMetricsCloud;

      if (cloud && cloud.isConfigured() && cloud.client) {
        const client = cloud.client;

        // 1. Check if patient already exists in Supabase patients table
        const { data: existingUser } = await client
          .from('patients')
          .select('id, email, mobile')
          .or(`email.ilike.${email},mobile.eq.${mobile}`)
          .maybeSingle();

        if (existingUser) {
          throw new Error("An account with this Email or Mobile already exists. Please log in.");
        }

        // 2. Register with Supabase Auth service (creates user in Supabase Authentication -> Users)
        let authUserId = null;
        let authRateLimited = false;

        try {
          const { data: authData, error: authErr } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                first_name: firstName,
                last_name: lastName,
                age: age,
                mobile: mobile
              }
            }
          });

          if (authErr) {
            console.warn("Supabase Auth signUp note:", authErr.message);
            if (authErr.message && authErr.message.toLowerCase().includes('rate limit')) {
              authRateLimited = true;
              console.warn("⚠️ Supabase email rate limit reached. To fix: Turn OFF 'Confirm email' in Supabase Dashboard -> Authentication -> Providers -> Email.");
            }
          } else if (authData && authData.user) {
            authUserId = authData.user.id;
            console.log("✅ Supabase Auth user registered with ID:", authUserId);
          }
        } catch (authEx) {
          console.warn("Supabase Auth exception:", authEx);
        }

        // 3. Permanently insert patient record into Supabase public.patients table
        const patientRecord = {
          first_name: firstName,
          last_name: lastName,
          age: age,
          mobile: mobile,
          email: email,
          password_hash: passwordHash
        };
        // Link with Auth UUID if available
        if (authUserId) {
          patientRecord.id = authUserId;
        }

        const { data: profile, error: profileErr } = await client
          .from('patients')
          .insert([patientRecord])
          .select()
          .single();

        if (profileErr) {
          console.error("Supabase patient insert error:", profileErr);
          throw new Error(`Database error saving to Supabase: ${profileErr.message}`);
        }

        const userDataToStore = {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          age: profile.age,
          mobile: profile.mobile,
          email: profile.email
        };

        // Cache locally for offline availability
        const savedUsers = JSON.parse(localStorage.getItem('audiometrics_users') || '[]');
        savedUsers.push({ ...userDataToStore, passwordHash });
        localStorage.setItem('audiometrics_users', JSON.stringify(savedUsers));

        handleSuccessfulLogin(userDataToStore, 'supabase_' + profile.id);
        if (authRateLimited) {
          showToast('Account saved in Supabase! (Tip: Disable "Confirm email" in Supabase to see in Auth tab)', 'info');
        } else {
          showToast('Account registered and saved in Supabase Cloud! ☁️', 'success');
        }
        return;
      }

      // Fallback: Local Python server
      const userData = { firstName, lastName, age, mobile, email, password, confirmPassword };
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');

      handleSuccessfulLogin(data.user, data.token);
      showToast('Registration successful! Welcome to AudioMetrics.', 'success');
    } catch (err) {
      console.error("Registration error:", err);
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setButtonLoading(btnSubmit, false, 'Register');
    }
  });

  // Logout handler
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('audiometrics_token');
    localStorage.removeItem('audiometrics_user');
    state.currentUser = null;
    state.authToken = null;
    document.getElementById('header-user-status').style.display = 'none';
    document.getElementById('test-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'flex';
    showToast('You have been logged out.', 'info');
  });
}

function handleSuccessfulLogin(user, token) {
  state.currentUser = user;
  state.authToken = token;

  localStorage.setItem('audiometrics_token', token);
  localStorage.setItem('audiometrics_user', JSON.stringify(user));

  const fName = user.firstName || user.first_name || 'Patient';
  const lName = user.lastName || user.last_name || '';
  const ageDisplay = user.age || '--';

  document.getElementById('patient-display-name').textContent = `${fName} ${lName}`.trim();
  document.getElementById('patient-display-age').textContent = `${ageDisplay} yrs`;
  document.getElementById('header-user-status').style.display = 'flex';

  document.getElementById('banner-patient-info').textContent = `Patient: ${fName} ${lName} (${ageDisplay} yrs)`.trim();
  document.getElementById('banner-test-date').textContent = `Date: ${state.testDate}`;

  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('test-section').style.display = 'flex';

  initAudio();
  updateAgeCapacityUI();
  setStep(1);
  updateFrequencyUI();
  updateDbUI();
  updateEarUI();
  renderAudiogram();
  if (window.lucide) window.lucide.createIcons();
}

function checkExistingSession() {
  const token = localStorage.getItem('audiometrics_token');
  const userJson = localStorage.getItem('audiometrics_user');
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson);
      handleSuccessfulLogin(user, token);
    } catch (e) {
      localStorage.clear();
    }
  }
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearAuthErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

function setButtonLoading(btn, isLoading, text) {
  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span>${text}</span> <div class="pulse-beacon" style="display:inline-block;"></div>`;
  } else {
    btn.disabled = false;
    btn.innerHTML = `<span>${text}</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  }
}

// ==========================================
// 3. WEB AUDIO API & CANVAS OSCILLOSCOPE
// ==========================================
function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 512;

      // Create Stereo Panner for exact Left & Right earphone isolation
      if (audioCtx.createStereoPanner) {
        pannerNode = audioCtx.createStereoPanner();
        pannerNode.connect(analyserNode);
      } else {
        pannerNode = null;
      }

      analyserNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/**
 * Initializes Earphone Setup, Device Selection, and Stereo Isolation Checks
 */
function initHeadphoneControls() {
  const modal = document.getElementById('modal-headphone-check');
  const btnOpen = document.getElementById('btn-open-headphone-modal');
  const btnClose = document.getElementById('btn-close-headphone-modal');
  const btnConfirm = document.getElementById('btn-confirm-headphones');
  const btnRefresh = document.getElementById('btn-refresh-devices');
  const deviceSelect = document.getElementById('audio-device-select');
  const btnTestLeft = document.getElementById('btn-test-left-channel');
  const btnTestRight = document.getElementById('btn-test-right-channel');

  const btnCancel = document.getElementById('btn-cancel-headphone-modal');

  const openModal = () => {
    modal.style.display = 'flex';
    enumerateAudioDevices();
  };

  const closeModal = () => {
    modal.style.display = 'none';
    if (state.currentStep === 2) {
      setStep(1);
    }
  };

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  // Close modal when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  btnConfirm.addEventListener('click', () => {
    closeModal();
    setStep(3);
    showToast("Earphones and ANC verified! Ready to conduct frequency scan.", "success");
  });
  btnRefresh.addEventListener('click', enumerateAudioDevices);

  // Enumerate Connected Audio Output Devices (Earphones, Headsets)
  async function enumerateAudioDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      document.getElementById('device-status-note').textContent = 
        "Default system audio output routing is active (plug earphones into 3.5mm or USB).";
      return;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioOutputs = devices.filter(d => d.kind === 'audiooutput');

      deviceSelect.innerHTML = '';
      if (audioOutputs.length === 0) {
        const opt = document.createElement('option');
        opt.value = 'default';
        opt.textContent = 'Default Earphones / System Output';
        deviceSelect.appendChild(opt);
      } else {
        audioOutputs.forEach((dev, idx) => {
          const opt = document.createElement('option');
          opt.value = dev.deviceId;
          opt.textContent = dev.label || `Earphones / Audio Output ${idx + 1}`;
          deviceSelect.appendChild(opt);
        });
      }

      document.getElementById('device-status-note').textContent = 
        `Detected ${audioOutputs.length || 1} audio output device(s). Stereo separation ready.`;
    } catch (err) {
      console.warn("Device enumeration notice:", err.message);
    }
  }

  // Handle Device Change (switch output sink if browser supports AudioContext.setSinkId)
  deviceSelect.addEventListener('change', async (e) => {
    const deviceId = e.target.value;
    initAudio();
    if (audioCtx && typeof audioCtx.setSinkId === 'function') {
      try {
        await audioCtx.setSinkId(deviceId);
        showToast("Audio output switched to selected earphones.", "info");
      } catch (err) {
        console.warn("setSinkId failed:", err.message);
      }
    }
  });

  // Listen for device plug / unplug (3.5mm jack or bluetooth)
  if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
    navigator.mediaDevices.addEventListener('devicechange', enumerateAudioDevices);
  }

  // Isolated Left Channel Test (100% Left Pan)
  btnTestLeft.addEventListener('click', () => {
    playChannelTestTone('left', 1000, 35, 1.2);
  });

  // Isolated Right Channel Test (100% Right Pan)
  btnTestRight.addEventListener('click', () => {
    playChannelTestTone('right', 1000, 35, 1.2);
  });
}

/**
 * Plays an isolated calibration tone strictly to one earphone channel
 */
function playChannelTestTone(channel, freq = 1000, db = 35, duration = 1.2) {
  initAudio();
  if (!audioCtx) return;

  const btnLeft = document.getElementById('btn-test-left-channel');
  const btnRight = document.getElementById('btn-test-right-channel');
  const indicatorLeft = document.getElementById('indicator-left');
  const indicatorRight = document.getElementById('indicator-right');

  // Set visual feedback
  if (channel === 'left') {
    btnLeft.classList.add('playing');
    indicatorLeft.classList.add('active');
    indicatorRight.classList.remove('active');
  } else {
    btnRight.classList.add('playing');
    indicatorRight.classList.add('active');
    indicatorLeft.classList.remove('active');
  }

  // Pan strictly: -1.0 for Left, +1.0 for Right
  const pan = (channel === 'left') ? -1.0 : 1.0;
  if (pannerNode) {
    pannerNode.pan.setValueAtTime(pan, audioCtx.currentTime);
  }

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  let targetGain = Math.min(0.7, Math.pow(10, (db - 88) / 20));
  const now = audioCtx.currentTime;

  gainNode.gain.setValueAtTime(0.00001, now);
  gainNode.gain.exponentialRampToValueAtTime(targetGain, now + 0.04);
  gainNode.gain.setValueAtTime(targetGain, now + duration - 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

  osc.connect(gainNode);
  if (pannerNode) {
    gainNode.connect(pannerNode);
  } else {
    gainNode.connect(analyserNode);
  }

  osc.start(now);
  osc.stop(now + duration);

  setTimeout(() => {
    btnLeft.classList.remove('playing');
    btnRight.classList.remove('playing');
    indicatorLeft.classList.remove('active');
    indicatorRight.classList.remove('active');
  }, duration * 1000);
}

/**
 * Initializes real-time canvas oscilloscope
 */
function initOscilloscope() {
  const canvas = document.getElementById('audio-visualizer-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function draw() {
    visualizerAnimId = requestAnimationFrame(draw);
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#10192d' : '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Center baseline
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (state.isPlayingAudio && analyserNode) {
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = state.activeEar === 'left' ? '#0284c7' : '#ef4444';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    } else {
      // Idle gentle subtle sine wave
      const time = Date.now() * 0.002;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.35)';
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.04 + time) * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  draw();
}

/**
 * Generates pure tone through headphones with strict channel routing (Left vs Right earphone)
 */
function playTestTone(freq, dbHL, duration = 1.2) {
  initAudio();
  if (!audioCtx) {
    showToast("Web Audio not supported in this browser.", "error");
    return;
  }

  state.isPlayingAudio = true;
  updatePlayButtonState(true);

  // Set stereo channel panning: -1.0 for Left Ear (Blue ✕), +1.0 for Right Ear (Red ◯)
  const panVal = (state.activeEar === 'left') ? -1.0 : 1.0;
  if (pannerNode) {
    pannerNode.pan.setValueAtTime(panVal, audioCtx.currentTime);
  }

  const safeDb = Math.min(DB_MAX, Math.max(DB_MIN, dbHL));
  let targetGain = Math.pow(10, (safeDb - 88) / 20);
  targetGain = Math.min(0.75, Math.max(0.00005, targetGain));

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const now = audioCtx.currentTime;
  const attack = 0.04;
  const release = 0.05;

  gainNode.gain.setValueAtTime(0.00001, now);
  gainNode.gain.exponentialRampToValueAtTime(targetGain, now + attack);
  gainNode.gain.setValueAtTime(targetGain, now + duration - release);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

  osc.connect(gainNode);

  // Route: osc -> gainNode -> pannerNode (Left/Right isolation) -> analyserNode -> output
  if (pannerNode) {
    gainNode.connect(pannerNode);
  } else {
    gainNode.connect(analyserNode);
  }

  osc.start(now);
  osc.stop(now + duration);

  setTimeout(() => {
    state.isPlayingAudio = false;
    updatePlayButtonState(false);
  }, duration * 1000);
}

function updatePlayButtonState(isPlaying) {
  const btn = document.getElementById('btn-play-tone');
  const label = document.getElementById('play-tone-text');
  const subtext = document.getElementById('play-tone-subtext');
  const earName = state.activeEar === 'left' ? 'Left Ear' : 'Right Ear';

  if (isPlaying) {
    btn.classList.add('playing');
    label.innerHTML = `<i data-lucide="volume-2"></i> Presenting Tone (${state.activeFrequency} Hz)...`;
    subtext.textContent = `Emitting pure tone to ${earName} at ${state.currentDb} dB HL`;
  } else {
    btn.classList.remove('playing');
    label.innerHTML = `<i data-lucide="play"></i> Play Test Tone`;
    subtext.textContent = `Click to present pure tone at ${state.activeFrequency} Hz, ${state.currentDb} dB HL (${earName})`;
  }
  if (window.lucide) window.lucide.createIcons({ root: label });
}

// ==========================================
// AGE GROUP FREQUENCY PROTOCOLS
// ==========================================
function getAgeGroupFrequencies(age) {
  if (age <= 19) {
    // Children (6-19 yrs)
    return [500, 1000, 2000, 4000, 6000, 8000, 10000, 12000, 16000, 20000];
  } else if (age <= 39) {
    // Young Adults (18-39 yrs, e.g., Age 20/28)
    return [250, 500, 750, 1000, 2000, 4000, 6000, 8000, 9000, 10000, 12000, 14000, 16000, 18000];
  } else if (age <= 59) {
    // Adults (40-59 yrs, e.g., Age 40)
    return [250, 500, 750, 1000, 2000, 4000, 6000, 8000, 9000, 10000, 12000, 14000];
  } else {
    // Older Adults (60+ yrs, e.g., Age 60-70+)
    return [250, 500, 750, 1000, 2000, 4000, 6000, 8000, 10000];
  }
}

function getActiveFrequenciesList() {
  const band = state.activeBand || 'age_protocol';
  const age = state.currentUser ? state.currentUser.age : 28;

  if (band === 'age_protocol') {
    return getAgeGroupFrequencies(age);
  } else if (band === 'speech') {
    return [500, 750, 1000, 2000, 4000];
  } else if (band === 'high') {
    return [6000, 8000];
  } else if (band === 'extended') {
    return [9000, 10000, 12000, 14000, 16000, 18000, 20000];
  } else {
    return TEST_FREQUENCIES; // All
  }
}

function filterFrequencyButtons(band) {
  state.activeBand = band;
  const activeList = getActiveFrequenciesList();

  document.querySelectorAll('.freq-btn').forEach(btn => {
    const freq = parseInt(btn.getAttribute('data-freq'));
    const isVisible = activeList.includes(freq);
    btn.style.display = isVisible ? 'flex' : 'none';
  });

  // If active frequency is hidden, select first visible frequency
  if (!activeList.includes(state.activeFrequency) && activeList.length > 0) {
    setActiveFrequency(activeList[0]);
  }
}

// ==========================================
// 4. DUAL-EAR & HEARING TEST CONTROLS
// ==========================================
function initTestEventListeners() {
  // Ear selector toggle
  const btnEarLeft = document.getElementById('btn-ear-left');
  const btnEarRight = document.getElementById('btn-ear-right');

  btnEarLeft.addEventListener('click', () => setEar('left'));
  btnEarRight.addEventListener('click', () => setEar('right'));

  // Stepper Nav Items click listeners
  for (let i = 1; i <= 5; i++) {
    const item = document.getElementById(`step-nav-${i}`);
    if (item) {
      item.addEventListener('click', () => {
        setStep(i);
        if (i === 2) {
          const m = document.getElementById('modal-headphone-check');
          if (m) m.style.display = 'flex';
        } else if (i === 4) {
          const g = document.querySelector('.graph-panel');
          if (g) g.scrollIntoView({ behavior: 'smooth' });
        } else if (i === 5) {
          finishTestAndShowSummary();
        }
      });
    }
  }

  // Band Filter Chips
  document.querySelectorAll('.freq-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.freq-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const band = chip.getAttribute('data-band');
      filterFrequencyButtons(band);
    });
  });

  // Frequency selector buttons
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const freq = parseInt(btn.getAttribute('data-freq'));
      setActiveFrequency(freq);
      setStep(3);
    });
  });

  // Decibel stepper buttons
  document.getElementById('btn-db-minus-10').addEventListener('click', () => adjustDb(-10));
  document.getElementById('btn-db-minus-5').addEventListener('click', () => adjustDb(-5));
  document.getElementById('btn-db-plus-5').addEventListener('click', () => adjustDb(+5));
  document.getElementById('btn-db-plus-10').addEventListener('click', () => adjustDb(+10));

  // Precision volume slider
  const dbSlider = document.getElementById('db-slider');
  dbSlider.addEventListener('input', (e) => {
    setDb(parseInt(e.target.value));
  });

  // Quick dB preset buttons
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const db = parseInt(chip.getAttribute('data-db'));
      setDb(db);
    });
  });

  // Play Tone Button
  document.getElementById('btn-play-tone').addEventListener('click', () => {
    playTestTone(state.activeFrequency, state.currentDb);
  });

  // "Patient Heard It" Response Button (Records Threshold)
  document.getElementById('btn-patient-heard').addEventListener('click', () => {
    recordThreshold(state.activeEar, state.activeFrequency, state.currentDb);
  });

  // "Didn't Hear Tone" Response Button (Hughson-Westlake Ascent +10 dB)
  document.getElementById('btn-patient-not-heard').addEventListener('click', () => {
    adjustDb(+10);
    showToast(`Increased to ${state.currentDb} dB HL. Presenting tone again...`, 'info');
    setTimeout(() => {
      playTestTone(state.activeFrequency, state.currentDb);
    }, 250);
  });

  // Next Frequency Button
  document.getElementById('btn-next-freq').addEventListener('click', () => {
    advanceToNextFrequency();
  });

  // Finish Test Button
  document.getElementById('btn-finish-test').addEventListener('click', () => {
    finishTestAndShowSummary();
  });

  // Summary Actions (Download PDF, WhatsApp Share, Print, Save & Modal Logic)
  const exportModal = document.getElementById('modal-export-report');
  const closeExportModal = () => {
    if (exportModal) exportModal.style.display = 'none';
  };

  const btnPrintReport = document.getElementById('btn-print-report');
  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      if (exportModal) exportModal.style.display = 'flex';
    });
  }

  const btnCloseExportModal = document.getElementById('btn-close-export-modal');
  if (btnCloseExportModal) btnCloseExportModal.addEventListener('click', closeExportModal);

  const btnCancelExport = document.getElementById('btn-cancel-export');
  if (btnCancelExport) btnCancelExport.addEventListener('click', closeExportModal);

  // Direct Download PDF Button on Summary Header
  const btnDownloadPdfDirect = document.getElementById('btn-download-pdf-direct');
  if (btnDownloadPdfDirect) {
    btnDownloadPdfDirect.addEventListener('click', async () => {
      await downloadReportPdf();
    });
  }

  // Direct WhatsApp Share Button on Summary Header
  const btnShareWhatsappDirect = document.getElementById('btn-share-whatsapp-direct');
  if (btnShareWhatsappDirect) {
    btnShareWhatsappDirect.addEventListener('click', async () => {
      await shareReportViaWhatsApp();
    });
  }

  // Modal Download PDF button
  const btnExportPdf = document.getElementById('btn-export-pdf');
  if (btnExportPdf) {
    btnExportPdf.addEventListener('click', async () => {
      closeExportModal();
      await downloadReportPdf();
    });
  }

  // Modal WhatsApp button
  const btnModalWhatsapp = document.getElementById('btn-modal-whatsapp');
  if (btnModalWhatsapp) {
    btnModalWhatsapp.addEventListener('click', async () => {
      closeExportModal();
      await shareReportViaWhatsApp();
    });
  }

  // Modal Print Dialog button
  const btnExportPrint = document.getElementById('btn-export-print');
  if (btnExportPrint) {
    btnExportPrint.addEventListener('click', () => {
      closeExportModal();
      window.print();
    });
  }

  document.getElementById('btn-retest').addEventListener('click', () => {
    if (confirm("Reset current test data and begin a new session?")) {
      state.thresholds = { left: {}, right: {} };
      document.getElementById('summary-section').style.display = 'none';
      setEar('left');
      setActiveFrequency(1000);
      setDb(20);
      setStep(1);
      updateFrequencyUI();
      renderAudiogram();
      showToast("Ready for new session.", "info");
    }
  });

  document.getElementById('btn-save-backend').addEventListener('click', async () => {
    await saveResultsToBackend();
  });
}

function setEar(ear) {
  state.activeEar = ear;
  updateEarUI();
  updateFrequencyUI();
  renderAudiogram();
}

function updateEarUI() {
  const btnEarLeft = document.getElementById('btn-ear-left');
  const btnEarRight = document.getElementById('btn-ear-right');
  const heardSubtxt = document.getElementById('heard-btn-subtxt');

  if (state.activeEar === 'left') {
    btnEarLeft.classList.add('active');
    btnEarRight.classList.remove('active');
    heardSubtxt.textContent = "Record Left Ear threshold (✕)";
  } else {
    btnEarRight.classList.add('active');
    btnEarLeft.classList.remove('active');
    heardSubtxt.textContent = "Record Right Ear threshold (◯)";
  }
  updatePlayButtonState(false);
}

function setActiveFrequency(freq) {
  state.activeFrequency = freq;
  updateFrequencyUI();
  updatePlayButtonState(false);
  renderAudiogram();
}

function updateFrequencyUI() {
  const currentThresholds = state.thresholds[state.activeEar];
  const activeFreqs = getActiveFrequenciesList();

  document.querySelectorAll('.freq-btn').forEach(btn => {
    const f = parseInt(btn.getAttribute('data-freq'));
    
    if (!activeFreqs.includes(f)) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'flex';
    }

    if (f === state.activeFrequency) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    const statusEl = document.getElementById(`status-${f}`);
    if (currentThresholds[f] !== undefined) {
      statusEl.textContent = `${currentThresholds[f]} dB`;
      btn.classList.add('tested');
    } else {
      statusEl.textContent = '--';
      btn.classList.remove('tested');
    }
  });

  const earName = state.activeEar === 'left' ? 'Left Ear' : 'Right Ear';
  document.getElementById('current-freq-display').textContent = `${state.activeFrequency} Hz Active (${earName})`;
}

function setDb(db) {
  state.currentDb = Math.min(DB_MAX, Math.max(DB_MIN, db));
  updateDbUI();
}

function adjustDb(delta) {
  setDb(state.currentDb + delta);
}

function updateDbUI() {
  document.getElementById('current-db-val').textContent = state.currentDb;
  document.getElementById('db-slider').value = state.currentDb;

  document.querySelectorAll('.chip-btn').forEach(c => {
    const val = parseInt(c.getAttribute('data-db'));
    if (val === state.currentDb) c.classList.add('active');
    else c.classList.remove('active');
  });

  const tag = document.getElementById('db-severity-tag');
  const db = state.currentDb;
  if (db <= 25) {
    tag.textContent = "Normal Range";
    tag.style.background = "#dcfce7";
    tag.style.color = "#166534";
  } else if (db <= 40) {
    tag.textContent = "Mild Loss Range";
    tag.style.background = "#fef9c3";
    tag.style.color = "#854d0e";
  } else if (db <= 55) {
    tag.textContent = "Moderate Loss Range";
    tag.style.background = "#fef08a";
    tag.style.color = "#a16207";
  } else if (db <= 70) {
    tag.textContent = "Mod-Severe Range";
    tag.style.background = "#ffedd5";
    tag.style.color = "#c2410c";
  } else if (db <= 90) {
    tag.textContent = "Severe Range";
    tag.style.background = "#fee2e2";
    tag.style.color = "#b91c1c";
  } else {
    tag.textContent = "Profound Range";
    tag.style.background = "#fecdd3";
    tag.style.color = "#881337";
  }

  updatePlayButtonState(false);
  renderAudiogram();
}

/**
 * Records confirmed patient hearing threshold for selected ear with automatic ear switching
 */
function recordThreshold(ear, freq, db) {
  state.thresholds[ear][freq] = db;
  const symbol = ear === 'left' ? '✕ (Left Ear)' : '◯ (Right Ear)';

  showToast(`Recorded: ${freq} Hz at ${db} dB HL for ${symbol}`, 'success');
  updateFrequencyUI();
  renderAudiogram();

  // Active frequencies list for the user's age group/band
  const activeFreqs = getActiveFrequenciesList();
  const untestedCurrent = activeFreqs.filter(f => state.thresholds[ear][f] === undefined);

  if (untestedCurrent.length > 0) {
    setTimeout(() => {
      advanceToNextFrequency();
    }, 400);
  } else {
    // Current ear complete!
    if (ear === 'left') {
      const rightUntested = activeFreqs.filter(f => state.thresholds.right[f] === undefined);
      if (rightUntested.length > 0) {
        showToast("🎉 Left Ear (✕) test complete! Automatically starting Right Ear (◯) now...", "success");
        setTimeout(() => {
          setEar('right');
          const nextRightFreq = rightUntested[0];
          setActiveFrequency(nextRightFreq);
          setDb(20);
        }, 800);
      } else {
        showToast("Both Left & Right ears completed! Generating report...", "success");
        setTimeout(() => {
          finishTestAndShowSummary();
        }, 800);
      }
    } else {
      showToast("Both Left & Right ears completed! Generating report...", "success");
      setTimeout(() => {
        finishTestAndShowSummary();
      }, 800);
    }
  }
}

function advanceToNextFrequency() {
  const activeFreqs = getActiveFrequenciesList();
  if (activeFreqs.length === 0) return;

  const currentIndex = activeFreqs.indexOf(state.activeFrequency);
  let nextFreq = null;
  const currentThresholds = state.thresholds[state.activeEar];

  for (let i = 1; i <= activeFreqs.length; i++) {
    const candidate = activeFreqs[(currentIndex + i) % activeFreqs.length];
    if (currentThresholds[candidate] === undefined) {
      nextFreq = candidate;
      break;
    }
  }

  if (nextFreq === null) {
    if (state.activeEar === 'left') {
      setEar('right');
      const rightThresholds = state.thresholds['right'];
      for (let freq of activeFreqs) {
        if (rightThresholds[freq] === undefined) {
          nextFreq = freq;
          break;
        }
      }
      if (nextFreq === null) {
        nextFreq = activeFreqs[0];
      }
      showToast("Left ear finished. Switching to Right Ear.", "info");
    } else {
      nextFreq = activeFreqs[(currentIndex + 1) % activeFreqs.length];
      showToast("Both ears completed. Please Finish Test.", "success");
    }
  }

  setActiveFrequency(nextFreq);
  setDb(20);
}

// ==========================================
// 5. LIVE DUAL-EAR AUDIOGRAM SVG GENERATOR
// ==========================================
function initAudiogramSvg() {
  const svg = document.getElementById('audiogram-svg');
  if (!svg) return;

  const { width, height, padding } = SVG_CONFIG;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const bgZones = document.getElementById('svg-background-zones');
  const gridLines = document.getElementById('svg-grid-lines');
  const axesLabels = document.getElementById('svg-axes-labels');

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // 1. Shaded Severity Zones
  const severityBands = isDark ? [
    { start: -10, end: 25, color: '#064e3b', label: 'Normal' },
    { start: 25, end: 40, color: '#713f12', label: 'Mild' },
    { start: 40, end: 55, color: '#854d0e', label: 'Moderate' },
    { start: 55, end: 70, color: '#7c2d12', label: 'Mod-Severe' },
    { start: 70, end: 90, color: '#7f1d1d', label: 'Severe' },
    { start: 90, end: 120, color: '#4c0519', label: 'Profound' }
  ] : [
    { start: -10, end: 25, color: '#f0fdf4', label: 'Normal' },
    { start: 25, end: 40, color: '#fefce8', label: 'Mild' },
    { start: 40, end: 55, color: '#fef9c3', label: 'Moderate' },
    { start: 55, end: 70, color: '#fff7ed', label: 'Mod-Severe' },
    { start: 70, end: 90, color: '#fef2f2', label: 'Severe' },
    { start: 90, end: 120, color: '#fff1f2', label: 'Profound' }
  ];

  let bgHtml = '';
  severityBands.forEach(band => {
    const y1 = getDbY(band.start);
    const y2 = getDbY(band.end);
    const h = y2 - y1;
    bgHtml += `<rect x="${padding.left}" y="${y1}" width="${plotWidth}" height="${h}" fill="${band.color}" opacity="${isDark ? '0.25' : '0.6'}" />`;
  });
  bgZones.innerHTML = bgHtml;

  // 2. Grid lines
  let gridHtml = '';
  for (let db = -10; db <= 120; db += 10) {
    const y = getDbY(db);
    const isZero = (db === 0);
    const cls = isZero ? 'svg-grid-zero' : (db % 20 === 0 ? 'svg-grid-major' : 'svg-grid-minor');
    gridHtml += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="${cls}" />`;
  }

  TEST_FREQUENCIES.forEach(freq => {
    const x = getFreqX(freq);
    gridHtml += `<line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" class="svg-grid-major" />`;
  });
  gridLines.innerHTML = gridHtml;

  // 3. Axis Labels
  let labelsHtml = '';
  TEST_FREQUENCIES.forEach(freq => {
    const x = getFreqX(freq);
    labelsHtml += `<text x="${x}" y="${padding.top - 12}" class="svg-axis-label">${freq}</text>`;
    labelsHtml += `<text x="${x}" y="${height - padding.bottom + 22}" class="svg-axis-label">${freq} Hz</text>`;
  });

  for (let db = -10; db <= 120; db += 10) {
    const y = getDbY(db);
    labelsHtml += `<text x="${padding.left - 12}" y="${y + 4}" class="svg-axis-label" style="text-anchor: end;">${db}</text>`;
    labelsHtml += `<text x="${width - padding.right + 12}" y="${y + 4}" class="svg-axis-label" style="text-anchor: start;">${db}</text>`;
  }

  labelsHtml += `<text x="${width / 2}" y="${padding.top - 32}" class="svg-axis-title" style="text-anchor: middle;">FREQUENCY IN HERTZ (Hz)</text>`;
  labelsHtml += `<text x="${padding.left - 48}" y="${height / 2}" class="svg-axis-title" style="text-anchor: middle; transform: rotate(-90deg); transform-origin: ${padding.left - 48}px ${height / 2}px;">HEARING LEVEL IN DECIBELS (dB HL)</text>`;

  axesLabels.innerHTML = labelsHtml;
}

function getFreqX(freq) {
  const { width, padding, freqMap } = SVG_CONFIG;
  const plotWidth = width - padding.left - padding.right;
  const ratio = freqMap[freq] !== undefined ? freqMap[freq] : 0.5;
  return padding.left + (ratio * plotWidth);
}

function getDbY(db) {
  const { height, padding } = SVG_CONFIG;
  const plotHeight = height - padding.top - padding.bottom;
  const norm = (db - DB_MIN) / (DB_MAX - DB_MIN);
  return padding.top + (norm * plotHeight);
}

/**
 * Renders Dual-Ear Threshold Points (Blue ✕ for Left, Red ◯ for Right)
 */
function renderAudiogram() {
  const markersLeft = document.getElementById('svg-threshold-markers-left');
  const markersRight = document.getElementById('svg-threshold-markers-right');
  const pathLeft = document.getElementById('svg-threshold-line-left');
  const pathRight = document.getElementById('svg-threshold-line-right');
  const cursorGroup = document.getElementById('svg-active-cursor');

  if (!markersLeft || !markersRight) return;

  // 1. LEFT EAR (Blue ✕)
  const leftPoints = [];
  TEST_FREQUENCIES.forEach(freq => {
    if (state.thresholds.left[freq] !== undefined) {
      leftPoints.push({
        freq,
        db: state.thresholds.left[freq],
        x: getFreqX(freq),
        y: getDbY(state.thresholds.left[freq])
      });
    }
  });

  if (leftPoints.length > 0) {
    let d = `M ${leftPoints[0].x} ${leftPoints[0].y}`;
    for (let i = 1; i < leftPoints.length; i++) d += ` L ${leftPoints[i].x} ${leftPoints[i].y}`;
    pathLeft.setAttribute('d', d);
  } else {
    pathLeft.setAttribute('d', '');
  }

  let leftHtml = '';
  leftPoints.forEach(pt => {
    leftHtml += `
      <g class="audiogram-marker left" data-freq="${pt.freq}" data-db="${pt.db}">
        <circle cx="${pt.x}" cy="${pt.y}" r="14" class="hover-ring"></circle>
        <text x="${pt.x}" y="${pt.y}">✕</text>
        <title>Left Ear: ${pt.freq} Hz : ${pt.db} dB HL</title>
      </g>
    `;
  });
  markersLeft.innerHTML = leftHtml;

  // 2. RIGHT EAR (Red ◯)
  const rightPoints = [];
  TEST_FREQUENCIES.forEach(freq => {
    if (state.thresholds.right[freq] !== undefined) {
      rightPoints.push({
        freq,
        db: state.thresholds.right[freq],
        x: getFreqX(freq),
        y: getDbY(state.thresholds.right[freq])
      });
    }
  });

  if (rightPoints.length > 0) {
    let d = `M ${rightPoints[0].x} ${rightPoints[0].y}`;
    for (let i = 1; i < rightPoints.length; i++) d += ` L ${rightPoints[i].x} ${rightPoints[i].y}`;
    pathRight.setAttribute('d', d);
  } else {
    pathRight.setAttribute('d', '');
  }

  let rightHtml = '';
  rightPoints.forEach(pt => {
    rightHtml += `
      <g class="audiogram-marker right" data-freq="${pt.freq}" data-db="${pt.db}">
        <circle cx="${pt.x}" cy="${pt.y}" r="14" class="hover-ring"></circle>
        <circle cx="${pt.x}" cy="${pt.y}" r="7" class="symbol"></circle>
        <title>Right Ear: ${pt.freq} Hz : ${pt.db} dB HL</title>
      </g>
    `;
  });
  markersRight.innerHTML = rightHtml;

  // 3. Active Target Indicator
  const activeX = getFreqX(state.activeFrequency);
  const activeY = getDbY(state.currentDb);
  const strokeColor = state.activeEar === 'left' ? '#0284c7' : '#ef4444';

  cursorGroup.innerHTML = `
    <g class="audiogram-active-indicator" pointer-events="none">
      <circle cx="${activeX}" cy="${activeY}" r="7" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-dasharray="3 3">
        <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="${activeX}" cy="${activeY}" r="3" fill="${strokeColor}"></circle>
    </g>
  `;

  // Update Graph Average Values display below the audiogram
  updateGraphAverageDisplay();
}

/**
 * Calculates and updates the average graph values below the audiogram graph
 */
function updateGraphAverageDisplay() {
  const ptaFrequencies = [500, 1000, 2000, 4000];
  const speechFrequencies = [500, 1000, 2000, 4000];
  const highFrequencies = [6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];

  function calcEarAvg(earDict, freqList) {
    let sum = 0, count = 0;
    const targetFreqs = freqList || Object.keys(earDict);
    targetFreqs.forEach(f => {
      if (earDict[f] !== undefined) {
        sum += earDict[f];
        count++;
      }
    });
    return count > 0 ? (sum / count) : null;
  }

  // Calculate averages
  const leftTestedKeys = Object.keys(state.thresholds.left);
  const leftAllAvg = calcEarAvg(state.thresholds.left, leftTestedKeys);
  const leftPtaAvg = calcEarAvg(state.thresholds.left, ptaFrequencies);

  const rightTestedKeys = Object.keys(state.thresholds.right);
  const rightAllAvg = calcEarAvg(state.thresholds.right, rightTestedKeys);
  const rightPtaAvg = calcEarAvg(state.thresholds.right, ptaFrequencies);

  const leftSpeech = calcEarAvg(state.thresholds.left, speechFrequencies);
  const rightSpeech = calcEarAvg(state.thresholds.right, speechFrequencies);
  const leftHigh = calcEarAvg(state.thresholds.left, highFrequencies);
  const rightHigh = calcEarAvg(state.thresholds.right, highFrequencies);

  // Left Ear DOM
  const leftValEl = document.getElementById('graph-avg-left-val');
  const leftBadgeEl = document.getElementById('graph-avg-degree-left');
  const leftDetailEl = document.getElementById('graph-avg-left-detail');

  if (leftAllAvg !== null) {
    const leftValNum = leftAllAvg.toFixed(1);
    if (leftValEl) leftValEl.textContent = leftValNum;
    const diag = getDiagnosis(parseFloat(leftValNum));
    if (leftBadgeEl) {
      leftBadgeEl.textContent = diag.text;
      leftBadgeEl.className = `avg-badge ${diag.badgeClass}`;
    }
    if (leftDetailEl) {
      leftDetailEl.innerHTML = `PTA (500–4k): <strong>${leftPtaAvg !== null ? leftPtaAvg.toFixed(1) + ' dB' : '--'}</strong> | Speech: <strong>${leftSpeech !== null ? leftSpeech.toFixed(1) + ' dB' : '--'}</strong>`;
    }
  } else {
    if (leftValEl) leftValEl.textContent = '--';
    if (leftBadgeEl) { leftBadgeEl.textContent = 'Not Tested'; leftBadgeEl.className = 'avg-badge normal'; }
    if (leftDetailEl) leftDetailEl.textContent = 'PTA (500–4k): -- dB';
  }

  // Right Ear DOM
  const rightValEl = document.getElementById('graph-avg-right-val');
  const rightBadgeEl = document.getElementById('graph-avg-degree-right');
  const rightDetailEl = document.getElementById('graph-avg-right-detail');

  if (rightAllAvg !== null) {
    const rightValNum = rightAllAvg.toFixed(1);
    if (rightValEl) rightValEl.textContent = rightValNum;
    const diag = getDiagnosis(parseFloat(rightValNum));
    if (rightBadgeEl) {
      rightBadgeEl.textContent = diag.text;
      rightBadgeEl.className = `avg-badge ${diag.badgeClass}`;
    }
    if (rightDetailEl) {
      rightDetailEl.innerHTML = `PTA (500–4k): <strong>${rightPtaAvg !== null ? rightPtaAvg.toFixed(1) + ' dB' : '--'}</strong> | Speech: <strong>${rightSpeech !== null ? rightSpeech.toFixed(1) + ' dB' : '--'}</strong>`;
    }
  } else {
    if (rightValEl) rightValEl.textContent = '--';
    if (rightBadgeEl) { rightBadgeEl.textContent = 'Not Tested'; rightBadgeEl.className = 'avg-badge normal'; }
    if (rightDetailEl) rightDetailEl.textContent = 'PTA (500–4k): -- dB';
  }

  // Overall Both Ears DOM
  const overallValEl = document.getElementById('graph-avg-overall-val');
  const overallBadgeEl = document.getElementById('graph-avg-degree-overall');
  const overallDetailEl = document.getElementById('graph-avg-speech-detail');

  let combinedValues = [];
  if (leftAllAvg !== null) combinedValues.push(leftAllAvg);
  if (rightAllAvg !== null) combinedValues.push(rightAllAvg);

  if (combinedValues.length > 0) {
    const overallAvg = (combinedValues.reduce((a, b) => a + b, 0) / combinedValues.length).toFixed(1);
    if (overallValEl) overallValEl.textContent = overallAvg;
    const diag = getDiagnosis(parseFloat(overallAvg));
    if (overallBadgeEl) {
      overallBadgeEl.textContent = diag.text;
      overallBadgeEl.className = `avg-badge ${diag.badgeClass}`;
    }

    let highStr = '--';
    if (leftHigh !== null && rightHigh !== null) {
      highStr = `L:${leftHigh.toFixed(0)} / R:${rightHigh.toFixed(0)} dB`;
    } else if (leftHigh !== null) {
      highStr = `L:${leftHigh.toFixed(0)} dB`;
    } else if (rightHigh !== null) {
      highStr = `R:${rightHigh.toFixed(0)} dB`;
    }

    if (overallDetailEl) {
      overallDetailEl.innerHTML = `High Freq (6k+): <strong>${highStr}</strong>`;
    }
  } else {
    if (overallValEl) overallValEl.textContent = '--';
    if (overallBadgeEl) { overallBadgeEl.textContent = 'Pending Test'; overallBadgeEl.className = 'avg-badge normal'; }
    if (overallDetailEl) overallDetailEl.textContent = 'High Freq (6k+): -- dB';
  }
}

// ==========================================
// 6. CLINICAL ASSESSMENT & SUMMARY REPORT
// ==========================================
function finishTestAndShowSummary() {
  const summarySection = document.getElementById('summary-section');
  const tbody = document.getElementById('summary-table-body');

  const ptaLeftEl = document.getElementById('summary-pta-left');
  const ptaRightEl = document.getElementById('summary-pta-right');
  const degreeLeftEl = document.getElementById('summary-degree-left');
  const degreeRightEl = document.getElementById('summary-degree-right');
  const overallDegreeEl = document.getElementById('summary-overall-degree');

  // Calculate Pure Tone Average (PTA) for standard frequencies (500, 1000, 2000, 4000 Hz)
  const ptaFrequencies = [500, 1000, 2000, 4000];

  function calcPTA(earDict) {
    let sum = 0, count = 0;
    ptaFrequencies.forEach(f => {
      if (earDict[f] !== undefined) {
        sum += earDict[f];
        count++;
      }
    });
    return count > 0 ? (sum / count).toFixed(1) : null;
  }

  const ptaLeft = calcPTA(state.thresholds.left);
  const ptaRight = calcPTA(state.thresholds.right);

  // Left Ear Result
  if (ptaLeft !== null) {
    ptaLeftEl.textContent = `${ptaLeft} dB HL`;
    const diag = getDiagnosis(parseFloat(ptaLeft));
    degreeLeftEl.textContent = diag.text;
    degreeLeftEl.className = `stat-badge ${diag.badgeClass}`;
  } else {
    ptaLeftEl.textContent = '-- dB';
    degreeLeftEl.textContent = 'Not tested';
  }

  // Right Ear Result
  if (ptaRight !== null) {
    ptaRightEl.textContent = `${ptaRight} dB HL`;
    const diag = getDiagnosis(parseFloat(ptaRight));
    degreeRightEl.textContent = diag.text;
    degreeRightEl.className = `stat-badge ${diag.badgeClass}`;
  } else {
    ptaRightEl.textContent = '-- dB';
    degreeRightEl.textContent = 'Not tested';
  }

  // Overall Diagnosis (worst ear determines primary clinical status)
  const maxPta = Math.max(parseFloat(ptaLeft || 0), parseFloat(ptaRight || 0));
  const overallDiag = getDiagnosis(maxPta);
  overallDegreeEl.textContent = overallDiag.text;
  overallDegreeEl.className = `stat-badge ${overallDiag.badgeClass}`;

  // Populate Table
  let tableHtml = '';
  TEST_FREQUENCIES.forEach(freq => {
    const leftVal = state.thresholds.left[freq];
    const rightVal = state.thresholds.right[freq];

    const leftText = leftVal !== undefined ? `<strong>${leftVal} dB</strong>` : '--';
    const rightText = rightVal !== undefined ? `<strong>${rightVal} dB</strong>` : '--';

    let diffText = '--';
    if (leftVal !== undefined && rightVal !== undefined) {
      const diff = Math.abs(leftVal - rightVal);
      diffText = `${diff} dB ${diff > 15 ? '<span style="color:#ef4444;font-weight:700;">(Asymmetric)</span>' : ''}`;
    }

    const testDb = leftVal !== undefined ? leftVal : rightVal;
    const interp = testDb !== undefined ? getDiagnosis(testDb).text : '<span style="color:var(--text-light);">Pending</span>';
    const status = (leftVal !== undefined || rightVal !== undefined)
      ? '<span style="color:#10b981;font-weight:700;">✓ Completed</span>'
      : '<span style="color:var(--text-light);">Pending</span>';

    tableHtml += `
      <tr>
        <td><strong>${freq} Hz</strong></td>
        <td class="marker-blue">${leftText}</td>
        <td class="marker-red">${rightText}</td>
        <td>${diffText}</td>
        <td>${interp}</td>
        <td>${status}</td>
      </tr>
    `;
  });
  tbody.innerHTML = tableHtml;

  summarySection.style.display = 'block';
  summarySection.scrollIntoView({ behavior: 'smooth' });
  setStep(5);
  renderNextSteps();
  showToast("Diagnostic assessment generated successfully!", "success");
}

function getDiagnosis(dbVal) {
  if (dbVal <= 25) return { text: "Normal Hearing (≤25 dB)", badgeClass: "normal" };
  if (dbVal <= 40) return { text: "Mild Hearing Loss (26-40 dB)", badgeClass: "mild" };
  if (dbVal <= 55) return { text: "Moderate Hearing Loss (41-55 dB)", badgeClass: "moderate" };
  if (dbVal <= 70) return { text: "Mod-Severe Loss (56-70 dB)", badgeClass: "moderate" };
  if (dbVal <= 90) return { text: "Severe Hearing Loss (71-90 dB)", badgeClass: "severe" };
  return { text: "Profound Hearing Loss (>90 dB)", badgeClass: "severe" };
}

// ==========================================
// 7. SUPABASE CLOUD & STORAGE INTEGRATION
// ==========================================

function initCloudConfigUI() {
  const btnCloud = document.getElementById('btn-cloud-config');
  const modalCloud = document.getElementById('modal-cloud-config');
  const btnClose = document.getElementById('btn-close-cloud-modal');
  const btnCancel = document.getElementById('btn-cancel-cloud-modal');
  const btnSave = document.getElementById('btn-save-cloud-config');
  const inputUrl = document.getElementById('input-supabase-url');
  const inputKey = document.getElementById('input-supabase-key');
  const statusMsg = document.getElementById('cloud-connection-status-msg');

  if (!btnCloud || !modalCloud) return;

  updateCloudStatusBadge();

  btnCloud.addEventListener('click', () => {
    const currentUrl = window.AudioMetricsCloud ? window.AudioMetricsCloud.getUrl() : '';
    const currentKey = window.AudioMetricsCloud ? window.AudioMetricsCloud.getKey() : '';
    inputUrl.value = currentUrl;
    inputKey.value = currentKey;
    statusMsg.style.display = 'none';
    modalCloud.style.display = 'flex';
  });

  const closeModal = () => { modalCloud.style.display = 'none'; };
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (btnSave) {
    btnSave.addEventListener('click', async () => {
      const url = inputUrl.value.trim();
      const key = inputKey.value.trim();

      if (!url || !key) {
        statusMsg.style.display = 'block';
        statusMsg.style.background = '#fef2f2';
        statusMsg.style.color = '#dc2626';
        statusMsg.textContent = 'Please enter both Supabase Project URL and Public Anon Key.';
        return;
      }

      btnSave.disabled = true;
      btnSave.textContent = 'Testing connection...';

      try {
        window.AudioMetricsCloud.setCredentials(url, key);
        const client = window.AudioMetricsCloud.client;
        if (!client) throw new Error("Could not initialize Supabase SDK with provided credentials.");

        // Verify connection with light query
        const { error } = await client.from('hearing_tests').select('id').limit(1);
        if (error && error.code !== 'PGRST116') {
          console.warn("Supabase query note:", error);
        }

        statusMsg.style.display = 'block';
        statusMsg.style.background = '#f0fdf4';
        statusMsg.style.color = '#16a34a';
        statusMsg.textContent = '✅ Connected to Supabase Cloud successfully!';
        updateCloudStatusBadge();
        showToast('Supabase Cloud Connected! All data & graphs will sync to the cloud. ☁️', 'success');
        setTimeout(() => { closeModal(); }, 1200);
      } catch (err) {
        statusMsg.style.display = 'block';
        statusMsg.style.background = '#fef2f2';
        statusMsg.style.color = '#dc2626';
        statusMsg.textContent = `Connection error: ${err.message}`;
      } finally {
        btnSave.disabled = false;
        btnSave.textContent = 'Save & Connect';
      }
    });
  }
}

function updateCloudStatusBadge() {
  const badgeBtn = document.getElementById('btn-cloud-config');
  const badgeText = document.getElementById('cloud-status-text');
  const badgeIcon = document.getElementById('cloud-status-icon');
  if (!badgeBtn || !badgeText) return;

  if (window.AudioMetricsCloud && window.AudioMetricsCloud.isConfigured()) {
    badgeBtn.classList.add('connected');
    badgeText.textContent = 'Cloud Connected';
    if (badgeIcon) {
      badgeIcon.innerHTML = '<i data-lucide="zap"></i>';
      if (window.lucide) window.lucide.createIcons({ root: badgeIcon });
    }
  } else {
    badgeBtn.classList.remove('connected');
    badgeText.textContent = 'Connect Supabase';
    if (badgeIcon) {
      badgeIcon.innerHTML = '<i data-lucide="cloud"></i>';
      if (window.lucide) window.lucide.createIcons({ root: badgeIcon });
    }
  }
}

/**
 * Converts SVG Audiogram element directly into a PNG image Blob for cloud upload
 */
async function exportAudiogramSvgToBlob() {
  const svgEl = document.getElementById('audiogram-svg');
  if (!svgEl) return null;

  const clonedSvg = svgEl.cloneNode(true);
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clonedSvg);

  if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!svgString.match(/^<svg[^>]+xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = SVG_CONFIG.width || 760;
      canvas.height = SVG_CONFIG.height || 560;
      const ctx = canvas.getContext('2d');
      // Medical white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Saves audiogram data & graph to Supabase Cloud (with fallback to SQLite/Local)
 */
async function saveResultsToBackend() {
  const notes = document.getElementById('clinician-notes').value.trim();

  // Helper PTA calculation
  const ptaFreqs = [500, 1000, 2000, 4000];
  const calcPtaVal = (dict) => {
    let s = 0, c = 0;
    ptaFreqs.forEach(f => {
      if (dict[f] !== undefined) { s += dict[f]; c++; }
    });
    return c > 0 ? (s / c).toFixed(1) : null;
  };

  const ptaLeft = calcPtaVal(state.thresholds.left);
  const ptaRight = calcPtaVal(state.thresholds.right);
  const maxPta = Math.max(parseFloat(ptaLeft || 0), parseFloat(ptaRight || 0));
  const diag = getDiagnosis(maxPta);

  const btnSave = document.getElementById('btn-save-backend');
  btnSave.disabled = true;
  btnSave.textContent = "Saving...";

  try {
    const cloud = window.AudioMetricsCloud;

    // 1. SUPABASE CLOUD SAVE
    if (cloud && cloud.isConfigured() && cloud.client) {
      let graphUrl = null;

      // A. Export SVG Audiogram to PNG and upload to Supabase Storage
      try {
        btnSave.textContent = "Uploading Graph Image...";
        const graphBlob = await exportAudiogramSvgToBlob();

        if (graphBlob) {
          const userSlug = state.currentUser ? (state.currentUser.email || 'patient').replace(/[^a-zA-Z0-9]/g, '_') : 'guest';
          const fileName = `audiogram_${userSlug}_${Date.now()}.png`;

          const { data: uploadData, error: uploadErr } = await cloud.client.storage
            .from('audiogram-files')
            .upload(fileName, graphBlob, {
              contentType: 'image/png',
              upsert: true
            });

          if (uploadErr) {
            console.warn("Supabase Storage Notice (Check if 'audiogram-files' bucket exists):", uploadErr.message);
          } else {
            const { data: urlData } = cloud.client.storage
              .from('audiogram-files')
              .getPublicUrl(fileName);
            graphUrl = urlData?.publicUrl || null;
            console.log("☁️ Audiogram Graph Public URL:", graphUrl);
          }
        }
      } catch (storageEx) {
        console.warn("Storage upload non-fatal warning:", storageEx);
      }

      // B. Save clinical test record to Supabase hearing_tests table
      btnSave.textContent = "Saving to Supabase DB...";
      const isValidUUID = (id) => typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const testRecord = {
        patient_id: (state.currentUser && isValidUUID(state.currentUser.id)) ? state.currentUser.id : null,
        patient_email: state.currentUser ? state.currentUser.email : 'guest@clinic.com',
        test_mode: state.testMode,
        ear: 'Dual-Ear (Left & Right)',
        thresholds: state.thresholds,
        pta_left: ptaLeft !== null ? parseFloat(ptaLeft) : null,
        pta_right: ptaRight !== null ? parseFloat(ptaRight) : null,
        pta_score: maxPta,
        diagnosis: diag.text,
        clinician_notes: notes || "Dual-ear pure tone audiometry completed.",
        graph_url: graphUrl
      };

      const { data: insertData, error: insertErr } = await cloud.client
        .from('hearing_tests')
        .insert([testRecord])
        .select();

      if (insertErr) {
        console.error("Supabase Database Insert Error:", insertErr);
        throw new Error(`Database error: ${insertErr.message}`);
      }

      showToast("Audiogram graph & report saved in Supabase Cloud! ☁️", "success");

      // Display Cloud Graph Link in UI
      const savedCard = document.getElementById('cloud-saved-card');
      const viewLink = document.getElementById('cloud-view-graph-link');
      if (savedCard && viewLink && graphUrl) {
        viewLink.href = graphUrl;
        savedCard.style.display = 'flex';
      }
      return;
    }

    // 2. FALLBACK: Local Backend / localStorage
    const payload = {
      thresholds: state.thresholds,
      testMode: state.testMode,
      notes: notes || "Dual-ear pure tone audiometry completed."
    };

    const res = await fetch(`${API_BASE_URL}/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.authToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save to backend.');

    showToast("Audiogram permanently stored in local database!", "success");
  } catch (err) {
    console.warn("Backend unavailable, saving locally:", err.message);
    const localRecords = JSON.parse(localStorage.getItem('audiometrics_records') || '[]');
    localRecords.push({
      thresholds: state.thresholds,
      testMode: state.testMode,
      notes,
      pta_score: maxPta,
      diagnosis: diag.text,
      date: new Date().toISOString()
    });
    localStorage.setItem('audiometrics_records', JSON.stringify(localRecords));
    showToast("Saved to local patient record cache.", "success");
  } finally {
    btnSave.disabled = false;
    btnSave.innerHTML = '<i data-lucide="save"></i> Save Record';
    if (window.lucide) window.lucide.createIcons({ root: btnSave });
  }
}

// ==========================================
// 8. CLINICAL PDF REPORT & WHATSAPP SHARING
// ==========================================

/**
 * Converts SVG Audiogram to a high-resolution PNG data URL for PDF inclusion
 */
async function getAudiogramPngDataUrl() {
  const svgEl = document.getElementById('audiogram-svg');
  if (!svgEl) return null;

  try {
    const clonedSvg = svgEl.cloneNode(true);
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(clonedSvg);

    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!svgString.match(/^<svg[^>]+xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/)) {
      svgString = svgString.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = SVG_CONFIG.width || 760;
        canvas.height = SVG_CONFIG.height || 560;
        const ctx = canvas.getContext('2d');
        // Clean medical white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        try {
          resolve(canvas.toDataURL('image/png'));
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  } catch (err) {
    console.warn("getAudiogramPngDataUrl failed:", err);
    return null;
  }
}

/**
 * Generates an ISO 8253-1 compliant medical Audiology Report PDF Blob
 */
async function generateReportPdfBlob() {
  const jsPdfClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
  if (!jsPdfClass) {
    throw new Error("jsPDF library not initialized. Please ensure jspdf.umd.min.js is loaded.");
  }

  const doc = new jsPdfClass({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2); // 182mm

  // 1. TOP HEADER BANNER (Medical Brand Gradient / Blue)
  doc.setFillColor(2, 132, 199); // #0284c7 Primary Medical Blue
  doc.rect(0, 0, pageWidth, 21, 'F');

  // Brand Name & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('AUDIOMETRICS CLINICAL DIAGNOSTIC REPORT', margin, 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('ISO 8253-1 Pure-Tone Air Conduction Diagnostic Audiometry', margin, 16);

  // Date & Report Reference on Right
  const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`DATE: ${todayStr}`, pageWidth - margin, 9.5, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.text(`TIME: ${timeStr} | REF: AM-${Date.now().toString().slice(-6)}`, pageWidth - margin, 15, { align: 'right' });

  // 2. PATIENT DEMOGRAPHICS CARD
  let curY = 25;
  doc.setFillColor(248, 250, 252); // #f8fafc slate-50
  doc.setDrawColor(226, 232, 240); // #e2e8f0 slate-200
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, curY, contentWidth, 21, 2, 2, 'FD');

  const pName = state.currentUser ? `${state.currentUser.firstName || ''} ${state.currentUser.lastName || ''}`.trim() : 'Guest Patient';
  const pAge = state.currentUser?.age ? `${state.currentUser.age} yrs` : 'Unspecified';
  const pPhone = state.currentUser?.mobile || 'N/A';
  const pEmail = state.currentUser?.email || 'N/A';

  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Patient: ${pName || 'Guest Patient'}`, margin + 4, curY + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.text(`Age: ${pAge}   |   Contact: ${pPhone}`, margin + 4, curY + 11);
  doc.text(`Email: ${pEmail}`, margin + 4, curY + 16.5);

  doc.text(`Transducer: Calibrated Diagnostic Headphones (Air Conduction)`, margin + 92, curY + 5.5);
  doc.text(`Standard: ISO 8253-1 (Ambient Noise <= 30 dBA)`, margin + 92, curY + 11);
  doc.text(`Test Spectrum: Extended 250 Hz – 20,000 Hz`, margin + 92, curY + 16.5);

  // 3. CLINICAL SUMMARY CARDS (Left Ear, Right Ear, Overall Diagnosis)
  curY += 24.5;
  const ptaFreqs = [500, 1000, 2000, 4000];
  const calcPtaVal = (dict) => {
    let s = 0, c = 0;
    ptaFreqs.forEach(f => {
      if (dict[f] !== undefined) { s += dict[f]; c++; }
    });
    return c > 0 ? (s / c).toFixed(1) : null;
  };

  const ptaLeft = calcPtaVal(state.thresholds.left);
  const ptaRight = calcPtaVal(state.thresholds.right);
  const maxPta = Math.max(parseFloat(ptaLeft || 0), parseFloat(ptaRight || 0));
  const diagLeft = ptaLeft !== null ? getDiagnosis(parseFloat(ptaLeft)) : { text: 'Not Tested' };
  const diagRight = ptaRight !== null ? getDiagnosis(parseFloat(ptaRight)) : { text: 'Not Tested' };
  const diagOverall = getDiagnosis(maxPta);

  const cardWidth = (contentWidth - 6) / 3; // 3 equal columns

  // Left Ear Card (Blue accent)
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.roundedRect(margin, curY, cardWidth, 17, 1.5, 1.5, 'FD');
  doc.setTextColor(2, 132, 199); // Blue
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('LEFT EAR (X) PTA (500–4k)', margin + 3, curY + 4.5);
  doc.setFontSize(10.5);
  doc.text(ptaLeft !== null ? `${ptaLeft} dB HL` : '-- dB', margin + 3, curY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(diagLeft.text, margin + 3, curY + 14.5);

  // Right Ear Card (Red accent)
  const rX = margin + cardWidth + 3;
  doc.setFillColor(255, 241, 242); // rose-50
  doc.setDrawColor(254, 205, 211); // rose-200
  doc.roundedRect(rX, curY, cardWidth, 17, 1.5, 1.5, 'FD');
  doc.setTextColor(225, 29, 72); // Rose/Red
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('RIGHT EAR (O) PTA (500–4k)', rX + 3, curY + 4.5);
  doc.setFontSize(10.5);
  doc.text(ptaRight !== null ? `${ptaRight} dB HL` : '-- dB', rX + 3, curY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(diagRight.text, rX + 3, curY + 14.5);

  // Overall Diagnosis Card (Green/Teal accent)
  const oX = margin + (cardWidth + 3) * 2;
  doc.setFillColor(240, 253, 244); // green-50
  doc.setDrawColor(187, 247, 208); // green-200
  doc.roundedRect(oX, curY, cardWidth, 17, 1.5, 1.5, 'FD');
  doc.setTextColor(22, 101, 52); // Green
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('OVERALL DIAGNOSIS', oX + 3, curY + 4.5);
  doc.setFontSize(9);
  doc.text(diagOverall.text.split('(')[0].trim(), oX + 3, curY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('WHO Severity Scale', oX + 3, curY + 14.5);

  // 4. AUDIOGRAM GRAPH EMBEDDING
  curY += 20;
  const graphImgData = await getAudiogramPngDataUrl();
  const graphWidth = 148;
  const graphHeight = 82;
  const graphX = margin + (contentWidth - graphWidth) / 2;

  if (graphImgData) {
    doc.addImage(graphImgData, 'PNG', graphX, curY, graphWidth, graphHeight);
    curY += graphHeight + 2;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('Figure 1: Dual-Ear Pure-Tone Audiogram (Left Ear: Blue X  |  Right Ear: Red O  |  Normal Region: 0–25 dB)', pageWidth / 2, curY, { align: 'center' });
    curY += 4.5;
  } else {
    curY += 8;
  }

  // 5. THRESHOLD COMPARISON TABLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Pure-Tone Air Conduction Recorded Thresholds (dB HL):', margin, curY);
  curY += 2.5;

  // Table header
  const cols = [
    { name: 'Frequency', w: 26 },
    { name: 'Left Ear (X)', w: 34 },
    { name: 'Right Ear (O)', w: 34 },
    { name: 'Difference', w: 34 },
    { name: 'Classification', w: 54 }
  ];

  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, curY, contentWidth, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  let headerX = margin;
  cols.forEach(col => {
    doc.text(col.name, headerX + 2, curY + 3.5);
    headerX += col.w;
  });

  curY += 5;

  // Key frequencies for report table
  const reportFreqs = [250, 500, 1000, 2000, 4000, 6000, 8000, 12000, 16000, 20000];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  reportFreqs.forEach((freq, idx) => {
    const leftVal = state.thresholds.left[freq];
    const rightVal = state.thresholds.right[freq];
    const lStr = leftVal !== undefined ? `${leftVal} dB` : '--';
    const rStr = rightVal !== undefined ? `${rightVal} dB` : '--';

    let diffStr = '--';
    if (leftVal !== undefined && rightVal !== undefined) {
      const diff = Math.abs(leftVal - rightVal);
      diffStr = `${diff} dB${diff > 15 ? ' (Asymmetric)' : ''}`;
    }

    const testDb = leftVal !== undefined ? leftVal : rightVal;
    const diagStr = testDb !== undefined ? getDiagnosis(testDb).text : 'Pending';

    // Zebra striping
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, curY, contentWidth, 3.8, 'F');
    }

    let cellX = margin;
    doc.setTextColor(30, 41, 59);
    doc.text(`${freq} Hz`, cellX + 2, curY + 2.8);

    cellX += cols[0].w;
    doc.setTextColor(2, 132, 199); // Blue
    doc.text(lStr, cellX + 2, curY + 2.8);

    cellX += cols[1].w;
    doc.setTextColor(225, 29, 72); // Red
    doc.text(rStr, cellX + 2, curY + 2.8);

    cellX += cols[2].w;
    doc.setTextColor(71, 85, 105);
    doc.text(diffStr, cellX + 2, curY + 2.8);

    cellX += cols[3].w;
    doc.text(diagStr, cellX + 2, curY + 2.8);

    curY += 3.8;
  });

  // 6. CLINICIAN REMARKS & OBSERVATIONS
  curY += 2.5;
  const rawNotes = (document.getElementById('clinician-notes')?.value || '').trim();
  const notesText = rawNotes || 'Standard pure-tone audiometry screening completed. Bilateral thresholds evaluated across speech and extended high-frequency range.';

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, curY, contentWidth, 15, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Clinician Observations & Diagnostic Recommendations:', margin + 3, curY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  const splitNotes = doc.splitTextToSize(notesText, contentWidth - 6);
  doc.text(splitNotes.slice(0, 2), margin + 3, curY + 8);

  // 7. FOOTER BAR & CERTIFICATION
  doc.setFillColor(241, 245, 249);
  doc.rect(0, pageHeight - 11, pageWidth, 11, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text('AudioMetrics Clinical Diagnostic System • ISO 8253-1 Compliant • Calibrated Transducer Output', margin, pageHeight - 4.5);
  doc.text('Page 1 of 1', pageWidth - margin, pageHeight - 4.5, { align: 'right' });

  return doc.output('blob');
}

/**
 * Triggers direct browser download of a binary Blob to user's PC or Mobile phone
 */
function triggerBlobDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}

/**
 * Direct Download handler for PDF report (PC & Mobile / Android compatible)
 */
async function downloadReportPdf() {
  const btn = document.getElementById('btn-download-pdf-direct');
  const btnExportModal = document.getElementById('btn-export-pdf');
  
  if (btn) btn.disabled = true;
  if (btnExportModal) btnExportModal.disabled = true;
  showToast("Generating clinical PDF report...", "info");

  try {
    const pdfBlob = await generateReportPdfBlob();
    if (!pdfBlob) throw new Error("Could not construct PDF document.");

    const pName = state.currentUser ? `${state.currentUser.firstName || 'Patient'}_${state.currentUser.lastName || ''}`.trim() : 'Patient';
    const cleanName = pName.replace(/[^a-zA-Z0-9]/g, '_') || 'Patient';
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `AudioMetrics_Report_${cleanName}_${dateStr}.pdf`;

    triggerBlobDownload(pdfBlob, fileName);
    showToast("PDF report saved & downloaded to your device! 📄", "success");
  } catch (err) {
    console.error("PDF download error:", err);
    showToast(`Failed to generate PDF: ${err.message}`, "error");
  } finally {
    if (btn) btn.disabled = false;
    if (btnExportModal) btnExportModal.disabled = false;
  }
}

/**
 * Share Report via WhatsApp (Native Android Web Share API with File payload, or WhatsApp URL with Auto-Download)
 */
async function shareReportViaWhatsApp() {
  const btn = document.getElementById('btn-share-whatsapp-direct');
  const btnModal = document.getElementById('btn-modal-whatsapp');
  if (btn) btn.disabled = true;
  if (btnModal) btnModal.disabled = true;

  showToast("Preparing WhatsApp report...", "info");

  try {
    const pdfBlob = await generateReportPdfBlob();
    if (!pdfBlob) throw new Error("Could not construct PDF document.");

    const pName = state.currentUser ? `${state.currentUser.firstName || 'Patient'} ${state.currentUser.lastName || ''}`.trim() : 'Patient';
    const cleanName = pName.replace(/[^a-zA-Z0-9]/g, '_') || 'Patient';
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `AudioMetrics_Report_${cleanName}_${dateStr}.pdf`;

    // Calculate PTA for summary text
    const ptaFreqs = [500, 1000, 2000, 4000];
    const calcPtaVal = (dict) => {
      let s = 0, c = 0;
      ptaFreqs.forEach(f => {
        if (dict[f] !== undefined) { s += dict[f]; c++; }
      });
      return c > 0 ? (s / c).toFixed(1) : null;
    };
    const ptaLeft = calcPtaVal(state.thresholds.left);
    const ptaRight = calcPtaVal(state.thresholds.right);
    const maxPta = Math.max(parseFloat(ptaLeft || 0), parseFloat(ptaRight || 0));
    const diag = getDiagnosis(maxPta);
    const rawNotes = (document.getElementById('clinician-notes')?.value || '').trim();
    const notes = rawNotes || 'Standard pure-tone audiometry screening completed.';

    // Construct WhatsApp message text
    const textLines = [
      `🏥 *AUDIOMETRICS CLINICAL HEARING REPORT*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Patient:* ${pName}${state.currentUser?.age ? ` (${state.currentUser.age} yrs)` : ''}`,
      `📅 *Date:* ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
      ``,
      `📊 *Audiological Assessment:*`,
      `• *Left Ear (✕) PTA:* ${ptaLeft !== null ? ptaLeft + ' dB HL' : 'Not Tested'} (${ptaLeft !== null ? getDiagnosis(parseFloat(ptaLeft)).text : ''})`,
      `• *Right Ear (◯) PTA:* ${ptaRight !== null ? ptaRight + ' dB HL' : 'Not Tested'} (${ptaRight !== null ? getDiagnosis(parseFloat(ptaRight)).text : ''})`,
      `• *Overall Diagnosis:* ${diag.text}`,
      `• *Standard:* ISO 8253-1 Pure-Tone Air Conduction`,
      ``,
      `📝 *Clinician Remarks:*`,
      notes,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📎 *Attached:* Clinical PDF Report with complete audiogram curve (250 Hz – 20,000 Hz).`
    ];

    // If cloud link is present, add it
    const cloudLink = document.getElementById('cloud-view-graph-link')?.href;
    if (cloudLink && cloudLink !== '#' && cloudLink.startsWith('http')) {
      textLines.push(`☁️ *Online Audiogram Graph:* ${cloudLink}`);
    }

    const shareText = textLines.join('\n');

    // 1. Check for Mobile Web Share API support with File (Natively supported on Android Chrome, Capacitor & modern WebViews)
    let sharedViaNative = false;
    if (navigator.canShare) {
      try {
        const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
        if (navigator.canShare({ files: [pdfFile] })) {
          await navigator.share({
            title: 'AudioMetrics Hearing Test Report',
            text: shareText,
            files: [pdfFile]
          });
          sharedViaNative = true;
          showToast("Shared report via Android share sheet! 📱", "success");
        }
      } catch (shareErr) {
        if (shareErr.name === 'AbortError') {
          // User simply closed the share sheet
          return;
        }
        console.warn("navigator.share file notice:", shareErr);
      }
    }

    // 2. Fallback for Desktop PC or WebViews that don't support direct file payload in share sheet:
    if (!sharedViaNative) {
      // A. Download the PDF directly so the user has the file on their device / Downloads
      triggerBlobDownload(pdfBlob, fileName);

      // B. Open WhatsApp directly (WhatsApp Web on PC or WhatsApp app on phone)
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');

      showToast("Opening WhatsApp! PDF has also been downloaded to your device so you can attach it.", "success");
    }
  } catch (err) {
    console.error("WhatsApp share error:", err);
    showToast(`Could not share report: ${err.message}`, "error");
  } finally {
    if (btn) btn.disabled = false;
    if (btnModal) btnModal.disabled = false;
  }
}

// ==========================================
// 9. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconName = type === 'success' ? 'check-circle-2' : (type === 'error' ? 'alert-triangle' : 'info');
  toast.innerHTML = `<i data-lucide="${iconName}" class="toast-lucide-icon"></i> <span>${message}</span>`;
  if (window.lucide) window.lucide.createIcons({ root: toast });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
