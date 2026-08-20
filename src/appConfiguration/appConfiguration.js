// 명령어 등록
// 테스트 명령어: node appConfiguration.js
import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import {  readFileSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

// 등록할 슬래시 명령어의 구성 데이터 정의 
export const commands = [
  new SlashCommandBuilder()
    .setName('ping') // ping 슬래시 명령어
    .setDescription('봇의 통신 지연 상태를 측정하고 퐁으로 답장합니다.'),
  
  new SlashCommandBuilder()
    .setName('house') // house 슬래시 명령어
    .setDescription('왔냐 집사 ヽ(=^･ω･^=)丿 '),

  new SlashCommandBuilder()
    .setName('push') // push 슬래시 명령어
    .setDescription('환영한다냥 ! 어떤 고양이를 찾고있냥 (=ↀωↀ=)✧')
    .addStringOption(option =>
      option
        .setName('name') // name 슬래시 명령어
        .setDescription('집사야 고양이 이름 좀 불러봐라 냥 ଲ( ⓛ ω ⓛ *)ଲ ')
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName('action') // name 슬래시 명령어
        .setDescription('고양이 입양할건지 입양보낼건지 정해봐라 냥 ฅ^•ﻌ•^ฅ')
        .setRequired(true)
        .addChoices(
          { name: 'add', value: 'add' },
          { name: 'remove', value: 'remove' }
        )
    ) 
].map(command => command.toJSON());

// 봇이 준비되었을 때 실행되는 이벤트
client.once('ready', () => {
  console.log(`success: ${client.user.tag}`);
})

// 사용자가 메세지 입력 등으로 액션을 취했을 때 반응하는 리스너
client.on('interactionCreate', async interaction => {
  // 유저가 슬래시 명령어를 입력한 것이 아니면 걍 넘어가
  if (!interaction.isChatInputCommand()) return;
    
  const { commandName } = interaction;

    // 입력한 명령어가 'ping'이면
  if (commandName === commands[0].name) {
    //'pong!'이라고 대답해라 
    await interaction.reply('Pong!');
  }

    // 입력한 명령어가 'house'이면
  if (commandName === commands[1].name) {
    const readData = readFileSync('data/db.json');
    const objectData = JSON.parse(readData); // 문자열을 객체로 바꿈
    
    const myData = objectData[interaction.user.id]; // 내 데이터 찾기

    const catNames = [] // 고양이 목록들
    
    for (const catId in myData['cats'])
      catNames.push(myData['cats'][catId]['name'])

    if (!myData) {
      await interaction.reply('이건 다른 집사 데이터같습니다 냥 (^._.^)ﾉ ');
    } else {
      await interaction.reply(`${ myData['displayName'] } 집사님의 ${ catNames.join(', ') } 목록`);
    }
  }

    // 입력한 명령어가 'push'이면
  if (commandName === commands[2]['name']) {
    const readData = readFileSync('data/db.json');
    const objectData = JSON.parse(readData); // 문자열을 객체로 바꿈
    
    let myData = objectData[interaction.user.id]; // 내 데이터 찾기

      if (!myData) {
       myData = { displayName: interaction.username, cats: {}};
     } 

    const name = interaction.options.getString('name'); // 이름
    const action = interaction.options.getString('action'); // 액션
    if (action === 'add') {
      for (const catId in myData['cats'])
        if (name === myData['cats'][catId]['name']) {
          await interaction.reply('이미 같은 이름의 고양이가 있다 냥..');
          return;
        } 

      const newCat = randomUUID(); // 랜덤 아이디 생성
      myData['cats'][newCat]  = {
        name: name,
        distance: 0,
        counts: 0,
        updateAt: 0
      } //초기값

    await interaction.reply('잘부탁한다 냥 !(ฅ^･ω･^ ฅ)')

    const stringData = JSON.stringify(objectData);
    writeFileSync('data/db.json', stringData);

      // action이 remove 일 때
    } else {
      for (const catId in myData['cats'])
        if (name === myData['cats'][catId]['name']) {
          delete myData['cats'][catId];
        }
      await interaction.reply('츄르 잘주는 주인한테 갈거다 냥 !ฅ(´-ω-`)ฅ ')
        const stringData = JSON.stringify(objectData);  
      writeFileSync('data/db.json', stringData);        
    }

  }
})