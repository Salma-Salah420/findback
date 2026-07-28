/**
 * Flat translation dictionaries. Keys are dot-namespaced so they can later be
 * split into per-route JSON files or swapped for a full i18n runtime without
 * touching component code.
 */

export const locales = ["en", "ar"] as const
export type Locale = (typeof locales)[number]

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
}

const en = {
  "brand.name": "FindBack",
  "brand.tagline": "Lost & Found, reunited.",

  "nav.browse": "Browse reports",
  "nav.missingChildren": "Missing children",
  "nav.howItWorks": "How it works",
  "nav.dashboard": "Dashboard",
  "nav.login": "Log in",
  "nav.register": "Get started",
  "nav.report": "Create report",
  "nav.menu": "Open menu",

  "hero.eyebrow": "Trusted by 40+ communities",
  "hero.title": "Find What Matters",
  "hero.description":
    "FindBack connects the people who lost something with the people who found it. Post a report in under a minute, let our matching engine scan every listing nearby, and get reunited safely.",
  "hero.ctaLost": "Report Lost Item",
  "hero.ctaFound": "Report Found Item",
  "hero.trust": "Free to use · Verified members · Your contact details stay private",

  "stats.recovered": "Items recovered",
  "stats.active": "Active reports",
  "stats.users": "Registered members",
  "stats.cities": "Cities covered",

  "how.eyebrow": "How it works",
  "how.title": "Three steps to a reunion",
  "how.description":
    "Whether you lost a passport or found a set of keys on the pavement, the flow is the same.",
  "how.step1.title": "Create a report",
  "how.step1.body":
    "Describe the item, add photos, and pin where it was last seen. It takes about a minute.",
  "how.step2.title": "Search for matches",
  "how.step2.body":
    "Smart Match compares your report against every nearby listing and surfaces likely candidates.",
  "how.step3.title": "Recover your item",
  "how.step3.body":
    "Message the other party through FindBack and arrange a safe handover in a public place.",

  "home.recent.eyebrow": "Latest listings",
  "home.recent.title": "Recently reported near you",
  "home.recent.description":
    "The newest lost and found reports posted by the community in the last few days.",

  "categories.eyebrow": "Categories",
  "categories.title": "What are you looking for?",
  "categories.description": "Jump straight into the listings that matter to you.",
  "categories.electronics": "Electronics",
  "categories.documents": "Documents",
  "categories.bags": "Bags & luggage",
  "categories.pets": "Pets",
  "categories.children": "Missing children",
  "categories.jewelry": "Jewelry",
  "categories.other": "Other",
  "categories.reports": "reports",
  "categories.viewAll": "View all categories",

  "testimonials.eyebrow": "Stories",
  "testimonials.title": "Reunions that actually happened",
  "testimonials.description":
    "A few of the thousands of handovers arranged through FindBack.",

  "smartMatch.badge": "Smart Match",
  "smartMatch.title": "Possible matches found by AI",
  "smartMatch.description":
    "Our matching engine compares photos, descriptions, dates, and locations to rank the listings most likely to be yours.",
  "smartMatch.confidence": "match confidence",
  "smartMatch.review": "Review match",
  "smartMatch.soon": "Preview feature",

  "reports.title": "Browse reports",
  "reports.description":
    "Every lost and found listing in your area, updated continuously.",
  "reports.searchPlaceholder": "Search by keyword, brand, or landmark",
  "reports.search": "Search",
  "reports.filters": "Filters",
  "reports.clear": "Clear all",
  "reports.type": "Report type",
  "reports.category": "Category",
  "reports.city": "City",
  "reports.date": "Date posted",
  "reports.sort": "Sort by",
  "reports.all": "All",
  "reports.resultsOne": "report found",
  "reports.resultsMany": "reports found",
  "reports.empty.title": "No reports match your filters",
  "reports.empty.body":
    "Try widening the date range or clearing a filter or two. New reports arrive every hour.",
  "reports.error.title": "We couldn't load reports",
  "reports.error.body": "Something went wrong on our side. Please try again.",
  "reports.retry": "Try again",
  "reports.viewDetails": "View details",

  "reportType.lost": "Lost",
  "reportType.found": "Found",
  "reportType.missing_child": "Missing child",

  "status.active": "Active",
  "status.matched": "Match found",
  "status.resolved": "Recovered",
  "status.closed": "Closed",

  "sort.newest": "Newest first",
  "sort.oldest": "Oldest first",
  "sort.relevance": "Most relevant",

  "date.any": "Any time",
  "date.24h": "Last 24 hours",
  "date.7d": "Last 7 days",
  "date.30d": "Last 30 days",

  "detail.back": "Back to reports",
  "detail.description": "Description",
  "detail.details": "Report details",
  "detail.location": "Last seen location",
  "detail.date": "Date",
  "detail.posted": "Posted",
  "detail.category": "Category",
  "detail.reference": "Reference",
  "detail.reward": "Reward offered",
  "detail.mapPlaceholder": "Map preview",
  "detail.owner": "Posted by",
  "detail.verified": "Verified member",
  "detail.memberSince": "Member since",
  "detail.reportsCount": "reports posted",
  "detail.contact": "Contact poster",
  "detail.contactHint":
    "Never send money in advance. Meet in a public place and bring a friend if you can.",
  "detail.share": "Share",
  "detail.save": "Save",
  "detail.similar": "Similar reports",
  "detail.similarDescription": "Other listings that share this category or city.",
  "detail.emergency": "Contact emergency line",
  "detail.notFound": "Report not found",

  "footer.description":
    "FindBack is a community-run Lost & Found platform. Report an item, help a neighbour, and get things back where they belong.",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.about": "About us",
  "footer.contact": "Contact",
  "footer.careers": "Careers",
  "footer.privacy": "Privacy policy",
  "footer.terms": "Terms of service",
  "footer.safety": "Safety guidelines",
  "footer.rights": "All rights reserved.",

  "common.loading": "Loading",
  "common.language": "Language",
} as const

export type TranslationKey = keyof typeof en

const ar: Record<TranslationKey, string> = {
  "brand.name": "فايند باك",
  "brand.tagline": "المفقودات والموجودات، معًا من جديد.",

  "nav.browse": "تصفح التقارير",
  "nav.missingChildren": "الأطفال المفقودون",
  "nav.howItWorks": "كيف يعمل",
  "nav.dashboard": "لوحة التحكم",
  "nav.login": "تسجيل الدخول",
  "nav.register": "ابدأ الآن",
  "nav.report": "إنشاء تقرير",
  "nav.menu": "فتح القائمة",

  "hero.eyebrow": "موثوق من أكثر من ٤٠ مجتمعًا",
  "hero.title": "اعثر على ما يهمك",
  "hero.description":
    "يربط فايند باك بين من فقد شيئًا ومن وجده. أنشئ تقريرًا في أقل من دقيقة، ودع محرك المطابقة يفحص كل الإعلانات القريبة، ثم استعد ما فقدته بأمان.",
  "hero.ctaLost": "الإبلاغ عن مفقود",
  "hero.ctaFound": "الإبلاغ عن موجود",
  "hero.trust": "مجاني · أعضاء موثوقون · بيانات اتصالك تبقى خاصة",

  "stats.recovered": "عنصرًا تم استرجاعه",
  "stats.active": "تقرير نشط",
  "stats.users": "عضو مسجل",
  "stats.cities": "مدينة مشمولة",

  "how.eyebrow": "كيف يعمل",
  "how.title": "ثلاث خطوات لاستعادة ما فقدته",
  "how.description":
    "سواء فقدت جواز سفر أو وجدت مجموعة مفاتيح على الرصيف، فالخطوات واحدة.",
  "how.step1.title": "أنشئ تقريرًا",
  "how.step1.body": "اوصف العنصر، أضف الصور، وحدد آخر مكان شوهد فيه. الأمر يستغرق دقيقة.",
  "how.step2.title": "ابحث عن تطابق",
  "how.step2.body":
    "تقارن المطابقة الذكية تقريرك بكل الإعلانات القريبة وتعرض الأقرب احتمالًا.",
  "how.step3.title": "استعد عنصرك",
  "how.step3.body":
    "تواصل مع الطرف الآخر عبر فايند باك ورتب التسليم في مكان عام آمن.",

  "home.recent.eyebrow": "أحدث الإعلانات",
  "home.recent.title": "أُبلغ عنها حديثًا قريبًا منك",
  "home.recent.description":
    "أحدث تقارير المفقودات والموجودات التي نشرها المجتمع في الأيام الماضية.",

  "categories.eyebrow": "الفئات",
  "categories.title": "عمّا تبحث؟",
  "categories.description": "انتقل مباشرة إلى الإعلانات التي تهمك.",
  "categories.electronics": "إلكترونيات",
  "categories.documents": "مستندات",
  "categories.bags": "حقائب وأمتعة",
  "categories.pets": "حيوانات أليفة",
  "categories.children": "أطفال مفقودون",
  "categories.jewelry": "مجوهرات",
  "categories.other": "أخرى",
  "categories.reports": "تقرير",
  "categories.viewAll": "عرض كل الفئات",

  "testimonials.eyebrow": "قصص",
  "testimonials.title": "لقاءات حدثت بالفعل",
  "testimonials.description": "بعض من آلاف عمليات التسليم التي رتبها فايند باك.",

  "smartMatch.badge": "المطابقة الذكية",
  "smartMatch.title": "تطابقات محتملة عبر الذكاء الاصطناعي",
  "smartMatch.description":
    "يقارن محرك المطابقة الصور والأوصاف والتواريخ والمواقع لترتيب الإعلانات الأقرب لأن تكون لك.",
  "smartMatch.confidence": "نسبة التطابق",
  "smartMatch.review": "مراجعة التطابق",
  "smartMatch.soon": "ميزة تجريبية",

  "reports.title": "تصفح التقارير",
  "reports.description": "كل تقارير المفقودات والموجودات في منطقتك، محدثة باستمرار.",
  "reports.searchPlaceholder": "ابحث بكلمة مفتاحية أو ماركة أو معلم",
  "reports.search": "بحث",
  "reports.filters": "الفلاتر",
  "reports.clear": "مسح الكل",
  "reports.type": "نوع التقرير",
  "reports.category": "الفئة",
  "reports.city": "المدينة",
  "reports.date": "تاريخ النشر",
  "reports.sort": "ترتيب حسب",
  "reports.all": "الكل",
  "reports.resultsOne": "تقرير",
  "reports.resultsMany": "تقرير",
  "reports.empty.title": "لا توجد تقارير مطابقة",
  "reports.empty.body":
    "جرب توسيع النطاق الزمني أو إزالة بعض الفلاتر. تُنشر تقارير جديدة كل ساعة.",
  "reports.error.title": "لم نتمكن من تحميل التقارير",
  "reports.error.body": "حدث خطأ من جانبنا. حاول مرة أخرى.",
  "reports.retry": "إعادة المحاولة",
  "reports.viewDetails": "عرض التفاصيل",

  "reportType.lost": "مفقود",
  "reportType.found": "موجود",
  "reportType.missing_child": "طفل مفقود",

  "status.active": "نشط",
  "status.matched": "تم إيجاد تطابق",
  "status.resolved": "تم الاسترجاع",
  "status.closed": "مغلق",

  "sort.newest": "الأحدث أولًا",
  "sort.oldest": "الأقدم أولًا",
  "sort.relevance": "الأكثر صلة",

  "date.any": "أي وقت",
  "date.24h": "آخر ٢٤ ساعة",
  "date.7d": "آخر ٧ أيام",
  "date.30d": "آخر ٣٠ يومًا",

  "detail.back": "العودة إلى التقارير",
  "detail.description": "الوصف",
  "detail.details": "تفاصيل التقرير",
  "detail.location": "آخر موقع",
  "detail.date": "التاريخ",
  "detail.posted": "تاريخ النشر",
  "detail.category": "الفئة",
  "detail.reference": "الرقم المرجعي",
  "detail.reward": "مكافأة معروضة",
  "detail.mapPlaceholder": "معاينة الخريطة",
  "detail.owner": "نشر بواسطة",
  "detail.verified": "عضو موثوق",
  "detail.memberSince": "عضو منذ",
  "detail.reportsCount": "تقرير منشور",
  "detail.contact": "تواصل مع الناشر",
  "detail.contactHint":
    "لا ترسل أي مبالغ مقدمًا. التقِ في مكان عام واصطحب صديقًا إن أمكن.",
  "detail.share": "مشاركة",
  "detail.save": "حفظ",
  "detail.similar": "تقارير مشابهة",
  "detail.similarDescription": "إعلانات أخرى تشترك في الفئة أو المدينة.",
  "detail.emergency": "الاتصال بخط الطوارئ",
  "detail.notFound": "التقرير غير موجود",

  "footer.description":
    "فايند باك منصة مجتمعية للمفقودات والموجودات. أبلغ عن عنصر، وساعد جارك، وأعد الأشياء إلى أصحابها.",
  "footer.product": "المنتج",
  "footer.company": "الشركة",
  "footer.legal": "قانوني",
  "footer.about": "من نحن",
  "footer.contact": "تواصل معنا",
  "footer.careers": "الوظائف",
  "footer.privacy": "سياسة الخصوصية",
  "footer.terms": "شروط الخدمة",
  "footer.safety": "إرشادات السلامة",
  "footer.rights": "جميع الحقوق محفوظة.",

  "common.loading": "جارٍ التحميل",
  "common.language": "اللغة",
}

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  ar,
}
