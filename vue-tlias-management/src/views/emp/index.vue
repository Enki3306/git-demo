<script setup>
import { onMounted, ref, watch } from 'vue'
import { queryPageApi } from '@/api/emp.js'
const formInline = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: ''
})
watch(() => formInline.value.date, (newValue, oldValue) => {
  if (newValue.length == 2) {
    formInline.value.begin = newValue[0]
    formInline.value.end = newValue[1]
  } else {
    formInline.value.begin = ''
    formInline.value.end = ''
  }
}, { deep: true })
const search = async () => {
  const result = await queryPageApi(
    formInline.value.name,
    formInline.value.gender,
    formInline.value.begin,
    formInline.value.end,
    currentPage.value,
    pageSize.value
  )
  if (result.code) {
    empList.value = result.data.rows;
    total.value = result.data.total;
  }
}

onMounted(() => {
  search();
})
const clear = () => {
  formInline.value = {
    name: '',
    gender: '',
    date: '',
  }
  search();
}
const empList = ref([
  {
    name: "张三",
    gender: "1",
    image: "https://example.com/avatar1.jpg",
    deptName: "1",
    job: "前端工程师",
    entryDate: "2023-01-15",
    updateTime: "2024-04-05 10:30:00"
  },
])
const currentPage = ref(1)
const pageSize = ref(20)
const background = ref(true)
const total = ref(100)
const handleSizeChange = (val) => {
  search();
}
const handleCurrentChange = (val) => {
  search();
}
</script>

<template>
  <div class="container">
    <h2 style="margin-bottom: 20px;">员工管理</h2>
    <div class="selectItems">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入员工姓名" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.gender" placeholder="请选择" clearable>
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker v-model="formInline.date" type="daterange" unlink-panels range-separator="到"
            start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons" style="margin-bottom: 20px;">
      <el-button type="primary" @click="search">+ 新增员工</el-button>
      <el-button type="danger" @click="clear">- 批量删除</el-button>
    </div>
    <div class="lists">
      <el-table :data="empList" border style="width: 100%">
        <!-- 复选框列 -->
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>

        <!-- 性别 -->
        <el-table-column label="性别" width="120" align="center" #default="socpe">
          <span v-if="socpe.row.gender == '1'">男</span>
          <span v-else-if="socpe.row.gender == '2'">女</span>
        </el-table-column>

        <!-- 头像 -->
        <el-table-column prop="image" label="头像" width="120" align="center">
          <template #default="scope">
            <img :src="scope.row.image" alt="头像" style="width: 40px; height: 40px; border-radius: 50%;">
          </template>
        </el-table-column>

        <!-- 所属部门 -->
        <el-table-column prop="deptName" label="所属部门" width="120" align="center" #default="socpe">
          <span v-if="socpe.row.gender == '1'">班主任</span>
          <span v-else-if="socpe.row.gender == '2'">讲师</span>
          <span v-else-if="socpe.row.gender == '3'">学工主管</span>
          <span v-else-if="socpe.row.gender == '4'">教研主管</span>
          <span v-else-if="socpe.row.gender == '5'">咨询师</span>
          <span v-else>其他</span>
        </el-table-column>

        <!-- 职位 -->
        <el-table-column prop="job" label="职位" width="120" align="center"></el-table-column>

        <!-- 入职日期 -->
        <el-table-column prop="entryDate" label="入职日期" width="180" align="center"></el-table-column>

        <!-- 最后操作时间 -->
        <el-table-column prop="updateTime" label="最后操作时间" width="200" align="center"></el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              <el-icon>
                <EditPen />
              </el-icon> 编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              <el-icon>
                <Delete />
              </el-icon> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 50, 75, 100]" :background="background"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" style="margin-top: 20px;" />
    </div>
  </div>
</template>

<style scoped></style>