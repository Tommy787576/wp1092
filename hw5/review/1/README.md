# HW5: Number Guessing Game

## Setup

```
npm install
npm run server
npm start
```

## Fetures
- basic
  - (src/App.js) 處理當 “guess!” 按鈕按下去之後，把輸入框猜的數字透過 Axios 傳給 server 端去做判斷，並且接收 server 傳回來的猜測狀態，設定對應的 states 值。
  - (server/core/getNumber.js) 當 “forceStart” 為 true 或 “number” 是 undefined 時，重新產生一個介於 1 ~ 100 的隨機亂數。否則，就直接回傳 “number”。
  - (server/routes/guess.js) 檢查猜的數字是否正確，並且回傳建議 (status) - Bigger (猜大一點), Smaller (猜小一點), Equal (答對了)
  - (server/routes/guess.js) 實作 “router.post(‘/restart’,...)", 以利在遊戲結束後可以重新開始
  - (src/axios.js) 修改 “guess” 去處理 server 回傳的 HTTP error (400), 並印出像 ‘Error: "xx" is not a valid number (1 - 100)’ 這樣的 error message.
- advance
  - 在 “src/axios.js” 的各個 functions 處理 server not responding or not connected 的情況 (例如:server 被 關掉)，並且在畫面 (src/App.js) 給予適當的訊息。(Note: 當 server 回來以後應該要可以繼續遊戲)
  - 在 “server” 底下開個 “log” 資料夾, 把每次 server ON 以後遊戲的紀錄存在一個檔案裡，檔案名稱為 “yyyy-mm-dd-hh-mm.log” (例如:”2021-04-30-18-32.log”)，即以 server ON 的時間為檔名，記錄每個遊戲的動作，每個動作一行，格式建議如下 (記錄到 “秒“):
  ```
  ✓ start number=57 2021-04-30-18-33-27
  ✓ guess 50 2021-04-30-18-33-50
  ✓ guess 75 2021-04-30-18-34-08
  ✓ guess 57 2021-04-30-18-34-22
  ✓ end-game
  ✓ restart number=38 2021-05-02-10-03-17
  ```

Thanks for your comment in advance.
