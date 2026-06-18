export default async function onRequest({request, env}) {
  const {id} = await request.json()
  await env.DB.prepare('DELETE FROM resources WHERE id=?').bind(id).run()
  return new Response(JSON.stringify({success:true}),{headers:{"Content-Type":"application/json"}})
}