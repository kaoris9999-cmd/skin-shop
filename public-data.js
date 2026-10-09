/* Pure allowlist projections. Raw admin records must never be served as public data. */
(function(root){
  'use strict';
  const record=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const text=value=>typeof value==='string'?value.trim():'';
  function safeUrl(value){
    if(!text(value))return '';
    try{const url=new URL(value.trim());return ['https:','http:'].includes(url.protocol)&&url.hostname&&!url.username&&!url.password?url.href:'';}catch(_){return '';}
  }
  function projectProduct(value){
    if(!record(value)||value.homepageVisible!==true||value.trashed===true)return null;
    const name=text(value.name),link=safeUrl(value.link);
    const images=Array.isArray(value.images)?value.images.map(safeUrl).filter(Boolean).slice(0,3):[];
    if(!name||!link||!images.length)return null;
    return {name,label:text(value.label),desc:text(value.desc),link,images,sortOrder:Number.isFinite(Number(value.sortOrder))?Number(value.sortOrder):1000};
  }
  function projectMusic(value){
    if(!record(value))return null;
    const title=text(value.title),fileUrl=safeUrl(value.fileUrl);
    if(!title||!fileUrl)return null;
    const result={title,fileUrl,date:Number.isFinite(Number(value.date))?Number(value.date):0};
    if(typeof value.order==='number'&&Number.isFinite(value.order)&&value.order>=0)result.order=value.order;
    return result;
  }
  const api=Object.freeze({projectProduct,projectMusic});
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.SkinPublicData=api;
})(typeof window==='undefined'?null:window);
