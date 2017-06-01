<template>
  <div>
    <ul class="tab-index">
      <li v-for="(item,index) in tabList" :class="{active:active==index}" @click="switchTab(index)">{{item}}</li>
    </ul>
    <article class="flight-search">
        <section class="operate">
            <div class="station">
                <div class="choose-station">
                    <div class="station-title">出发城市</div>
                    <div class="choose-btn start" @click="selectCity(0)"><span>{{citysList[0]}}</span></div>
                    <input type="hidden" id="startCity" value="北京" data-code="BJS">
                </div>
                <div class="switch">
                     <div class="switch-btn"></div>
                </div>
                <div class="choose-station">
                    <div class="station-title">到达城市</div>
                    <div class="choose-btn end" @click="selectCity(1)"><span>{{citysList[1]}}</span></div>
                    <input type="hidden" id="endCity" value="上海" data-code="SHA">
                </div>
            </div>
            <div class="date">
                <div class="date-from">
                    <div class="date-title">出发日期</div>
                    <div class="date-region start-date">
                        <span>{{timesData.start}}</span>
                        <input type="hidden" id="startDate" value="2017-05-27">
                    </div>
                </div>
                <div class="date-to">
                    <div class="date-title">返程日期</div>
                    <div class="date-region end-date">
                        <span v-if="active">{{timesData.end}}</span>
                        <span v-else>—— ——</span>
                        <input type="hidden" id="endDate" value="2017-05-29">
                    </div>
                </div>
            </div>
            <div class="ticket">
                <div class="ticket-title">舱位等级</div>
                <div class="ticket-region">
                    <span>舱位不限</span>
                    <input type="hidden" id="ticketType" value="economy">
                </div>
            </div>
        </section>
        <section class="search">
            <button class="btn btn-primary btn-block" id="doSearch" @click="golist">查 询</button>
            <input type="hidden" name="ver" value="635616053946249161">
            <input type="hidden" name="todayDate" value="2017-05-27">
            <div style="height: 51px;"></div>
        </section>
    </article>

    <nav id="index-page-footer" class="bar bar-tab">
        <a class="tab-item order-tips">
            <span class="query-text">预订须知</span>
        </a>
        <a class="tab-item order-query">
            <span class="query-text">订单查询</span>
        </a>
    </nav>

    <city-list v-show="cityList" :cityData="cityData" :cityType="cityType" v-on:changeCity="changeCity"></city-list> 
  </div>
</template>

<script>
import cityList from './../../components/city-list'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tabList: [ '单程' , '往返' ],
      citysList: [ '北京' , '上海' ],
      timesData: {
        start : '5月27日(今天)',
        end : '5月29日(后天)'
      },
      active: 0,
      tabType : 'single',
      cityList : false,
      cityType : '',
      cityData : ''
    }
  },
  computed: { 
    
  },
  //获取city数据
  created(){
    var _this = this;
    $.ajax({
          url : 'https://m.elongstatic.com/static/webapp/flight/wxxcx/2016/10/v1/data/cityFlight.json',
        }).then(function( data ){
          _this.cityData = JSON.parse(data) 
        })
  },
  components: {
      cityList
  },
  methods: {
    switchTab( e ){
      this.tabType = e == 0 ? 'single' : 'round';
      this.active = e;
    },
    golist(){
      this.$router.push({
        name: 'list',
        //参数
        query: {
            "departCityCode":"BJS",
            "arrivalCityCode":"SHA",
            "departDate":"2017-06-01",
            "todayDate":"2017-05-31",
            "returnDate":"2017-06-01",
            "classType":"economy",
            "flyType":1,
            "isReturn":false
        }
      })
    },
    selectCity( e ){
      this.cityType = e;
      this.cityList = true
    },
    //city组件选择城市后
    changeCity( rsp ){
      // console.log( rsp )
      this.citysList[ rsp.cityType ] = rsp.value.CityName
      this.cityList = false;
    }
  }
}
</script>

<style scoped lang="scss">
    @import './../../style/mixin';
    .tab-index{
      @include fj()
      font-size: 1rem;
      font-weight: 400;
      border-bottom: 1px solid #ebebeb;

      li{
        flex:1;
        text-align: center;
        height: 44px;
        line-height: 44px;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.active{
          color: #2bb830;
          border-bottom: 3px solid #2bb830;
        }
      }
    }

    .flight-search{
        padding: 0 5%;
        background: #FFFFFF;
        border-top: 1px solid #ebebeb;
    }

    .switch{
      width: 20%;
      padding-top: 25px;

      .switch-btn {
          width: 30px;
          height: 30px;
          margin: 0px auto;
          border-radius: 50%;
          background: #09bb07 url("../../images/switch-icon.png") no-repeat center center;
          background-size: 100% 100%;
          cursor: pointer;
        }

        .switch-ratate {
          @include transform(rotate(180deg));
          transition: all 0.3s ease-in-out;
        }
    }

    .station{
      padding: 10px 0px;
      border-bottom: 1px solid $border-color;
      @include fj();

      .choose-station{
        flex:1;
        text-align:left;
        color: $normal-c;
        font-size: $bb-size;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        position: relative;
        padding-left: 1px;
        white-space: nowrap;
        &:last-child{
          text-align:right;
        }


        .station-title {
          color: $light-c;
          font-size: $m-size;
          padding-left: 2px;
          height: 25px;
          line-height: 25px;
        }
      }
    }

    .date{
      @include fj();
    }

    .date, .ticket{
      padding: 10px 0px;
      
      .around {
        margin-right: 5px;
        width: 45%;
        overflow: hidden;
      }

      .date-to {
        width: 45%;
        text-align: right;
        overflow: hidden;
      }

      .date-title, .ticket-title {
          color: $light-c;
          font-size: $m-size;
          padding-left: 2px;
          height: 25px;
          line-height: 25px;
      }
      
      .date-region, .ticket-region {
          position: relative;
          padding: 10px 0px 10px 1px;
          border-bottom: 1px solid $border-color;
          font-size: $b-size;
          height: 41px;
          
          span {
            font-size:15px;
            white-space: nowrap;
          }
      }

    }

    .search {
      padding: 20px 0px;
    }

    .btn{
      position: relative;
      display: inline-block;
      padding: 6px 8px 7px;
      margin-bottom: 0;
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      color: #333;
      text-align: center;
      white-space: nowrap;
      vertical-align: top;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #ccc;
    }
    .btn-primary {
      color: #fff;
      background-color: #09bb07;
      border: 1px solid #09bb07;
      border-radius: 3px;
    }
    .btn-primary:active, .btn-primary.active {
      color: #fff;
      background-color: #078a05;
    }
    .btn-block {
        display: block;
        width: 100%;
        padding: 15px 0;
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
    .memberBtn{
      background: #fceeed;
      border:1px solid #ee897f;
      text-align: center;
      color:#e65749;
      float:left;
      width: 45%;
      padding:10px 0px;
    }
    .guestBtn{
      background: #ecf3fd;
      border:1px solid #7c9dea;
      text-align: center;
      color:#4473df;
      float:right;
      width: 45%;
      padding:10px 0px;
      
    }

    .history {
      color: #666666;
      margin-bottom: 40px;

      .history-title {
        text-align: center;
              color: $normal-c;
              height: 40px;
              line-height: 40px;
      }

      .item {
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }

      .active{
        background:#f8d1cc;
        color:#09bb07;
      }
    }

    .bar {
      position: absolute;
      z-index: 10000;
      height: 44px;
      padding-right: 10px;
      padding-left: 10px;
      background-color: #fcfcfc;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      left: 0px;
      right: 0px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .bar-tab {
      display: table;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding: 0;
      table-layout: fixed;
      border-top: 1px solid #ebebeb;
      border-bottom: 0;
      background-color: #FAFAFA;
    }
    //footer
    #index-page-footer{
      @include fj();
      .tab-item{
        padding-top: 1.4rem;
        font-size: .75rem;
        flex:1;
        text-align:center;
      }
      .order-tips{
        background: url('../../images/order-tips-e.png') no-repeat 50% 5px;
        background-size: 18px auto;
      }
      .order-query{
        background: url('../../images/query-order-e.png') no-repeat 50% 5px;
        background-size: 14px auto;
      }
      .query-text{
        line-height: 26px;
        color: $light-c;
      }

    }
    
</style>
