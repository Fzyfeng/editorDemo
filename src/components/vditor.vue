<template>
  <div id="vditor"></div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue'
import Vditor from 'vditor'
import "vditor/src/assets/less/index.less"
import 'juejin-markdown-themes/dist/juejin.min.css'

const data = ref('镜像简介：超级适合新手小白上手的ComfyUl,无需本地部署，无需考虑节点安装，随开随用开启你的AI之旅吧~\n' +
    '\n' +
    '全能Comfyui镜像\n' +
    '该应用包含大量常用模型及节点，大部分流拖进去重选下模型基本都可直接运行！\n' +
    '反馈渠道\n' +
    '如果您在使用过程中遇到问题，请通过以下方式反馈：\n' +
    '\n' +
    '​商业用户或ComfyUI教师​：请在帮助-联系我们中添加晨羽的客服或交流群，问题将优先解决。\n' +
    '​个人用户​：请添加QQ群945602104并告知问题。\n' +
    '2025.04.24更新日志\n' +
    '更新内容\n' +
    '​**万相模型补全！**​：Phantom-Wan， UniAnimate-Wan， Wan2_1-FLF2V，及相关模型。\n' +
    '​工作流加密节点​：晨羽工作流加密。\n' +
    '2025.04.08更新日志\n' +
    '更新内容\n' +
    '​**增加主流加速节点！**​：Nunchaku！ Teacache，WaveSpeed。 体验起飞的flux生图速度吧\n' +
    '2025.04.03更新日志\n' +
    '更新内容\n' +
    '​增加SD3.5相关模型​：sd3.5_large.safetensors，sd3.5vae, sd3.5controlnet_canny, sd3.5controlnet_depth, sd3.5controlnet_blur。\n' +
    '2025.04.01更新日志\n' +
    '更新内容\n' +
    '​更新到最新版Comfyui​：适配更多的新特性。\n' +
    '​安装Wan相关节点和大量相关模型​：方便大家便捷的体验视频生成的魅力。\n' +
    '2025.01.21更新日志\n' +
    '1.更新ComfyUI-Advanced-ControlNet适配新版本主体\n' +
    '2.新增RMBG插件及模型\n' +
    '3.Leffa插件及模型\n' +
    '4.内置添加一些视频/换装工作流\n' +
    '5.修复已知问题\n' +
    '\n' +
    '2025.01.15更新日志\n' +
    '1.所有插件更新\n' +
    '2.支持krita直接连接，所有模型都已经对应\n' +
    '3.增加对CogVideo视频相关的支持\n' +
    '4.支持英伟达最新Cosmos的支持\n' +
    '5.修复已知问题\n' +
    '\n' +
    '2024.11.26更新日志\n' +
    '全面优化目录结构\n' +
    '持久化存储输出目录\n' +
    '简化了模型上传​\n' +
    '修复了部分joycaption的报错\n' +
    '2024.11.13更新日志\n' +
    '修复webos有概率无法启动的问题\n' +
    '新增了部分模型\n' +
    '修复了一些原有插件的问题\n' +
    '2024.11.1更新日志\n' +
    '更新内容\n' +
    '​全面升级ComfyUI前后端​：确保用户能够体验到最新的功能和改进。\n' +
    '​持久化输出目录​：方便用户管理和查找生成的作品。\n' +
    '​新增个人上传unet目录​：用户可以更方便地管理自己的unet模型。\n' +
    '​默认启动汉化​：为中文用户提供更好的使用体验。\n' +
    '​默认关闭不适配的插件​：\n' +
    'ComfyUI-Sixgod_Prompt：因不适配新版前端而默认关闭。\n' +
    'ComfyUI-VideoHelperSuite：因影响网页加载速度而默认关闭。\n' +
    '​新增多个插件​：\n' +
    'Comfyui_CXH_joy_caption\n' +
    'ComfyUI-Fluxtapoz\n' +
    'ComfyUI_HF_Servelress_Inference\n' +
    'ComfyUI-PuLID-Flux-Enhanced\n' +
    'As_ComfyUI_CustomNodes\n' +
    'Comfyui_TTP_Toolset\n' +
    'pre_cfg_comfy_nodes_for_ComfyUI\n' +
    'ComfyUI-Long-CLIP\n' +
    'PowerNoiseSuite\n' +
    'PPF_Noise_ComfyUI\n' +
    'Comfyui-ergouzi-Nodes\n' +
    'ComfyUI-FluxTrainer\n' +
    'ComfyUI-Molmo\n' +
    '2024.10.10更新日志\n' +
    '更新内容\n' +
    '​优化模型目录​：现在可以将大模型和lora存储到/usrdata，并且每次启动时都可挂载。\n' +
    '​模型选择优化​：在ComfyUI中选择模型时，请选择private/{model_name}，其中model_name是上传的文件名。\n' +
    '2024.10.1更新日志\n' +
    '更新内容\n' +
    '​更新本体和所有插件​：确保软件的稳定性和功能完整性。\n' +
    '​设置默认中文和默认英文版本​：zh结尾的为中文版本，方便不同语言用户使用。\n' +
    '​优化排版和润色​：提升用户阅读体验。\n' +
    '2025.04.02更新日志\n' +
    '更新内容\n' +
    '​增加deepseek相关模型​：Janus-Pro-7B和Janus-Pro-1B模型增加。')
onMounted(() => {
  const vditor = new Vditor('vditor', {
    mode: 'sv',
    theme: 'classic',
    height: '70vh',
    width: '80vw',
    lang: 'zh_CN',
    placeholder: '此处为话题内容……',
    counter: {
      enable: true,
      type: 'markdown'
    },
    preview: {
      delay: 0,
      hljs: {
        style: 'monokai',
        lineNumber: true
      }
    },
    tab: '\t',
    typewriterMode: true,
    toolbarConfig: {
      pin: true
    },
    cache: {
      enable: false
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'edit-mode',
      'code-theme',
      'export',
      {
        name: 'more',
        toolbar: [
          'fullscreen',
          'both',
          'preview',
          'info',
          'help',
        ],
      }],
    value:data.value,
  })
})
</script>

<style scoped>
/* 如果组件内需要自定义修改可覆盖样式 */
#vditor {
  @apply rounded-lg shadow-md border border-gray-200;
}
</style>