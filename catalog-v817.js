/* Shared homepage catalog: built-in products remain editable without publishing old records. */
(function(root){
  'use strict';
  const defaults = [
  {
    "link": "https://mkt.shopping.naver.com/link/6829808d46ee00714bd1c941",
    "images": [
      "https://shop-phinf.pstatic.net/20260717_16/1784247462110fd52z_PNG/4290432937109319_1132649221.png"
    ],
    "desc": "200ml · Cleansing Care",
    "label": "CLEANSING SERUM",
    "name": "바이옴 클렌징 세럼",
    "key": "site_biome_cleansing",
    "sortOrder": 10,
    "homepageVisible": true
  },
  {
    "link": "https://mkt.shopping.naver.com/link/6829807fefd7a65d5547d1a5",
    "images": [
      "https://shop-phinf.pstatic.net/20260629_254/1782687507156FqfnG_PNG/116820342256335010_691975064.png"
    ],
    "desc": "500ml · Skin Pack",
    "label": "RELAXING SKIN PACK",
    "name": "항당겔",
    "key": "site_relaxing_gel",
    "sortOrder": 20,
    "homepageVisible": true
  },
  {
    "link": "https://mkt.shopping.naver.com/link/691a75d5a1cbbe7452e4b2cb",
    "images": [
      "https://shop-phinf.pstatic.net/20260129_246/1769643360404bnRm7_JPEG/42630213480465380_1620318322.jpg"
    ],
    "desc": "30ml · Daily Skin Care",
    "label": "POMEGRANATE CARE",
    "name": "석류탱글",
    "key": "site_pomegranate",
    "sortOrder": 30,
    "homepageVisible": true
  },
  {
    "link": "https://mkt.shopping.naver.com/link/693f638abe63905e26b001a7",
    "images": [
      "https://shop-phinf.pstatic.net/20260910_191/1789014236962034ke_JPEG/31966994191114774_650984267.jpg"
    ],
    "desc": "150ml · Scalp Care",
    "label": "SCALP SOLUTION",
    "name": "스칼프 솔루션",
    "key": "site_scalp_solution",
    "sortOrder": 40,
    "homepageVisible": true
  },
  {
    "link": "https://mkt.shopping.naver.com/link/682980df2f0ac57821773eb7",
    "images": [
      "https://shop-phinf.pstatic.net/20241012_30/1728716441174nS9Co_JPEG/8291805034102213_331207072.jpg"
    ],
    "desc": "Daily UV Care",
    "label": "SUN CARE",
    "name": "선크림",
    "key": "site_sun_care",
    "sortOrder": 50,
    "homepageVisible": true
  }
];
  const isRecord=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const validKey=key=>typeof key==='string'&&!!key&&!/[.#$\[\]\/]/.test(key);
  function safeUrl(value){
    if(typeof value!=='string'||!value.trim()) return '';
    try{const url=new URL(value.trim());return ['https:','http:'].includes(url.protocol)&&!url.username&&!url.password?url.href:'';}catch(_){return '';}
  }
  function merge(raw){
    const rows=new Map(defaults.map(item=>[item.key,{...item,images:[...item.images]}]));
    if(isRecord(raw)) Object.entries(raw).forEach(([key,value])=>{
      if(!validKey(key)||!isRecord(value)) return;
      const base=rows.get(key)||{homepageVisible:false,sortOrder:1000};
      rows.set(key,{...base,...value,key});
    });
    return [...rows.values()].sort((a,b)=>{
      const order=v=>Number.isFinite(Number(v))?Number(v):1000;
      return order(a.sortOrder)-order(b.sortOrder)||a.key.localeCompare(b.key);
    });
  }
  defaults.forEach(item=>{Object.freeze(item.images);Object.freeze(item);});
  Object.freeze(defaults);
  root.SKIN_CATALOG_DEFAULTS=defaults;
  root.SkinCatalog=Object.freeze({defaults,merge,safeUrl});
})(window);
