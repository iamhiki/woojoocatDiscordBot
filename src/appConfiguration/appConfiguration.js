// 명령어 등록
// 테스트 명령어: node appConfiguration.js
import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

// 등록할 슬래시 명령어의 구성 데이터 정의 
export const commands = [
  new SlashCommandBuilder()
    .setName('ping') // ping 슬래시 명령어
    .setDescription('봇의 통신 지연 상태를 측정하고 퐁으로 답장합니다.')
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
})