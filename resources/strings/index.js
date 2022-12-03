const EN = require('./en');
const AR = require('./ar');

const LANGS = {
  EN: 'en',
  AR: 'ar'
}

function fillTemplateArgs(str, templatData) {
  if(!str || !templatData) 
    return;
  let param = null;
  
  for(param in templatData)
    str = str.replace(`\${${param}}`, templatData[param] || '');
  
  str = str.replace(/\${.*}/g, '');
  
  return str;
}

let StrRes = (id, lang, templatData) => {
  let ret = lang === LANGS.AR ? AR[id] : EN[id];

  if(!ret) 
    ret = EN[id] || AR[id];

  if(templatData) 
    ret = fillTemplateArgs(ret, templatData);
  
  return ret;
};

module.exports = {
  LANGS,
  StrRes,
  fillTemplateArgs
}
