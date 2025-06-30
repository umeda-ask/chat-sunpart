
// Inject style directly to avoid dependency on external CSS
(function() {
    var style = document.createElement('style');
    style.textContent = `#chatbot {
    position: fixed;
    bottom: 5%;
    right: 2%;
    width: 30%;
    height: 92%;
    border: 1px solid #ccc;
    background: #ffffff;
    display: none;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    opacity: 0;
    transform: scale(0);
    transform-origin: bottom right;
    transition: opacity 0.1s ease, transform 0.1s ease;
}

#chatbot.show {
    opacity: 1;
    transform: scale(1);
    display: flex;
    z-index: 99999
}

#chatbotHeader {
    background: #0078d4;
    color: white;
    padding: 3%;
    cursor: pointer;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chatbotHeader span {
    font-size: 2vw;
}

#phoneText{
    color:#000;
}

#personIcon {
    width: 3vw; /* アイコンの大きさを調整 */
    height: 3vw; /* アイコンの大きさを調整 */
    margin-right: 1vw; /* アイコンとテキストの間にスペースを追加 */
}

#chatbotPhone {
    background: #D5E1ED; /* 背景色を設定 */
    padding: 1%; /* 余白を設定 */
    text-align: center; /* テキストを中央揃え */
    font-size: 1.2vw; /* フォントサイズを小さく設定 */
    border-top: 1px solid #ccc; /* 上部に境界線を追加 */
    border-bottom: 1px solid #ccc; /* 下部に境界線を追加 */
}

#phoneLink {
    color: #0078d4; /* リンクの色を設定 */
    text-decoration: none; /* リンクの下線を消す */
    font-size: 1.5vw; /* リンクのフォントサイズを大きく設定 */
}

#phoneLink:hover {
    text-decoration: underline; /* ホバー時に下線を表示 */
}

#chatbotMessages {
    flex: 1;
    padding: 3%;
    overflow-y: scroll;
    background-color: #f0f0f0; /* Background similar to ASKUL's message area */
}

#chatbotMessages ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#chatbotMessages li {
    margin-bottom: 3%;
    display: flex;
}

.left {
    justify-content: flex-start;
}

.right {
    justify-content: flex-end;
}

.chatbot-left, .chatbot-right {
    max-width: 70%;
    padding: 3%;
    border-radius: 10px;
    position: relative;
    word-wrap: break-word;
    color: #000; /* 吹き出しの文字色を黒に設定 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 影を追加 */
}

.chatbot-left {
    background: #ffffff;
    border: 1px solid #ccc;
    font-size: 1.5vw;
}

.chatbot-left::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: #ffffff;
}

.chatbot-right {
    background: #dcf8c6;
}

.chatbot-right::before {
    content: "";
    position: absolute;
    top: 10px;
    right: -20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #dcf8c6;
}

#chatbotInput {
    display: flex;
    padding: 3%;
    border-top: 1px solid #ccc;
    background: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

#chatbotInput input {
    flex: 1;
    padding: 3%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 1%;
}

#sendMessage {
    padding: 3%;
    background: #0078d4;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

#sendMessage:disabled {
    background: #cccccc;
    cursor: not-allowed;
}

#openChatbot {
    position: fixed;
    bottom: 2%;
    right: 2%;
    width: 6vw; /* Set width based on viewport width */
    height: 6vw; /* Set height equal to width to keep it square */
    background: #0078d4;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* 影を強調 */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, opacity 0.1s ease; /* アイコンの拡大 */
    z-index: 99999;
}

#openChatbot.hide {
    transform: scale(0);
    opacity: 0;
}

#openChatbot img {
    width: 50%; /* Adjust based on parent size */
    height: 50%; /* Adjust based on parent size */
}

.choice-button {
    background: #0078d4;
    color: white;
    border: none;
    padding: 2%;
    margin: 1% 0;
    cursor: pointer;
    border-radius: 5px;
    display: block;
    width: 16vw; /* 固定幅を設定 */
    transition: background-color 0.3s;
}


.choice-button:hover {
    background: #005bb5;
}

.choice-button-disabled {
    background: #cccccc;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .choice-button {
        width: 45vw; /* スマホの場合の幅を設定 */
        height: 40px;
    }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.loading {
    display: flex;
    align-items: center;
}

.loading span {
    display: inline-block;
    margin: 0 2px;
    width: 0.8vw;
    height: 0.8vw;
    background-color: #000;
    border-radius: 50%;
    animation: blink 1.4s infinite both;
}

.loading span:nth-child(1) {
    animation-delay: 0.2s;
}

.loading span:nth-child(2) {
    animation-delay: 0.4s;
}

.loading span:nth-child(3) {
    animation-delay: 0.6s;
}

@media (max-width: 768px) {
    .loading span {
        width: 2.5vw;
        height: 2.5vw;
    }
}

@media (max-width: 768px) {
    #chatbot {
        width: 92%;
        height: 92%;
    }

    #openChatbot {
        width: 17vw; /* Increase width for mobile devices */
        height: 17vw; /* Increase height for mobile devices */
    }

    #openChatbot img {
        width: 50%; /* Adjust based on parent size */
        height: 50%; /* Adjust based on parent size */
    }

    #chatbotHeader span {
        font-size: 6vw;
    }
}
.choice-button {
    font-size: 1.4vw; /* ボタンの文字を少し大きく */
}
@media (max-width: 768px) {
    .choice-button {
        font-size: 4vw; /* スマホ用にさらに大きく */
    }
}

#openChatbot {
    ...
    position: relative;
}

#openChatbotTooltip {
    display: none;
    position: absolute;
    top: -3vw; /* Adjust tooltip position based on viewport size */
    left: -12%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 0.5vw 1vw;
    border-radius: 5px;
    font-size: 1.2vw;
    white-space: nowrap;
}

#openChatbotTooltip {
    display: block;
}

#openChatbotTooltip::after {
    content: "";
    position: absolute;
    bottom: -0.5vw; /* Position the arrow */
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.5vw 0.5vw 0 0.5vw;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

@media (max-width: 768px) {
    #openChatbotTooltip {
        display: none;
    }
}

#openChatbot {
    position: fixed;
    bottom: 2%;
    right: 2%;
    width: 6vw; /* Set width based on viewport width */
    height: 6vw; /* Set height equal to width to keep it square */
    background: #0078d4;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* 影を強調 */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, opacity 0.1s ease; /* アイコンの拡大 */
    z-index: 99999;
}

#openChatbot:hover {
    transform: scale(1.1); /* ホバー時にアイコンを拡大 */
}

#openChatbot img {
    width: 50%; /* Adjust based on parent size */
    height: 50%; /* Adjust based on parent size */
}

@media (max-width: 768px) {
    #openChatbot {
        width: 17vw; /* Increase width for mobile devices */
        height: 17vw; /* Increase height for mobile devices */
        bottom: 20%;
        right: 5%;
        z-index: 99999;
    }

    #openChatbot:hover {
        transform: none; /* スマホ時に拡大しない */
    }

    #openChatbot img {
        width: 50%; /* Adjust based on parent size */
        height: 50%; /* Adjust based on parent size */
    }
    
    .chatbot-left {
        font-size: 4vw;
    }
    
    #chatbotPhone {
        font-size: 4vw; /* フォントサイズを小さく設定 */
    }
    
    #phoneLink {
        font-size: 5vw; /* リンクのフォントサイズを大きく設定 */
    }
    
}

/* トグルボタンのスタイル */
.toggle-button {
    background-color: #ccc;
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
    border-radius: 20px;
    width: 60px;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    font-size: 1.2vw; /* Adjust based on viewport size */
}

.toggle-button.on {
    background-color: #4CAF50;
    transform: scale(1.1); /* Button slightly enlarges when active */
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .toggle-button {
        font-size: 4vw; /* Adjust for mobile devices */
    }
}

#chatbotSettingsContainer {
    width: 100%;
    background-color: #f0f0f0;
}

#chatbotSettingsHeader {
    background: #0078d4;
    color: white;
    padding: 1%;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chatbotSettingsHeader span {
    font-size: 1.2vw; /* Adjust as needed */
}

.hidden {
    display: none;
}

/* トグルボタンのスタイル */
.toggle-button {
    background-color: #ccc;
    border: none;
    color: #fff;
    padding: 2%;
    cursor: pointer;
    border-radius: 15px;
    width: 18%;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    font-size: 1.2vw; /* Adjust based on viewport size */
}

.toggle-button.on {
    background-color: #4CAF50;
    transform: scale(1.1); /* Button slightly enlarges when active */
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1% 0% 1%;
    color: black;
}

/* Responsive styles */
@media (max-width: 768px) {
    .toggle-button {
        font-size: 4vw; /* Adjust for mobile devices */
    }

    #chatbotSettingsHeader span {
        font-size: 4vw; /* Adjust for mobile devices */
    }
}

.toggle-button {
    background-color: #eb8333;
}

.hidden {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
}

#chatbotSettings {
    max-height: 0; /* 初期値は0 */
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
}
`;
    document.head.appendChild(style);
})();


'use strict';

// SEO&WEBアクセシビリティ タグ生成
document.addEventListener("DOMContentLoaded", function() {

    // EmailJSのスクリプトを動的に読み込む
    const emailJsScript = document.createElement('script');
    emailJsScript.type = 'text/javascript';
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);

    emailJsScript.onload = function() {
        // EmailJSの初期化
        emailjs.init('hugWN77kXtanuGGDO'); // 'YOUR_USER_ID' をEmailJSのユーザーIDに置き換えてください
    };

    var displaySettings = getScriptParameter('swr');
    if (displaySettings) {

        function updateOrCreateMeta(name, content, property = false) {
            let meta;
            if (property) {
                meta = Array.from(document.querySelectorAll('meta')).find(meta => meta.getAttribute('property') && meta.getAttribute('property').toLowerCase() === name.toLowerCase());
            } else {
                meta = Array.from(document.querySelectorAll('meta')).find(meta => meta.getAttribute('name') && meta.getAttribute('name').toLowerCase() === name.toLowerCase());
            }

            if (meta) {
                meta.setAttribute('content', content);
            } else {
                meta = document.createElement('meta');
                if (property) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        }

        const metaCharset = Array.from(document.querySelectorAll('meta')).find(meta => meta.getAttribute('charset') && meta.getAttribute('charset').toLowerCase() === 'utf-8');
        if (metaCharset) {
            metaCharset.setAttribute('charset', 'UTF-8');
        } else {
            const newMetaCharset = document.createElement('meta');
            newMetaCharset.setAttribute('charset', 'UTF-8');
            document.head.appendChild(newMetaCharset);
        }

        updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');

        // ページのタイトルを取得
        const pageTitle = document.title;
        updateOrCreateMeta('description', pageTitle);
        updateOrCreateMeta('keywords', 'default, keywords');
        updateOrCreateMeta('author', 'Default Author');
        updateOrCreateMeta('robots', 'index, follow');
        updateOrCreateMeta('og:title', pageTitle, true);
        updateOrCreateMeta('og:description', pageTitle, true);

        // ページのURLを取得
        const pageURL = window.location.href;
        updateOrCreateMeta('og:url', pageURL, true);

        // ページ内の最初の画像を取得
        const firstImage = document.querySelector('img');
        const firstImageURL = firstImage ? firstImage.src : '';
        updateOrCreateMeta('og:image', firstImageURL, true);
        updateOrCreateMeta('twitter:image', firstImageURL);

        updateOrCreateMeta('og:type', 'website', true);
        updateOrCreateMeta('twitter:card', 'summary_large_image');
        updateOrCreateMeta('twitter:title', pageTitle);
        updateOrCreateMeta('twitter:description', pageTitle);

        if (pageURL) {
            let canonical = Array.from(document.querySelectorAll('link')).find(link => link.getAttribute('rel') && link.getAttribute('rel').toLowerCase() === 'canonical');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                canonical.setAttribute('href', pageURL);
                document.head.appendChild(canonical);
            }
        }

        if (firstImageURL) {
            // ファビコンが既に設定されているか確認
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                // ファビコンが設定されていない場合のみ設定
                favicon = document.createElement('link');
                favicon.setAttribute('rel', 'icon');
                favicon.setAttribute('href', firstImageURL);
                favicon.setAttribute('type', 'image/x-icon');
                document.head.appendChild(favicon);
            }

            let shortcutIcon = document.querySelector('link[rel="shortcut icon"]');
            if (!shortcutIcon) {
                shortcutIcon = document.createElement('link');
                shortcutIcon.setAttribute('rel', 'shortcut icon');
                shortcutIcon.setAttribute('href', firstImageURL);
                shortcutIcon.setAttribute('type', 'image/x-icon');
                document.head.appendChild(shortcutIcon);
            }
        }
    }
});



// チャットボット設定
document.addEventListener('DOMContentLoaded', (event) => {

    var displaySettings = getScriptParameter('wpx');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://umeda-ask.github.io/chat-sunpart/styles.css';
    document.head.appendChild(link);

    let chatbotHTML = `
        <div id="chatbot">
            <div id="chatbotHeader">
                <img src="https://umeda-ask.github.io/chat-sunpart/person_icon.png" alt="Person Icon" id="personIcon">
                <span>お問い合わせチャット</span>
                <span id="closeChatbot" style="cursor: pointer;">✖</span>
            </div>
            <div id="chatbotMessages">
                <ul id="chatbot-ul"></ul>
            </div>
    `;

    if (displaySettings) {
        chatbotHTML += `
            <div id="chatbotSettingsContainer">
                <div id="chatbotSettingsHeader">
                    <span>Web アクセシビリティを有効にする</span>
                    <button id="toggleSettings" class="toggle-button">▲</button>
                </div>
                <div id="chatbotSettings" class="hidden">
                    <div class="setting-item">
                        <span>読み上げを有効にする</span>
                        <button id="toggle-speech" class="toggle-button">OFF</button>
                    </div>
                    <div class="setting-item">
                        <span>テキスト拡大を有効にする</span>
                        <button id="toggle-zoom" class="toggle-button">OFF</button>
                    </div>
                    <div class="setting-item">
                        <span>白黒化を有効にする</span>
                        <button id="toggle-grayscale" class="toggle-button">OFF</button>
                    </div>
                    <div class="setting-item">
                        <span>動画停止を有効にする</span>
                        <button id="toggle-video-pause" class="toggle-button">OFF</button>
                    </div>
                </div>
            </div>
        `;
    }

    chatbotHTML += `
            <div id="chatbotPhone">
                <span id="phoneText">ご相談はこちらから: </span>
                <a href="tel:0462269980" id="phoneLink">046-226-9980</a>
            </div>
            <div id="chatbotInput">
                <input type="text" id="messageInput" placeholder="メッセージを入力...">
                <button id="sendMessage">送信</button>
            </div>
        </div>
        <button id="openChatbot">
            <img src="https://umeda-ask.github.io/chat-sunpart/chat_open.png" alt="チャットアイコン">
            <span id="openChatbotTooltip">お問い合わせはこちらから</span>
        </button>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 強制スタイル上書きで他CSSの影響を排除
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        Object.assign(chatbot.style, {
            position: 'fixed',
            bottom: '5%',
            right: '2%',
            width: '30%',
            height: '92%',
            border: '1px solid #ccc',
            background: '#ffffff',
            display: 'none',
            flexDirection: 'column',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            opacity: '0',
            transform: 'scale(0)',
            transformOrigin: 'bottom right',
            transition: 'opacity 0.1s ease, transform 0.1s ease',
            zIndex: '99999'
        });
    }

    const openBtn = document.getElementById('openChatbot');
    if (openBtn) {
        Object.assign(openBtn.style, {
            position: 'fixed',
            bottom: '2%',
            right: '2%',
            width: '6vw',
            height: '6vw',
            background: '#0078d4',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '50%',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.3s ease, opacity 0.1s ease',
            zIndex: '99999'
        });
    }


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
    14: {text: 'もう一度相談内容を入力してください。', continue: false, option: 'normal', return: false},
    16: {text: {title: '以下のカテゴリから選んでください。', choices: ['Blog', '解説記事']}, continue: false, option: 'choices', return: true},
    17: {text: {title: '詳細カテゴリを以下から選んでください。', choices: ['講習会', '成年後見']}, continue: false, option: 'choices', return: true},
    18: {text: {title: '詳細カテゴリを以下から選んでください。', choices: ['相続', '生前対策']}, continue: false, option: 'choices', return: true},
    19: {text: {title: '講習会に関連する記事:', links: [{title: '講習会終了しました', url: 'https://makino-shiho-shoshi.com/knowledge/%e8%ac%9b%e7%bf%92%e4%bc%9a%e7%b5%82%e4%ba%86%e3%81%97%e3%81%be%e3%81%97%e3%81%9f/'}, {title: '講習会のお知らせ', url: 'https://makino-shiho-shoshi.com/knowledge/%e8%ac%9b%e7%bf%92%e4%bc%9a%e3%81%ae%e3%81%8a%e7%9f%a5%e3%82%89%e3%81%9b/'}]}, continue: false, option: 'links', return: true},
    20: {text: {title: '成年後見に関連する記事:', links: [{title: '成年後見制度の基礎｜司法書士が解説する利点とプロセス', url: 'https://makino-shiho-shoshi.com/knowledge/%e6%88%90%e5%b9%b4%e5%be%8c%e8%a6%8b%e5%88%b6%e5%ba%a6%e3%81%ae%e5%9f%ba%e7%a4%8e-%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e3%81%8c%e8%a7%a3%e8%aa%ac%e3%81%99%e3%82%8b%e5%88%a9%e7%82%b9%e3%81%a8/'}, {title: '商業登記のトラブル回避法|司法書士が教えるポイント', url: 'https://makino-shiho-shoshi.com/knowledge/%e5%95%86%e6%a5%ad%e7%99%bb%e8%a8%98%e3%81%ae%e3%83%88%e3%83%a9%e3%83%96%e3%83%ab%e5%9b%9e%e9%81%bf%e6%b3%95%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e3%81%8c%e6%95%99%e3%81%88%e3%82%8b%e3%83%9d%e3%82%a4/'}]}, continue: false, option: 'links', return: true},
    21: {text: {title: '相続に関連する記事:', links: [{title: '司法書士が活躍する国際相続の手続きと注意点', url: 'https://makino-shiho-shoshi.com/knowledge/%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e3%81%8c%e6%b4%bb%e8%ba%8d%e3%81%99%e3%82%8b%e5%9b%bd%e9%9a%9b%e7%9b%b8%e7%b6%9a%e3%81%ae%e6%89%8b%e7%b6%9a%e3%81%8d%e3%81%a8%e6%b3%a8%e6%84%8f%e7%82%b9/'}, {title: '不動産登記の基礎知識|司法書士が語る重要ポイント', url: 'https://makino-shiho-shoshi.com/knowledge/%e4%b8%8d%e5%8b%95%e7%94%a3%e7%99%bb%e8%a8%98%e3%81%ae%e5%9f%ba%e7%a4%8e%e7%9f%a5%e8%ad%98%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e3%81%8c%e8%aa%9e%e3%82%8b%e9%87%8d%e8%a6%81%e3%83%9d%e3%82%a4%e3%83%b3/'}]}, continue: false, option: 'links', return: true},
    22: {text: {title: '生前対策に関連する記事:', links: [{title: '家族を守るための戦略|司法書士による賢い生前対策ガイド', url: 'https://makino-shiho-shoshi.com/knowledge/%e5%ae%b6%e6%97%8f%e3%82%92%e5%ae%88%e3%82%8b%e3%81%9f%e3%82%81%e3%81%ae%e6%88%a6%e7%95%a5-%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e3%81%ab%e3%82%88%e3%82%8b%e8%b3%a2%e3%81%84%e7%94%9f%e5%89%8d%e5%af%be/'}, {title: 'スムーズな相続のためのガイド|司法書士事務所が提供するサポート', url: 'https://makino-shiho-shoshi.com/knowledge/%e3%82%b9%e3%83%a0%e3%83%bc%e3%82%ba%e3%81%aa%e7%9b%b8%e7%b6%9a%e3%81%ae%e3%81%9f%e3%82%81%e3%81%ae%e3%82%ac%e3%82%a4%e3%83%89%e5%8f%b8%e6%b3%95%e6%9b%b8%e5%a3%ab%e4%ba%8b%e5%8b%99%e6%89%80%e3%81%8c/'}]}, continue: false, option: 'links', return: true},
};






    let userCount = 0;
    let userData = [];
    let robotCount = 0;
    let userName = '';
    let userAddress = '';
    let userPhone = '';
    let userInquiry = '';

    const openChatbotButton = document.getElementById('openChatbot');
    const closeChatbotButton = document.getElementById('closeChatbot');
    const sendMessageButton = document.getElementById('sendMessage');

    openChatbotButton.onclick = function() {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = 'flex';
        setTimeout(() => {
            chatbot.classList.add('show');
        }, 10);
        setTimeout(() => {
            openChatbotButton.classList.add('hide');
        }, 200);
    };

    closeChatbotButton.onclick = function() {
        const chatbot = document.getElementById('chatbot');
        chatbot.classList.remove('show');
        setTimeout(() => {
            chatbot.style.display = 'none';
            openChatbotButton.classList.remove('hide');
        }, 200);
    };

    sendMessageButton.onclick = function() {
        const message = document.getElementById('messageInput').value;
        if (message.trim() !== '') {
            const messageElem = document.createElement('li');
            messageElem.classList.add('right');
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-right');
            messageDiv.textContent = message;
            messageElem.appendChild(messageDiv);
            document.getElementById('chatbot-ul').appendChild(messageElem);
            document.getElementById('messageInput').value = '';

            userCount++;
            userData.push(message);

            if (robotCount === 8) {
                userName = message;
            } else if (robotCount === 9) {
                userAddress = message;
            } else if (robotCount === 10) {
                userPhone = message;
            } else if (robotCount === 11) {
                userInquiry = message;
            }

            if (robotCount < Object.keys(chatList).length) {
                robotOutput();
            } else {
                repeatRobotOutput();
            }

            scrollChatToBottom();
        }
    };

    function scrollChatToBottom() {
        const chatField = document.getElementById('chatbotMessages');
        chatField.scrollTop = chatField.scrollHeight;
    }


function robotOutput() {
    if (robotCount >= Object.keys(chatList).length) return;

    robotCount++;
    console.log('robotCount：' + robotCount);

    const ul = document.getElementById('chatbot-ul');
    const li = document.createElement('li');
    li.classList.add('left');
    ul.appendChild(li);

    const robotLoadingDiv = document.createElement('div');
    robotLoadingDiv.classList.add('chatbot-left');
    robotLoadingDiv.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';
    li.appendChild(robotLoadingDiv);
    scrollChatToBottom();

    setTimeout(() => {
        robotLoadingDiv.remove();

        const div = document.createElement('div');
        div.classList.add('chatbot-left');
        li.appendChild(div);

        const currentChat = chatList[robotCount];
        
        if (!currentChat || !currentChat.text) {
            console.error('No text found for robotCount:', robotCount);
            return;
        }

        if (currentChat.option === 'choices') {
            const choiceField = document.createElement('div');
            choiceField.id = `q-${robotCount}`;
            div.appendChild(choiceField);

            const choiceTitle = document.createElement('div');
            choiceTitle.classList.add('choice-title');
            choiceTitle.textContent = currentChat.text.title;
            choiceField.appendChild(choiceTitle);

            for (let i = 0; i < currentChat.text.choices.length; i++) {
                const choiceButton = document.createElement('button');
                choiceButton.id = `q-${robotCount}-${i}`;
                choiceButton.setAttribute('onclick', 'pushChoice(this)');
                choiceButton.classList.add('choice-button');
                choiceButton.textContent = currentChat.text.choices[i];
                choiceField.appendChild(choiceButton);
            }

                sendMessageButton.disabled = true; // ボタン選択時は送信ボタンを非活性化
        } else if (currentChat.option === 'links') {
            const linksField = document.createElement('div');
            linksField.id = `links-${robotCount}`;
            div.appendChild(linksField);

            const linksTitle = document.createElement('div');
            linksTitle.classList.add('choice-title');
            linksTitle.textContent = currentChat.text.title;
            linksField.appendChild(linksTitle);

            for (let i = 0; i < currentChat.text.links.length; i++) {
                const linkElem = document.createElement('a');
                linkElem.href = currentChat.text.links[i].url;
                linkElem.target = '_blank';
                linkElem.classList.add('link-item');
                linkElem.textContent = currentChat.text.links[i].title;
                linksField.appendChild(linkElem);
                linksField.appendChild(document.createElement('br')); // 改行を追加
            }

            // 戻るボタンを追加
            const backButton = document.createElement('button');
            backButton.textContent = '最初に戻る';
            backButton.classList.add('choice-button');
            backButton.onclick = () => {
                robotCount = 1; // 最初の選択に戻る
                userCount = 0;  // ユーザーカウントをリセット
                robotOutput();
            };
            div.appendChild(backButton);

            sendMessageButton.disabled = false;
        } else {
            switch (currentChat.option) {
                case 'normal':
                    div.textContent = currentChat.text;
                    break;
                case 'random':
                    div.textContent = currentChat.text[Math.floor(Math.random() * currentChat.text.length)];
                    break;
                default:
                    div.textContent = '内容が見つかりませんでした。';
                    console.error('Unknown option for robotCount:', robotCount);
            }
                            sendMessageButton.disabled = false;

if (currentChat.return) {
    const backButton = document.createElement('button');
    backButton.textContent = '最初に戻る';
    backButton.classList.add('choice-button');
    backButton.onclick = () => {
        robotCount = 1; // 最初の選択に戻る
        userCount = 0;  // ユーザーカウントをリセット
        robotOutput();
    };
    div.appendChild(backButton);
}

        }

        scrollChatToBottom();

        if (currentChat.continue) {
            robotOutput();
        }
    }, 2000);
}





window.pushChoice = function(e) {
    userCount++;
    console.log(`userCount: ${userCount}`);

    const choicedId = e.getAttribute('id');
    userData.push(document.getElementById(choicedId).textContent);

    const choiceIndex = parseInt(choicedId.split('-')[2]);

    // 既存の選択肢ボタンを全て無効化し、グレーアウトする
    const choiceButtons = document.querySelectorAll(`#q-${robotCount} .choice-button`);
    choiceButtons.forEach(button => {
        if (button.id !== choicedId) {
            button.disabled = true;
            button.classList.add('choice-button-disabled');
        }
    });

    // 選択したボタンはそのままの色を維持するために、disabled属性を追加せず、クラスも変更しない
    const selectedButton = document.getElementById(choicedId);
    selectedButton.disabled = true; // ボタンの再クリックを防ぐために無効化するが、スタイルは変更しない
    selectedButton.classList.remove('choice-button-disabled'); // クラスを削除して色がグレーにならないようにする

    let nextRobotCount;

if (robotCount === 12 && choiceIndex === 0) {  // 「はい」を選択
    sendEmail();  // メールを送信
    nextRobotCount = 12;
} else if (robotCount === 12 && choiceIndex === 1) {  // 「入力しなおす」を選択
    nextRobotCount = 6;
} else if (robotCount === 2 && choiceIndex === 5) {  // 「記事を探す」を選択
    nextRobotCount = 15;  // 大カテゴリ1、2を表示するケースに移行
} else if (robotCount === 16 && choiceIndex === 0) {  // 「大カテゴリ1」を選択
    nextRobotCount = 16;  // 中カテゴリ1、2を表示するケースに移行
} else if (robotCount === 16 && choiceIndex === 1) {  // 「大カテゴリ2」を選択
    nextRobotCount = 18;  // 中カテゴリ3、4を表示するケースに移行
} else if (robotCount === 17 && choiceIndex === 0) {  // 「中カテゴリ1」を選択
    nextRobotCount = 19;  // 中カテゴリ1に関連する記事を表示
} else if (robotCount === 17 && choiceIndex === 1) {  // 「中カテゴリ2」を選択
    nextRobotCount = 20;  // 中カテゴリ2に関連する記事を表示
} else if (robotCount === 18 && choiceIndex === 0) {  // 「中カテゴリ3」を選択
    nextRobotCount = 21;  // 中カテゴリ3に関連する記事を表示
} else if (robotCount === 18 && choiceIndex === 1) {  // 「中カテゴリ4」を選択
    nextRobotCount = 22;  // 中カテゴリ4に関連する記事を表示
} else {
    switch (choiceIndex) {
        case 0:
            nextRobotCount = (robotCount === 2 || robotCount === 15) ? 2 : 7;
            break;
        case 1:
            nextRobotCount = (robotCount === 2 || robotCount === 15) ? 3 : 7;
            break;
        case 2:
            nextRobotCount = (robotCount === 2 || robotCount === 15) ? 4 : 7;
            break;
        case 3:
            nextRobotCount = (robotCount === 2 || robotCount === 15) ? 5 : 7;
            break;
        case 4:
            nextRobotCount = (robotCount === 2 || robotCount === 15) ? 6 : 7;
            break;
        default:
            nextRobotCount = 14;
    }
}

// `nextRobotCount`は次の表示に使うので、`robotCount`を次の表示番号にセット
robotCount = nextRobotCount;
robotOutput();


}

    window.sendEmail = function() {
        emailjs.send("askchatmail", "template_uxrrqkp", {
            professional_office: "税理士法人サンパートナーズオフィス",
            user_name: userName,
            user_address: userAddress,
            user_phone: userPhone,
            user_inquiry: userInquiry,
            professional_email: "hirano@sunpart.jp"  // 追加ポイント
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }

    robotOutput();
});

//WEBアクセシビリティ 機能
document.addEventListener('DOMContentLoaded', (event) => {
    const responsiveVoiceScript = document.createElement('script');
    responsiveVoiceScript.src = 'https://code.responsivevoice.org/responsivevoice.js';
    document.head.appendChild(responsiveVoiceScript);

    function stopCurrentSpeech() {
        if (window.responsiveVoice) {
            responsiveVoice.cancel();
        }
    }

    function stopVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (video.classList.contains('pause-video')) {
                video.pause();
            }
        });
    }

    function speakText(text) {
        if (document.getElementById('toggle-speech').classList.contains('on')) {
            stopCurrentSpeech();
            stopVideos();
            if (window.responsiveVoice) {
                responsiveVoice.speak(text, "Japanese Female");
            }
        }
    }

function applyZoom() {
    const textElements = document.querySelectorAll('body *');
    textElements.forEach(element => {
        if (document.getElementById('toggle-zoom').classList.contains('on')) {
            element.style.fontSize = '110%';
        } else {
            element.style.fontSize = '';
        }
    });

    const settingItems = document.querySelectorAll('#chatbotSettings .setting-item span');
    settingItems.forEach(item => {
        if (document.getElementById('toggle-zoom').classList.contains('on')) {
            item.style.fontSize = '1.5em'; // 拡大後のサイズ
        } else {
            item.style.fontSize = '1.4em'; // デフォルトのサイズ
        }
    });

    const messageInput = document.getElementById('messageInput');
    if (document.getElementById('toggle-zoom').classList.contains('on')) {
        messageInput.style.fontSize = '1.5em'; // 拡大後のサイズ
    } else {
        messageInput.style.fontSize = '1.4em'; // デフォルトのサイズ
    }
}


    function applyGrayscale() {
        const allElements = document.querySelectorAll('body *:not(#chatbot):not(#chatbot *)');
        const chatElement = document.getElementById('chatbot'); // チャットボットの要素を取得

        if (document.getElementById('toggle-grayscale').classList.contains('on')) {
            allElements.forEach(element => {
                element.style.filter = 'grayscale(100%)';
            });
            // チャット部分にはフィルターを適用しない
            if (chatElement) {
                chatElement.style.filter = 'none';
            }
        } else {
            allElements.forEach(element => {
                element.style.filter = '';
            });
        }
    }

    function applyStyles() {
        applyZoom();
        applyGrayscale();
        stopVideos();
    }

    document.getElementById('toggleSettings').addEventListener('click', function() {
        const settings = document.getElementById('chatbotSettings');
        if (settings.classList.contains('hidden')) {
            settings.classList.remove('hidden');
            requestAnimationFrame(() => {
                settings.style.maxHeight = settings.scrollHeight + "px"; // アニメーションの高さを設定
            });
            this.textContent = '▼';
        } else {
            settings.style.maxHeight = '0'; // 高さを0にしてアニメーションを適用
            settings.addEventListener('transitionend', () => {
                settings.classList.add('hidden');
            }, { once: true });
            this.textContent = '▲';
        }
    });

    document.getElementById('toggle-speech').addEventListener('click', function() {
        this.classList.toggle('on');
        this.textContent = this.classList.contains('on') ? 'ON' : 'OFF';
    });

    document.getElementById('toggle-zoom').addEventListener('click', function() {
        this.classList.toggle('on');
        this.textContent = this.classList.contains('on') ? 'ON' : 'OFF';
        applyZoom();
    });

    document.getElementById('toggle-grayscale').addEventListener('click', function() {
        this.classList.toggle('on');
        this.textContent = this.classList.contains('on') ? 'ON' : 'OFF';
        applyGrayscale();
    });

    document.getElementById('toggle-video-pause').addEventListener('click', function() {
        this.classList.toggle('on');
        this.textContent = this.classList.contains('on') ? 'ON' : 'OFF';
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (this.classList.contains('on')) {
                video.classList.add('pause-video');
            } else {
                video.classList.remove('pause-video');
            }
        });
        stopVideos();
    });

    applyStyles();

    function addMouseOverListener() {
        const elements = document.querySelectorAll('div, p, span, a, li, h1, h2, h3, h4, h5, h6');
        elements.forEach(element => {
            element.addEventListener('mouseover', (event) => {
                const text = event.target.textContent;
                speakText(text);
            });
        });
    }

    addMouseOverListener();
});

// 現在のスクリプトタグを特定する関数
function getCurrentScript() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
}

// URLパラメータを解析する関数
function getScriptParameter(name) {
    var script = getCurrentScript();
    var src = script.src;
    var queryString = src.split('?')[1];
    if (!queryString) {
        return null;
    }
    var params = new URLSearchParams(queryString);
    return params.get(name);
}