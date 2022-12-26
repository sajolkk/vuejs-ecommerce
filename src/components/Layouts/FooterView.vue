<template>
    <div id="footer-area" class="col-md-12">
        <div class="row py-3">
            <div class="col-lg-4 col-md-4 col-sm-12 col-12 text-sm-center about">
                <h6 class="">Useful Links</h6>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">FAQ</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Location</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Affiliates</a></li>
                    <li class="nav-item"><a class="nav-link" href="">Contact</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-12 text-sm-center account">
                <h6 class="">ABOUT US</h6>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="#">My Account</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Discount</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Returns</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Orders History</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Order Tracking</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-12 text-sm-center contact">
                <h6 class="">STAY CONNECT WITH US</h6>
                <h5 class="">SOPMAX</h5>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <i class="ti-location-pin"></i>
                        <p class="nav-link">Shop# 18/B, bti Primer Plaza, Shahjadpur, Gulshan-2, Dhaka 1212.</p>
                    </li>
                    <li class="nav-item">
                        <i class="ti-email"></i>
                        <a class="nav-link" href="mailto:info@sitename.com">info@swapnolink.com</a>
                    </li>
                    <li class="nav-item">
                        <i class="ti-mobile"></i>
                        <p class="nav-link">+8801575397472</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row footer">
            <div class="col-md-6">
                <p class="mb-md-0 text-center text-md-left mt-2 text-white">© 2020 All Rights Reserved by Sopmax</p>
            </div>
            <div class="col-md-6">
                <!-- <ul class="footer_payment text-center text-lg-right">
                    <li><a href="#"><img src="assets/images/visa.png" alt="visa"></a></li>
                    <li><a href="#"><img src="assets/images/discover.png" alt="discover"></a></li>
                    <li><a href="#"><img src="assets/images/master_card.png" alt="master_card"></a></li>
                    <li><a href="#"><img src="assets/images/paypal.png" alt="paypal"></a></li>
                    <li><a href="#"><img src="assets/images/amarican_express.png" alt="amarican_express"></a></li>
                </ul> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
       name: 'FooterView', 
    }
</script>

<style scoped>
    #footer-area{
        background: #202325; color: white;
    }
    .logoimg{
        height: 60px;
    }
    .footer{
        background: #293A99;
    }
    @media screen and (min-width: 480px) and (max-width: 767px) {
        .account, .contact{
            margin-top: 30px; text-align: center;
        }
        .about{
            text-align: center;
        }
    }
</style>