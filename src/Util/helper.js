import React from 'react';


export const serializeObjectToQuery = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'boolean' || obj[p] === 0 || obj[p]) {
          str.push(encodeURI(p) + '=' + encodeURI(obj[p]));
        }
      }
    }
    if (str.length) {
      return '?' + str.join('&');
    }
    return '';
  };
  