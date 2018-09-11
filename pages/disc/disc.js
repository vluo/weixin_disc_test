var tester = require('../../utils/tester.js')
tester = tester.tester;
const app = getApp()

Page({
    data: {
        //tester:tester,
        question: tester.questions[0],
        question_pos:0,
        answer:-1,
        result:null,
        done:false
    },
    load_question:function(obj) {
        if(this.data.answer==-1) {
            wx.showToast({
                title: '请选择一个答案',
                icon: 'none',
                duration: 1500
            })
            return;
        }
        tester.submitAnswer(this.data.question_pos, this.data.answer)
        this.data.question_pos+=1
        if(this.data.question_pos>=tester.questions.length) {
            //wx.nevigateTo();
            //wx.navigateTo({url:''});
            //this.data.result = tester.doAnalysis()
            //this.data.done = true
            var result = tester.doAnalysis();
            this.uploadResult(result);
            this.setData({
                //question:tester.getQuestion(this.data.question_pos)
                result:result,//tester.doAnalysis(),
                done:true
            });
        } else {
            console.log('len='+tester.questions.length+'//'+this.data.question_pos);
            this.setData({
                question:tester.questions[this.data.question_pos]//tester.getQuestion(this.data.question_pos)
            });
        }

    },
    choose_answer:function(obj) {
        this.data.answer = parseInt(obj.detail.value);
    },
    uploadResult:function(result){
        wx.request({
            url:'https://www.ehs.cn/t.php',
            data:{user:app.globalData.userInfo, result:result},
            method:'post',
            dataType:'html',
            success:function(res){
                console.log(res);
            }
        });
    },
    re_do:function(){
        this.setData({
            question: tester.questions[0],
            question_pos:0,
            answer:-1,
            result:null,
            done:false
        });
        tester.reset();
    },
    onLoad: function () {
        console.log(this.data.question)
    }
})