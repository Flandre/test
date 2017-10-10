const https = require('https');
const host = 'https://baike.baidu.com'

module.export = function(res){
  return httpsGet(res, false)
}

const getText = res => {
  console.log(res)
  return res
}

const httpsGet = (item, isRedirect) => {
  let uri = ''
  if(!isRedirect){
    uri = `${host}/item/${encodeURIComponent(item)}`
  } else {
    uri = `${host}${item}`
  }

  https.get(uri, function (res) {
    switch(res.statusCode){
      case '302':
        httpsGet(res.location, true)
        break;
      default:
        getText(res)
    }
  }).on('error', function (e) {
    console.error(e);
  });
}
