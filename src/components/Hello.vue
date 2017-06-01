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
                    <div class="choose-btn start"><span>北京</span></div>
                    <i class="bottom-triangle"></i>
                    <input type="hidden" id="startCity" value="北京" data-code="BJS">
                </div>
                <div class="switch">
                     <div class="switch-btn"></div>
                </div>
                <div class="choose-station">
                    <div class="station-title">到达城市</div>
                    <div class="choose-btn end"><span>上海</span></div>
                    <i class="bottom-triangle"></i>
                    <input type="hidden" id="endCity" value="上海" data-code="SHA">
                </div>
            </div>
            <!-- <div class="date clearfix">
                <div class="date-from">
                    <div class="date-title">出发日期</div>
                    <div class="date-region start-date">
                        <span>5月27日(今天)</span>
                        <i class="bottom-triangle"></i>
                        <input type="hidden" id="startDate" value="2017-05-27">
                    </div>
                </div>
                <div class="date-to">
                    <div class="date-title">返程日期</div>
                    <div class="date-region end-date">
                        <span>5月29日(后天)</span>
                        <i class="bottom-triangle"></i>
                        <input type="hidden" id="endDate" value="2017-05-29">
                    </div>
                </div>
            </div>
            <div class="ticket clearfix">
                <div class="ticket-title">舱位等级</div>
                <div class="ticket-region">
                    <span>舱位不限</span>
                    <i class="bottom-triangle"></i>
                    <input type="hidden" id="ticketType" value="economy">
                </div>
            </div> -->
        </section>
       <!--  <section class="search">
            <button class="btn btn-primary btn-block" id="doSearch">查 询</button>
            <input type="hidden" name="ver" value="635616053946249161">
            <input type="hidden" name="todayDate" value="2017-05-27">
            <div style="height: 51px;"></div>
        </section> -->
    </article>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tabList: [ '单程' , '往返' ],
      active: 0,
      tabType : 'single'
    }
  },
  computed: { 
    
  },
  methods: {
    switchTab( e ){
      this.tabType = this.active==0 ? 'single' : 'round';
      console.log(this.tabType)
      this.active = e;
        if( !e ){
          //单程
        }else{

        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <link scoped lang="scss" rel="stylesheet" type="text/css" href="./search.scss"> -->
<style scoped lang="scss">
    @import './../style/mixin';
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
    
</style>
<link rel="stylesheet" type="text/css" href="search.scss">
