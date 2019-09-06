<style scoped>

</style>

<template>
  <FormItem :prop="formProp" :label="formLabel">
    <Select
      v-model="val"
      :placeholder="placeholder"
      :loading="loading"
      @on-open-change="handleOpenChange"
      @on-change="handleChange"
      :style="{ minWidth: '160px' }"
    >
      <Option
        :value="index"
        v-for="(item, index) in data"
        :key="index"
      >
        {{ item[textKey] }}
      </Option>
    </Select>
  </FormItem>
</template>

<script>
export default {
  name: 'DataSelect',
  props: {
    placeholder: String,
    textKey: {
      type: String,
      default: 'title'
    },
    formLabel: String,
    formProp: String,
    dealFn: Function
  },
  data () {
    return {
      val: null,
      data: [],
      loading: false,
      result: null
    }
  },
  methods: {
    async handleOpenChange (open) {
      if (open) {
        if (!this.data || this.data.length < 1) {
          this.loading = true
          this.data = await this.dealFn('getData')
          this.loading = false
        }
      }
    },
    handleChange (value) {
      const result = this.data[value]
      this.val = value
      this.result = result
      this.dealFn('setData', result)
    }
  }
}
</script>
