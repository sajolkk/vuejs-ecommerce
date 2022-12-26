<template>
    <div id="profile" class="col-md-12 px-3 mt-2 mb-5" >
        <div class="row">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item "><router-link to="/" class="text-decoration-none"><font-awesome icon="home" /></router-link></li>
                        <li class="breadcrumb-item "><a href="#" class="text-decoration-none text-capitalize">Account</a></li>
                    </ol>
                </nav>
            </div>
        </div>
        <div v-if="userInfo" class="col-xl-10 col-md-10 col-sm-12 col-12 offset-xl-1 offset-md-1">
            <div class="account w-100 float-start d-block bg-white rounded px-3 py-2">
                <div class="d-inline-block float-start user-img-area text-center" >
                    <img v-if="userInfo.user.image" :src="imageBaseUrl+userInfo.user.image" class="user-img" alt="customer">
                    <font-awesome v-else icon="user" class="user-icon"></font-awesome>
                </div>
                <div class="d-inline-block float-start ps-2">
                    <p class="mb-1">Hello,</p>
                    <p class="fw-bold h5">{{ userInfo.user.first_name }} {{ userInfo.user.last_name }}</p>
                </div>
                <div class="d-inline-block ps-2 float-end logout" @click="logout" title="Logout">
                    <font-awesome icon="right-from-bracket" class="p-2 logout-icon" ></font-awesome>
                </div>
            </div>
            <div class="row float-start w-100 mt-2 ms-0">
                <div class="col-xl-3 col-md-4 col-6 px-0 text-center ">
                    <router-link to="/account/profile" class="d-block nav-link border account-menu rounded m-1 bg-white py-3">
                        <font-awesome icon="user" class="account-menu-icon"></font-awesome>
                        <br>
                        My Profile
                    </router-link>
                </div>
                <div class="col-xl-3 col-md-4 col-6 px-0 text-center ">
                    <router-link to="/account/password-change" class="d-block nav-link border account-menu rounded m-1 bg-white py-3">
                        <font-awesome icon="lock" class="account-menu-icon"></font-awesome>
                        <br>
                        Password Change
                    </router-link>
                </div>
                <div class="col-xl-3 col-md-4 col-6 px-0 text-center ">
                    <router-link to="orders" class="d-block nav-link border account-menu rounded m-1 bg-white py-3">
                        <font-awesome icon="cart-arrow-down" class="account-menu-icon"></font-awesome>
                        <br>
                        My Orders
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'AccountView',
        props: ['userInfo','imageBaseUrl'],
        data(){
            return{
                user: '',
            }
        },
        methods:{
            logout(){
                this.$emit('logout');
            },
        },
        created(){
            // this.profile();
            // console.log('user')
        
        }
    }
</script>
<style scoped>
    .user-img-area{
        height: 60px; width: 60px; border-radius: 50%; background: #d5d8de;
    }
    .user-img{
        width: 50px;
        height: 50px;
        margin-top: 5px;
        border-radius: 50%;
    }
    .user-icon{
        font-size: 40px;
        margin-top: 6px;
        color: white;
    }
    .logout-icon{
        font-size: 40px;
    }
    .logout{
        width: 60px;
        height: 60px;
        color: white;
        background: #d5d8de;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
    }
    .account-menu{
        border: 1px solid gray;
    }
    .account-menu:hover{
        box-shadow: 0 0 2px 1px;
    }
    .account-menu-icon{
        font-size: 40px;
        background: #d5d8de;
        padding: 10px;
        border-radius: 50%;
    }
</style>