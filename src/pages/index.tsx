import GridCanvas from "@/components/GridCanvas";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor as Persistor}>
        <GridCanvas />
      </PersistGate>
    </Provider>
  );
};

export default App;
