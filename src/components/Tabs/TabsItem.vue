<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-tabs
                bg-color="transparent"
                color="basil"
                grow
                >
                
                <v-tab class="nav-tabs">
                    <li class="nav-tab">
                        <router-link to="/tasks">Tasks</router-link>
                    </li>
                    <li class="nav-tab">
                        <router-link to="/categories">Categories</router-link>
                    </li>
                </v-tab>
            

                </v-tabs>

    
            </v-col>
        </v-row>

          

    </v-container>
</template>



<style>
.text-basil {
  color: #3f776f !important;
}
.v-tabs {
  display: flex;
  justify-content: center;
}
a {
text-decoration: none;}

.nav-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #e0e0e0; 

}
.nav-tab {
  margin: 0 10px;
}
.nav-tab a {
  color: #3d746b; 
  text-decoration: none;
  display: block;
  padding: 10px 15px;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.3s;
}
.nav-tab a.router-link-exact-active {
  border-bottom-color: #4d837b;
  font-weight: bold;
}


</style> 

