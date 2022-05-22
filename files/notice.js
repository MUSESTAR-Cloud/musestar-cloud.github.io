function narn (type) {
   naranja()[type]({
   title: '新消息提示',
   text: '单击“接受”以创建新通知',
   timeout: 'keep',
   buttons: [{
   text: '接受',
   click: function (e) {
   naranja().success({
   title: '通知',
   text: '通知被接受'
  })
 }
},{
   text: '取消',
   click: function (e) {
    e.closeNotification()
   }
  }]
  })
 }