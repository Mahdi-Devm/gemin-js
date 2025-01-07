const apiKey = "AIzaSyC36AcUF4CLnU9xm7PmASxMzDYyM0xIR3E";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

let textContainer = document.querySelector(".child-container-li");
let customInput = document.querySelector(".custom-input");
let inputButton = document.querySelector(".input-button");
let childcontainerboxicon = document.querySelectorAll(".child-container-box-icon");
let headerbtn = document.querySelector(".header-btn");
let headerTitle = document.querySelector(".header-title-h2");

let colorbg = document.body.style.backgroundColor;
let isFirstClick = true;

headerbtn.addEventListener('click', () => {
  if (colorbg === "rgb(0, 0, 0)" || colorbg === "#000000") {
    document.body.style.backgroundColor = "#f0f0f0";
    colorbg = "#f0f0f0";
    headerTitle.style.color = "#000000";
  } else {
    document.body.style.backgroundColor = "#000000";
    colorbg = "#000000";
    headerTitle.style.color = "#ffffff";
  }
});


childcontainerboxicon.forEach((element, index) => {
  element.addEventListener("click", () => {
    let relatedText = textpbox[index];
    if (relatedText) {
      customInput.value = relatedText.textContent;
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
  userDiv.appendChild(document.createTextNode(` You: ${userMessage}`));
  textContainer.appendChild(userDiv);

  const data = {
    contents: [
      { parts: [{ text: `${userMessage}` }] },
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
    newDiv.appendChild(document.createTextNode(` ${content}`));
    textContainer.appendChild(newDiv);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
});
