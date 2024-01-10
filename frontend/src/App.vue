<script setup>
import {ref} from 'vue'
const formData = ref ( {
  email: '',
  category: '',
  description: '',
  priority: '',
})

// handle sign out
const submitForm = function (e) { console.log(formData.value.email)
// submit sign out here
}
</script>

<template>
  <form class="w-fit m-auto " @submit.prevent="submitForm">
    <div class="flex justify-between mb-4">
      <label class="w-4/12"  for="email">Email</label>
      <input class="border w-8/12" name = "email"  v-model="formData.email">
    </div>
    
    <div class="flex justify-between mb-4">
      <label class="w-4/12" for="category">Category</label>
      <select class="w-8/12" name="category" v-model="formData.category">
        <option disabled value="">Choisissez</option>
        <option>Mobilier</option>
        <option>Informatique</option>
        <option>Autre</option>
    </select>
    </div>
    <div class="flex justify-between mb-4">
      <label class="w-4/12" for="description">Description</label>
      <input class="border w-8/12" name="description"  v-model="formData.description">
    </div>
    <div class="flex justify-between mb-4">
      <label class="w-4/12" for="urgence">Priority</label>
      <select class="w-8/12" name="urgence" v-model="formData.priority">
        <option disabled value="">Choisissez</option>
        <option>Faible</option>
        <option>Normale</option>
        <option>Haute</option>
    </select>
    </div>
   <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Valider</button>
</form>
  
</template>

