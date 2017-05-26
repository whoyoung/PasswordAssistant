'use strict';

import Realm from 'realm';

class CustomItem extends Realm.Object { }
CustomItem.schema = {
    name: 'CustomItem',
    properties: {
        itemKey: { type: 'string', default: '自定义', optional: true },
        itemValue: { type: 'string', optional: true },
    }
};

class PasswordItems extends Realm.Object { }
PasswordItems.schema = {
    name: 'PasswordItems',
    primaryKey: 'id',
    properties: {
        id: 'int',
        passwordType: { type: 'int', indexed: true },//账号类型
        serverProvider: 'string',//邮箱名称、网站名称、银行名称、地址名称、联系人姓名
        creationDate: 'date',//创建日期
        description: { type: 'string', optional: true },//备注
        customs: { type: 'list', objectType: 'CustomItem' },//自定义项目
        
        userName: { type: 'string', optional: true },//用户名
        loginAccount: { type: 'string', optional: true },//登陆账号
        loginPassword: { type: 'string', optional: true },//登录密码
        mobilePhone: { type: 'string', optional: true },//移动电话

        bankCardNum: { type: 'string', optional: true },//银行卡号
        bankBranch: { type: 'string', optional: true },//支行名称
        bankSubsidiaryCity: { type: 'string', optional: true },//开户行所属城市
        bankReservedInfo: { type: 'string', optional: true },//银行预留信息
        withdrawalPassword: { type: 'string', optional: true },//取款密码
        queryPassword: { type: 'string', optional: true },//查询密码
        EBankLoginPassword: { type: 'string', optional: true },//网上银行登陆密码
        EBankPaymentPassword: { type: 'string', optional: true },//网上银行支付密码
        MobileBankLoginPassword: { type: 'string', optional: true },//手机银行登陆密码
        MobileBankPaymentPassword: { type: 'string', optional: true },//手机银行支付密码
        UShieldBootPassword: { type: 'string', optional: true },//U盾开机密码
        UShieldPaymentPassword: { type: 'string', optional: true },//U盾支付密码

        detailAddress: { type: 'string', optional: true }, //详细地址
        zipCode: { type: 'string', optional: true },//邮编
        telephone: { type: 'string', optional: true },//固定电话

        company: { type: 'string', optional: true },//公司
        post: { type: 'string', optional: true },//职位
        solarCalendarBirthday: { type: 'string', optional: true },//阳历生日
        lunarCalendarBirthday: { type: 'string', optional: true },//农历生日

        credentialsOwner: { type: 'string', optional: true },//证件持有人
        credentialsNum: { type: 'string', optional: true },//证件号码
        credentialsPassword: { type: 'string', optional: true },//证件密码
        credentialsAddress: { type: 'string', optional: true },//证件地址
        credentialsDate: { type: 'string', optional: true },//证件有效期

        data: { type: 'data', optional: true }//data类型数据，为以后功能扩展
    },
};

class LastedPrimaryKey extends Realm.Object { }
LastedPrimaryKey.schema = {
    name: 'LastedPrimaryKey',
    primaryKey: 'id',
    properties: {
        id: 'int',
        lastedId: 'int',
    }
};

class PasswordTypes extends Realm.Object { }
PasswordTypes.schema = {
    name: 'PasswordTypes',
    primaryKey: 'id',
    properties: {
        id: 'int',
        typeKey: 'int',
        typeFiels: { type: 'string'}
    }
};

class TypeKeys extends Realm.Object { }
TypeKeys.schema = {
    name: 'TypeKeys',
    primaryKey: 'id',
    properties: {
        id: 'int',
        typeList: { type: 'string'}
    }
};

export default new Realm({ schema: [CustomItem, PasswordItems, LastedPrimaryKey,PasswordTypes,TypeKeys] });
