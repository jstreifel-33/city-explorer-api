'use strict';

let cache = {cacheTimestamp: Date.now()};

function cacheExpireCheck (){
  //check if cache is over 1 day old
  if (Date.now() - cache.cacheTimestamp >  86400000){
    cache = {cacheTimestamp: Date.now()};
  }
}

module.exports = { cache, cacheExpireCheck};
