import moment from 'moment';

const source = {
  order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  days: {
    Monday: {
      start: 10,
      end: 19.5,
    },
    Tuesday: {
      start: 10.75,
      end: 23.5,
    },
    Wednesday: {
      start: 10.75,
      end: 23.5,
    },
    Thursday: {
      start: 10.75,
      end: 23.5,
    },
    Saturday: {
      start: 9,
      end: 18,
    },
    Sunday: {
      start: 9,
      end: 18,
    },
  },
};
const source2 = {
  order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  days: {
    Monday: {
      start: 9,
      end: 18.35,
    },
    Tuesday: {
      start: 10,
      end: 19.2,
    },
    Wednesday: {
      start: 9,
      end: 18.35,
    },
    Thursday: {
      start: 10,
      end: 19.2,
    },
    Saturday: {
      start: 10,
      end: 19.2,
    },
    Sunday: {
      start: 10,
      end: 19.2,
    },
  },
};
const source3 = {
  order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  days: {
    Monday: {
      start: 7.5,
      end: 18.5,
    },
    Tuesday: {
      start: 7.5,
      end: 18.5,
    },
    Saturday: {
      start: 7.5,
      end: 18.5,
    },
    Sunday: {
      start: 9,
      end: 18,
    },
  },
};

const day = (d) => moment(d, 'dddd').format('ddd');

const decimal = (time) => moment().startOf('d').add(time, 'h');

const interval = ({ start, end }) => {
  const f = 'h:mm A';
  return `${decimal(start).format(f)} - ${decimal(end).format(f)}`;
};

const toHTML = (item) => `<li>${item}</li>`;

const append = (html, index) => {
  // console.log(html);
  // document.querySelector(`#box${index + 1} ul`).innerHTML = html;
};

const filter = (item) => !!item;

function format({ time, names }) {
  if (names.length === 1) {
    return `${day(names[0])}: ${time}`;
  }
  return `${day(names[0])} - ${day(names[names.length - 1])}: ${time}`;
}

function toIntervals({ days, order }) {
  let key = 0;
  let prev;

  return order.reduce((el, d) => {
    const group = el;
    if (!days[d]) {
      key += 1;
      return group;
    }

    const time = interval(days[d]);

    if (prev !== time) {
      key += 1;
      prev = time;
    }

    if (!group[key]) {
      group[key] = { names: [], time };
    }

    group[key].names.push(d);

    return group;
  }, []);
}

const convert = (src) => toIntervals(src)
  .filter(filter)
  .map(format)
  .map(toHTML)
  .join(' ');

[source, source2, source3]
  .map(convert)
  .forEach(append);
