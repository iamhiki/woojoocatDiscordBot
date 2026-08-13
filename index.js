//메인 실행파일
//테스트 명령어: node index.js
// 주요 클래스 가져오기
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

// 클라이언트 객체 생성 (봇이 디스코드에서 받아올 이벤트 범위(인텐트)를 결정)
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// 봇이 준비되었을 때 실행되는 이벤트
client.once('ready', () => {
    console.log(`success: ${client.user.tag}`);
});

// 사용자가 메세지 입력 등으로 액션을 취했을 때 반응하는 리스너
client.on('interactionCreate', async interaction => {
    // 유저가 슬래시 명령어를 입력한 것이 아니면 걍 넘어가
    if(!interaction.isChatInputCommand()) return;
    
    const { commandName } = interaction;

    // 입력한 명령어가 'ping'이면
    if( commandName === 'ping') {
        //'pong!'이라고 대답해라 
        await interaction.reply('Pong!');
    }
});

// 봇 로그인
client.login(process.env.DISCORD_TOKEN);
