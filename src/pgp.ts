const openpgp = require('openpgp');
const b = "\r\n-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: BCPG C# v5.1.3.0\r\n\r\nmIsEWT628gEEAJPGzsdUlxSKYPs4o2a1xWViHymgNgE+7vd+HmH1XWQewpu3I4sy\r\n3XJomBe441SEWfrbF6z/4ICL3JXgUNH8Ls7O1QM3Pqx6sImqRIQQuIKiun7R6x1n\r\nMwrIU2cFtUu7UEptpWICgspopNZEZYR8u5Tp1OIatjPG9IBTHMLmCoiPAAUTtBth\r\nZ2VuY2lhLXZpcnR1YWwtY3BmbC13ZWJhcGmInAQQAQIABgUCWT7hIgAKCRD4KPZo\r\noijkWdr8A/48trmfxuaLsJ+DLOJlrxrupsvwvVVqBo7eTcSthm5w62qtOapYQ9WF\r\nixjh6qrhwlFIudEW4BKU8K2PuHY82FMOzGQsgMl57l+sz+kQFKD6v+o0dGK7oZ61\r\nqP+PnmKTTTG4SUgLpqkkebGmF6pcO3DPV9Rm2O9JiQeOrtm36KT7pg==\r\n=22pB\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n\r\n\r\n"

const f = (a: string) => {
  const b = JSON.stringify(a)
  const c = b.substr(1, b.length - 2)
    .replace(new RegExp('\\\\r', 'g'), '\r')
    .replace(new RegExp('\\\\n', 'g'), '\n')
  return btoa(c)
}

export async function encript(a: string) {
  const c = { data: a, publicKeys: openpgp.key.readArmored(b).keys }
  return await openpgp.encrypt(c).then(function(a: any) {
    return f(a.data)
  })
}