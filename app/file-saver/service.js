import Service from '@ember/service';
import { saveAs } from 'file-saver';

export default Service.extend({
  saveAs,

  saveSVG(svgContent, fileName) {
    let svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    this.saveAs(svgBlob, fileName);
  }
});
