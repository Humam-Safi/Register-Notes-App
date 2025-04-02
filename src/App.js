// import Table from "./table";
import { Route, Routes } from "react-router-dom";
import Notes from "./pages/notes/notes";
import Note from "./pages/notes/note";
import EditNote from "./pages/notes/editNote";
import NewNote from "./pages/notes/newNote";
import Register from "./pages/Auth/register";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/notes" element={<Notes />}/>
        <Route path="/new" element={<NewNote />}/>
        <Route path="/note/:id" element={<Note />}/>
        <Route path="/Edit/:id" element={<EditNote />}/>
      </Routes>
    </div>
  );
}

export default App;
