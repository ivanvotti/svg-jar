/* eslint-disable wrap-iife, strict, no-restricted-globals, no-undef */

(function() {
  function vendorModule() {
    'use strict';

    return {
      default: { saveAs: self.saveAs },
      saveAs: self.saveAs,
      __esModule: true
    };
  }

  define('file-saver', [], vendorModule);
})();
