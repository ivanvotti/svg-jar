export default {
  assets: [
    {
      svg: {
        content:
          '<path d="M2 5.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L2.853 5z"/>',
        attrs: {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      compressedSvg: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L2.853 5z"/></svg>',
      originalSvg:
        '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n  <path d="M2 5.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L2.853 5z"/>\n</svg>\n',
      width: 16,
      height: 16,
      fileName: 'arrow-down.svg',
      fileDir: 'images',
      fileSize: '0.18 KB',
      optimizedFileSize: '0.18 KB',
      baseSize: '16px',
      fullBaseSize: '16x16px',
      copypasta: '{{svg-jar "arrow-down"}}',
      strategy: 'inline'
    }
  ],
  details: [
    { name: 'File name', key: 'fileName' },
    { name: 'Directory', key: 'fileDir' },
    { name: 'Base size', key: 'fullBaseSize' },
    { name: 'Original file size', key: 'fileSize' },
    { name: 'Optimized file size', key: 'optimizedFileSize' },
    { name: 'Strategy', key: 'strategy' }
  ],
  searchKeys: ['fileName', 'fileDir'],
  sortBy: [
    { name: 'File name', key: 'fileName' },
    { name: 'Base size', key: 'height' }
  ],
  arrangeBy: [
    { name: 'Directory', key: 'fileDir' },
    { name: 'Base size', key: 'baseSize' }
  ],
  filters: [
    {
      name: 'Directory',
      key: 'fileDir',
      items: [{ name: 'images', count: 1 }]
    },
    {
      name: 'Base size',
      key: 'baseSize',
      items: [{ name: '16px', count: 1 }]
    }
  ],
  links: [
    {
      text: 'Configuration',
      url:
        'https://github.com/ivanvotti/ember-svg-jar/blob/master/docs/configuration.md'
    },
    {
      text: 'Contribute',
      url: 'https://github.com/ivanvotti/ember-svg-jar'
    },
    { text: 'About', url: 'https://svgjar.firebaseapp.com' }
  ]
};
