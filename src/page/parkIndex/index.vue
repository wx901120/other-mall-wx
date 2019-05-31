<template>
  <div class="wx-parkIndex">
    <ParkInfo></ParkInfo>

    <ul class="park-func">
        <li class="func-line">
          <span class="func-item" @click="$router.push({ name: 'parkPlateNumber' })">我要缴费
            <em>PARKING<br>CARD</em>
          </span>
          <span class="func-item" @click="$router.push({ name: 'parkPaymentRecords' })">缴费记录
            <em>PARKING<br>CARD</em>
          </span>
        </li>
        <!-- <li class="func-line">
          <span class="func-item" @click="goRouter('parkSearch')">缴费记录
            <em>PARKING<br>CARD</em>
          </span>
          <span class="func-item" @click="goRouter('parkAddress')">查询停车位
            <em>PARKING<br>CARD</em>
          </span>
        </li> -->
      </ul>
    <!-- <ParkMenu>
      <ParkMenuItem title="我要缴费" @click.native="$router.push({ name: 'parkPlateNumber' })">
        <span class="i-icon i-icon-park-reservation"></span>
      </ParkMenuItem>
      <ParkMenuItem title="缴费记录" @click.native="$router.push({ name: 'parkPaymentRecords' })">
        <span class="i-icon i-icon-park-records"></span>
      </ParkMenuItem>
    </ParkMenu> -->
  </div>
</template>

<script>
import ParkInfo from './ParkInfo';
import ParkMenu from './ParkMenu';
import ParkMenuItem from './ParkMenuItem';

export default {
  name: 'parkIndex',

  components: {
    ParkInfo,
    ParkMenu,
    ParkMenuItem,
  }
}
</script>

<style lang="scss" scoped>
@include b(parkIndex) {
  min-height: 100vh;
  padding-top: rem(30);
  background-image: url('./image/parkIndex_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.park-func {
  // margin-top: rem(304);
  background-color: #fff;
  margin: 0 rem(10);

  .func-line {
    display: flex;
    align-items: center;
    margin: 0 rem(40);
    padding: rem(50) 0;
    height: rem(130);
    &:nth-child(n + 2) {
      border-top: 1px solid #787878;
    }
    .func-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: rem(36);
      width: 50%;
      height: rem(70);
      border-left: 1px solid #787878;
      font-size: rem(28);
      &:last-child {
        border-right: 1px solid #787878;
      }
      em {
        display: inline-block;
        padding-left: rem(10);
        width: rem(80);
        line-height: rem(20);
        font-size: rem(12);
        font-style: normal;
        margin-left: rem(10);
        color: #858585;
        border-left: 1px solid #666666;
      }
    }
  }
}
</style>
