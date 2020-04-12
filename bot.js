const Telegraf = require('telegraf');
const bot = new Telegraf('1180888372:AAFh0cxfAzw6trfqupgYDGJKbO4avm6Fxi0');
var fs = require('fs');
//        1103504284:AAHDdVIJ8VW1iVrjks0FvkbxVrwZdEgL76w


var files=[];
var vfn = [];

var refresh = function(){
    files = fs.readdirSync('images/roulette/');
    vfn = [];
    for(i=0;i<files.length;i++){
        var sp = files[i].split('.');
        if(sp[1]==='gif'){
            vfn.push(files[i]);
        }
    }
}

var sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var showGamesOptions = function(ctx){
//     bot.telegram.sendMessage(ctx.chat.id,'Why wait? Choose a game right now!',
//     {
//         reply_markup:{
//             inline_keyboard: [
//                 [
//                     {text : 'Heads or Tails',callback_data:'toss'}
//                 ],
//                 [
//                     {text : 'Roll a Dice',callback_data:'roll'}
//                 ],
//                 [
//                     {text: 'Cricket',callback_data:'cricket'}
//                 ]
//             ]
//         }
//     })
    ctx.reply("Why wait? Choose a game right now!\nHeads or Tails - /toss\nCricket - /cric\nRoll a Dice - /dice\nSpin the Wheel - /spin\nOdd or Even - /odd\nRoulette - /rt");
}

bot.start((ctx)=>{
    //ctx.reply("Hi, I am gamesBot! You can play the following games :\n1. Heads or Tails\n2. Roll a Dice\n3.Cricket\n4.Spin the Wheel");
    setTimeout(()=>{showGamesOptions(ctx);},10);
})



bot.command("games",(ctx)=>{
    showGamesOptions(ctx);
})



//1. Toss Game

var headOrTail = function(side,ctx){
    var toss = ['Tails','Heads'];
    var val = Math.floor(Math.random()*1000);
    var win=-1;
    if(val%2==0) win=1;
    else win=0;
    var postText = "";
    if(side>=0){
        if(side===win) postText="You have Won!";
        else postText = "You have Lost!";
    }
    bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        {source : 'images/coins/'+toss[win]+'.gif'}
    );
    //var text = "It's a "+toss[win]+"! "+postText;
    //ctx.reply(text);
}

bot.action("toss",(ctx)=>{
    ctx.deleteMessage();
    // bot.telegram.sendMessage(ctx.chat.id,'Pick your side',
    // {
    //     reply_markup:{
    //         inline_keyboard: [
    //             [
    //                 {text : 'Heads',callback_data:'heads'},
    //                 {text : 'Tails',callback_data:'tails'}
    //             ],
    //             [
    //                 {text: 'Toss without choosing',callback_data:'HeadOrTailNull'}
    //             ]
    //         ]
    //     }
    // })
    headOrTail(-1,ctx);
})

bot.command("toss",(ctx)=>{
    headOrTail(-1,ctx);
})

// bot.action('heads',ctx=>{
//     headOrTail(1,ctx);
// })
// bot.action('tails',ctx=>{
//     headOrTail(0,ctx);
// })
// bot.action('HeadOrTailNull',ctx=>{
//     headOrTail(-1,ctx);
// })


//2 Roll a dice

var rollDice = function(num,ctx){
    var val = 1+Math.floor(Math.random()*6);
    var postText = "";
    if(num>=0){
        if(num===val) postText="You have Won!";
        else postText = "You have Lost!";
    }
    bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        {source : 'images/dice/'+val+'.gif'}
    );
    // bot.telegram.sendVideo(ctx.chat.id,
    //     {source : 'images/dice/1.mp4'}
    // );
    var text = "It's a "+val+" "+postText;
    //setTimeout(()=>{ctx.reply(text);},10000);
}


bot.action("dice",(ctx)=>{
    //ctx.deleteMessage();
    // bot.telegram.sendMessage(ctx.chat.id,'Pick your Number',
    // {
    //     reply_markup:{
    //         inline_keyboard: [
    //             [
    //                 {text : '1',callback_data:'1dice'},
                
    //                 {text : '2',callback_data:'2dice'},
                
    //                 {text : '3',callback_data:'3dice'},
    //             ],
    //             [
    //                 {text : '4',callback_data:'4dice'},
                
    //                 {text : '5',callback_data:'5dice'},
                
    //                 {text : '6',callback_data:'6dice'}
    //             ],
    //             [
    //                 {text: 'Roll without choosing',callback_data:'nullDice'}
    //             ]
    //         ]
    //     }
    // })
    rollDice(-1,ctx);
})

bot.command("dice",(ctx)=>{
    rollDice(-1,ctx);
})

// bot.action('1dice',ctx=>{
//     rollDice(1,ctx);
// })
// bot.action('2dice',ctx=>{
//     rollDice(2,ctx);
// })
// bot.action('3dice',ctx=>{
//     rollDice(3,ctx);
// })
// bot.action('4dice',ctx=>{
//     rollDice(4,ctx);
// })
// bot.action('5dice',ctx=>{
//     rollDice(5,ctx);
// })
// bot.action('6dice',ctx=>{
//     rollDice(6,ctx);
// })
// bot.action('nullDice',ctx=>{
//     rollDice(-1,ctx);
// })


//3. cricket
var cricket = function(ctxt){
    //ctxt.deleteMessage();
    var balls = ['0','1','2','3','4','6',' Catch',' Wicket',' Wide',' No Ball'];
    var delay = 1000;
    var ball = function(_,player,ctx,totScore,totWickets){
        if(_===0){
            ctx.reply("Player "+player+" starts...");
            setTimeout(() => { ball(1,player,ctx,totScore,totWickets); }, 1000);
            
            return;
        }
        if(_===7){
            ctx.reply('Total Score of Player '+player+' : '+totScore[player-1]+'/'+totWickets[player-1]);
            if(player===1){
                setTimeout(() => { ball(0,2,ctx,totScore,totWickets); }, 1000);
                return;
                //ball(1,2,ctx,totScore,totWickets);
            }
            else{
                var winner=1;
                if(totScore[1]>totScore[0]) winner=2;
                if(totScore[1]===totScore[0]) winner=0;
                if(winner===0){
                    setTimeout(() => { ctx.reply("This is a tie match!"); }, 1000);
                    return;
                }
                setTimeout(() => { ctx.reply("Player "+winner+" wins!"); }, 1000);
            }
            
            return;
        }
        if(totWickets[player-1]>=2){
            setTimeout(() => { ball(7,player,ctx,totScore,totWickets); }, 1000);
            return;
        }
        var score = 0;
        var wickets = 0;
        var i = Math.floor(Math.random()*balls.length);
        var text = '0.'+_+' 🥎 ';
        if(i===0){
            text = text+' Dot Ball';
        }
        if(i>0&&i<6){
           text = text+' '+i+' runs';
           score = score+i;
        }
        if(i>=6){
            text = text+balls[i];
            if(i===6||i===7) wickets=wickets+1;
            else{
                score++;
                _--;
            }
        }
        ctx.reply(text);
        totScore[player-1] += score;
        totWickets[player-1] += wickets;
        setTimeout(() => { ball(_+1,player,ctx,totScore,totWickets); }, 1000);
    }
    ball(0,1,ctxt,[0,0],[0,0]);
    // ctxt.reply('Total Score : '+points[0]+'/'+points[1]);
}

bot.action("cricket",(ctxt)=>{
    cricket(ctxt);
})
bot.command("cric",(ctxt)=>{
    cricket(ctxt);
})



//4. Spin wheel

var spinWheel = function(ctx){

    var val = 1+Math.floor(Math.random()*10);
    var postText = "";
    // if(num>=0){
    //     if(num===val) postText="You have Won!";
    //     else postText = "You have Lost!";
    // }
    bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        {source : 'images/spin/'+val+'.gif'}
    );
    var text = "It's "+val+" "+postText;
    setTimeout(()=>{bot.telegram.sendMessage(ctx.chat.id,text);},16000);
}

bot.command("spin",(ctx)=>{
    spinWheel(ctx);
})

//5. odd or even

var oddOrEven = function(ctx){
    var x = Math.floor(Math.random()*9)+1;
    if(x%2==0){
        ctx.reply("💫 Result : "+x+" It's Even..");
    }
    else{
        ctx.reply("💫 Result : "+x+" It's Odd..");
    }
}

bot.command("odd",(ctx)=>{
    oddOrEven(ctx);
})

//6. roulette
var roulette = function(ctx){
    var ind = Math.floor(Math.random()*vfn.length);
    var name = vfn[ind];
    bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        {source : 'images/roulette/'+name}
    );
    //var vals = name.split('.');
    //var val = vals[0];
    //setTimeout(()=>{ctx.reply("It's "+val)},15000);
}

bot.command("rt",(ctx)=>{
    refresh();
    roulette(ctx);
})

refresh();
console.log(vfn);

bot.launch();