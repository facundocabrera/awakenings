/* SERIE INSECTOS */

const layers = [{
  waves: [{
      fn: classicFrequencyMapping,
      freq: 1/8,
      radius: 350
  }, {
      fn: classicFrequencyMapping,
      freq: 1/32,
      radius: 350
  }, {
      fn: classicFrequencyMapping,
      freq: 1/54,
      radius: 350
  },{
      fn: classicFrequencyMapping,
      freq: 1/16,
      radius: 350
  }],
  rotate: Math.PI / 2,
  color: '#FF550011'
}];
