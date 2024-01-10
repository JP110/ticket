<template>
  <div class="flex flex-col w-fit m-auto">
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="email">Email</label>
      <input class="border m-3 w-8/12" type="email" v-model="formData.email" placeholder="monemail@gmail.com" name="email">
    </div>
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="category">Category</label>
      <select class="m-3 w-8/12" v-model="formData.category" name="category">
        <option disabled value="">--Please choose an option--</option>
        <option value="furniture">furniture</option>
        <option value="computer">computer</option>
        <option value="other">other</option>
      </select>
    </div>
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="description">Description</label>
      <input class="border m-3 w-8/12" type="text" v-model="formData.description" placeholder="description" name="description">
    </div>
    <div class="flex justify-between">
      <label class="m-3 w-4/12" for="priority">Priority</label>
      <select class="m-3 w-8/12" v-model="formData.priority" name="priority">
        <option disabled value="">--Please choose an option--</option>
        <option value="low">low</option>
        <option value="normal">normal</option>
        <option value = "high">high</option>
      </select>
    </div>
    <div class="flex justify-end">
      <button @click="submitForm" :disabled="isFormValid" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200" type="submit">Valider</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { computed } from "vue"

  const formData = ref ({
    email: "",
    category: "",
    description: "",
    priority: "",
  })

  const isEmailValid = computed ( () => {
    const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return re.test(formData.value.email)
  })

  const isDescriptionValid = computed ( () => !!formData.value?.description )

  const isCategoryValid = computed ( () => !!formData.value.category )

  const isPriorityValid = computed ( () => formData.value.priority )

  const isFormValid = computed ( () => {
    return !(isEmailValid.value && isDescriptionValid.value && isCategoryValid.value && isPriorityValid.value)
  })

  
async function submitForm() {
  // Les options par défaut sont indiquées par *
  const response = await fetch("/api/ticket", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formData.value ), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
  }); 
}
   
</script>