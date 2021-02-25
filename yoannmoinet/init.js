(function() {
  function releaseAll() {
    _maldivesKeyEvent('keyup', '{arrowup}');
    _maldivesKeyEvent('keyup', '{arrowdown}');
    _maldivesKeyEvent('keyup', '{arrowleft}');
    _maldivesKeyEvent('keyup', '{arrowright}');
  }

  // let isMoved = false;
  let prevDir = '';
  let isKeyDown = { };

  let gamepadShown = false;

  let gamepadArea = document.createElement('div');
  let joystickArea = document.createElement('div');
  let buttonArea = document.createElement('div');

  let gamepadButtons = [];

  let toggleButton = document.createElement('button');

  gamepadArea.id = 'gamepad-area';
  joystickArea.id = 'joystick-area';
  buttonArea.id = 'button-area';

  gamepadArea.appendChild(joystickArea);
  gamepadArea.appendChild(buttonArea);
  window.maldivesTouchLayer.appendChild(gamepadArea);

  // append <button id="toggle-gamepad"></button>
  toggleButton.id = 'toggle-gamepad';
  toggleButton.innerText = '+';
  toggleButton.ontouchstart = function(e) {
    gamepadShown = !gamepadShown;
    if(gamepadShown) {
      _maldivesShowGamepad();
    }
    else {
      _maldivesHideGamepad();
    }
    e.stopPropagation();
  };
  window.maldivesTouchLayer.appendChild(toggleButton);

  const joystickManager = nipplejs.create({
    zone: joystickArea,
    color: '#3e9694',
    size: 150,
    multitouch: true,
    threshold: 0.33,
    mode: 'static',
    position: { left: '100px', bottom: '100px' }
  });

  gamepadArea.classList.add('gamepad-hidden');

  joystickManager.on('start', function(evt, data) {
    // isMoved = false;
  });

  joystickManager.on('dir:up dir:down dir:left dir:right', function(evt, data) {
    releaseAll();
    _maldivesKeyEvent('keydown', `{arrow${evt.type.substr(4)}}`);
    // isMoved = true;
  });

  joystickManager.on('end', function(evt, data) {
    releaseAll();
    /* if(!isMoved) {
      _maldivesKeyEvent('keydown', 'Z');
      setTimeout(function() {
        _maldivesKeyEvent('keyup', 'Z');
      }, 100);
    } */
  });

  for(let i = 0; i < 4; i++) {
    const btn = document.createElement('button');
    btn.classList.add('gamepad-button');
    btn.dataset.no = i;
    btn.innerText = _maldivesGamepadKeys[i];

    if(_maldivesGamepadKeys[i].startsWith('{')) {
      const matchData = _maldivesGamepadKeys[i].match(/{(.+?)(left|right)?}/);

      btn.innerText = '';
      if(matchData[2]) {
        btn.innerText = `${matchData[2][0].toUpperCase()}${matchData[2].substring(1)} `;
      }
      btn.innerText += `${matchData[1][0].toUpperCase()}${matchData[1].substring(1)}`;
    }

    btn.ontouchstart = function(e) {
      const btnNo = e.target.dataset.no;
      _maldivesKeyEvent('keydown', _maldivesGamepadKeys[btnNo]);
      e.target.classList.add('active');
      e.stopPropagation();
    };

    btn.ontouchend = function(e) {
      const btnNo = e.target.dataset.no;
      _maldivesKeyEvent('keyup', _maldivesGamepadKeys[btnNo]);
      e.target.classList.remove('active');
      e.stopPropagation();
    };

    buttonArea.appendChild(btn);
    gamepadButtons.push(btn);
  }

  window._maldivesShowGamepad = function() {
    if('undefined' !== typeof _maldivesHideKeyboard) _maldivesHideKeyboard();
    toggleButton.innerText = '-';
    gamepadArea.classList.remove('gamepad-hidden');
    window.maldivesTouchLayer.addEventListener('touchstart', propStopper);
    window.maldivesTouchLayer.addEventListener('click', propStopper);
    window.maldivesTouchLayer.addEventListener('pointerdown', propStopper);
    window.maldivesTouchLayer.addEventListener('mousedown', propStopper);
  };
  window._maldivesHideGamepad = function() {
    toggleButton.innerText = '+';
    gamepadArea.classList.add('gamepad-hidden');
    window.maldivesTouchLayer.removeEventListener('touchstart', propStopper);
    window.maldivesTouchLayer.removeEventListener('click', propStopper);
    window.maldivesTouchLayer.removeEventListener('pointerdown', propStopper);
    window.maldivesTouchLayer.removeEventListener('mousedown', propStopper);
  };
})();