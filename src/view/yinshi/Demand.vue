<template>
  <div>
    <Table border :columns="columns" :data="data">
      <div slot="header" style="padding: 0 10px;">
        <Button type="primary">添加</Button>
      </div>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'yinshi_demand',
  data () {
    return {
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
        }
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less">
</style>
