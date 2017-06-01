<template>
  <div class="list-page" v-if="cityData">
    <!-- <li @click="changecity('北京')">北京</li>
    <li @click="changecity('上海')">上海</li>
    <li>{{cityType}}</li> -->
    <div class="input-block">
      <div class="search-box">
        <input placeholder="北京/beijing/bj" maxlength="10">
      </div>
      <span class="cancel">取消</span>
    </div>

    <ul>
      <li class="table-view-divider">当前位置</li>
      <li v-for="i in [1,1,1,1]" class="table-view-cell" value="SHA" data-id="SHA" data-type="SH">北京</li>
    </ul>
    <ul>
      <li class="table-view-divider">搜索历史</li>

      <li v-for="i in [1,1]"  class="table-view-cell" value="SHA" data-id="SHA" data-type="SH">上海</li>
    </ul>

    <ul>
      <li class="table-view-divider">热门城市</li>
      <li v-for="(item, index) in cityData.hot" 
          class="table-view-cell" 
          value="item.CityThreeSign" 
          data-id="item.CityThreeSign" 
          data-type="item.CityNameSimpleEn"
          @click="selectedCity(item)"
      >{{item.CityName}}</li>
    </ul>

    <ul>
      <li class="table-view-divider">拼音查找</li>
      <li 
        @click="checkLetter(key)" 
        v-for="(item, key) in cityData.citylist"  
        class="table-view-cell" 
        :class="key == letter ? 'active':''"
        value="item.CityThreeSign" 
        data-id="item.CityThreeSign" 
        data-type="item.CityNameSimpleEn"
        >{{key}}</li>
    </ul>

    <ul>
      <li v-for="(item, key) in cityData.citylist[letter]"  
          class="table-view-cell" 
          value="item.CityThreeSign" 
          data-id="item.CityThreeSign" 
          data-type="item.CityNameSimpleEn"
          @click="selectedCity(item)"
          >{{item.CityName}}</li>
    </ul>

  </div>
</template>
<script type="text/javascript"></script>
<script>
export default {
    name: 'hello',
    data () {
      return {
        data : {},
        letter : 'A'
      }
    },
    props: ['cityType','cityData'],
    computed: { 
        
    },
    created(){
     console.log( this.cityData )
    },
    methods: {
      hidepage(){

      },
      //选中城市后
      selectedCity( e ){
        this.$emit('changeCity', {
          cityType : this.cityType,
          value : e
        })
      },
      checkLetter( key ){
        this.letter = key;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './../style/mixin';
    .list-page{
      position:fixed;
      top:0;
      left:0;
      z-index:10000;
      width:100%;
      height:100%;
      background:rgba(255, 255, 255, 1);
      background-color: #f4f4f4;
      color: #353535;
      overflow-y: auto;
    }

    //input-block 搜索框样式
    .input-block{
      height: 40px;
      margin: 0 7px;
      background: #f4f4f4;
      padding-top: 7px;
      padding-bottom: 7px;

      .cancel {
        display: none;
        width: 16%;
        text-align: center;
        float: right;
        line-height: 25px;
        color: #09bb07;
        font-size: $m-size;
      }
      .search-box {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background: #FFFFFF url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABMElEQVRIx2NgGAWDHkyePFl40qRJkRMnTqwG0mVA7Alks1NsMMgQIO4EGvgDiP8j4wkTJjwHykVTavguqGHzgb4wAYl1dnbyAvleQPGjUMtqybWgE2pAAjb5VatWMQPlFoDUAC13JSfMf4BcTsiXQHV3gPg4SRaAIhTqMhMifFoODUZxUoIHlFr+E5NSgGo8oEFpTYoPQEnxPyhCibDAH2qBGSkWeEK97UWE2l4g/k2MY1AiD5TOQUkRlFpwqevt7ZUGqvkExKvJSabRUK8vwBYXUMPPQ33qTG5eqINacgeUWkARCg3zXqjLYbn6QX9/vwK5lriB0jlaUfEbFCwgl4MMp9gSEAClc1BSBKUW5AgFGUo1S3ABdEumTJkiT2tLmhloAUAuBxkOSmEMo4AUAADy8xTUtSge2gAAAABJRU5ErkJggg==") 8px center no-repeat;
        -webkit-background-size: 24px 24px;
        background-size: 24px 24px;
        float: left;
      }
      .search-box input {
        border: none;
        background-color: transparent;
        padding-left: 40px;
        width: 100%;
        height: 100%;
        font-weight: normal;
      }
      .search-box input::-webkit-input-placeholder { /* WebKit browsers */
        color: rgb(128, 128, 128);
      }
      .search-box input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: rgb(128, 128, 128);
      }
      .search-box input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: rgb(128, 128, 128);
      }
    }

    ul {
      font-weight: normal;
      font-size: $b-size;
      margin-bottom: 6px;
      overflow:hidden;
    }

    #recent-list, #hot-city-list {
      padding-bottom: 15px;
      background: #F2F2F2;
      &:before, &:after {
        line-height: 0;
        display: table; /*also display: block;*/
        content: "";
      }
      &:after {
        clear: both;
      }
    }
    li.table-view-cell{
      width: 21%;
      float:left;
      margin: 2% 2% 0 2%;
      background: #FFFFFF;
      border-radius: 5px;
      padding: 0;
      height: 2.15rem;
      line-height: 2.15rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
      border-bottom: none;
    }
    li.active{
      background-color: #09bb07;
    color: #fff;
    }
  .table-view-divider {
    background-color: #F2F2F2;
    color: #353535;
    border: none;
    font-weight: normal;
    padding: 6px 10px;
    // font-size: 0.8125rem;
    font-size:  1rem;
  }


  .alphabet {
    position: fixed;
    right: 0;
    top: 46px;
    bottom: 0;
    z-index: 99;
    display: none;
    li {
      width: 2rem;
      height: 4.38%;
      text-align: center;
      a {
        display: block;
        font-size: .8rem;
        font-weight: normal;
        // color: dodgerblue;
        height: 100%;
      }
    }
    li:first-child {
      height: 8%;
      font-size: .7rem;
    }
    // @include transition(transform .2s);
  }
  .all-list{
    overflow-x: hidden !important;
  }
  .geo_location{
    height: 2.15rem;
    padding: 0 10px;
    margin: 0 7px;
    line-height: 2.15rem;
    background: #FFFFFF;
    font-size: $l-size;
    border-radius: 5px;
    text-align: center;
  }
  .get-out{
    transform: translate3d(36px,0,0);
    -webkit-transform: translate3d(36px,0,0);
  }

</style>
