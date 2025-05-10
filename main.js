
const currentPage = window.location.pathname;
const isLoginPage = currentPage.includes("login.html");
const user = localStorage.getItem('user');
if (user != null) {
  console.log("USer saved: " + user);
  const storedUser = JSON.parse(user);

  if (user.token != "") {
    console.log("Main Screen");
    if (isLoginPage) {
      window.location.href = '/index.html';
    }
  } else {
    // لاگین نکرده → بفرست به صفحه لاگین
    //window.location.href = '/login.html';
  }
}


// LOGIN
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // جلو گیری از ریفرش شدن صفحه

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorText = document.getElementById("errorText");
    const button = document.getElementById("loginButton");
    const buttonText = button.querySelector(".btn-text");
    const buttonLoader = button.querySelector(".btn-loader");

    errorText.style.display = "none";

    button.disabled = true;
    buttonText.style.display = "none";
    buttonLoader.style.display = "inline-block";

    // ساختن دیتای ارسالی
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://rgb.liara.run/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.log("پاسخ خام سرور:", errText);
        errorText.textContent = errText;
        errorText.style.display = "block";

        let errorData;
        try {
          errorData = JSON.parse(errText);
        } catch (e) {
          throw new Error(errText);
        }

        throw new Error(
          errorData.message || "خطا در درخواست: " + response.status
        );
      }

      const result = await response.json();
      console.log("پاسخ API:", result);
      localStorage.setItem('user', JSON.stringify(result));
      if (isLoginPage) {
        window.location.href = '/index.html';
      }
      console.log("Main Screen");
    } catch (error) {
      console.error("خطا:", error.message);
      errorText.textContent = error.message;
      errorText.style.display = "block";
    } finally {
      // بازگرداندن دکمه به حالت عادی
      button.disabled = false;
      buttonText.style.display = "inline";
      buttonLoader.style.display = "none";
    }
  });


// Dashboard
document.addEventListener('DOMContentLoaded', function () {
  const userElement = document.getElementById('username');

  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    if (user.name) {
      userElement.textContent = user.name;
    }
  }
});


// ایجاد Color Wheel
var colorPicker = new iro.ColorPicker("#colorWheel", {
  width: 250,
  color: "#f00",  // رنگ پیش‌فرض
  borderWidth: 1,
  borderColor: "#fff",
});

// دریافت رنگ وقتی تغییر کرد
colorPicker.on('color:change', function(color) {
  console.log(color.hexString); // مثل "#ff0000"
});



  
  
