

async function fb(site, accessToken) {
    var url = 'https://graph.facebook.com/v3.2/' + site + '?fields=id%2Cog_object&access_token=' + accessToken;
    //   console.log("site url \t"+url);
    const res = await fetch(url).then(res => {
        return res.json();
    })
        .then(myjson => {
            return myjson.og_object.id;
        });
    return res;
}

async function engagementfn(site, accessToken) {
    var url = 'https://graph.facebook.com/v3.2/?id=' + encodeURIComponent(site) + '&fields=engagement&access_token=' + accessToken;
    //   console.log("engagement url \t"+url);
    const res = await fetch(url).then(res => {
        return res.json();
    })
        .then(myjson => {
            //   console.log('from enga'+JSON.stringify(myjson.engagement));
            return myjson.engagement;
        });
    return res;

}

async function getreactiondata(id, reaction, accessToken) {

    var url = 'https://graph.facebook.com/v3.2/' + id + '?fields=reactions.type(' + reaction + ').limit(0).summary(total_count)&access_token=' + accessToken;
    //  console.log("reaction url \t"+url);
    const res = await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            return myJson.reactions.summary.total_count;

        });
    //console.log(res);
    return res;
}

async function global(cite) {

    try {
        var access_token = '461716284261308|YpJnCYb7ofN01L7T7QdkfekiAHU';
        //461716284261308|YpJnCYb7ofN01L7T7QdkfekiAHU
        //628567277572818|iVvtYfSxQSHnOfaO_GNKUEETxoM
        //862610110509533|oygAO3_Y8rWV-AJ7OM9k57VWQP8

        var item = await fb(cite, access_token);
        // console.log(item);
var arr=[];
for (var i = 0; i < 10; i++) { arr[i] = 0; }



        // var LikeCount = await getreactiondata(item, 'LIKE', access_token);
        // var LoveCount = await getreactiondata(item, 'LOVE', access_token);
        // var WowCount = await getreactiondata(item, 'WOW', access_token);
        // var AngryCount = await getreactiondata(item, 'ANGRY', access_token);
        // var HahaCount = await getreactiondata(item, 'HAHA', access_token);
        // var SadCount = await getreactiondata(item, 'SAD', access_token);
        
        var engagement = await engagementfn(cite, access_token);

        // await LikeCount;
        // await LoveCount;
        // await WowCount;
        // await AngryCount;
        // await HahaCount;
        // await SadCount;
        // await engagement;

        //  var result= JSON.parse(engagementValues);
        //console.log('from global eng rec con'+engagement.reaction_count);

        //arr = [LikeCount, LoveCount, WowCount, AngryCount, HahaCount, SadCount, engagement.reaction_count, engagement.comment_count, engagement.share_count, engagement.comment_plugin_count];
        arr[9]=  engagement.comment_plugin_count;
        arr[8]=engagement.share_count;
        arr[7]= engagement.comment_count;
        arr[6]=engagement.reaction_count;
        
        //   console.log(LikeCount);
        //   console.log(LoveCount); 
        //   console.log(WowCount);
        //   console.log(AngryCount);
        //   console.log(HahaCount);
        //   console.log(SadCount);

        return arr;
    }
    catch (e) {
        console.log(e);
        var arr2 = [];
        function initav() {
            for (var i = 0; i < 10; i++) { arr2[i] = 0; }
        }
        await initav();

        return arr2;
    }
}


async function main() {
    var urls = document.querySelectorAll("cite.iUh30");
    for (i = 0; i < urls.length; i++) {
       
       
        var countArr = await global(urls[i].innerHTML);
        console.log(countArr);


        // var para = document.createElement('span');
        // var avtext = " ";
        // count = countArr[8] + countArr[7];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para)
 
//       var para = document.createElement('p');
  //      var avtext = "FB Shares = ";
    //    count = countArr[8];
      //  avtext = avtext + count;
        //para.textContent = avtext;
          //urls[i].appendChild(para);

        // var para = document.createElement('p');
        // var avtext = "FB Likes = ";
        // count = countArr[0];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);




        // var para = document.createElement('p');
        // var avtext = "FB Love = ";
        // count = countArr[1];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);


        // var para = document.createElement('p');
        // var avtext = "FB Wow = ";
        // count = countArr[2];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);

        // var para = document.createElement('p');
        // var avtext = "FB HaHa = ";
        // count = countArr[3];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);

        // var para = document.createElement('p');
        // var avtext = "FB Sad = ";
        // count = countArr[4];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);

        // var para = document.createElement('p');
        // var avtext = "FB Angry = ";
        // count = countArr[5];
        // avtext = avtext + count;
        // para.textContent = avtext;
        // urls[i].appendChild(para);

        var browser = browser || chrome;
        var para = document.createElement('p');
        var span = document.createElement('span');
        var img = document.createElement("img");
        img.src= chrome.runtime.getURL("like.png");
        count = countArr[6]+countArr[7]+countArr[8]+countArr[9];
        span.textContent = count;
        urls[i].appendChild(para);
        urls[i].appendChild(img);
        urls[i].appendChild(span);
        //urls[i].innerHTML;

    }
}
main();
