<template>
  <div class="home">
    <el-container>
      <el-header class="home-header">
        <div class="logo"></div>
        <div class="user">
          <div class="user-name">{{user.user_name}}</div>
          <el-button @click="logout" size='mini'>退出</el-button>
        </div>

      </el-header>
      <el-main class="home-main">
        <div class="home-main-header">
          <el-breadcrumb separator="/" style="margin: 10px 0">
            <el-breadcrumb-item>淘口令</el-breadcrumb-item>
            <el-breadcrumb-item>淘口令列表</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button type="primary" size='mini' @click="dialogFormVisible = true">添加淘口令</el-button>
        </div>

        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column prop="createTime" label="创建时间" :formatter="dateFmt">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="code" width="800" label="地址" :formatter="addressFmt">
            <div slot-scope="scope" class="address">
              <span>{{addressFmt(scope.row)}}</span>
              <el-button size="small" class="cb_btn" :data-clipboard-text="addressFmt(scope.row)">复制地址</el-button>

            </div>
          </el-table-column>

        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="添加淘口令" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="口令详情" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" placeholder="请粘贴淘口令字" v-model="form.code" resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
// @ is an alias to /src
import format from 'date-fns/format';
import { BASE_PATH } from '@/conf/configs.js';
import { mapState } from 'vuex';
import { logOut } from '@/common/login';
import api from '@/api';
import Clipboard from 'clipboard';
export default {
  name: 'home',

  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',

      form: {
        title: '',
        code: ''
      }
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    dateFmt(row) {
      return format(new Date(row.createTime), 'YYYY-MM-DD HH:mm:ss');
    },
    addressFmt(row) {
      return `${BASE_PATH}?key=${row.code.replace(/￥/g, '')}`;
    },

    async logout() {
      try {
        await this.$confirm('确认要退出登录吗？', '确认信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        });
        logOut();
      } catch (e) {}
    },
    async add() {
      if (!this.form.title.trim()) {
        this.$message.error('标题不为空');
        return;
      } else if (
        !this.form.code.match(/￥(.*)￥/) ||
        !this.form.code.match(/￥(.*)￥/)[1]
      ) {
        this.$message.error('口令详情或没有匹配到口令');
        return;
      }
      try {
        await api.add(this.form);
        this.tableData = await api.getList();
        this.$message.success('添加成功');
        this.dialogFormVisible = false;
      } catch (e) {
        this.$message.error('添加失败，请重试');
      }
    }
  },
  async created() {
    this.tableData = await api.getList();
  },
  mounted() {
    const clipboard = new Clipboard('.cb_btn');
    clipboard.on('success', () => {
      this.$message.success('复制成功');
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  background: #f7f7f7;
  &-header {
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-main {
    padding-top: 0;
    &-header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
  }
}
.user {
  display: flex;
  align-items: center;
  &-name {
    padding-right: 10px;
  }
}
.address {
  display: flex;
  justify-content: space-between;
  padding: 0 5% 0 0;
}
#clipboard {
  display: none;
}
</style>

