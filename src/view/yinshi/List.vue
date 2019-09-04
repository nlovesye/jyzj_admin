<template>
  <div>
    <Table height="200" :columns="columns1" :data="data2">

    </Table>
  </div>
</template>

<script>
export default {
  name: 'yinshi_page',
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data2: [
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
