<template>

    <v-sheet class="mx-auto" width="300">
        <v-form fast-fail v-model="valid" @submit.prevent="submitForm" ref="form">
            <p>Add a category</p>
            <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
            required
            ></v-text-field>

            <div class="button-container">
                <v-btn
                class="me-4"
                type="submit"
                :disabled="!valid"
                >
                submit
                </v-btn>

                <v-btn @click="reset">
                clear
                </v-btn>
            </div>

        </v-form>
    </v-sheet>
 
</template>

<script>
    import { useCategoryStore } from '@/stores/useCategoryStore';
    export default {
      data() {
        return {
          name: '',
          valid: false,
          nameRules: [
          value => {
            if (value) return true

            return 'Name is required.'
          }
        ]
        };
      },
      methods: {
        submitForm() {
          if (this.$refs.form.validate()) {
            const categoryStore = useCategoryStore();
            if (this.name) {
              categoryStore.addCategory(this.name);
              this.reset();
            }
          }
        },
        reset() {
          this.$refs.form.reset()
          this.valid = false
        }
      }
    }
  </script>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>