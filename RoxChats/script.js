const firebaseConfig = {
  apiKey: "AIzaSyDwsT-d0Rrur2oh6eB0kg0UmGckNU9jO14",

  authDomain: "roxchats.firebaseapp.com",

  projectId: "roxchats",

  storageBucket: "roxchats.appspot.com",

  messagingSenderId: "470050075573",

  appId: "1:470050075573:web:d5f78d0b9f8b51ac321ffc",

  measurementId: "G-134HKWTXVK",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let chatTextBox = document.getElementById("chat-textbox");
let messages = document.getElementById("messages");

updateMessages();

let messageReceivedListener = db
  .collection("messages")
  .doc("messages")
  .onSnapshot((doc) => {
    updateMessages();
  });

function generate_random_auth_code() {
  let lower_case_lets = "abcdefghijklmnopqrstuvwxyz";
  let upper_case_lets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";

  let code = "";
  let chosenList;
  let chosenListVal;

  while (code.length < 11) {
    chosenList = get_rand_int(1, 3);

    if (chosenList == 1) {
      chosenListVal = get_rand_int(0, 25);
      code += lower_case_lets.slice(chosenListVal, chosenListVal + 1);
    } else if (chosenList == 2) {
      chosenListVal = get_rand_int(0, 9);
      code += numbers.slice(chosenListVal, chosenListVal + 1);
    } else if (chosenList == 3) {
      chosenListVal = get_rand_int(0, 25);
      code += upper_case_lets.slice(chosenListVal, chosenListVal + 1);
    }
  }

  return code;
}

function get_rand_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

sessionStorage.setItem("userID", generate_random_auth_code());

function sendMessasge(message) {
  db.collection("messages")
    .doc("messages")
    .update({
      messagesList: firebase.firestore.FieldValue.arrayUnion({
        message: message,
        userID: sessionStorage.getItem("userID"),
        sent: new Date().getTime(),
      }),
    });
}

function addMessage(txtToAdd, isDeviceUser) {
  let messageContainer = document.createElement("div");

  if (isDeviceUser) {
    messageContainer.id = "message-container";
  } else {
    messageContainer.id = "message-container-other-user";
  }

  let message = document.createElement("div");

  message.id = "message";

  message.innerHTML = txtToAdd;

  messageContainer.appendChild(message);

  messages.appendChild(messageContainer);
}

async function updateMessages() {
  let userMessagesDoc = await db.collection("messages").doc("messages").get();

  userMessages = userMessagesDoc.data()["messagesList"].reverse();

  removeAllChildNodes(messages);

  for (var i = 0; i < userMessages.length; i++) {
    let isDeviceUser =
      userMessages[i]["userID"] == sessionStorage.getItem("userID")
        ? true
        : false;
    addMessage(userMessages[i]["message"], isDeviceUser);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    let inputText = chatTextBox.value;
    chatTextBox.value = "";
    sendMessasge(inputText);
  }
});
