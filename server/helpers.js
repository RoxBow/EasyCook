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
  }
  return s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4()
}

module.exports = { getExtFromMime, randomId };
