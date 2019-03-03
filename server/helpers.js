const getExtFromMime = ext => {
  switch (ext) {
    case 'image/jpeg':
      return 'jpeg';
    case 'image/png':
      return 'png';
    case 'image/jpg':
      return 'jpg';

    default:
      break;
  }
};

const randomId = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4();
};

const addOrRemoveInArray = (array, value) => {
  var index = array.indexOf(value);

  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
};

module.exports = { getExtFromMime, randomId, addOrRemoveInArray };
