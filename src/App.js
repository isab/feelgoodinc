import "./App.css";
import FilterView from "./FilterView.jsx";
import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";
import CreateButton from "./CreateButton";

function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <div className="App">
        <FilterView />
      </div>
      <div className="CreateFloat">
        <CreateButton />
      </div>
    </EasybaseProvider>
  );
}

export default App;
