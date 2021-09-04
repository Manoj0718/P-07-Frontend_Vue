//* Resources  - https://www.codemag.com/article/1907091//

// filters.js
import Vue from "vue";
import Moment from "moment";

//* Here you can hange the format.//
//* Check  - https://momentjs.com/  //


Vue.filter("displayDate", function (value) {
    return Moment(value).startOf('day').fromNow();
});
Vue.filter("displayTime", function (value) {
    return Moment(value).endOf('day').fromNow()
});