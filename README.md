## 2019-10-29更新

###  由于初始化时小程序接口获取到的top值不准确改用以下

### js引入
```javascript
  imgNow:function(e){
      listdown.newImg({
          e:e,   
          arrName:'exploreList',  //data对象名
          className:'explore_list_ad', //循环的class名
          that:this,
          bottom:50, //距离下边多少时开始出现
          isReverse:true //是否反向效果
      })
 
  }
  
  //初始化：
       let add=setInterval(()=>{
         if (this.data.exploreList.length>0){
            this.imgNow();
             clearInterval(add)
        }
     },500)
//this.data.exploreList：要处理的对象
```
### wxml引入
```html
  <view class='explore_list_ad  product_image {{item.isOpa?"loaded":" "}}' wx:for='{{maintenanceCateList}}' wx:key='key'>

```
### wxss引入
```css
.product_image{  /* 加载之前的样式  */
  opacity: 0;
  transition: .3s;
  transform: translateY(30rpx) scale(.9)
}
.loaded{ /* 加载之后的样式  */
    opacity: 1;
    transition: .5s;
    transform: translateY(0) scale(1)
}
```









------







## 2019-10-24 

### 如果页面中存在图片 并且非固定高度

### js引入

``` javascript
	var listdown=require('../../utils/listDown.js');
	
	listdown.getNewImage(arr,obj); 
	初始化使用
	//*arr object:data中需要效果的对象
	//*obj 当前this指向
	listdown.imageShow3(e,obj,offTop) 
	//*e object:滑动事件e
	//*e number:在初始化时使用 距离底部高度

	//*obj 当前this指向
	//offTop 距离底部多少时候开始出现 默认为0

	//引用
	onLoad: function (options) {
		listdown.getNewImage(['commenList', 'add'],this);         
		
        //如果页面中存在图片 并且非固定高度 需保证图片完全加载后调用 所以延时执行；
        setTimeout(function() {
		    listdown.imageShow3(10,this) 
		}.bind(this), 300) //初始执行
	},
	
	
	 imgNow:function(e){
	    listdown.imageShow3(e,this)
	},
```
### wxml引入
```html
<scroll-view scroll-y="true" style="height:{{scrollHeight}}px" bindscroll='imgNow'>
<view wx:for="{{commenList}}" wx:key="unique" class="{{item.clas}}"  id="{{item.uid}}">

</view>
...
</scroll-view>
<!--
bindscroll='imgNow' 绑定事件

class="{{item.clas}}"  绑定样式

id="{{item.uid}}" 绑定标识

-->
```
### wxss引入
```css
.product_image{  /* 加载之前的样式  */
  opacity: 0;
  
}
.loaded{ /* 加载之后的样式  */
    opacity: 1;
    transition: 1s;
}
```
