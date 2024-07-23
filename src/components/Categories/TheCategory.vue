<template>

    <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
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

                <v-btn>
                clear
                </v-btn>
            </div>

        </v-form>
    </v-sheet>

    
                
</template>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>