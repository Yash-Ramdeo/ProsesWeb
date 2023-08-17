import './App.css';
import Home from './MyComponents/Home';
import Authentication from './MyComponents/Authentication';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Edit from './MyComponents/Edit User Details/Edit';
const queryClient = new QueryClient();

function App() {
  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/registration" element={< Authentication />} />
            <Route path="/" element={< Home />} />
            <Route path="/edit" element={< Edit />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
