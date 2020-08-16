<template>
  <!-- 精彩评论 -->
          <div class="comment">
            <div class="title">精彩评论</div>
            <div class="comment-nav">
              <div class="list">
                <img
                  src="https://p1.music.126.net/69Gekt4-9TDd9KgvcoRZDQ==/109951165235397611.jpg?param=50y50"
                  alt
                />
                <div class="info">
                  <p>
                    <a href="javascript:;">小白菜:</a>
                    <span>坡花 坡草第一次合体出专辑！！！作为一位武汉人和一个即将去新加坡读书的学生 对这首歌实在是太有感触了！！</span>
                  </p>
                  <div class="date">
                    <span>8月9日 22:01</span>
                    <!-- 添加active类 控制图标显示样式  -->
                    <div class="fabulous active">
                      <i></i>
                      (
                      <span>2000</span>)
                    </div>
                  </div>
                </div>
              </div>

              <div class="list">
                <img
                  src="https://p1.music.126.net/69Gekt4-9TDd9KgvcoRZDQ==/109951165235397611.jpg?param=50y50"
                  alt
                />
                <div class="info">
                  <p>
                    <a href="javascript:;">小白菜:</a>
                    <span>stay with you谢谢燕姿 在疫情期间第一时间捐款并作为韩红驰援武汉项目海外志愿者 这首JJ和燕姿共同创作的单曲版税收入也将捐入联合国儿童基金会</span>
                  </p>
                  <div class="date">
                    <span>8月9日 22:01</span>
                    <!-- 添加active类 控制图标显示样式  -->
                    <div class="fabulous">
                      <i></i>
                      (
                      <span>2000</span>)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- div 添加 active类 控制图标 -->
            <div class="all active">
              <span>更多精彩评论</span>
              <i></i>
            </div>
          </div>
</template>
<script>
export default {
  name: 'Comment'
}
</script>
<style lang="less" scoped>
  // 精彩评论
        .comment {
          width: 100%;
          margin-top: 30px;
          margin-bottom: 30px;
          .title {
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .comment-nav {
            width: 100%;

            .list {
              width: 100%;
              padding: 15px 0;
              display: flex;
              border-bottom: 1px solid #cccccc;
              img {
                width: 50px;
                height: 50px;
                vertical-align: top;
                margin-right: 10px;
              }
              .info {
                flex: 1;
                p {
                  a {
                    color: #0c73c2 !important;
                    margin-right: 7px;
                  }
                  width: 100%;
                  font-size: 12px;
                  color: #333;
                  line-height: 24px;
                }
                .date {
                  margin-top: 15px;
                  width: 100%;
                  color: #999;
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .fabulous {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    color: #333333;
                    &.active i {
                      background-position: -78px -674px;
                    }
                    i {
                      margin-right: 5px;
                      width: 15px;
                      height: 15px;
                      display: inline-block;
                      background: url(../image/icon.png) no-repeat 0 9999px;
                      background-position: -26px -674px;
                    }
                  }
                }
              }
            }
          }
          .all {
            display: block;
            width: 120px;
            margin: 0 auto;
            padding: 0 20px;
            line-height: 48px;
            text-align: center;
            color: #aeaeae;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }

            i {
              display: inline-block;
              width: 11px;
              height: 6px;
              vertical-align: middle;
              background: url(../image/icon.png) no-repeat 0 9999px;
              background-position: -120px -216px;
            }
            &.active i {
              background-position: -118px -78px;
            }
          }
        }
</style>