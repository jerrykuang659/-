export default async function onRequest({request, env}) {
  const {username,password} = await request.json()
  if(username==='admin' && password===env.ADMIN_PASSWORD){
    const header = btoa(JSON.stringify({alg:"HS256",typ:"JWT"}))
    const payload = btoa(JSON.stringify({exp:Date.now()+86400000}))
    const token = `${header}.${payload}.${env.JWT_SECRET.slice(0,32)}`
    return new Response(JSON.stringify({token:token}),{headers:{"Content-Type":"application/json"}})
  }
  return new Response(JSON.stringify({msg:"账号或密码错误"}),{status:401})
}