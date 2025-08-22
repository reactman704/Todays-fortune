import { Card } from "./components/Card";

function App() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Card />
      </div>
    </>
  );
}

export default App;
