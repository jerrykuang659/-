export default async function onRequest({env}) {
  const db = env.DB
  const {results} = await db.prepare('SELECT * FROM resources ORDER BY create_time DESC').all()
  return new Response(JSON.stringify(results),{headers:{"Content-Type":"application/json"}})
}