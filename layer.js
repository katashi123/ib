
window.maldivesTouchLayer = (function() {
  if(window.maldivesTouchLayer) {
    return window.maldivesTouchLayer;
  } else if(document.querySelector('#maldives-layer')) {
    return document.querySelector('#maldives-layer');
  } else {
    const linkStyle = document.createElement('link');
    linkStyle.setAttribute('href', 'js/plugins/layer.css');
    linkStyle.setAttribute('rel', 'stylesheet');
    linkStyle.setAttribute('type', 'text/css');
    document.head.appendChild(linkStyle);

    const layer = document.createElement('div');
    layer.id = 'maldives-layer';
    document.body.appendChild(layer);
    return layer;
  }
})();