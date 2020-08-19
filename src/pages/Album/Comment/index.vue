<template>
  <!-- 精彩评论 -->
  <div>
    <div class="comment">
      <div class="send-comment" v-if="!isSkeleton">
        <div class="image">
          <img
            v-lazy="
              userLogin
                ? userLogin
                : 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50'
            "
          />
        </div>
        <div class="content">
          <textarea
            v-model="textComment"
            rows="4"
            placeholder="评论"
          ></textarea>
          <div class="send clearFix">
            <div>
              <span>140</span>
              <button @click="sendComment">评论</button>
            </div>
          </div>
        </div>
      </div>

      <div class="title">精彩评论</div>
      <div class="comment-nav">
        <template v-for="item in 10">
          <a-skeleton
            v-if="isSkeleton"
            style="margin:10px 0"
            :key="item"
            active
            :avatar="{ shape: 'square', size: 50 }"
            title
            :paragraph="{ rows: 3 }"
          />
        </template>
        <template v-for="item in albumComments">
          <div class="list" v-if="!isSkeleton" :key="item.commentId">
            <img v-lazy="item.user.avatarUrl" />
            <div class="info">
              <p>
                <a href="javascript:;">{{ item.user.nickname }}:</a>
                <span>{{ item.content }}</span>
              </p>
              <div class="date">
                <span>{{ item.time | formatTime }}</span>
                <!-- 添加active类 控制图标显示样式  -->
                <div
                  @click="addFabulous(item)"
                  class="fabulous"
                  v-if="item.fabulous"
                  :class="
                    item.fabulous.indexOf(String(userId)) === -1 ? '' : 'active'
                  "
                >
                  <i></i>
                  (
                  <span>{{ item.likedCount }}</span
                  >)
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- div 添加 active类 控制图标 -->
      <div v-if="!isSkeleton" class="all active">
        <span>更多精彩评论</span>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import { resAddAlbumComment, resFabulous } from "@/api/album";
export default {
  name: "Comment",
  props: {
    albumComments: Array,
    albumId: String,
    isSkeleton: Boolean,
  },
  data() {
    return {
      isAll: false, // 是否显示全部的评论
      userLogin: "", // 用户的头像
      userId: "", // 用户的id
      userName: "", // 用户名称
      textComment: "", //发送的评论
    };
  },
  mounted() {
    const userLogin = localStorage.getItem("user_head");
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    if (userId) {
      this.userId = userId;
    }
    if (userLogin) {
      this.userLogin = userLogin;
    }
    if (userName) {
      this.userName = userName;
    }
  },
  methods: {
    // 发送评论
    async sendComment() {
      const textComment = this.textComment;
      if (textComment.trim()) {
        // 整理数据
        const { textComment, userLogin, userId, userName, albumId } = this;
        if (userId) {
          //  commentId 后台自动生成
          const commentObj = {
            user: {
              locationInfo: null,
              liveInfo: null,
              anonym: 0,
              avatarUrl: userLogin, // 发布者头像
              authStatus: 0,
              experts: null,
              vipRights: null,
              userId: userId, // 发布者id
              userType: 0,
              nickname: userName, // 发布者名称
              vipType: 0,
              remarkName: null,
              expertTags: null,
            },
            fabulous: [],
            beReplied: [],
            pendantData: null,
            showFloorComment: null,
            status: 0, // 点赞数
            content: textComment,
            time: Date.now(), // 发布时间
            likedCount: 0,
            expressionUrl: null,
            commentLocationType: 0,
            parentCommentId: 0,
            decoration: {},
            repliedMark: null,
            liked: false,
          };
          const result = await resAddAlbumComment({
            albumId,
            comment: commentObj,
          });

          if (result.code === 200) {
            // 分发父级组件的事件 重新发送请求获取数评论数据
            this.$emit("getAlbumComment", albumId);
            this.textComment = "";
            this.$message({
              type: "success",
              message: "评论成功",
            });
          } else {
            this.$message({
              type: "error",
              message: `${result.msg}?${result.msg}:'评论失败'`,
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请登录",
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "评论不能为空",
        });
      }
    },
    // 点击赞
    async addFabulous(item) {
      const index = item.fabulous.indexOf(String(this.userId));
      if (index !== -1) return;
      if (this.userId) {
        const obj = {
          commentId: item.commentId,
          albumId: this.albumId,
          userId: this.userId,
        };
        const result = await resFabulous(obj);
        if (result.code !== 200) {
          this.$message({
            type: "error",
            message: "点赞失败",
          });
        } else {
          // 分发父级组件的事件 重新发送请求获取数评论数据
          this.$emit("getAlbumComment", this.albumId);
        }
      } else {
        this.$message({
          type: "error",
          message: "请先登录",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
// 精彩评论
.clearFix::after,
.clearFix::before {
  clear: both;
  display: table;
  content: "";
}
.comment {
  width: 100%;
  margin-top: 60px;
  margin-bottom: 30px;
  .title {
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
    color: #333;
  }
  .send-comment {
    width: 100%;
    display: flex;
    .image {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .content {
      flex: 1;
      textarea {
        border-radius: 3px;
        outline: none;
        padding: 5px 5px;
        width: 100%;
        border: 1px solid #cccccc;
      }
      .send {
        width: 100%;
        div {
          margin-top: 10px;
          float: right;
          font-size: 12px;
          span {
            color: #999;
          }
          button {
            margin-left: 5px;
            border-radius: 2px;
            border: none;
            outline: none;
            width: 46px;
            height: 25px;
            color: #fff;
            text-align: center;
            background: #2f7fcb;
            line-height: 25px;
          }
        }
      }
    }
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
            // color: #0c73c2 !important;
            margin-right: 7px;
          }
          width: 100%;
          font-size: 12px;
          color: #333;
          line-height: 24px;
        }
        .date {
          margin-top: 5px;
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
    // width: 120px;
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
