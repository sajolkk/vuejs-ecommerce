<template>
  <div class="register col-md-12 px-3 mt-2 mb-5 mx-auto" @keyup.enter="update">
    <div class="row">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                    <li class="breadcrumb-item "><router-link to="/account" class="text-decoration-none text-capitalize">Account</router-link></li>
                    <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Profile</a></li>
                </ol>
            </nav>
        </div>
    </div>
    <form class="register-area d-block mx-auto border rounded">
        <div class="p-3">
            <div class="form-group mt-3 row mx-0">                
                <p class="border-bottom">
                    <span class="d-inline-block h4 ">Password Change Form</span>
                </p>
            </div>
            <div class="form-group mt-3">
                <label for="password" class="d-block">Old Password:</label>
                <input :type="eye? 'text':'password'" v-model="registerForm.old_password" class="form-control" placeholder="Enter old password" >
                <font-awesome :icon="eye? 'eye':'eye-slash'" class="pass" @click="eye = !eye"></font-awesome>
            </div>
            <div class="form-group mb-0">
                <label for="password" class="d-block">New Password:</label>
                <input :type="new_eye? 'text':'password'" v-model="registerForm.new_password" class="form-control" placeholder="Enter new password" >
                <font-awesome :icon="new_eye? 'eye':'eye-slash'" class="pass" @click="new_eye = !new_eye"></font-awesome>
            </div>
            <div class="form-group mb-0">
                <label for="password" class="d-block">Confirm Password:</label>
                <input :type="con_eye? 'text':'password'" v-model="registerForm.confirm_password" class="form-control" placeholder="Enter confirm password" >
                <font-awesome :icon="con_eye? 'eye':'eye-slash'" class="pass" @click="con_eye = !con_eye"></font-awesome>
            </div>
            <div class="form-group row mb-3">
                <div class="col-4 ">
                    <button type="reset" class="btn btn-info col-12">Clear</button>                
                </div>
                <div class="col-4 ">
                    <router-link to="/account" class="btn btn-danger col-12" >Cancel</router-link>                
                </div>
                <div class="col-4 ">
                    <button type="button" class="btn btn-primary col-12" @click="update" >Update</button>                
                </div>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
    export default{
        name: 'PasswordChange',
        props: ['userInfo'],
        data(){
            return{
                eye: false,
                new_eye: false,
                con_eye: false,
                registerForm: {
                    customer_id: this.userInfo.user.customer_id,
                    old_password: '',
                    new_password: '',
                    confirm_password: '',
                },
            }
        },
        methods:{
            update(){
                var error = '';    
                if(this.registerForm.old_password == ''){
                    error += '<p class="text-danger mb-0">Old password is required!';
                }
                if(this.registerForm.new_password == ''){
                    error += '<p class="text-danger mb-0">New password is required!</p>';
                }else if(this.registerForm.new_password.length <6){
                    error += '<p class="text-danger mb-0">Enter at least 6 digits password!</p>';
                }
                if(this.registerForm.new_password == ''){
                    error += '<p class="text-danger mb-0">Confirm password is required!</p>';
                }else if(this.registerForm.new_password.length <6){
                    error += '<p class="text-danger mb-0">Enter at least 6 digits password!</p>';
                }else if(this.registerForm.new_password !== this.registerForm.confirm_password){
                    error += '<p class="text-danger mb-0">New password and confirm password do not match!</p>';
                }
                if(error != ''){
                    this.$swal({
                        title: 'REQUIRED!',
                        icon: 'error',
                        html: error,
                    });
                }else{
                    this.$store.dispatch("passwordUpdate",this.registerForm).then(response => { 
                        if (response.status == 200) {
                            var suc = '<p class="text-success mb-0">'+response.data+'</p>';
                            this.$swal({
                                title: 'Success!',
                                icon: 'success',
                                html: suc,
                            });
                            this.$router.push('/account');
                        }else{
                            var error = '<p class="text-danger mb-0">'+response.data+'</p>';
                            this.$swal({
                                title: 'Warning!',
                                icon: 'error',
                                html: error,
                            });
                        }    
                    })
                    .catch(error => {
                        console.log(error);
                    })
                } 
            },
        },
        created(){
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .register-area{
        width: 400px;
        background: #293a99;
        box-shadow: 0px 5px 10px 1px gray;
        color: white;
    }
    .forgot{
        color: white;
    }
    .forgot:hover{
        color: #adb5bd; cursor: pointer;
    }
    .log{
        border-bottom: 1px solid white; cursor: pointer;
    }
    .activelog{
        background: #02255a; border-bottom: none;
    }
    .mobile{
        position: relative;
        top: -30px;
        background: #f2f4f8;
        color: black;
        padding: 5px;
        left: 5px;
    }
    .pass{
        position: relative;
        top: -30px;
        background: #f2f4f8;
        color: black;
        padding: 5px;
        left: 90%;
        cursor: pointer;
    }
</style>
