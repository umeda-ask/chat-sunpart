'use strict';

// 対話フロー定義
const chatList = {
    1: {text: '税理士法人サンパートナーズオフィス お問い合わせチャットへようこそ。', continue: true, option: 'normal', return: false},
    2: {text: {title: '以下よりお問い合わせ内容を選んでください。', choices: ['アクセス', '営業時間', '対応業務', '料金', 'お問い合わせ']}, continue: false, option: 'choices', return: true},
    3: {text: '小田急線 本厚木駅から徒歩３分になります。', continue: false, option: 'normal', return: true},
    4: {text: '弊所の営業時間は９：００～１７：００です。定休日は土曜日、日曜日、祝日になります。時間外の場合も事前予約で対応いたします。', continue: false, option: 'normal', return: true},
    5: {text: '会社設立、節税対策、確定申告、相続税等のご相談に対応しております。ぜひお気軽にお問い合わせください。', continue: false, option: 'normal', return: true},
    6: {text: '初回相談１時間無料になります。ぜひお気軽にお問い合わせください。', continue: false, option: 'normal', return: true},
    7: {text: {title: 'お問い合わせ内容を選択してください。', choices: ['税務相談', 'その他']}, continue: false, option: 'choices', return: true},
    8: {text: 'お名前を入力して送信ボタンを押してください', continue: false, option: 'normal', return: false},
    9: {text: 'ご住所を入力して送信ボタンを押してください。', continue: false, option: 'normal', return: false},
    10: {text: 'お電話番号を入力して送信ボタンを押してください。', continue: false, option: 'normal', return: false},
    11: {text: 'お問い合わせ内容を入力して送信ボタンを押してください。', continue: false, option: 'normal', return: false},
    12: {text: {title: '相談を送信しますか？', choices: ['はい', '入力しなおす']}, continue: false, option: 'choices', return: false},
    13: {text: 'ご利用ありがとうございました。', continue: false, option: 'normal', return: true},
    14: {text: 'もう一度相談内容を入力してください。', continue: false, option: 'normal', return: false}
};

let userCount = 0;
let robotCount = 0;
let userData = [];
let userName = '', userAddress = '', userPhone = '', userInquiry = '';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://umeda-ask.github.io/chat-sunpart/styles.css';
document.head.appendChild(link);

document.addEventListener('DOMContentLoaded', () => {

  // --- チャットUIのHTMLを動的に挿入 ---
  const chatbotHTML = `
    <div id="chatbot" style="display:none;">
      <div id="chatbotHeader">
        <img src="https://umeda-ask.github.io/chat-sunpart/person_icon.png" alt="Person Icon" id="personIcon">
        <span>お問い合わせチャット</span>
        <span id="closeChatbot" style="cursor:pointer;">✖</span>
      </div>
      <div id="chatbotMessages">
        <ul id="chatbot-ul"></ul>
      </div>
      <div id="chatbotInput">
        <input type="text" id="messageInput" placeholder="メッセージを入力...">
        <button id="sendMessage">送信</button>
      </div>
    </div>
    <button id="openChatbot" title="お問い合わせはこちらから">
      <img src="https://umeda-ask.github.io/chat-sunpart/chat_open.png" alt="チャットアイコン" class="openIcon">
    </button>
  `;
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const openChatbotButton = document.getElementById('openChatbot');
    const closeChatbotButton = document.getElementById('closeChatbot');
    const sendMessageButton = document.getElementById('sendMessage');

    openChatbotButton.onclick = () => {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = 'flex';
        setTimeout(() => chatbot.classList.add('show'), 10);
        setTimeout(() => openChatbotButton.classList.add('hide'), 200);
    };

    closeChatbotButton.onclick = () => {
        const chatbot = document.getElementById('chatbot');
        chatbot.classList.remove('show');
        setTimeout(() => {
            chatbot.style.display = 'none';
            openChatbotButton.classList.remove('hide');
        }, 200);
    };

    sendMessageButton.onclick = () => {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        if (!message) return;

        appendUserMessage(message);
        messageInput.value = '';

        userCount++;
        userData.push(message);

        if (robotCount === 8) userName = message;
        else if (robotCount === 9) userAddress = message;
        else if (robotCount === 10) userPhone = message;
        else if (robotCount === 11) userInquiry = message;

        robotOutput();
        scrollChatToBottom();
    };

    robotOutput();

    function appendUserMessage(text) {
        const ul = document.getElementById('chatbot-ul');
        const li = document.createElement('li');
        li.classList.add('right');
        const div = document.createElement('div');
        div.classList.add('chatbot-right');
        div.textContent = text;
        li.appendChild(div);
        ul.appendChild(li);
    }

    function robotOutput() {
        if (robotCount == 0 || robotCount == 1){
            robotCount++;
        }
        if (!chatList[robotCount]) return;

        const ul = document.getElementById('chatbot-ul');
        const li = document.createElement('li');
        li.classList.add('left');

        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('chatbot-left');
        loadingDiv.innerHTML = `<div class="loading"><span></span><span></span><span></span></div>`;
        li.appendChild(loadingDiv);
        ul.appendChild(li);
        scrollChatToBottom();

        setTimeout(() => {
            loadingDiv.remove();
            const div = document.createElement('div');
            div.classList.add('chatbot-left');
            li.appendChild(div);

            const chat = chatList[robotCount];
            if (chat.option === 'choices') {
                const title = document.createElement('div');
                title.classList.add('choice-title');
                title.textContent = chat.text.title;
                div.appendChild(title);

                chat.text.choices.forEach((choice, i) => {
                    const btn = document.createElement('button');
                    btn.classList.add('choice-button');
                    btn.textContent = choice;
                    btn.id = `choice-${robotCount}-${i}`;
                    btn.onclick = () => pushChoice(btn);
                    div.appendChild(btn);
                });

                sendMessageButton.disabled = true;
            } else if (chat.option === 'normal') {
                div.textContent = chat.text;
                sendMessageButton.disabled = false;

                if (chat.return) {
                    const backBtn = document.createElement('button');
                    backBtn.classList.add('choice-button');
                    backBtn.textContent = '最初に戻る';
                    backBtn.onclick = () => {
                        robotCount = 1;
                        userCount = 0;
                        userData = [];
                        robotOutput();
                    };
                    div.appendChild(backBtn);
                }
            }
            scrollChatToBottom();

            if (chat.continue) robotOutput();
        }, 1500);
    }

    function pushChoice(btn) {
        userCount++;
        userData.push(btn.textContent);
        const btnId = btn.id;
        const parts = btnId.split('-');
        const rCount = parseInt(parts[1], 10);
        const choiceIndex = parseInt(parts[2], 10);

        // disable all other buttons in current choice group
        const buttons = document.querySelectorAll(`#chatbot-ul .choice-button`);
        buttons.forEach(b => {
            if (b !== btn) {
                b.disabled = true;
                b.classList.add('choice-button-disabled');
            }
        });

        btn.disabled = true;
        btn.classList.remove('choice-button-disabled');

        let nextCount;
        if (rCount === 12 && choiceIndex === 0) { // はい
            sendEmail();
            nextCount = 13;
        } else if (rCount === 12 && choiceIndex === 1) { // 入力しなおす
            nextCount = 6;
        } else if (rCount === 2) {
            switch (choiceIndex) {
                case 0: nextCount = 3; break;
                case 1: nextCount = 4; break;
                case 2: nextCount = 5; break;
                case 3: nextCount = 6; break;
                case 4: nextCount = 7; break;
                default: nextCount = 14;
            }
        } else if (rCount === 7) {
            nextCount = 8;
        } else {
            nextCount = 14;
        }

        robotCount = nextCount;
        robotOutput();
    }

    function sendEmail() {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not loaded.');
            return;
        }
        emailjs.send("askchatmail", "template_uxrrqkp", {
            professional_office: "税理士法人サンパートナーズオフィス",
            user_name: userName,
            user_address: userAddress,
            user_phone: userPhone,
            user_inquiry: userInquiry,
            professional_email: "hirano@sunpart.jp"
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }

    function scrollChatToBottom() {
        const chat = document.getElementById('chatbotMessages');
        chat.scrollTop = chat.scrollHeight;
    }
});
