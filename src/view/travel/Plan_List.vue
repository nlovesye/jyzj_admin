<style lang="less">
</style>

<template>
  <div>
    <div class="table_header_box">
      <UploadButton @onload="onload" v-verify="'test'" />
      <Button style="margin-left: 5px;" icon="md-close" :loading="deleteLoading" @click="removeAll" v-verify="'test'">删除所有</Button>
    </div>
    <Table :columns="tableTitle" border :data="tableData" :loading="tableLoading" :max-height="tableHeight">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="remove(row)" v-verify="'test'">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { ADD_NG_BATCH, GET_NG_LIST, DELETE_NG, DELETE_NG_ALL } from '@api/ng'
import { types } from '@/assets/data/sect'
import { mapState } from 'vuex'
import UploadButton from '_c/upload_button'
const transferStrategy = (obj) => {
  const strategy = {
    '门派': 'sect',
    '门派类型(等级)': [
      {
        key: 'maxLevel',
        formatter: function (str) {
          return str.split('(')[1].split(')')[0]
        }
      },
      {
        key: 'sectType',
        formatter: function (str) {
          const name = str.split('(')[0]
          const target = types.find(item => item.name === name) || {}
          return target.key
        }
      }
    ],
    '内功名称': 'ngName',
    '臂力': 'attrBL',
    '身法': 'attrSF',
    '内息': 'attrNX',
    '罡气': 'attrGQ',
    '体魄': 'attrTP',
    '气血上限': 'hp',
    '内力上限': 'mp',
    '招架耐力上限': 'sp',
    '内功防御': 'nd',
    '怒气上限': 'ap',
    '属性': 'ngAttr',
    '属性和': 'attrSum',
    '消耗修为': 'needConsume',
    '内功特效': 'ngPower'
  }
  const result = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      const stVal = strategy[key]
      if (stVal && stVal.formatter) {
        result[stVal.key] = stVal.formatter(val)
      } else if (stVal instanceof Array) {
        for (let i = 0; i < stVal.length; i++) {
          const item = stVal[i]
          result[item.key] = item.formatter(val)
        }
      } else {
        result[stVal] = val
      }
    }
  }
  return result
}
export default {
  name: 'plan_list',
  components: {
    UploadButton
  },
  data () {
    return {
      delLoading: false,
      deleteLoading: false,
      file: null,
      tableData: [],
      tableTitle: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '时间'
        },
        {
          slot: 'action',
          title: '操作',
          fixed: 'right',
          align: 'center',
          width: 120
        }
      ],
      tableLoading: false
    }
  },
  computed: {
    ...mapState(['viewHeight']),
    tableHeight () {
      return this.viewHeight - 80
    }
  },
  methods: {
    async onload ({ results }) {
      const reqData = results.map(item => transferStrategy(item))
      // console.log('data', results, reqData)
      try {
        this.tableLoading = true
        await ADD_NG_BATCH(reqData)
        this.getList()
        this.$Message.info('导入成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    },
    remove (row) {
      this.$Modal.confirm({
        title: '是否确定删除？',
        onOk: async () => {
          try {
            this.delLoading = true
            await DELETE_NG({ id: row._id })
            this.$Message.info('操作成功')
            this.getList()
          } catch (error) {
            console.log(error)
          } finally {
            this.delLoading = false
          }
        }
      })
    },
    removeAll () {
      this.$Modal.confirm({
        title: '是否确定删除？',
        onOk: async () => {
          try {
            this.deleteLoading = true
            await DELETE_NG_ALL()
            this.$Message.info('操作成功')
            this.getList()
          } catch (error) {
            console.log(error)
          } finally {
            this.deleteLoading = false
          }
        }
      })
    },
    async getList () {
      try {
        this.tableLoading = true
        const res = await GET_NG_LIST()
        this.tableData = res.data || []
      } catch (error) {
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
