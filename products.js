/*
  عدّل المنتجات من هنا بسهولة:
  - category: cars أو workshops أو restaurants
  - name: اسم المنتج
  - price: السعر
  - image: مسار الصورة. ضع صورك داخل assets/store/ واكتب المسار هنا
  - desc: وصف قصير
*/
const STORE_PRODUCTS = [
  {category:'cars', name:'BMW M5 Competition', price:'450 EGP', image:'assets/store/car-1.svg', desc:'عربية رياضية فخمة مناسبة للمدينة.'},
  {category:'cars', name:'Mercedes G63 AMG', price:'520 EGP', image:'assets/store/car-2.svg', desc:'SUV قوي وحضور فاخر داخل الرول بلاي.'},
  {category:'cars', name:'Dodge Charger SRT', price:'390 EGP', image:'assets/store/car-3.svg', desc:'أداء هجومي وشكل مميز.'},
  {category:'workshops', name:'ورشة Diamond Customs', price:'1200 EGP', image:'assets/store/workshop-1.svg', desc:'ورشة كاملة مع هوية ومكان مميز.'},
  {category:'workshops', name:'ورشة Ivory Tuning', price:'950 EGP', image:'assets/store/workshop-2.svg', desc:'مشروع ميكانيكي جاهز للتشغيل.'},
  {category:'workshops', name:'ورشة Street Garage', price:'800 EGP', image:'assets/store/workshop-3.svg', desc:'بداية قوية لصاحب مشروع جديد.'},
  {category:'restaurants', name:'مطعم Ivory Burger', price:'850 EGP', image:'assets/store/restaurant-1.svg', desc:'مطعم ببراند خاص ومنيو قابل للتعديل.'},
  {category:'restaurants', name:'مطعم Pizza House', price:'780 EGP', image:'assets/store/restaurant-2.svg', desc:'مطعم اجتماعي مناسب للفعاليات.'},
  {category:'restaurants', name:'كافيه Royal Beans', price:'690 EGP', image:'assets/store/restaurant-3.svg', desc:'كافيه راقي للاجتماعات والقصص.'}
];
