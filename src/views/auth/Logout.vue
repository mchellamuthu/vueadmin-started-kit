<template>
    
</template>
<script>
export default {
    name : "Logout",
    data(){
        return {}
    },
    mounted() {
        this.logout();
    },
    methods : {
        logout(){
            axios.post('api/logout').then((response)=>{
                console.log('logout.resposne ==>',response.data);
                this.$store.dispatch('logout');
                this.$router.push({ path:"/login"});
            });
            
        }
    }
}
</script>
