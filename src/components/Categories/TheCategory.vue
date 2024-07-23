<template>

    <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent ref="form">
            <p>Add a category</p>
            <v-text-field
            label="Name"
            ></v-text-field>

            <div class="button-container">
                <v-btn
                class="me-4"
                type="submit"
                >
                submit
                </v-btn>

                <v-btn @click="reset">
                clear
                </v-btn>
            </div>

        </v-form>
    </v-sheet>

    <the-category-table></the-category-table>
    
                
</template>

<script>
    import TheCategoryTable from './TheCategoryTable.vue'
    export default {
    components: { TheCategoryTable },
    methods: {
      reset() {
        this.$refs.form.reset()
      }
    }
    }
  </script>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>