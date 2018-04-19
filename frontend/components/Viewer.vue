<template>
        <div>
            
              <iframe width="100%" height="800" src="https://sketchfab.com/models/fddf32084d5b4633874e674d393f4df5/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="" onload="resizeIframe(this)">
              </iframe>
            </div>
        </div>
</template>


<script>
export default {
  props: [],
  data () {
  return {
    }
  }
}

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }
</script>