const mineflayer = require("mineflayer")
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const GoalFollow = require('mineflayer-pathfinder').goals.GoalFollow;

const bot = mineflayer.createBot({
    host: "95.28.201.200",
    port:  "25565",
    version:"1.19.4",
    username: "Bot" })

bot.once('spawn', function () {
    bot.chat('/reg  1234567890 1234567890')
})

bot.once('spawn', function () {
    bot.chat('вау где я')
})

bot.on('chat', function Hi (username, message) {
    if(username === "Bot") return;
    if (message === "бот" && username === "Dambo389") {
        setTimeout(() => bot.chat(username + " , я бот"), 5000);
    } else {
        if(message !== "бот") return;
        setTimeout(() => bot.chat(username + " , иди нахуй"), 5000);
    }
});

bot.once( 'spawn', () => {
    mineflayerViewer(bot,{
        port:3007,
        firstPerson: true,
        viewDistance: "25"})
})

bot.on( 'chat',(username,message)=>{
    if(username === bot.username) return

    switch (message){
        case "Спать":
            goToSleep()
            break
        case "Вставай":
            wakeUp()
            break
        case 'Выйди':
            bot.quit()
            break
    }
});

bot.on ('sleep',()=>{
  bot.chat('Спокойной ночи')

})

bot.on ('wake',()=>{
    bot.chat('Доброе утро')
})

  async function goToSleep() {
      const bed = bot.findBlock({
          matching: block => bot.isABed(block)
      })

      if (bed)
          try {
              await bot.sleep(bed)
              bot.chat("Я сплю")
          } catch (err) {
              bot.chat(`я не могу уснуть: ${err.message}`)
          } else {
          bot.chat('По близости нет кровати')
      }
}



async function wakeUp() {
    try {
        await bot.wake()
    } catch (err)  {
        bot.chat(`я не могу проснуться${err.message}`)
    }
}

bot.on('chat',function (username,message){
if(username === "Bot") return;
if (message === "Drop" && username === "Dambo389"){
function  tossNext() {
    if (bot.inventory.items().length === 0) {
        console.log("У меня пусто")
    } else {
        const item = bot.inventory.items()[0]
        bot.tossStack(item, tossNext)
    }
}
tossNext()
}
})

bot.on( 'spawn', function (){
  bot.loadPlugin(require("mineflayer-autoclicker"))
})

bot.on( 'chat', function (username, message){
    if(message === "AutoClickerStart") {
        bot.autoclicker.start()

    }

    if(message === "AutoClickerStop") {
        bot.autoclicker.stop()
    }
});

bot.loadPlugin(pathfinder);

let targetPlayer = null;

bot.on('chat', (username, message) => {
    // Убираем цветовые коды из имени пользователя
    const cleanUsername = username.replace(/§[0-9a-fk-or]/g, '');

    // Если сообщение содержит 'follow me', бот начинает следовать за игроком
    if (message === 'за мной') {
        targetPlayer = bot.players[cleanUsername];

        if (!targetPlayer) {
            bot.chat('I can\'t see you!');
            return;
        }

        const { x, y, z } = targetPlayer.entity.position;
        bot.pathfinder.setMovements(new Movements(bot, '1.19.4'));
        bot.pathfinder.setGoal(new GoalFollow(targetPlayer.entity, 1), true);
    }

    // Если сообщение содержит 'stop', бот перестает следовать за игроком
    if (message === 'стоп') {
        bot.pathfinder.setGoal(null);
        targetPlayer = null;
    }
});

