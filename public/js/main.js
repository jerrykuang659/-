async function loadResources(){
  const res = await fetch('/api/list')
  const list = await res.json()
  let html=''
  list.forEach(item=>{
    html+=`
    <div class="item">
      <img src="${item.cover||'https://picsum.photos/id/237/300/180'}">
      <div class="item-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="tag">${item.category}</span>
        ${item.file_url ? `<a class="download-link" href="${item.file_url}" target="_blank">立即下载</a>` : ''}
      </div>
    </div>`
  })
  document.getElementById('resource-list').innerHTML=html
}
loadResources()