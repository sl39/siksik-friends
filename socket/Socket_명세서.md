# Socket 통신에 사용될 데이터



> ### Chatting

- Data Flow
  
  - From 개별 유저로 부터 생성된 data
  
  - To Server
  
  - From Server
  
  - To 모든 유저에게 실시간 data 전송

- Client
  
  - 메세지 전송
  
  - 메세지 수신
  
  - To Server

- Server
  
  - 메세지 수신
  
  - 메세지 전송
  
  - To Client



> ### 방 정보(로비)

- 방 생성시
  
  - From 개별 유저로 부터 생성된 data
  
  - To Server
  
  - Repository에 Memory로 Session 생성
  
  - From Server
  
  - To 모든 유저에게 실시간 data 전송
    
    - 방 목록으로 전달
    
    ---
  
  - 방 공개 여부
    
    - 비밀 방
    
    - 공개 방
  
  - 문제 카테고리
  
  - 문제 수
  
  - 인원수 제한
  
  - 게임 상태
    
    - 게임 중
    
    - 대기 중
  
  - 날짜
    
    - 년 월 일 시간



> ### 방 정보(게임 대기실 내)

- Data Flow
  
  - From 개별 유저의 정보
    
    - nickname
    
    - profile picture
  
  - To Server
  
  - From Server
  
  - To 모든 유저에게 실시간 data 전송
    
    - 아래 정보들

- 방 입장시
  
  - 방 공개 여부
    
    - 비밀 방
    
    - 공개 방
  
  - 문제 카테고리
  
  - 문제 수
  
  - 인원수 제한
  
  - 게임 상태
    
    - 게임 중
    
    - 대기 중
  
  - 날짜
    
    - 년 월 일 시간
  
  - 참여 유저 정보(Object)
    
    - nickname
    
    - profile picture
    
    - {
              {
          nickname:닉네임,
          picture:사진정보,
              },
      }



> ### 문제 데이터

- 문제 데이터
  
  - From Spark
  
  - To Socket Server Repository
  
  - From Socket Server Repository
  
  - To Client
    
    - Server to Client 정보 보내주는 기간?
      
      - let's start 화면(Client)
        
        - 3초
      
      - 개별 문제
        
        - 제한시간 상수(ex. 20초)
    
    - 모든 문제 전달(ex. 10문제면 10문제에 해당하는 정보 모두)



> ### 게임 종료 후

- 방 정보
  
  - From Socket Server Repository
  
  - To DB(Game)
  
  ---
  
  - 문제 정보
    
    - 문제 번호(ex. 첫 번째 문제, 두 번째 문제 ...)
    
    - 문제 Questtion
    
    - 문제 Answer
    
    - 문제에 사용된 Keyword
    
    - 참고된 News
      
      - News Title
      
      - News URL
  
  - 방 내용
    
    - 참가했던 유저 목록
    
    - 각 유저들의 점수
    
    - 해당 방 내 랭킹

> ### 게임 중

- 문제 풀이
  
  - From 개별 유저로 부터 생성된 data
    
    - 정답 제출
  
  - To Server
  
  - 채점
  
  - From Server
  
  - 정답 여부 및 점수
  
  - To 모든 유저에게 실시간 data 전송



> ### 게임 진행 (턴 개념)

1. 대기실 - 플레이어 입장, 퇴장

2. 게임 시작 - 방장 => pub -> 서버는 게임 시작 처리 -> sub

3. 문제1 출력 => 1) pub -> sub 2) server to client

4. 문제1 정답 입력 => pub

5. 문제1 결과 출력 => 1) pub -> sub

6. 문제2 출력

7. 문제2 정답 입력

8. 문제2 결과 출력

9. ....

10. 
