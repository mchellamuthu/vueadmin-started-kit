<template>
    <div class="row py-5">
        <div class="col-md-6 mb-5">
            <h4>Plan Details</h4>
        </div>
         <div class="col-md-6 mb-5 text-right">
             
         </div>

         <div class="col-md-6 mt-2">
             <div class="card shadow-sm">
                 <div class="card-header">
                       {{ plan.name }}
                 </div>
                 <div class="card-body">
                     <div class="container-fluid">
                         <div class="row">
                             <div class="col-md-8">
                                 <table border="0" cellspacing="0">
                                    <tr>
                                        <th>Starting Date</th>
                                        <td>:</td>
                                        <td>{{ plan.starting_date }}</td>
                                    </tr>
                                    <tr>
                                        <th>Closing Date</th>
                                        <td>:</td>
                                        <td>{{ plan.closed_date }}</td>
                                    </tr>
                                    <tr>
                                        <th>Maximum users <br> per slot</th>
                                        <td>:</td>
                                        <td>{{ plan.max_users_per_slot }}</td>
                                    </tr>
                                    <tr>
                                        <th>Maximum winners <br> per slot</th>
                                        <td>:</td>
                                        <td>{{ plan.winners_per_slot }}</td>
                                    </tr>
                                </table>
                             </div>
                             <div class="col-md-4">
                                <img :src="plan.image" class="img-fluid">
                             </div>
                             <div class="col-md-12">
                                 <button class="btn btn-primary btn-block">DRAW NOW</button>
                             </div>
                         </div>
                     </div>
                     
                 </div>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    name : "PlanInfo",
    props:['id'],
    data() {
        return {
            plan : []
        }
    },
    mounted() {
        this.getPlan();
    },
    methods : {
        getPlan(){
            axios.get('/admin/plans/'+this.id)
            .then( (response)=> {
                this.plan = response.data.data;
            })
            .catch((error) =>{
            })
        },

        drawNow(){
            
        }
    }
};
</script>
