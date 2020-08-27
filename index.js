const alfy = require('alfy');

let data
let cacheData = alfy.cache.get('data')

if (cacheData) {
  data = JSON.parse(cacheData)
} else {
  data = await alfy.fetch('https://www.v2ex.com/api/topics/hot.json')
  alfy.cache.set('data', JSON.stringify(data), {maxAge: 21600000})
}
const items = alfy.inputMatches(data, 'title').map(element => ({
  title: element.title,
  subtitle: `${element.node.title} - @${element.member.username}`,
  arg: element.url
}))

alfy.output(items)
