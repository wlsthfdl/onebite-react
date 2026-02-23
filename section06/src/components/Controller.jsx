import Viewer from "./Viewer";

function Controller({ onClickButton }) {
  return (
    <>
      <div>
        <button
          onClick={() => {
            onClickButton(-1);
          }}
        >
          -1
        </button>
        <button
          onclick={() => {
            onClickButton(-10);
          }}
        >
          -10
        </button>
        <button>-100</button>
        <button>+100</button>
        <button>+10</button>
        <button>+1</button>
      </div>
    </>
  );
}

export default Controller;
