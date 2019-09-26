<style lang="less">
</style>

<template>
  <div>
    <Table :columns="tableTitle" border :data="tableData" :loading="tableLoading" :max-height="tableHeight">
    </Table>
  </div>
</template>

<script>
import { GET_USER } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      tableLoading: false,
      tableTitle: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '用户名',
          key: 'userName',
          width: 140
        },
        {
          title: '昵称',
          key: 'nickName',
          width: 140
        },
        {
          title: '密码',
          key: 'password',
          width: 200
        },
        {
          title: '角色',
          key: 'role'
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapState(['viewHeight']),
    tableHeight () {
      return this.viewHeight - 10
    }
  },
  methods: {
    async refreshTableData () {
      try {
        this.tableLoading = true
        const ret = await GET_USER()
        this.tableData = ret.data || []
      } catch (error) {
        this.tableData = []
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    }
  },
  mounted () {
    this.refreshTableData()
  }
}
</script>
