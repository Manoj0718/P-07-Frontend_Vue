<template>
    <div class="file is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" @change="onFileSelected" />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a image…
          </span>
        </span>
      </label>
    </div>
</template>

<script>
export default {
    name:'UploadFile',
    data() {
        return{

        }
    }
}
</script>