<template>
	<div class="container">
		<div class="header-fixed">
    </div>

		<div class="adDatailsDiv body-adjust">
			<div class="couponslist" id="couponslist">
				<div class="couponsItem">
					<ul>
						<li>
							<img :src="picPath" />
							<!--<p class="couTitle">{{ item.title }}</p>
											<p class="couTime">有效期至{{ item.downEndTime | capitalizeDate2 }}</p>
											<p class="couGet">领取卡券</p>-->
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="couponsItem" id="couponsItem">
			<div class="couponName">{{ sendTitle }}</div>
			<div class="couponCount">发行数量 :
				<span>{{ sendCount }}</span>张</div>
			<div class="couponLast">剩余数量 :
				<span>{{ downCount }}</span>张</div>
			<div class="couponTime">领取时间 : {{ downStartTime | capitalizeDate }} - {{ downEndTime | capitalizeDate }}</div>
			<div id="getCoupons" @click='getCoupons()'>立即领取</div>
		</div>
		<div class="couponsItem" id="couponsItemDiscount">
			<div class="couponName">优惠券详情</div>
			<div v-html='couponsContent'></div>
		</div>
	</div>
</template>

<script>
import * as service from '@/api/service';

export default {
  name: 'specialOffersCoupons',

  data() {
    return {
      activityDetails_list: [],
      picPath: '',
      adTitle: '',
      sTime: '',
      eTime: '',
      overTime: false,
      couponslist: [],
      sendTitle: '',
      sendCount: '',
      downCount: '',
      downStartTime: '',
      downEndTime: '',
      couponsContent: '',
    };
  },

  mounted() {
    this.activityDetailsList();
  },

  methods: {
    async activityDetailsList() {
      const data = await service.couponsIndex({
        id: this.$route.params.id,
      });

      data.result.info.picPath = `http://woxfile.oss-cn-shenzhen.aliyuncs.com/uploadfile/goods/${data.result.info.picPath}`;
      this.picPath = data.result.info.picPath;
      this.couponslist = data.result.info;
      this.sendTitle = data.result.info.title;
      this.sendCount = data.result.info.sendCount;
      this.downCount = data.result.info.downCount;
      this.downStartTime = data.result.info.downStartTime;
      this.downEndTime = data.result.info.downEndTime;
      this.couponsContent = data.result.info.couponsContent;
    },

    async getCoupons() {
      await service.couponsIndex({
        id: this.$route.params.id,
      });

      this.$MessageBox('恭喜您', '卡券领取成功');

      this.$router.push({ name: 'card' });
    },
  },
};
</script>


<style lang="scss" scoped>
@import 'src/assets/style/mixin.scss';

.adDatailsDiv {
	margin: 20px rem(30) rem(10);
}

.adName {
	font-size: 15px;
	font-weight: 700;
}

.adMain {
	// text-indent: rem(30);
	color: #676767;
	margin-top: rem(15);
	font-size: 14px;
}

.adLeft {
	width: 68%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.over {
	color: #ef4f51;
	font-size: 16px;
	margin-top: 10px;
	font-weight: 700;
}

.couponslist {
	margin-top: rem(20);
	//  padding: rem(50) 0;
	// background: url(../../assets/image/cBg.jpg) no-repeat scroll;
	background-size: cover;
}

#couponslist {
	padding: rem(30) 0;
	margin-bottom: rem(20);
}

#couponsItemInfo li {
	height: rem(222);
	background: url(./image/cardBg.jpg) no-repeat scroll;
	background-size: 100% 100%;
	color: #fff;
	margin-bottom: rem(13);
	position: relative;
}

.couponsItem {
	//  height: rem(235);
	//  overflow: scroll;
}

.couTitle,
.couTime,
.couGet {
	position: absolute;
	z-index: 99;
	color: #fff;
}

.couTitle {
	top: 40%;
	left: rem(45);
	-webkit-transform: translate3d(0, -50%, 0);
	-moz-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
	font-size: 18px;
}

.couTime {
	left: rem(45);
	bottom: 5px;
	font-size: 12px
}

.couGet {
	width: 15px;
	font-size: 14px;
	right: rem(85);
	top: 50%;
	-webkit-transform: translate3d(0, -50%, 0);
	-moz-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.couTitle,
.couTime {
	width: 55%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.couponsItem {
	font-size: 15px;
	padding: rem(50) rem(30);
}

.couponsItem div,
.couponsItem li {
	margin-bottom: rem(10);
	color: #676767;
}

.couponName {
	font-size: 17px;
	font-weight: 700;
	color: #000!important;
	margin-bottom: rem(15)!important;
}

.couponsItem span {
	color: #f24f50;
	display: inline-block;
	margin: 0 rem(5);
}

#couponsItem {
	height: auto;
	padding: 0 rem(30);
}

#getCoupons {
	width: rem(280);
	height: rem(60);
	line-height: rem(60);
	text-align: center;
	color: #fff;
	font-size: 16px;
	margin: rem(70) auto rem(70);
	background-color: #000;
}

.noAct {
	padding: rem(25) 0;
	text-align: center;
	font-size: 16px;
	height: rem(350);
	line-height: rem(400);
}

@-webkit-keyframes slideLeft {
	from {
		right: -100%;
	}
	to {
		right: 0;
	}
}

@keyframes slideLeft {
	from {
		right: -100%;
	}
	to {
		right: 0;
	}
}

.slideLeft {
	-webkit-animation: slideLeft .5s ease;
	-moz-animation: slideLeft .5s ease;
	animation: slideLeft .5s ease;
}
</style>
