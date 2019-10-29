const request = require('request');
//书名查询
const bookname = (req,res,next)=>{
    let key = req.query.key || "遮天";
    let limit = req.query.limit || 6;
    let page = (req.query.page || 0)*limit;
    
    let url = 'http://lunbo.wgfgr.cn/book/search?key='+key+'&start='+page+'&limit='+limit;
    //encodeURI 转码
    request(encodeURI(url), function (error, response, body) {
        if (!error && response.statusCode == 200) {
        let newBody= JSON.parse(body)
        newBody['bookscount']=newBody['books'].length
          res.send(JSON.stringify(newBody))
        }else{
          res.send({"message":"请求错误","status":0})
        }
    });
}
//根据ID获取章节内容
/*
  因为这个扒的接口 是全部获取 所以需要自己去拼接
*/
const  chapter = (req,res,next)=>{
  let id = req.query.id;
  let limit = req.query.limit || 6;
  let page = (req.query.page || 0)*limit;
  let url = 'http://lunbo.wgfgr.cn/toc/mix?bookId='+id
    //encodeURI 转码
    request(encodeURI(url), function (error, response, body) {
        if (!error && response.statusCode == 200) {
        let newBody= JSON.parse(body)
        newBody['chapters']=newBody['chapters'].splice(page,limit);
          res.send(JSON.stringify(newBody['chapters']))
        }else{
          res.send({"message":"请求错误","status":0})
        }
    });
}
// 根据章节获取章节详情

const details = (req,res,next)=>{
  let link = req.query.link;
  let url ='http://chapter.xmxingheju.com/chapter/'+ link;
  request(encodeURI(url), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }else{
      res.send({"message":"请求错误","status":0})
    }
  });

}
// 热门搜索小说的名字
const hotkeys = (req,res,next)=>{
  let limit = req.query.limit || 0;
  let url = 'http://lunbo.wgfgr.cn/node/info?nodeAlias=hot-word'
  request(encodeURI(url), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let newBody= JSON.parse(body)
      newBody['books']=newBody['books'].splice(0,limit);
      res.send(JSON.stringify(newBody['books']))
    }else{
      res.send({"message":"请求错误","status":0})
    }
  });
}
//根据类别查询小说
const category = (req,res,next)=>{
  let gender = req.query.key || "male";
  let limit = req.query.limit || 6;
  let page = (req.query.page || 0) * limit;
  let type = req.query.type || 1;
  let major = req.query.major || "玄幻";
  let url = 'http://lunbo.wgfgr.cn/book/list?gender='+gender+'&type='+type+'&major='+major+'&start='+page+'&limit='+limit;
  request(encodeURI(url), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body)
      }else{
        res.send({"message":"请求错误","status":0})
      }
  });
}
//榜单
const  ranklist = (req,res,next)=>{
  let cycle = req.query.cycle;
  let limit = req.query.limit || 6;
  let page = (req.query.page || 0)*limit;
  let url = 'http://lunbo.wgfgr.cn/node/info?nodeAlias=rankinglist-male-'+cycle
    //encodeURI 转码
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        let newBody= JSON.parse(body)
        newBody['books']=newBody['books'].splice(page,limit);
          res.send(JSON.stringify(newBody['books']))
        }else{
          res.send({"message":"请求错误","status":0})
        }
    });
}
//根据id查询小说详细信息 
const  info = (req,res,next)=>{
  let id = req.query.id;

  let url = '  http://lunbo.wgfgr.cn/book/info?bookId='+id
    //encodeURI 转码
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
       
          res.send(body)
        }else{
          res.send({"message":"请求错误","status":0})
        }
    });
}

module.exports ={
    bookname,chapter,details,hotkeys,category,ranklist,info
}