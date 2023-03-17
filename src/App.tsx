import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/Login';
import { MainPage } from './pages/Main';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
