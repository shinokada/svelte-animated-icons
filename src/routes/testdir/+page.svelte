<script lang="ts">
  import BeakerCustom from "$lib/custom/BeakerCustom.svelte";
  import { AddColumnAfterFlowbite, AddColumnBeforeFlowbite } from "$lib";
</script>

<div class="flex flex-col items-center justify-center">
  <h2>BeakerCustom</h2>
<BeakerCustom size={50}/>

<h2>AddColumnAfterFlowbite</h2>

<AddColumnAfterFlowbite size={50} event="hover" />
<AddColumnAfterFlowbite size={50} event="click" />
<AddColumnAfterFlowbite size={50} event="none" />
<button type="button" class="flex items-center">
  <AddColumnAfterFlowbite 
    size={50} 
    event="click" 
  />
  Add Column
</button>

<AddColumnBeforeFlowbite
  event="click" />


  <AddColumnAfterFlowbite
    event="none" />

    <AddColumnBeforeFlowbite
  size={58}
  color="#6928e2"
  event="none" />
</div>




