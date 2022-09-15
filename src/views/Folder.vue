

<template>
  <div>
  <SideNav></SideNav>
  <el-tree
    :data="folderStruct"
    lazy
    show-checkbox
    node-key="id"
    draggable
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    >
    <span class="folder-tree-node" slot-scope="{ node, data }">
      <span><i :class="data.icon"></i>{{ node.label }}</span>
      <span>
        <el-dropdown trigger="click">
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-folder-add" @click="appendFold(data)">
              添加文件夹
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-document-add" @click="appendFile(data)">
              添加文件
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete" @click="remove(node,data)">
              删除
            </el-dropdown-item>
            <!--
            <el-dropdown-item icon="el-icon-refresh" @click="rename(node,data)">
            重命名
          </el-dropdown-item>
          -->
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </span>
  </el-tree>
</div>
</template>

<script>
import SideNav from "@/components/SideNav"
export default {
  name:"folder",
  components:{
  'SideNav' : SideNav,},

  data() {
    return {
      folderStruct: [
        {
        id: 1,
        label: '一级 1',
        children: [
          {
          id: 4,
          label: '二级 1-1',
          icon:"el-icon-folder",
          children: [
            {
            id: 9,
            label: '三级 1-1-1',
            icon:"el-icon-folder",}, 
            
            {
            id: 10,
            label: '三级 1-1-2',
            icon:"el-icon-folder",}]}]}, 
        {
        id: 2,
        label: '一级 2',
        icon:"el-icon-folder",
        children: [
          {
          id: 5,
          label: '二级 2-1',
          icon:"el-icon-folder",}, 
          {
          id: 6,
          label: '二级 2-2',
          icon:"el-icon-folder",}]}, 
        {
        id: 3,
        label: '一级 3',
        icon:"el-icon-folder",
        children: [
          {
          id: 7,
          label: '二级 3-1',
          icon:"el-icon-folder",}, 
          {
          id: 8,
          label: '二级 3-2',
          icon:"el-icon-folder",
          children: [
            {
            id: 11,
            label: '三级 3-2-1',
            icon:"el-icon-folder",}, 
            {
            id: 12,
            label: '三级 3-2-2',
            icon:"el-icon-folder",}, 
            {
            id: 13,
            label: '三级 3-2-3',
            icon:"el-icon-folder",}
          ]}
        ]}
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  methods: {
    
    appendFold(data) {
      const newChild = { id: data.children.id++,  label: '新建', icon:'el-icon-folder',children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    appendFile(data) {
      const newChild = { id: data.children.id++,  label: '新建'};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node,data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    //rename(node,data) {}
    
    /**
     * 
     * handleDragStart(node) {
      console.log('drag start', node);
    },
    
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
      */
  }
};

</script>

<style>

.folder-container {
  position: absolute;
  top:0px;
  left:10%;
  width:80%;
  height: 100%;
  background-color: rgb(227, 225, 225);
  display: flex;
  align-self:center;
}

.folder-page {
  width:100%;
  height: 100%;
  margin: auto;
 
}

.folder-title {
  font-size: 30px;
  color: #90e6cc;;
  width:100%;
  margin: auto;
}

.folder-tree-node {
  width:80%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
