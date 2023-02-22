
import './App.css';
import React from 'react';

function App() {
  const [session, setsession] = React.useState(25);
  const [breaklen, setbreaklen] = React.useState(5);

  const initialState = {
  isPaused: true,
  isSession:true,
  timer: 0
};
const reducer = (state, action) => {
  switch (action.type) {
      //handled inside start/stop button
    case "start":return {isPaused:false,isSession:true,timer:session *60};
    case "pause":return {...state,isPaused:!state.isPaused};
   case "reset":return initialState;
      //handled inside setinterval
    case "resume":return {...state,timer:state.timer-1};
    case "break":return {isPaused:false,isSession:false,timer:breaklen *60};
    default:
     throw new Error();

  }
};
 const [state, dispatch] = React.useReducer(reducer, initialState);
 
 React.useEffect(() => {
    const interval = setInterval(() => {
      if (state.isPaused) {
        return;
      }
     dispatch({ type: "resume" });  
        if (state.timer===0)
          {
            document.getElementById('beep').src="https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a";
            document.getElementById('beep').play();
            document.getElementById('beep').loop=true;
            //const audio = new Audio("https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
           // audio.play();
         
            if (state.isSession) {dispatch({ type: "break" });
            document.getElementById("timer-label").innerHTML ="Break";  }
            else
            {
              dispatch({ type: "start" });  
            document.getElementById("timer-label").innerHTML ="Session";  }
            
          }
    }, 1000);
      
    return () => {
             clearInterval(interval);
    
    }
  });
 const handlestartstop = (e) => {
    if (state.timer >0) {dispatch({ type: "pause" });}
   else  dispatch({ type: "start" });
};

  const handleReset = () => {
    setbreaklen(5);
    setsession(25);
    dispatch({ type: "reset" });
    document.getElementById('beep').load();
    document.getElementById("timer-label").innerHTML ="Session"; 
  };
  const checkval = (val) => {
    if (val <= 0 || val >= 60) return false;
     return true;
  };
  
  const calculateTimer = (s) => {
  
   const m=( s - (s %= 60)) / 60;
   return (9<m ?  "":"0") +m+ (9 < s ? ":" : ":0") + s;
  };
  return (
    <div className="App">
      <header className="App-header">
        <div class="container jumbotron text-center ">
          <table class="table-sm table">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <td >
                <span
                  id="break-label"
                  value=""
                  class="label label-info"
                >Break Length</span><br/>

                <button
                  id="break-decrement"
                  class="btn btn-info"
                  onClick={() => {
                    if (checkval(breaklen-1)) setbreaklen(breaklen - 1);
                  }}
                >
                  <i class="bi bi-arrow-down-circle-fill"></i>
                </button>
                <div id="break-length" value={breaklen} class="label label-info">{breaklen}</div>
                <button
                  id="break-increment"
                  className="btn btn-info"
                  onClick={() => {
                    if (checkval(breaklen+1)) setbreaklen(breaklen + 1);
                  }}
                >
                  <i class="bi bi-arrow-up-circle-fill"></i>
                </button>
              </td>
              <td >
                <span
                  id="session-label"
                 
                  class="label label-default"
                >Session Length</span><br/>

                <button
                  id="session-decrement"
                  className="btn btn-info"
                  onClick={() => {
                    if (checkval(session-1)) setsession(session - 1);
                  }}
                >
                  <i class="bi bi-arrow-down-circle-fill"></i>
                </button>
                <div id="session-length" value={session} class="label label-info">{session}</div>
                <button
                  id="session-increment"
                  className="btn btn-info"
                  onClick={() => {
                    if (checkval(session+1)) setsession(session + 1);
                  }}
                >
                  <i class="bi bi-arrow-up-circle-fill"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td class=""></td>
            </tr>
          </table>
          <div className="controls"></div>
          <span id="timer-label"  className="label" >
          Session
          </span>
          <br />
          <button
            id="start_stop"
            className="btn btn-info"
            onClick={handlestartstop}
          >
            <i class="bi bi-skip-start-circle-fill"></i>
            Start/Stop
          </button>

          <button id="reset" className="btn btn-info" onClick={handleReset}>
            <i class="bi bi-x-circle-fill"></i>
            Reset
          </button><br/>
          <div id="time-left" className="label">{calculateTimer(state.timer.toString())}</div>
          <audio id="beep" className="clip" src="https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a"></audio>
        </div>
      </header>
    </div>
  );
}

export default App;
