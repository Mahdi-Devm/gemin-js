const apiKey = "AIzaSyC36AcUF4CLnU9xm7PmASxMzDYyM0xIR3E";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

let textContainer = document.querySelector(".child-container-li");
let customInput = document.querySelector(".custom-input");
let inputButton = document.querySelector(".input-button");
let childcontainerboxicon = document.querySelectorAll(".child-container-box-icon");
let headerbtn = document.querySelector(".header-btn");
let headerTitle = document.querySelector(".header-title-h2");

let colorbg = document.body.style.backgroundColor;

// بررسی رنگ پس‌زمینه و تغییر رنگ متن
headerbtn.addEventListener('click', () => {
  // اگر رنگ پس‌زمینه سیاه باشد، آن را به سفید تغییر بده
  if (colorbg === "rgb(0, 0, 0)" || colorbg === "#000000") {  // بررسی رنگ پس‌زمینه سیاه
    document.body.style.backgroundColor = "#f0f0f0"; // تغییر رنگ به سفید
    colorbg = "#f0f0f0";  
    headerTitle.style.color = "#000000"; // تغییر رنگ متن به مشکی برای پس‌زمینه سفید
  } else {  // در غیر این صورت به رنگ سیاه برگردان
    document.body.style.backgroundColor = "#000000"; // تغییر رنگ به سیاه
    colorbg = "#000000";  
    headerTitle.style.color = "#ffffff"; // تغییر رنگ متن به سفید برای پس‌زمینه سیاه
  }
});



let isFirstClick = true;

childcontainerboxicon.forEach((element, index) => {
  element.addEventListener("click", () => {
    let relatedText = textpbox[index];
    if (relatedText) {
      let textvalbox = relatedText.textContent;
      customInput.value = textvalbox;
    }
  });
});

inputButton.addEventListener("click", async () => {
  const userMessage = customInput.value;

  if (isFirstClick) {
    textContainer.innerHTML = "";
    isFirstClick = false;
  }

  const userDiv = document.createElement("div");
  userDiv.classList.add("user-content");


  const textNode = document.createTextNode(` You: ${userMessage}`);

  userDiv.appendChild(textNode);
  textContainer.appendChild(userDiv);

  const data = {
    contents: [
        {
            parts: [{ text: `${userMessage}` }],  // بدون اضافه کردن عبارت "Answer briefly"
        },
    ],
};


  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const content = result.candidates[0].content.parts[0].text;

    const newDiv = document.createElement("div");
    newDiv.classList.add("generated-content");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-paper-plane");

    newDiv.appendChild(icon);
    const textNode = document.createTextNode(` ${content}`);
    newDiv.appendChild(textNode);
    textContainer.appendChild(newDiv);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
});
