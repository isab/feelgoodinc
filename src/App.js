import "./App.css";
import FilterView from "./FilterView.jsx";
import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <div className="App">
        <FilterView />
      </div>
    </EasybaseProvider>
  );
}

export default App;
