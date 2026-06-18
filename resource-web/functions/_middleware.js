export async function onRequest({request, env, next}) {
  const auth = request.headers.get('Authorization')
  if(!auth || !auth.startsWith('Bearer ')) return new Response('无权访问',{status:401})
  return next()
}