export default async function onRequest({request, env}) {
  const {title,category,description,cover,file_url} = await request.json()
  await env.DB.prepare(`INSERT INTO resources (title,category,description,cover,file_url) VALUES (?,?,?,?,?)`)
  .bind(title,category,description,cover,file_url).run()
  return new Response(JSON.stringify({success:true}),{headers:{"Content-Type":"application/json"}})
}