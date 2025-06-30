<template>
  <div class="el-transfer">
      <transfer-panel
          v-bind="$props"
          ref="leftPanel"
          :data="sourceData"
          :title="titles[0] || t('el.transfer.titles.0')"
          :default-checked="leftDefaultChecked"
          :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
          @checked-change="onSourceCheckedChange"
      >
          <slot name="left-footer"></slot>
      </transfer-panel>
      <div class="el-transfer__buttons">
          <el-button
              type="primary"
              :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
              @click.native="addToLeft"
              :disabled="rightChecked.length === 0"
          >
              <i class="el-icon-arrow-left"></i>
              <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
          </el-button>
          <el-button
              type="primary"
              :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
              @click.native="addToRight"
              :disabled="leftChecked.length === 0"
          >
              <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
              <i class="el-icon-arrow-right"></i>
          </el-button>
      </div>
      <transfer-panel
          v-bind="$props"
          ref="rightPanel"
          :data="targetData"
          :title="titles[1] || t('el.transfer.titles.1')"
          :default-checked="rightDefaultChecked"
          :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
          @checked-change="onTargetCheckedChange"
      >
          <slot name="right-footer"></slot>
      </transfer-panel>
  </div>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from 'element-ui/src/mixins/migrating';

export default {
  name: 'ElVirtualTransfer',

  mixins: [Emitter, Locale, Migrating],

  components: {
      TransferPanel
  },

  props: {
      data: {
          type: Array,
          default() {
              return [];
          }
      },
      titles: {
          type: Array,
          default() {
              return [];
          }
      },
      buttonTexts: {
          type: Array,
          default() {
              return [];
          }
      },
      filterPlaceholder: {
          type: String,
          default: ''
      },
      filterMethod: Function,
      leftDefaultChecked: {
          type: Array,
          default() {
              return [];
          }
      },
      rightDefaultChecked: {
          type: Array,
          default() {
              return [];
          }
      },
      renderContent: Function,
      value: {
          type: Array,
          default() {
              return [];
          }
      },
      format: {
          type: Object,
          default() {
              return {};
          }
      },
      filterable: Boolean,
      props: {
          type: Object,
          default() {
              return {
                  label: 'label',
                  key: 'key',
                  disabled: 'disabled'
              };
          }
      },
      targetOrder: {
          type: String,
          default: 'original'
      }
  },

  data() {
      return {
          leftChecked: [],
          rightChecked: []
      };
  },

  computed: {
      dataObj() {
          const key = this.props.key;
          return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
      },

      sourceData() {
          // return this.data.filter(item => this.value.indexOf(item[this.props.key]) === -1);

          let valueObj = {};
          this.value.forEach(item => {
              valueObj[item] = true;
          });
          return this.data.filter(item => !valueObj[item[this.props.key]]);
      },

      targetData() {
          if (this.targetOrder === 'original') {
              // return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);

              let valueObj = {};
              this.value.forEach(item => {
                  valueObj[item] = true;
              });
              let data = this.data.filter(item => valueObj[item[this.props.key]]);
              return data;
          } else {
              return this.value.reduce((arr, cur) => {
                  const val = this.dataObj[cur];
                  if (val) {
                      arr.push(val);
                  }
                  return arr;
              }, []);
          }
      },

      hasButtonTexts() {
          return this.buttonTexts.length === 2;
      }
  },

  watch: {
      /* 
        当 value（即 v-model 绑定的数据）发生变化时，通过 this.dispatch 方法向父级 ElFormItem 组件派发一个 el.form.change 事件。

        父级 ElFormItem 组件会监听到该事件，并调用 validateField 方法对当前组件进行校验

        这样当用户操作穿梭框（修改 value）时，关联的表单验证规则会自动触发。


        vue3替代方案:

            import { useFormItem } from 'element-plus';

            const { formItem } = useFormItem();

            watch(() => props.value, (val) => {
              formItem?.validate('change'); // 触发校验
            });

      */
      value(val) {
          this.dispatch('ElFormItem', 'el.form.change', val);
      }
  },

  methods: {
      getMigratingConfig() {
          return {
              props: {
                  'footer-format': 'footer-format is renamed to format.'
              }
          };
      },

      onSourceCheckedChange(val, movedKeys) {
          this.leftChecked = val;
          if (movedKeys === undefined) return;
          this.$emit('left-check-change', val, movedKeys);
      },

      onTargetCheckedChange(val, movedKeys) {
          this.rightChecked = val;
          if (movedKeys === undefined) return;
          this.$emit('right-check-change', val, movedKeys);
      },

      addToLeft() {
          let currentValue = this.value.slice();
          this.rightChecked.forEach(item => {
              const index = currentValue.indexOf(item);
              if (index > -1) {
                  currentValue.splice(index, 1);
              }
          });
          this.$emit('input', currentValue);
          this.$emit('change', currentValue, 'left', this.rightChecked);
      },

      addToRight() {
          let currentValue = this.value.slice();
          const itemsToBeMoved = [];
          const key = this.props.key;

          let leftCheckedKeyPropsObj = {};
          this.leftChecked.forEach(item => {
              leftCheckedKeyPropsObj[item] = true;
          });
          let valueKeyPropsObj = {};
          this.value.forEach(item => {
              valueKeyPropsObj[item] = true;
          });
          this.data.forEach(item => {
              const itemKey = item[key];
              if (leftCheckedKeyPropsObj[itemKey] && !valueKeyPropsObj[itemKey]) {
                  itemsToBeMoved.push(itemKey);
              }
          });

          currentValue =
              this.targetOrder === 'unshift'
                  ? itemsToBeMoved.concat(currentValue)
                  : currentValue.concat(itemsToBeMoved);
          this.$emit('input', currentValue);
          this.$emit('change', currentValue, 'right', this.leftChecked);
      },

      clearQuery(which) {
          if (which === 'left') {
              this.$refs.leftPanel.query = '';
          } else if (which === 'right') {
              this.$refs.rightPanel.query = '';
          }
      }
  }
};
</script>