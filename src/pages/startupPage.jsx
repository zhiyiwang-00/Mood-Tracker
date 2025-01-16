export function Startup(){
//   const inputName = document.getElementById('user_name');
//   inputName.addEventListener('submit', async function (e) {
//     // e.preventDefault();
//     // const formData = new FormData(inputName).entries()
//     // const response = await fetch('https://reqres.in/api/users', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(Object.fromEntries(formData))
//     });

//     // const result = await response.json();
//     // console.log(result)
// });
    return (
        <>
        <div className="login-window">
          <input type="text" placeholder="Enter your name" id="user_name" />
          <br /><br />
          <button>Start</button>
        </div>
        </> 
      )
};