<template>
  <!-- 页面底部 -->
      <div class="foot">
        <div class="foot-contain">
          <div class="foot-warp">
              <div class="left">
                <p><a href="">服务条款</a>
                <span>|</span>
                <a href="">隐私政策</a>
                <span>|</span>
                <a href="">儿童隐私政策</a>
                <span>|</span>
                <a href="">版权投诉指引</a>
                <span>|</span>
                <a href="">意见反馈</a></p>
               <p>
                 <span>网易公司版权所有©1997-2020</span>
                 杭州乐读科技有限公司运营：
                 <a href="">浙网文[2018] 3506-263号</a>
               </p>
               <p>
                 <span>违法和不良信息举报电话：0571-89853516</span>
                 举报邮箱：
                 <a href="">ncm5990@163.com</a>
               </p>
               <p>
                 <span>粤B2-20090191-18</span>
                 举报邮箱：
                 <a href="">工业和信息化部备案管理系统网站</a>
               </p>
              </div>
              <ul class="right">
                <li><a href=""><i class="iconfont">&#xe635;</i>独立音乐人</a></li>
                <li><a href=""><i class="iconfont">&#xe657;</i>音乐专栏</a></li>
                <li><a href=""><i class="iconfont">&#xe611;</i>自媒体</a></li>
                <li><a href=""><i class="iconfont">&#xe604;</i>赞赏</a></li>
              </ul>
          </div>
        </div>
      </div>

</template>

<script>
export default {
    name:'Foot'
}
</script>

<style lang="less" scoped>
 //<!-- 页面底部 -->
.foot{
        margin-top: -120px;
        height: 160px;
      
        background: #f2f2f2;
        .foot-contain{
            width: 1100px;
           margin: 0 auto;
           .foot-warp{
               .left{
                float: left;
                width: 490px;
                padding-top: 35px;
                line-height: 24px
               }
               .right{
                float: right;
                width: 330px;
                margin-top: 30px;
                li{ 
                      margin-left: 30px;
                      width: 60px;
                        height: 70px;
                        float: left;
                      text-align: center;
                     a{
                            text-decoration: none;
                            .iconfont{
                            font-size: 40px;
                            padding: 0 10px;
                            }
                            
                        }  
    
                    &:nth-child(1){
                        margin-left: 0;   
                        
                       }
                }
               }
           }
        }
    }
</style>

