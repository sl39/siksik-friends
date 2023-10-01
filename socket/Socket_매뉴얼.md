

# Front를 위한 Socket 통신 매뉴얼

---

## 게임시작(to Lobby)

![](Socket_매뉴얼_assets/2023-09-30-20-59-18-image.png)

![](Socket_매뉴얼_assets/2023-09-30-20-59-47-image.png)

<br>

> ### 게임시작 눌렀을 때

- 로비 채팅
  
  - /pub/lobby/chat
    
    - 채팅전송
    
    - "sender": String
      
      "msg": String
    
    - ```json
      {
          "sender": "인식",
          "msg": "안녕"
      }
      ```
  
  - /sub/lobby/chat
    
    - 채팅수신
    
    - "sendTime": String
      
      "sender": String
      
      "msg": String
    
    - ```json
      {
          "sendTime": "12:31 오전",
          "sender": "인식",
          "msg": "안녕"
      }
      ```

- 로비 방 목록
  
  - /pub/room/roomList
    
    - 로비로 들어왔다는 메세지 전송 필요
    
    - "enter":"start!" 고정으로 전송
    
    - ```json
      {
          "enter":"start!"
      }
      ```
  
  - /sub/room/roomList
    
    - 방 목록 정보 수신
    
    - "roomId": int
      
      "roomName": String
      
      "roomSize": int
      
      "roomCurrent": int
      
      "roomReady": int
      
      "category": String
      
      "quizeCount": int
      
      "password": String
      
      "quizDateTime": LocalDateTime
      
      "roomStatus": int
      
      "member": List
      
      - "userId": int
        
        "userName": String
        
        "userScore": int
        
        "userRanking": int
        
        "ready": boolean
        
        "leader": boolean
    
    - ```json
      [
        {
          "roomId": 1,
          "roomName": "오늘 경제 상식문제 풀사람!",
          "roomSize": 50,
          "roomCurrent": 2,
          "roomReady": 0,
          "category": "경제",
          "quizCount": 10,
          "password": null,
          "quizDateTime": "2023-10-01T15:30:00",
          "roomStatus": 0,
          "members": [
            {
              "userId": 2,
              "userName": "식식프렌즈123",
              "userScore": 1680,
              "userRanking": 1,
              "ready": false,
              "leader": true
            },
            {
              "userId": 11,
              "userName": "퀴즈풀자아아아",
              "userScore": 1230,
              "userRanking": 53,
              "ready": false,
              "leader": false
            }
          ]
        },
        {
          "roomId": 2,
          "roomName": "식식프렌즈 좋아요!",
          "roomSize": 20,
          "roomCurrent": 1,
          "roomReady": 0,
          "category": "연예",
          "quizCount": 20,
          "password": "game123",
          "quizDateTime": "2023-10-01T15:35:00",
          "roomStatus": 0,
          "members": [
            {
              "userId": 3,
              "userName": "게임마스터1",
              "userScore": 1530,
              "userRanking": 2,
              "ready": false,
              "leader": true
            }
          ]
        },
        {
          "roomId": 3,
          "roomName": "나랑 퀴즈 풀 사람!",
          "roomSize": 30,
          "roomCurrent": 1,
          "roomReady": 0,
          "category": "생활/문화",
          "quizCount": 10,
          "password": "gogo123!",
          "quizDateTime": "2023-10-01T15:55:00",
          "roomStatus": 0,
          "members": [
            {
              "userId": 5,
              "userName": "저녁뭐먹지",
              "userScore": 543,
              "userRanking": 131,
              "ready": false,
              "leader": true
            }
          ]
        }
      ]
      ```

- 로비 유저 목록
  
  - /pub/lobby/entrance(로비 입장)
    
    - 유저 정보
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 5,
          "userName": "저녁뭐먹지",
          "userScore": 543,
          "userRanking": 131,
          "ready": false,
          "leader": false
      }
      ```
  
  - /pub/lobby/exit(로비 퇴장 -> 방 들어감 or 게임 나가기)
    
    - 유저 정보
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 5,
          "userName": "저녁뭐먹지",
          "userScore": 543,
          "userRanking": 131,
          "ready": false,
          "leader": false
      }
      ```
  
  - /sub/lobby/list(로비에 있는 유저 목록 받아오기)
    
    - 유저 목록
    - "members": List
    - ```json
      "members": [
          {
              "userId": 1,
              "userName": "식식프렌즈123",
              "userScore": 1680,
              "userRanking": 2,
              "ready": false,
              "leader": false
          },
          {
              "userId": 11,
              "userName": "퀴즈풀자아아아",
              "userScore": 1230,
              "userRanking": 53,
              "ready": false,
              "leader": false
          }
        ]
      ```

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

--- 

## Room(게임 방 내)

![](Socket_매뉴얼_assets/2023-09-30-22-04-44-image.png)

![](Socket_매뉴얼_assets/2023-09-30-21-04-11-image.png)

<br>

<br>

<br>

<br>

> ### 방 만들기(확인 눌렀을 때)

- 방 만들기
  
  - /lobby(POST로 REST 요청을 해야 함)
    
    - 유저가 선택한 방 정보 전송
    
    - roomName": String
      
      "roomSize": int
      
      "roomCurrent": int
      
      "roomReady": int
      
      "category": String
      
      "quizeCount": int
      
      "password": String
      
      "quizDateTime": LocalDateTime
      
      "roomStatus": int
      
      "member": List
      
      - "userId": int
        
        "userName": String
        
        "userScore": int
        
        "userRanking": int
        
        "ready": boolean
        
        "leader": boolean
    
    - ```json
      {
        "roomName": "나랑 퀴즈 풀 사람!",
        "roomSize": 10,
        "roomCurrent": 1,
        "roomReady": 0,
        "category": "연예",
        "quizCount": 10,
        "password": "example_password",
        "quizDateTime": "2023-10-01T15:30:00",
        "roomStatus": 0,
        "members": [
          {
            "userId": 11,
            "userName": "z상식지존z",
            "userScore": 9999,
            "userRanking": 1,
            "isLeader": true, //방 만들 때는 true가 기본
            "isReady": false
          }
        ]
      }
      ```
  
  - Post 요청 이후 return 값 확인
    
    - 방 정보 수신
    
    - 방에 입장한 유저 정보 수신
    
    - "roomId": int
      
      "roomName": String
      
      "roomSize": int
      
      "roomCurrent": int
      
      "roomReady": int
      
      "category": String
      
      "quizeCount": int
      
      "password": String
      
      "quizDateTime": LocalDateTime
      
      "roomStatus": int
      
      "member": List
      
      - "userId": int
        
        "userName": String
        
        "userScore": int
        
        "userRanking": int
        
        "ready": boolean
        
        "leader": boolean
    
    - ```json
      {
          "roomId": 3,
          "roomName": "나랑 퀴즈 풀 사람!",
      	"roomSize": 10,
      	"roomCurrent": 1,
      	"roomReady": 0,
          "category": "연예",
          "quizCount": 10,
          "password": "example_password",
          "quizDateTime": "2023-10-01T15:30:00",
          "roomStatus": 0,
          "members": [
              {
                  "userId": 11,
                  "userName": "z상식지존z",
                  "userScore": 9999,
                  "userRanking": 1,
                  "ready": false,
                  "leader": true
              }
          ]
      }
      ```
  
  - /sub/room/info/{roomId}
    
    - 방 정보 수신
    
    - 방에 입장한 유저 정보 수신
    
    - "roomId": int
      
      "roomName": String
      
      "roomSize": int
      
      "roomCurrent": int
      
      "roomReady": int
      
      "category": String
      
      "quizeCount": int
      
      "password": String
      
      "quizDateTime": LocalDateTime
      
      "roomStatus": int
      
      "member": List
      
      - "userId": int
        
        "userName": String
        
        "userScore": int
        
        "userRanking": int
        
        "ready": boolean
        
        "leader": boolean
    
    - ```json
      {
          "roomId": 3,
          "roomName": "나랑 퀴즈 풀 사람!",
      	"roomSize": 10,
      	"roomCurrent": 1,
      	"roomReady": 0,
          "category": "연예",
          "quizCount": 10,
          "password": "example_password",
          "quizDateTime": "2023-10-01T15:30:00",
          "roomStatus": 0,
          "members": [
              {
                  "userId": 11,
                  "userName": "z상식지존z",
                  "userScore": 9999,
                  "userRanking": 1,
                  "ready": false,
                  "leader": true
              }
          ]
      }
      ```

- 방 채팅
  
  - /pub/room/chat/{roomId}
    
    - 채팅 전송
    
    - "sender": String
      
      "msg": String
    
    - ```json
      {
          "sender": "인식",
          "msg": "안녕"
      }
      ```
  
  - /sub/room/chat/{roomId}
    
    - 채팅 수신
    
    - "sendTime": String
      
      "sender": String
      
      "msg": String
    
    - ```json
      {
          "sendTime": "12:31 오전",
          "sender": "인식",
          "msg": "안녕"
      }
      ```

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

> ### 방 입장(방 선택해서 눌렀을 때)

- 방 입장
  
  - /pub/room/entrance/{roomId}
    
    - 유저 정보 전송
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 5,
          "userName": "저녁뭐먹지",
          "userScore": 543,
          "userRanking": 131,
          "ready": false,
          "leader": false
      }
      ```
  
  - /sub/room/info/{roomId}
    
    - 방에 입장한 유저 정보 수신(방 참여 유저 리스트)
    
    - 방 정보 수신
    
    - "roomId": int
      
      "roomName": String
      
      "roomSize": int
      
      "roomCurrent": int
      
      "roomReady": int
      
      "category": String
      
      "quizeCount": int
      
      "password": String
      
      "quizDateTime": LocalDateTime
      
      "roomStatus": int
      
      "member": List
      
      - "userId": int
        
        "userName": String
        
        "userScore": int
        
        "userRanking": int
        
        "ready": boolean
        
        "leader": boolean
    
    - ```json
      {
          "roomId": 3,
          "roomName": "나랑 퀴즈 풀 사람!",
      	"roomSize": 10,
      	"roomCurrent": 2,
      	"roomReady": 0,
          "category": "연예",
          "quizCount": 10,
          "password": "example_password",
          "quizDateTime": "2023-10-01T15:30:00",
          "roomStatus": 0,
          "members": [
              {
                  "userId": 11,
                  "userName": "z상식지존z",
                  "userScore": 9999,
                  "userRanking": 1,
                  "ready": false,
                  "leader": true
              },
              {
                  "userId": 1031,
                  "userName": "상식마스터",
                  "userScore": 320,
                  "userRanking": 1012,
                  "ready": false,
                  "leader": false
              }
          ]
      }
      ```

<br>

<br>

> ### 방 퇴장

- 방 퇴장(로비로 다시 입장)
  
  - /pub/room/exit/{roomId}
    
    - 유저 정보 전송
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 11,
          "userName": "z상식지존z",
          "userScore": 9999,
          "userRanking": 1,
          "ready": false,
          "leader": true
      }
      ```
  
  - /pub/room/roomList(로비 방 목록 정보 얻기 위해)
    
    - ```json
      {
          "enter": "start!"
      }
      ```
  
  - /sub/room/roomList(로비 방 목록 정보)
    
    - 위 로비 방 목록 정보와 동일
  
  - /pub/lobby/chat(로비 채팅)
    
    - 위 채팅 내용과 동일
  
  - /sub/lobby/chat(로비 채팅)
    
    - 위 채팅 내용과 동일
  
  - /pub/lobby/entrance(로비 입장)
    
    - 유저 정보 전송
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 11,
          "userName": "z상식지존z",
          "userScore": 9999,
          "userRanking": 1,
          "ready": false,
          "leader": true
      }
      ```
  
  - /sub/lobby/list(로비 유저 목록)



> ### Ready & UnReady

- Ready
  
  - /pub/room/ready/{roomId}
    
    - 유저 정보 전송
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 5,
          "userName": "저녁뭐먹지",
          "userScore": 543,
          "userRanking": 131,
          "ready": true,
          "leader": false
      }
      ```
  
  - /sub/room/info/{roomId}

- Unready
  
  - /pub/room/unready/{roomId}
    
    - 유저 정보 전송
    
    - "userId": int
      
      "userName": String
      
      "userScore": int
      
      "userRanking": int
      
      "ready": boolean
      
      "leader": boolean
    
    - ```json
      {
          "userId": 5,
          "userName": "저녁뭐먹지",
          "userScore": 543,
          "userRanking": 131,
          "ready": false,
          "leader": false
      }
      ```
  
  - /sub/room/info/{roomId}
