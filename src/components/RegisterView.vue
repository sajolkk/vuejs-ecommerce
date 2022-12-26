<template>
  <div class="register col-md-12 px-3 mt-2 mb-5 mx-auto" @keyup.enter="register">
    <div class="row">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                    <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Account Register</a></li>
                </ol>
            </nav>
        </div>
    </div>
    <form class="register-area d-block mx-auto border rounded">
        <div class="p-3">
            <div class="form-group mt-3 row mx-0">
                <div class="col-6 px-0 pe-1">
                    <label for="first_name" class="mb-0 ">First Name:</label>
                    <input type="text" v-model="registerForm.first_name" id="first_name" class="form-control px-1" placeholder="Enter first name">
                </div>
                <div class="col-6 px-0 ps-1">
                    <label for="last_name" class="mb-0 ">Last Name:</label>
                    <input type="text" v-model="registerForm.last_name" id="last_name" class="form-control px-1" placeholder="Enter last name">
                </div>
            </div>
            <div class="form-group mt-3">
                <label for="email" class="">E-mail:</label>
                <input type="text" v-model="registerForm.email" id="email" class="form-control" placeholder="Enter email number" >
            </div>
            <div class="form-group mt-3">
                <label for="mobile" class="">Mobile:</label>
                <input type="text" v-model="registerForm.mobile" id="mobile" class="form-control ps-5" placeholder="Enter mobile number" >
                <span class="mobile">+88</span>
            </div>
            <div class="form-group mt-3">
                <label for="district_id" class=" mb-0">District:</label>
                <select  id="district_id" class="form-control form-select" v-model="registerForm.district_id" >
                    <option value="">Select District</option>
                    <option v-for="dis in districts" :key="dis.district_id" :value="dis.district_id">{{ dis.district_name }}</option>
                </select>
            </div>
            <div class="form-group mt-3">
                <label for="address" class="d-block">Address:</label>
                <input type="text" v-model="registerForm.address" class="form-control" placeholder="Enter address" >
            </div>
            <div class="form-group mt-3">
                <label for="post_code" class="d-block">Post Code:</label>
                <input type="text" v-model="registerForm.post_code" class="form-control" placeholder="Enter post code" >
            </div>
            <div class="form-group mt-3">
                <label for="password" class="d-block">Password:</label>
                <input :type="eye? 'text':'password'" v-model="registerForm.password" class="form-control" placeholder="Enter password" >
                <font-awesome :icon="eye? 'eye':'eye-slash'" class="pass" @click="eye = !eye"></font-awesome>
            </div>
            <div class="form-group row">
                <div class="col-6 mt-3">
                    <button type="reset" class="btn btn-primary col-12">Clear</button>                
                </div>
                <div class="col-6 mt-3">
                    <button type="button" class="btn btn-primary col-12" @click="register" >Register</button>                
                </div>
            </div>
            <div class="form-group mt-4 text-center">
                <p>Already have an account?</p> 
            </div>
            <div class="form-group">
                <router-link to="/login" class="btn btn-primary col-12">Go to Login</router-link>
            </div>
        </div>
    </form>
  </div>
</template>

<script>

export default {
    name: 'RegisterView',
    data(){
        return{
            districts: [],
            eye: false,
            registerForm: {
                first_name: '',
                last_name: '',
                mobile: '',
                email: '',
                address: '',
                password: '',
                post_code: '',
                district_id: '',
            },
        }
    },
    methods:{
        register(){
            var error = '';    
            const mobExp = /^[0-9]*$/;
            const emailRegex = RegExp(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ); 
            if (!this.registerForm.first_name.length) {
                error += '<p class="text-danger mb-0">First name is required!</p>';
            }
            if (!this.registerForm.last_name.length) {
                error += '<p class="text-danger mb-0">Last name is required!</p>';
            }             
            if(this.registerForm.email == ''){
                error += '<p class="text-danger mb-0">E-mail is required!</p>';
            }else if (!emailRegex.test(this.registerForm.email)) {
                error += '<p class="text-danger mb-0">E-mail is invalid!</p>';
            } 
            if (this.registerForm.mobile == '') {
                error += '<p class="text-danger mb-0">Mobile number is required!</p>';
            }else if (mobExp.test(this.registerForm.mobile) == false) {
                error += '<p class="text-danger mb-0">Only number is allowed!</p>';
            }else if(this.registerForm.mobile.length < 11 || this.registerForm.mobile.length > 11){
                error += '<p class="text-danger mb-0">Mobile number is invalid!</p>';
            }
            if (this.registerForm.district_id == '') {
                error += '<p class="text-danger mb-0">District is required!</p>';
            }
            if (!this.registerForm.address.length) {
                error += '<p class="text-danger mb-0">Address is required!</p>';
            }
            if (!this.registerForm.post_code.length) {
                error += '<p class="text-danger mb-0">Post code is required!</p>';
            }
            if(this.registerForm.password == ''){
                error += '<p class="text-danger mb-0">Password is required!';
            }else if(this.registerForm.password.length <6){
                error += '<p class="text-danger mb-0">Enter at least 6 digits password!</p>';
            }
            if(error != ''){
                this.$swal({
                    title: 'REQUIRED!',
                    icon: 'error',
                    html: error,
                });
            }else{
                this.$store.dispatch("Userregister",this.registerForm).then(response => { 
                    if (response.status == 201) {
                        var suc = '<p class="text-success mb-0">'+response.data+'</p><p class="text-success mb-0">Login in your account</p>';
                        this.$swal({
                            title: 'Success!',
                            icon: 'success',
                            html: suc,
                        });
                        this.$router.push('login');
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
        getDistrict(){
            this.$store.dispatch("getDistricts").then(response => {
                this.districts = response.data;
            }).catch(error => {
                console.log(error)
            })
        },
    },
    created(){
        this.getDistrict();
    },
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
