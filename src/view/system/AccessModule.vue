<style lang="less">
</style>

<template>
  <div>
    <Modal
      v-model="modalVisible"
      title="添加模块"
      fullscreen
      :mask-closable="false"
      @on-visible-change="modalVisibleChange"
    >
      <Form ref="form" :model="formValid" :rules="formRules" inline :label-width="100" v-if="modalVisible">
        <FormItem prop="name" label="模块名称">
          <Input style="min-width: 160px;" v-model="formValid.name"></Input>
        </FormItem>
        <FormItem prop="key" label="模块KEY">
          <Input style="min-width: 160px;" v-model="formValid.key"></Input>
        </FormItem>
        <FormItem prop="roles" label="角色类型">
          <Select v-model="formValid.roles" multiple style="min-width: 220px;">
            <Option v-for="item in rolesList" :value="item.key" :key="item.key">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="submit" type="primary" :loading="modalLoading">提交</Button>
      </div>
    </Modal>
    <div class="table_header_box" v-verify="'system_ele_add'">
      <Button icon="md-add" @click="add">添加</Button>
    </div>
    <Table :columns="tableTitle" border :data="tableData" :loading="tableLoading" :max-height="tableHeight">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="remove(row)" v-verify="'system_ele_delete'">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
// eslint-disable-next-line
import { roles } from '@/assets/data/user'
import { mapState, mapGetters } from 'vuex'
import DataSelect from '_c/data_select'
import { getMenuModule } from '@/libs/util'
import { ADD_ACCESS_MODULE, GET_ACCESS_MODULE_LIST, DEL_ACCESS } from '@/api/user'
export default {
  name: 'access_module',
  components: {
    DataSelect
  },
  data () {
    return {
      rolesList: roles,
      modalVisible: false,
      modalLoading: false,
      formValid: {
        name: '',
        key: '',
        roles: []
      },
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'change' }
        ],
        key: [
          { required: true, message: 'key不能为空', trigger: 'change' }
        ],
        roles: [
          { required: true, message: '角色类型必选', trigger: 'change', type: 'array' }
        ]
      },
      tableLoading: false,
      tableTitle: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '模块名称',
          key: 'name',
          width: 320,
          resizable: true
        },
        {
          title: '模块KEY',
          key: 'key',
          width: 200,
          resizable: true
        },
        {
          title: '权限',
          render: (h, { row }) => row.roles ? h('span', row.roles.join(',')) : ''
        },
        {
          slot: 'action',
          title: '操作',
          align: 'center',
          width: 120,
          fixed: 'right'
        }
      ],
      tableData: [],
      delLoading: false
    }
  },
  computed: {
    ...mapState(['viewHeight']),
    ...mapGetters(['menuList']),
    tableHeight () {
      return this.viewHeight
    },
    moduleList () {
      return getMenuModule(this.menuList, [])
    }
  },
  methods: {
    add () {
      this.modalVisible = true
    },
    async submit () {
      try {
        const isValid = await this.$refs.form.validate()
        if (!isValid) return
        this.modalLoading = true
        await ADD_ACCESS_MODULE(this.formValid)
        // this.refreshTableData()
        this.modalVisible = false
        this.refreshTableData()
        this.$Message.success('操作成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.modalLoading = false
      }
    },
    async refreshTableData () {
      try {
        this.tableLoading = true
        const ret = await GET_ACCESS_MODULE_LIST()
        this.tableData = ret.data || []
      } catch (error) {
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    },
    remove (row) {
      if (this.delLoading) return
      this.$Modal.confirm({
        title: '是否确定删除？',
        onOk: async () => {
          try {
            this.delLoading = true
            await DEL_ACCESS({ id: row._id })
            this.$Message.info('操作成功')
            this.refreshTableData()
          } catch (error) {
            console.log(error)
          } finally {
            this.delLoading = false
          }
        }
      })
    },
    modalVisibleChange (open) {
      if (!open) {
        this.$refs.form.resetFields()
      }
    }
  },
  mounted () {
    this.refreshTableData()
  }
}
</script>
