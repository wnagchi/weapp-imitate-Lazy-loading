/*
*加载效果相关js
*/


let  getImages=(arr,obj)=>{
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i][0] == "object") {
        getImages(arr[i], obj)
    } else {
        arr[i].clas = 'product_image';
        let num = Math.random();
        let date = new Date();
        date = date.getTime();//得到时间的13位毫秒数
        arr[i].uid = 'pad' + date;
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
         // console.log(arr[i].uid)
        let text = "#" + arr[i].uid;     
        let query = wx.createSelectorQuery();
        query.select(text).boundingClientRect()
        query.exec(function (res) {
          //  console.log(res)
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
  //console.log(arr)
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
            console.log((e.detail.scrollTop + that.data.scrollHeight - offTop), arr[i].offHeight-arr[i].addHeight)
            console.log(
              "e.detail.scrollTop:"+e.detail.scrollTop+"\n",
              "that.data.scrollHeight:"+that.data.scrollHeight+"\n",
              "offTop:"+offTop+"\n",
              "arr[i].addHeight:"+arr[i].addHeight+"\n",
              "arr[i].offHeight"+arr[i].offHeight+"\n",
              "i:"+i,
              )
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
            else{//是否反向隐藏
              arr[i].clas = 'product_image';
            }
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
// arr={
//     e:e,
//     arrName:'data对象名',
//     className:'class名',
//     that:this,
//     bottom:'距离下边多少时候开始出现',
//     isReverse:true/false
// }
let imgNow = (arr)=>{
    const newArr={
        e:arr.e||false,
        arrName: arr.arrName,
        className:arr.className,
        that:arr.that,
        bottom:arr.bottom||0,
        isReverse: arr.isReverse||false
    }
   
    let exploreList = newArr.that.data[newArr.arrName]
    if (!newArr.that.data.windowHeight) {
        wx.getSystemInfo({
            success: function (res) {
                newArr.that.setData({
                    windowHeight: res.windowHeight
                })
            },
        });
    }
    let windowHeight = newArr.that.data.windowHeight
    wx.createSelectorQuery().selectAll('.' + newArr.className).boundingClientRect((ret) => {
        ret.forEach((item, index) => {
            if (item.top <= windowHeight - newArr.bottom) {
                if (!newArr.e){
                    //debugger
                    setTimeout(()=>{
                        exploreList[index].isOpa = true;
                        newArr.that.setData({
                            [newArr.arrName]: exploreList
                        })
                    },150*index)
                }else{ 
                        exploreList[index].isOpa = true
                    }
            } else {
                if (newArr.isReverse) {
                    exploreList[index].isOpa = false
                }
            }
        })
        newArr.that.setData({
            [newArr.arrName]: exploreList
        })
    }).exec()
}

module.exports = {
  getNewImage: getNewImage,
  imageShow3: imageShow3,
  newImg: imgNow
};


