// precise精确搜索api 路由
const express = require('express');
const router =express.Router();
// 引入精确查询处理模块   并且调用里面的方法
const Precise = require('../controller/Precise/precise.js')

/*
   @effect:根据书名查找书籍相关的信息
   @key ：书名  默认遮天
   @limit: 限制查询条数 默认6条
   @page : 0 是第一页  默认第一开始
    --调用book模块中bookname方法
*/

router.get("/bookname",Precise.bookname)
/*
 * @id 小说的id 查询小说的相信细信息
 * 
 * 
 */
router.get("/info",Precise.info)
/*
   @effect:根据书ID查找书籍章节
   @id ：书的id
   @limit: 限制查询条数 默认6条
   @page : 0 是第一页默认是0
    --调用book模块中chapter方法
*/
router.get("/chapters",Precise.chapter)

/*
   @effect:根据章节link查找章节内容
   @link ：章节地址
*/
router.get("/details",Precise.details)
/*
  @ 热搜关键词的名字  
  做搜索用
  limit  查询多少个 默认6个
*/
router.get("/hotkeys",Precise.hotkeys)
/*
  @ 分类搜索  
   @gender  性别分类 默认男 male 女female
   
    出版press
   @type 类别  默认1 1为热门 2为留存3为连载 4为完结
   @major 主题:     
    男对应：玄幻、奇幻、武侠、仙侠、都市、职场、历史、军事、游戏、竞技、科幻、灵异、同人、轻小说   
    女对应：古代言情、现代言情、青春校园、耽美、玄幻奇幻、武侠仙侠、科幻、游戏竞技、悬疑灵异、同人、女尊、百合    
    出版对应：传记名著、出版小说、人文社科、生活时尚、经管理财、青春言情、外文原版、政治军事、成功励志、育儿健康 
   @limit limit 获取个数 默认6 个
   @page 起始页面  默认0 第一页
    */
router.get("/category",Precise.category)

/*
  @ 热搜关键词的名字  
  做搜索用
  limit  查询多少个 默认6个
  page 起始页面 默认0 第一页
  cycle 类别  
      最热榜 周hot-week  月hot-month 总hot-total
      热搜榜  hotsearch-week   hotsearch-month  hotsearch-total
      潜力榜  potenial-week potenial-month   potenial-total
      留存榜  remain-week    remain-month    remain-total
      完结榜  finish-week    finish-month     finish-total 
*/
router.get("/ranklist",Precise.ranklist)
/*
/*

*/

module.exports = router