<template>
  <MainWrapper>
    <div class="note">
      <div class="note__editor">
        <QuillEditor
          v-model:content="content"
          contentType="html"
        />
      </div>
<!--      <pre>{{ content }}</pre>-->
      <MainButton title="Сохранить"/>
    </div>
  </MainWrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const content = ref('<p>Привет, это HTML</p>')
</script>

<style lang="scss">
.note {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ql-snow .ql-stroke{
  stroke: #fff;
}
.ql-snow .ql-fill{
  fill: #fff;
}
.ql-snow .ql-picker{
  color: #fff;
}
.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover{
  background-color: rgba(255, 255, 255, 0.1);
}
.ql-toolbar.ql-snow{
  border-radius: 20px 20px 0 0;
}
.ql-container.ql-snow{
  max-height: calc(100vh - 8rem - 80px);
  height: calc(100vh - 8rem - 80px);
  overflow-y: auto;
  scrollbar-color: #fff transparent;
  scrollbar-width: thin;
}
</style>
