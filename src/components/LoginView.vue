<template>
  <div class="login col-md-12 px-3 mt-2 mb-5 mx-auto" @keyup.enter="login">
    <div class="row">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                    <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Account Login</a></li>
                </ol>
            </nav>
        </div>
    </div>
    <form class="login-area d-block mx-auto border rounded">
        <div class="form-group row mx-0">
            <div class="col-6 py-2 text-center log " :class="mobile? 'activelog':''" @click="loginType">Login With Mobile</div>
            <div class="col-6 py-2 text-center log" :class="!mobile? 'activelog':''" @click="loginType">Login With E-mail</div>
        </div>
        <div class="p-3">
            <div class="form-group mt-3">
                <label for="" class="">{{ mobile? 'Mobile':'E-mail' }}:</label>
                <input type="text" v-model="loginForm.user_name" class="form-control" :class="mobile? 'ps-5':''" :placeholder="mobile? 'Enter mobile number':'Enter e-mail address'" >
                <span v-if="mobile"  class="mobile">+88</span>
            </div>
            <div class="form-group mt-3">
                <label for="" class="d-block">Password: <a class="float-end nav-link p-0 forgot d-inline-block" >Forgot Password?</a></label>
                <input type="password" v-model="loginForm.password" class="form-control" placeholder="Enter password" >
            </div>
            <div class="form-group row">
                <div class="col-6 mt-3">
                    <button type="reset" class="btn btn-primary col-12">Clear</button>                
                </div>
                <div class="col-6 mt-3">
                    <button type="button" class="btn btn-primary col-12" @click="login" >Login</button>                
                </div>
            </div>
            <div class="form-group mt-4 text-center">
                <p>Don't have an account?</p>
            </div>
            <div class="form-group">
                <router-link to="/register" class="btn btn-primary col-12">Create New Account</router-link>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data(){
    return{
        mobile: true,
        loginForm: {
            user_name: '',
            mobile: '',
            email: '',
            password: '',
        },
    }
  },
  methods:{
    loginType(){
        this.mobile = !this.mobile;
        this.loginForm.user_name = '';
        this.loginForm.mobile = '';
        this.loginForm.email = '';
        this.loginForm.password = '';
    },
    login(){
        var error = '';        
        if (this.mobile) {
            const mobExp = /^[0-9]*$/;
            this.loginForm.mobile = this.loginForm.user_name;
            if (this.loginForm.mobile == '') {
                error += '<p class="text-danger mb-0">Mobile number is required!</p>';
            }else if (mobExp.test(this.loginForm.mobile) == false) {
                error += '<p class="text-danger mb-0">Only number is allowed!</p>';
            }else if(this.loginForm.mobile.length < 11 || this.loginForm.mobile.length > 11){
                error += '<p class="text-danger mb-0">Mobile number is invalid!</p>';
            } 
        } else {
            const emailRegex = RegExp(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );            
            this.loginForm.email = this.loginForm.user_name;
            if(this.loginForm.email == ''){
                error += '<p class="text-danger mb-0">E-mail is required!</p>';
            }else if (!emailRegex.test(this.loginForm.email)) {
                error += '<p class="text-danger mb-0">E-mail is invalid!</p>';
            }            
        }
        if(this.loginForm.password == ''){
            error += '<p class="text-danger mb-0">Password is required!';
        }else if(this.loginForm.password.length <6){
            error += '<p class="text-danger mb-0">Enter at least 6 digits password!</p>';
        }
        if(error != ''){
            this.$swal({
                title: 'REQUIRED!',
                icon: 'error',
                html: error,
            });
        }else{
            this.$store.dispatch("UserLogin",this.loginForm).then(response => { 
                if (response.status == 200) {
                    this.$emit('loginReload');
                    // this.$router.push('account');
                    this.$router.back();
                   
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
  mounted(){
    let user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
        this.$router.back();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login-area{
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
</style>
