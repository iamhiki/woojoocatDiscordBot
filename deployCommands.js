// 슬래시 커맨드 등록 스크립트
// 실행 명령어: node deployCommands.js
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

// 등록할 슬래시 명령어의 구성 데이터 정의
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('봇의 통신 지연 상태를 측정하고 퐁으로 답장합니다.')
].map(command => command.toJSON());

// 디스코드 REST API 통신 모듈 초기화
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// 비동기 함수 실행을 통한 명령어 레이아웃 배포
(async () => {
    try {
        console.log('슬래시 명령어 배포 작업을 시작합니다.');

        // 빠른 실시간 테스트를 위해 특정 서버(길드) 전용 배포 경로로 전송
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('특정 길드 서버에 슬래시 명령어가 무사히 등록 완료되었습니다.')


    } catch (error) {
        console.error('명령어 등록 과정 수행 중 에러 감지:', error)
    }
})();