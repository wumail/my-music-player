# my-music-player

1. 播放
   通过对currentMusic的监听完成
2. 歌单
   + 虚拟列表解决歌单渲染问题
   --- 相关MV 可以封装一下或者直接跳转出去
   --- 用户歌单和喜爱歌单（主要可以用于添加不同平台的音乐
    --- 添加一个新的collection联查或者直接添加至user collection， 增删查改
   users{
      {
         ...,
         favorite:{
            'playlistName1':{
               'songName+songId':{
               },
               ...
            },
         },
         playlist:{
            'playlistName1':{
               'songName+songId':{
               },
               ...
            },
         }
      },
      ...
   }



   --- 网易云歌单 添加判断
3. 
