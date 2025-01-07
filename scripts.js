const apiKey = "AIzaSyC36AcUF4CLnU9xm7PmASxMzDYyM0xIR3E";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

let textContainer = document.querySelector('.child-container-li');
let customInput = document.querySelector('.custom-input');
let inputButton = document.querySelector('.input-button');
let childcontainerboxicon = document.querySelectorAll('.child-container-box-icon');

console.log(childcontainerboxicon);

function valdefult() {
  childcontainerboxicon.addEventListener('click', (event)=>{
    customInput.forEach(val => {
      console.log(val);
      
    });
  })
}


inputButton.addEventListener('click', async () => {
    const userMessage = customInput.value; 

    const data = {
        contents: [
            {
                parts: [{ text: userMessage }],
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
        console.log("Generated Content:", content);

        textContainer.textContent = content;

    } catch (error) {
        console.error("Error:", error.message);
    }
})
