<template>
  <div class="wx-bindingCard">
    <!-- Header -->
    <TheHeader title="绑定实体卡"></TheHeader>

    <BindingCardForm>
      <!-- <i-field label="卡号："
               placeholder="请输入您的卡号"
               v-model="bindingCardForm.cardID"
               ></i-field> -->
      <i-field label="手机号："
               placeholder="请输入您的手机号"
               v-model="bindingCardForm.phone"></i-field>
      <i-field label="验证码："
               placeholder="输入验证码"
               class="wx-validCode is-valid"
               v-model="bindingCardForm.verificationCode"
               v-if="$route.query.bid !== '51'">
        <i-button type="gray"
                  class="wx-validBtn is-valid"
                  @click="onSendMsgCodeBinding()">{{!bindingCardHasSend ? '获取验证码' : '再次发送(' + bindingCardCodeTime + ')'}}</i-button>
      </i-field>
    </BindingCardForm>

    <!-- <ModelAgree>
      <MultiCheckBox v-model="isAgree">
        <template slot="endLabel">
          <span class="wx-agreeWrap__text1">我已阅读并同意遵守</span>
          <span class="wx-agreeWrap__text2">用户注册协议</span>
        </template>
      </MultiCheckBox>
    </ModelAgree> -->

    <!-- 按钮组 -->
    <div class="wx-bindingCard__btnGroup">
      <IButton size="large"
               type="red"
               @click="submitDataBinding()">提交</IButton>
    </div>
  </div>

</template>

<script>
import {
  TheHeader,
  IField,
  IRadio,
  IButton,
  IChecklist
} from "@/components/index.js";
import BindingCardForm from "./BindingCardForm";
import ModelAgree from "./ModelAgree";
import _ from "lodash";
import * as service from "@/api/service";

export default {
  name: "memberBindingCard",

  components: {
    TheHeader,
    IField,
    IRadio,
    IButton,
    IChecklist,
    BindingCardForm,
    ModelAgree
  },

  data() {
    return {
      bid: window.$bid,
      isAgree: false,
      bindingCardForm: {
        phone: "",
        cardID: "",
        verificationCode: "",
        userName: ""
      },
      bindingCardHasSend: false,
      bindingCardCodeTime: 60
    };
  },

  methods: {
    // 提交表单数据 - 绑定实体卡
    submitDataBinding: _.debounce(
      async function submitDataBinding() {
        const regexPhone = /^1[3456789]\d{9}$/; // 手机号码格式
        const regexBindingVerificationCode = /^[0-9]+$/; // 手机验证码格式

        //校验用户姓名
        // if (!this.bindingCardForm.userName) {
        //   this.$Toast("请输入您的姓名");
        //   return;


        // 校验卡号
        // if (!this.bindingCardForm.cardID) {
        //   this.$Toast("请填写您的卡号");
        //   return;
        // }

        // 校验手机号码
        if (!this.bindingCardForm.phone) {
          this.$Toast("请填写您的手机号码");
          return;
        } else if (!regexPhone.test(this.bindingCardForm.phone)) {
          console.log("phone:", this.bindingCardForm.phone);
          this.$Toast("请填写正确的手机号码格式");
          return;
        }

        if (this.$route.query.bid !== "51") {
          // 校验验证码
          if (!this.bindingCardForm.verificationCode) {
            this.$Toast("请填写您的手机验证码");
            return;
          } else if (
            !regexBindingVerificationCode.test(
              this.bindingCardForm.verificationCode
            )
          ) {
            this.$Toast("手机验证码格式错误");
            return;
          }
        }

        // 是否同意协议
        // if (!this.isAgree) {
        //   this.$Toast('请您阅读并同意协议');
        //   return;
        // }

        const data = await service.getRealCards({
          submit: 1,
          verify: this.bindingCardForm.verificationCode,
          userPhone: this.bindingCardForm.phone,
          cardNumber: this.bindingCardForm.cardID
        });

        if (data.errCode === 0) {
          this.$MessageBox({
            title: "恭喜您！",
            message: "绑定实体卡成功",
            closeOnClickModal: false
          }).then(() => {
            this.$router.push({ name: "memberCenter" });
          });
        } else {
          this.$Toast(data.errMsg);
        }
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    ),

    // 发送短信 - 绑定实体卡
    async onSendMsgCodeBinding() {
      // 防止用户多次点击发送验证码
      if (this.bindingCardHasSend) {
        return;
      }

      const regexPhone = /^1[3456789]\d{9}$/; // 手机号码格式

      if (!this.bindingCardForm.phone) {
        this.$Toast("请填写您的手机号码");
        return;
      } else if (!regexPhone.test(this.bindingCardForm.phone)) {
        console.log("phone:", this.bindingCardForm.phone);
        this.$Toast("请填写正确的手机号码格式");
        return;
      }

      this.bindingCardHasSend = true;
      this.countDownBinding();

      const data = await service.sendMsgCode({
        tel: this.bindingCardForm.phone
      });

      // errCode === -1时，提示改账户发送短信超出上限
      if (data.errCode === -1) {
        this.$Toast(data.errMsg);
      }
    },

    // 倒计时 - 绑定实体卡
    countDownBinding() {
      setTimeout(() => {
        this.bindingCardCodeTime--;

        if (this.bindingCardCodeTime <= 0) {
          this.bindingCardCodeTime = 60;
          this.bindingCardHasSend = false;
          return;
        }
        this.countDownBinding();
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
@include b(bindingCard) {
  background-color: #fff;
  .i-cell-wrapper {
    background: none;
  }

  @include e(btnGroup) {
    padding: rem(600) rem(48) rem(30);
  }
}

@include b(validCode) {
  @include when(valid) {
    .i-field-core {
      // width: rem(445);
      // flex: 0;
      flex-flow: 1;
      margin-right: rem(30);
    }
    .i-cell-value {
      display: flex;
      justify-content: space-between;
    }
  }
}

@include b(validBtn) {
  display: flex;
  align-items: center;

  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: rem(240);

  color: #323232;

  @include when(valid) {
    font-size: rem(24);
    height: rem(70);
  }
}
</style>

