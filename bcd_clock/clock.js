const BinaryClock = {
  initialize: function() {
    let timeArr;
    setInterval(() => {
        timeArr = this.buildTimeArray();
        this.buildClock(timeArr);
    }, 5);
  },

  buildClock: function(timeArray) {
    let intArray, value;
    // Loop over the columns, (hours, minutes, seconds)
    for (let i in timeArray) {
      value = this.convertToBinary(timeArray[i]);
      intArray = value.split('').reverse();
      // Loop over the values of hours and minutes, and seconds
      for(let si = 0; si < 4; si++) {
        this.renderDots(i, si, intArray[si]);
      }
    }
  },

  buildTimeArray: function() {
    const now = new Date();
    let h = BinaryClock.convertToArray(now.getHours()),
        m = BinaryClock.convertToArray(now.getMinutes()),
        s = BinaryClock.convertToArray(now.getSeconds());
    return h.concat(m).concat(s);
  },

  convertToBinary: (x) => parseInt(x).toString(2),

  convertToArray: (x) => BinaryClock.pad(x.toString()).split(''),

  pad: (x) => (`0000${x}`).slice(-2),

  renderDots: function (index, subindex, value) {
    let el = document.querySelector(`[data-index="${index}"] [data-subindex="${subindex}"`);
    if (value === '1') {
      el.classList.remove('off');
    } else if (!!el) {
      el.classList.add('off');
    }
  },

};

if (document !== undefined) { BinaryClock.initialize(); }
