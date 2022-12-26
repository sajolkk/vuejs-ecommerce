<template>
    <div id="product-detail" class="product-area col-md-12 px-3 mt-2 mb-5">
        <div class="row" v-if="questions" >
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none"><font-awesome icon="home" /></a></li>
                        <li class="breadcrumb-item "><router-link :to="/product-details/+[this.$route.params.product_slug+'/'+product_id]" class="text-decoration-none text-capitalize">{{ product_name.slice(0,20) }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Product Questions</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-12 mt-2" v-if="product">
                <h4 class="bg-white p-2 rounded" >{{ product.product_name }}</h4>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 mt-2" id="questions" >
                        <h5 class="mt-2 mx-1 bg-white mb-0"> 
                            <span class="d-inline-block ps-3 py-3" v-if="product">Questions ({{ product.questions.length }})</span>  
                            <span class="d-inline-block me-3 py-1 mt-2 btn buybtn-primary float-end" @click="QueRevModal('question')" >Ask Question</span>  
                        </h5>
                        <div class="mx-1 bg-white px-4 py-2 fw-bold ques-loop rounded mt-1" v-for="question in questions.data" :key="question.question_id" >
                            <div class="ques">
                                <div class="qtitle">Q:</div>
                                <div class="qdetail">
                                    {{ question.question }}
                                    <br>
                                    <small  class="fw-normal text-dark" >By {{ question.sender_name }}</small> <span class="fw-normal fst-italic"><small>on {{ monthNames[(new Date(question.created_at)).getMonth()] }} {{ (new Date(question.created_at)).getDate() }}, {{ (new Date(question.created_at)).getFullYear() }}</small></span>
                                </div>
                            </div>
                            <div class="ques">
                                <div class="qtitle mt-2">A:</div>
                                <div class="qdetail mt-2">
                                    {{ question.answare }}
                                    <div v-if="question.answare">
                                        <small  class="fw-normal" >By Sopmax</small >
                                    </div>
                                </div>                                
                            </div>                            
                        </div>
                    </div>
                    <div class="col-md-12" >
                        <div class="row row mx-1 mt-3 bg-white rounded py-2">
                            <div class="col-md-12">
                                <div v-if="questions.last_page>1" class="d-inline-block" >
                                    <div class="d-inline-block" v-if="questions.current_page == 1">
                                        <button class="btn btn-sm btn-success me-2 mt-1 page-btn" >PREV</button>
                                    </div>
                                    <div class="d-inline-block" v-else>
                                        <button class="btn btn-sm btn-success me-2 mt-1 page-btn" @click="paginationFilterPro(questions.current_page-1)" >PREV</button>
                                    </div> 
                                    <div class="d-inline-block" v-for="page in questions.last_page" :key="page">
                                        <button v-if="(page>(questions.current_page-4)) && (page<(questions.current_page+4))" class="btn btn-sm link-btn me-2 mt-1" :class="page == questions.current_page? 'link-active':''"  @click="paginationFilterPro(page)"  >{{ page }}</button>
                                    </div>
                                    <div class="d-inline-block" v-if="questions.current_page == questions.last_page">
                                        <button class="btn btn-sm btn-success mt-1 page-btn" >NEXT</button>
                                    </div>
                                    <div class="d-inline-block" v-else>
                                        <button class="btn btn-sm btn-success mt-1 page-btn" @click="paginationFilterPro(questions.current_page+1)" >NEXT</button>
                                    </div>
                                </div>
                                <div class="page-number d-inline-block float-end">
                                    <p class="mt-1 mb-0" ><small class="fw-bold page-btn">Showing {{ questions.from }} to {{ questions.to }} of {{ questions.total }} ({{ questions.last_page }} {{ questions.last_page>1? 'Pages':'Page' }})</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    <!-- comment or question modal -->
        <div class="modal fade" :class="commentModalShow" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title fw-bold text-capitalize" id="staticBackdropLabel">Write {{ modalTitle }}</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="commentModalClose()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="pro" class="fw-bold mb-0">Product</label>
                            <input v-if="product" type="text" id="pro" class="form-control" readonly :value="product.product_name">
                        </div>
                        <div class="form-group mt-3" v-if="modalTitle == 'review'">
                            <label for="pro" class="fw-bold mb-0">Rating <small class="text-danger">*</small></label>
                            <div class="d-block">
                                <font-awesome icon="star" :class="one"  class="me-3" @click="star(1)" />
                                <font-awesome icon="star" :class="tow"  class="me-3" @click="star(2)" />
                                <font-awesome icon="star" :class="three" class="me-3" @click="star(3)" />
                                <font-awesome icon="star" :class="four"  class="me-3" @click="star(4)" />
                                <font-awesome icon="star" :class="five"  class="" @click="star(5)" />
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <label for="quRe" class="text-capitalize mb-0 fw-bold">{{ modalTitle }} <small class="text-danger">*</small></label>
                            <textarea name="" id="" cols="30" class="form-control" rows="5" :placeholder="'Write your '+modalTitle" v-model="form.msg"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="msgSubmit()">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="commentModalClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- login modal -->
        <div class="modal fade" :class="loginModal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered loginmodal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title fw-bold text-capitalize" id="staticBackdropLabel">Account Login</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="loginModalClose()"></button>
                    </div>
                    <div class="modal-body">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="loginModalClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default{
    name: 'ProductQuestions',
    props: ['imageBaseUrl','userInfo'],
    data(){
        return{
            product_id: this.$route.params.product_id,
            product_name: this.$route.params.product_slug.replace(/-/g,' '),
            product: '',
            questions: '',
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],           
            buyModalShow: 'show d-block',            
            form: {
                msg: '',
                rating: 0,
            },            
            commentModalShow: '',
            loginModal: '',
            modalTitle: '',
            one: '',
            tow: '',
            three: '',
            four: '',
            five: '',
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
        getQuestion(){
            var formData = {
                'product_id': this.product_id,
                'page': 1,
            };
            this.$store.dispatch('getQuestinos',formData).then(response => {
                this.questions = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        getProduct(){
            this.$store.dispatch('productDetailf',this.product_id).then(response => {
                this.product = response.data;     
            })
            .catch(error => {
                console.log(error);
            });
        },
        paginationFilterPro(page){
            var formData = {
                'product_id': this.product_id,
                'page': page,
            };
            this.$store.dispatch('getQuestinos',formData).then(response => {
                this.questions = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
                QueRevModal(val){ 
            this.modalTitle = val;      
            this.one = '';
            this.tow = '';
            this.three = '';
            this.four = '';
            this.five = '';     
            this.form.rating = 0;
            this.form.msg = '';
            if (this.userInfo) {
                this.commentModalShow = 'show d-block';                
            } else {
                this.loginModal = 'show d-block';
            }
        },
        commentModalClose(){
            this.commentModalShow = '';
        },
        loginModalClose(){
            this.loginModal = '';
        },
        star(id){
            if (id == 1) {
                this.one = 'text-success';
                this.tow = '';
                this.three = '';
                this.four = '';
                this.five = '';
            } else if(id == 2) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = '';
                this.four = '';
                this.five = '';
            }else if(id == 3) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = '';
                this.five = '';
            }else if(id == 4) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = 'text-success';
                this.five = '';
            }else if(id == 5) {
               this.one = 'text-success';
                this.tow = 'text-success';
                this.three = 'text-success';
                this.four = 'text-success';
                this.five = 'text-success';
            }
            this.form.rating = id;
        },
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
                        this.commentModalShow = 'show d-block';
                        this.loginModal = '';
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
        msgSubmit(){
            var error = '';
            if (this.modalTitle == 'review') {
                let reviewData = {
                    'product_id' : this.product.product_id,
                    'message' : this.form.msg,
                    'rating' : this.form.rating,
                    'reviewer_name' : this.userInfo.user.first_name+' '+this.userInfo.user.last_name,
                    'email' : this.userInfo.user.email,
                }
                if (reviewData.message == '') {
                    error += '<p class="text-danger mb-0">Review is required!</p>';
                }
                if (reviewData.rating == 0) {
                    error += '<p class="text-danger mb-0">Rating is required!</p>';
                }
                if (error.length) {
                    this.$swal({
                        title: 'Warning!',
                        icon: 'error',
                        html: error,
                    });
                } else {
                   this.$store.dispatch('reviewStore',reviewData).then(response => {
                        if (response.status == 201) {
                            this.commentModalShow = '';
                            this.$swal({
                                title: 'success!',
                                icon: 'success',
                                text: response.data,
                            });
                        } else {
                            this.$swal({
                                title: 'Warning!',
                                icon: 'error',
                                text: response.data,
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    }); 
                }                
            } else {
                if (this.form.msg.length) {
                    let questionData = {
                        'product_id' : this.product.product_id,
                        'question' : this.form.msg,
                        'sender_name' : this.userInfo.user.first_name+' '+this.userInfo.user.last_name,
                        'email' : this.userInfo.user.email,
                    }

                    this.$store.dispatch('questionStore',questionData).then(response => {
                        if (response.status == 201) {
                            this.commentModalShow = '';
                            this.$swal({
                                title: 'success!',
                                icon: 'success',
                                text: response.data,
                            });
                        } else {
                            this.$swal({
                                title: 'Warning!',
                                icon: 'error',
                                text: response.data,
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }else{
                    error += '<p class="text-danger mb-0">Question is required!</p>';
                    this.$swal({
                        title: 'Warning!',
                        icon: 'error',
                        html: error,
                    });
                }
            }
        }
       
    },
    created(){
        this.getQuestion();
        this.getProduct(); 

    }

}
</script>
<style scoped>
    .gallary-img{
        height: 50px; width: 50px; border: 1px solid lightgray; padding: 5px; margin: 1px;
    }
    .price-bg{
        background: #f1f1f3d1;
    }
    .buybtn-primary{
        background: #293A99;
        color: white;
    }
    .buybtn-primary:hover{
        box-shadow: 0px 3px 3px 1px darkblue;
        color: #fffcfccc;
    }
    .btn-secondary:hover{
        box-shadow: 0px 3px 3px 1px #648fb9;
        color: #fffcfccc;
    }
    .loupe {
        display: none;
        position: absolute;
        width: 400px;
        height: 400px;
        border: 1px solid black;
        box-shadow: 5px 5px 12px black;
        background: rgba(0, 0, 0, 0.25);
        cursor: crosshair;
        overflow: hidden;
        right: 0;
        top: 0
    }
    .loupe img {
        position: absolute;
        right: 0;
    }
    .speci-btn{
        border: none; border-radius: 5px; background: white;
    }
    .sactive{
        background: #293a99; color: white;
    }
    .speci-btn:hover{
        background: #293a99; color: white;
    }
    .data-table{
        width: 100%;
    }
    .ques-loop{
        display: block; height: auto;
    }
    .ques{
        width: 100%; display: flex; height: auto;
    }
    .qtitle{
        width: 30px; float: left; height: auto;
    }
    .qdetail{
        width: auto; float: right; height: ;
    }
    .link-btn{
        background: #1934cfad;
        color: white;
    }
    .link-active{
        background: #00008bc7;
        box-shadow: 0px 0px 4px 1px #1934cf;
    }
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
    .loginmodal{
        width: 450px;
    }
</style>