<template>
  <div>
    <Modal
      v-model="modalVisible"
      :title="modalTitle"
      :mask-closable="false"
      fullscreen
    >
      <Form ref="form" :model="form" :rules="rules" inline :label-width="100">
        <FormItem prop="name" label="门派名称">
          <Input v-model="form.name" placeholder="请输入门派名称">
          </Input>
        </FormItem>
        <FormItem prop="yswx1_count" label="武学一招式数">
          <InputNumber style="min-width: 160px;" :min="1" v-model="form.yswx1_count"></InputNumber>
        </FormItem>
        <FormItem prop="yswx2_count" label="武学二招式数">
          <InputNumber style="min-width: 160px;" :min="1" v-model="form.yswx2_count"></InputNumber>
        </FormItem>
      </Form>
      <!-- <Row>
        <Col span="12">
          <Slider v-model="value1"></Slider>
        </Col>
        <Col span="12">col-12</Col>
      </Row> -->
      <div slot="footer">
        <Button @click="submit" type="primary" :loading="modalLoading">提交</Button>
      </div>
    </Modal>
    <Table border :columns="columns" :data="list" :loading="listLoading">
      <div slot="header" style="padding: 0 10px;">
        <Button type="primary" @click="add">添加</Button>
      </div>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="edit(row)" style="margin-right: 5px;">编辑</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { GET_HERMITS_LIST, ADD_HERMITS, DELETE_HERMITS, EDIT_HERMITS } from '@api/data'
export default {
  name: 'data_yinshimenpai',
  data () {
    return {
      modalVisible: false,
      modalLoading: false,
      modalTitle: '添加隐士门派',
      listLoading: false,
      list: [],
      form: {
        _id: null,
        name: '',
        yswx1_count: 1,
        yswx2_count: 1
      },
      rules: {
        name: [{ required: true, message: '门派名称不能为空', trigger: 'change' }],
        yswx1_count: [{ required: true, message: '不能为空', trigger: 'change', type: 'number' }],
        yswx2_count: [{ required: true, message: '不能为空', trigger: 'change', type: 'number' }]
      },
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '门派名称',
          key: 'name'
        },
        {
          title: '武学一招式数',
          key: 'yswx1_count'
        },
        {
          title: '武学二招式数',
          key: 'yswx2_count'
        },
        {
          title: '操作',
          width: 140,
          align: 'center',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    // 获取列表
    async getList () {
      try {
        this.listLoading = true
        const res = await GET_HERMITS_LIST()
        this.list = res.data
      } catch (error) {
        console.log(error)
        this.list = []
      } finally {
        this.listLoading = false
      }
    },
    async submit () {
      try {
        const isValid = await this.$refs.form.validate()
        if (!isValid) return
        this.modalLoading = true
        if (this.modalTitle === '添加隐士门派') {
          await ADD_HERMITS(this.form)
        } else if (this.modalTitle === '编辑隐士门派') {
          await EDIT_HERMITS(this.form)
        }
        this.$Message.success('操作成功!')
        this.getList()
        this.modalVisible = false
      } catch (error) {
        console.log(error)
      } finally {
        this.modalLoading = false
      }
    },
    add () {
      this.modalTitle = '添加隐士门派'
      this.modalVisible = true
      this.$refs['form'].resetFields()
    },
    edit (row) {
      this.modalTitle = '编辑隐士门派'
      this.modalVisible = true
      this.form = { ...row }
    },
    remove (row) {
      this.$Modal.confirm({
        title: '是否确定删除',
        onOk: () => {
          DELETE_HERMITS(row._id).then(res => {
            this.getList()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less">
</style>
