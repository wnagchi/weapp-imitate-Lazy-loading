let  getImages=(arr,obj)=>{
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i][0] == "object") {
        getImages(arr[i], obj)
    } else {
      arr[i].clas = 'product_image';
      arr[i].uid = 'pad' + obj.data.productNum;
      obj.setData({ productNum: obj.data.productNum + 1 })
    }
  }
}

let getImagesHeight=(arr,obj)=>{
 
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i][0] == "object") {
        getImagesHeight(arr[i], obj)
    } else {
      if (arr[i].uid) {
          console.log(arr[i].uid)
        let text = "#" + arr[i].uid;     
        let query = wx.createSelectorQuery();
        query.select(text).boundingClientRect()
        query.exec(function (res) {
            console.log(res)
          if (res[0] != null) {
            arr[i].offHeight = res[0].top;
            arr[i].addHeight = res[0].height
          }
        })
      }

    }
  }
}


let getNewImage=(listName,obj)=>{
    
  const that = obj;
   
  let arr = [];
  for (let i in listName) {
    arr.push(that.data[listName[i]])
  }
  console.log(arr)
  that.setData({ productNum: 0, listName: listName });
  
  let getImg = getImages(arr,that);
    
  for (let i = 0, len = arr.length; i < len; i++) {
      that.setData({ [listName[i]]: arr[i] })
  }

  let imgHeigth =getImagesHeight(arr, that)

  for (let i = 0, len = arr.length; i < len; i++) {
      that.setData({ [listName[i]]: arr[i] })
  }
}

let imgs = (arr, e, that, offTop)=>{
    const listName = that.data.listName;
    //console.log(offTop)
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i][0] == "object") {
            imgs(arr[i], e, that, offTop);
        } else {
            //console.log((e.detail.scrollTop + that.data.scrollHeight - offTop), arr[i].offHeight-arr[i].addHeight)
            // console.log(
            //   "e.detail.scrollTop:"+e.detail.scrollTop+"\n",
            //   "that.data.scrollHeight:"+that.data.scrollHeight+"\n",
            //   "offTop:"+offTop+"\n",
            //   "arr[i].addHeight:"+arr[i].addHeight+"\n",
            //   "arr[i].offHeight"+arr[i].offHeight+"\n",
            //   "i:"+i,
            //   )
              //console.log((e.detail.scrollTop +e.detail.scrollHeight - offTop) >= (arr[i].offHeight - arr[i].addHeight))
            if ((e.detail.scrollTop + that.data.scrollHeight - offTop) >= arr[i].offHeight - arr[i].addHeight) {
               // console.log(i)
               if(e.isInit==true){
                 if(i==0){
                  arr[i].clas = 'product_image loaded';
                 }else{
                  setTimeout(()=>{
                    //console.log(i)
                    arr[i].clas = 'product_image loaded';
                    for (let i = 0, len = arr.length; i < len; i++) {
                      that.setData({ [listName[i]]: arr })
                    }
                  },i*100)
                 }
                
               }else{
                arr[i].clas = 'product_image loaded';
               }
                
            }
            // else{
            //   arr[i].clas = 'product_image';
            // }
        }
    }
    
}

let imageShow3=(e,obj,offTop=0)=>{
  const that = obj;
  const offT = offTop
  const listName = that.data.listName;
  //console.log(listName)
  let arr = [];
    //console.log(typeof e,that.data.scrollHeight)
  if (typeof e == "number"){
      e={
          detail:{
              scrollTop:e,
              scrollHeight:that.data.scrollHeight,
              
          },
          isInit:true,//通知为初始化内容
      }
  }
  for (let i in listName) {
    arr.push(that.data[listName[i]])
  }
    //console.log(offTop)
  let ims = imgs(arr, e, that, offT);
  for (let i = 0, len = arr.length; i < len; i++) {
    that.setData({ [listName[i]]: arr[i] })
  }
}


module.exports = {
  getNewImage: getNewImage,
  imageShow3: imageShow3
};


