export default function selectElemText(elem) {
  let selectedText;

  if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') {
    elem.focus();
    elem.setSelectionRange(0, elem.value.length);

    selectedText = elem.value;
  } else {
    if (elem.hasAttribute('contenteditable')) {
      elem.focus();
    }

    let selection = window.getSelection();
    let range = document.createRange();

    range.selectNodeContents(elem);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}
