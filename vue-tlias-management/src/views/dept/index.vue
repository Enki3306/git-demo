<script setup>
import { onMounted, ref } from 'vue';
import { queryAllApi, addApi, queryById, updateApi, deleteApi } from '@/api/dept.js'
import { ElMessage } from 'element-plus'
async function search() {
  let data = await queryAllApi();
  if (data.code) { //JS隐式类型转换 0 -> false 其他 -> true  null,undefined -> false
    tableData.value = data.data;
  }
}
async function edit(id) {
  const result = await queryById(id);
  if (result.code) {
    fromTitle.value = '编辑部门';
    dialogFormVisible.value = true
    dept.value = result.data;
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
  }
}
async function delet(id) {
  const result = await queryById(id);
  if (result.code) {
    dept.value = result.data;
    centerDialogVisible.value = true;
  }
}
function addDept() {
  dialogFormVisible.value = true
  fromTitle.value = '新增部门';
  dept.value = { name: '' }
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
const fromTitle = ref('');
const tableData = ref([]);
onMounted(() => {
  search();
})
const dialogFormVisible = ref(false);
const ruleFormRef = ref();
async function save(formEl) {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (dept.value.id) {
        const result = await updateApi(dept.value);
        if (result.code) {
          search();
          ElMessage({
            message: '修改成功!',
            type: 'success',
          })
        } else {
          ElMessage.error('This is a primary message.')
        }
        dialogFormVisible.value = false;
        dept.value = { name: '' };
      } else {
        const result = await addApi(dept.value);
        if (result.code) {
          search();
          ElMessage({
            message: '添加成功!',
            type: 'success',
          })
        } else {
          ElMessage.error('This is a primary message.')
        }
        dialogFormVisible.value = false;
        dept.value = { name: '' };
      }
    } else {
      ElMessage.error('表单校验不通过!')
    }
  })
}
const dept = ref({ name: '' });
const rules = ref({
  name: [
    { required: true, message: '姓名为必填项!', trigger: 'blur' },
    { min: 2, max: 10, message: 'Length should be 2 to 10', trigger: 'blur' },
  ]
})
const centerDialogVisible = ref(false)
const deletes = async () => {
  const result = await deleteApi(dept.value.id);
  if(result.code){
    ElMessage({
            message: '删除成功!',
            type: 'success',
          })
  }else{
    ElMessage.error('删除失败!')
  }
  centerDialogVisible.value = false;
  search();
}
</script>

<template>
  <div>
    <h2>部门管理</h2>
    <div class="container">
      <el-button type="primary" @click="addDept">+ 新增部门</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 90%">
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="部门名称" width="260" />
        <el-table-column prop="updateTime" label="最后操作时间" width="300" />
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.id)"><el-icon>
                <EditPen />
              </el-icon>编辑</el-button>
            <el-button type="danger" size="small" @click="delet(scope.row.id)"><el-icon>
                <CloseBold />
              </el-icon>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="centerDialogVisible" title="提示" width="500" center>
      {{dept.id}}
      <span>
        请确定删除
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deletes()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible" :title="fromTitle" width="500">
      <el-form :model="dept" :rules="rules" ref="ruleFormRef">
        <el-form-item label="部门名称" :label-width="80" prop="name">
          <el-input v-model="dept.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save(ruleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>
