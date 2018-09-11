
var curPath = '../samples';

Page({
    data: {
        samples: [
            {name:"logs", url:"../logs/logs"},
            {name:"scroll view", url:curPath+"/scrollView"},
            {name:"swiper", url:curPath+"/swiper"},
            {name:"form", url:curPath+"/form"},
            {name:"picker", url:curPath+"/picker"},
            {name:"pickerView", url:curPath+"/pickerView"},
            {name:"navigator", url:curPath+"/nevigator"}
            ]
    },
    showSample:function(obj) {
        var params = obj.target.dataset;
        console.log(obj);
        wx.navigateTo({url:params.url});
    },
    onLoad: function () {
    }
})
