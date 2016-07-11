import selectElemText from './select-elem-text';

function copySelectedText() {
  try {
    return document.execCommand('copy');
  } catch (err) {
    return false;
  }
}

export default function copyToClipboard(text) {
  let fakeElem = document.createElement('textarea');
  fakeElem.value = text;
  fakeElem.setAttribute('readonly', '');
  fakeElem.style.border = '0';
  fakeElem.style.padding = '0';
  fakeElem.style.margin = '0';

  // Move fakeElem out of screen
  let isRightToLeft = document.documentElement.getAttribute('dir') === 'rtl';
  fakeElem.style.position = 'absolute';
  fakeElem.style[isRightToLeft ? 'right' : 'left'] = '-9999px';
  fakeElem.style.top =
    `${window.pageYOffset || document.documentElement.scrollTop}px`;

  document.body.appendChild(fakeElem);
  selectElemText(fakeElem);
  let isSucceeded = copySelectedText();
  document.body.removeChild(fakeElem);

  return isSucceeded;
}
