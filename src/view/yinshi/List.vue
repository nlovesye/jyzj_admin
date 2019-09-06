<template>
  <div>
    <Modal
      v-model="modalVisible"
      title="添加隐士门派"
      fullscreen
      :mask-closable="false"
    >
      <Form ref="form" :model="form" :rules="rules" inline :label-width="100" v-if="modalVisible">
        <data-select
          ref='hermits'
          placeholder="选择门派"
          :dealFn="dealFn"
          textKey="name"
          formLabel="门派"
          formProp="hermits"
        />
        <FormItem prop="ysng1_level" label="内功一等级">
          <InputNumber style="min-width: 160px;" :max="49" :min="1" v-model="form.ysng1_level"></InputNumber>
        </FormItem>
        <FormItem prop="ysng2_level" label="内功二等级">
          <InputNumber style="min-width: 160px;" :max="72" :min="1" v-model="form.ysng2_level"></InputNumber>
          </Input>
        </FormItem>
        <!-- <FormItem prop="yswx1_level" label="武学一等级">
          <InputNumber style="min-width: 160px;" :max="12" :min="1" v-model="form.yswx1_level"></InputNumber>
          </Input>
        </FormItem>
        <FormItem prop="yswx2_level" label="武学二等级">
          <InputNumber style="min-width: 160px;" :max="49" :min="1" v-model="form.yswx2_level"></InputNumber>
          </Input>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="submit" type="primary" :loading="modalLoading">提交</Button>
      </div>
    </Modal>
    <Table border :columns="columns" :data="data">
      <div slot="header" style="padding: 0 10px;">
        <Button type="primary" @click="add">添加</Button>
      </div>
    </Table>
  </div>
</template>

<script>
import DataSelect from '_c/data-select'
import { GET_HERMITS_LIST } from '@api/data'
export default {
  name: 'yinshi_page',
  components: {
    DataSelect
  },
  data () {
    return {
      modalVisible: false,
      modalLoading: false,
      form: {
        hermits: ''
      },
      rules: {
        hermits: [
          { required: true, message: '门派不能为空', trigger: 'change' }
        ],
        ysng1_level: [
          { required: true, message: '内功一不能为空', trigger: 'change' }
        ],
        ysng2_level: [
          { required: true, message: '内功二不能为空', trigger: 'change' }
        ]
      },
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '门派',
          key: 'name'
        },
        {
          title: '门派兑换凭证名称',
          key: 'age'
        },
        {
          title: '已完成凭证数',
          key: 'address2'
        },
        {
          title: '剩需凭证数',
          key: 'aaa'
        },
        {
          title: '已完成魔门令数',
          key: 'address21'
        },
        {
          title: '剩需魔门令数',
          key: 'aaa1'
        },
        {
          title: '已完成荒兽石数',
          key: 'address221'
        },
        {
          title: '剩需荒兽石数',
          key: 'aaa21'
        },
        {
          title: '已完成龙纹拓石数',
          key: 'address221'
        },
        {
          title: '剩需龙纹拓石数',
          key: 'aaa21'
        },
        {
          title: '内功一等级',
          key: 'address23'
        },
        {
          title: '内功二等级',
          key: 'address234'
        },
        {
          title: '武学一等级',
          key: 'address24'
        },
        {
          title: '武学二等级',
          key: 'address25'
        },
        {
          type: 'action',
          title: '操作',
          fixed: 'right'
        }
      ],
      data: [
      ]
    }
  },
  methods: {
    add () {
      this.modalVisible = true
    },
    async dealFn (type, d) {
      if (type === 'getData') {
        let data = []
        try {
          const res = await GET_HERMITS_LIST()
          data = res.data
        } catch (error) {
          data = []
        }
        return data
      } else {
        this.form = { ...this.form, hermits: d.name }
      }
    },
    async submit () {
      try {
        const isValid = await this.$refs.form.validate()
        if (!isValid) return
        this.modalLoading = true
      } catch (error) {
        console.log(error)
      } finally {
        this.modalLoading = false
      }
    }
  }
}
</script>

<style lang="less">
</style>
