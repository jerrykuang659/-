const API = '/api'

// 登录
async function login(){
  let u = document.getElementById('username').value.trim()
  let p = document.getElementById('pwd').value.trim()
  let res = await fetch(`${API}/login`,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username:u,password:p})
  })
  let data = await res.json()
  if(data.token){
    localStorage.setItem('token',data.token)
    location.href='dashboard.html'
  }else{
    alert('账号或密码错误，请重新输入')
  }
}

// 权限校验
async function checkAuth(){
  let token = localStorage.getItem('token')
  if(!token){
    location.href='index.html'
    return false
  }
  let res = await fetch(`${API}/list`,{
    headers:{Authorization:`Bearer ${token}`}
  })
  if(!res.ok) location.href='index.html'
  return true
}

// 获取资源列表
async function getList(){
  let token = localStorage.getItem('token')
  let res = await fetch(`${API}/list`,{
    headers:{Authorization:`Bearer ${token}`}
  })
  let list = await res.json()
  let html=''
  list.forEach(item=>{
    html+=`
    <tr>
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.category}</td>
      <td>✅已发布</td>
      <td>
        <button class="btn btn-red" onclick="del(${item.id})">删除</button>
      </td>
    </tr>`
  })
  document.getElementById('table-body').innerHTML=html
}

// 删除资源
async function del(id){
  if(!confirm('确定删除？删除无法恢复！'))return
  let token = localStorage.getItem('token')
  await fetch(`${API}/delete`,{
    method:'POST',
    headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
    body:JSON.stringify({id})
  })
  alert('删除成功')
  getList()
}

// 发布资源（纯外链，无文件上传）
async function submitResource(){
  let token = localStorage.getItem('token')
  let title = document.getElementById('title').value.trim()
  let category = document.getElementById('category').value
  let desc = document.getElementById('desc').value.trim()
  let cover = document.getElementById('coverUrl').value.trim()
  let file = document.getElementById('fileUrl').value.trim()
  if(!title){
    alert('请填写标题')
    return
  }
  await fetch(`${API}/add`,{
    method:'POST',
    headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
    body:JSON.stringify({title,category,description:desc,cover,file_url:file})
  })
  alert('发布成功！')
  location.href='dashboard.html'
}

// 退出登录
function logout(){
  localStorage.removeItem('token')
  location.href='index.html'
}